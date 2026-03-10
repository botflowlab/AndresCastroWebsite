import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GMAIL_SEND_ACTION_ID =
  "conn_mod_def::GGXAjWkZO8U::uMc1LQIHTTKzeMm3rLL5gQ";

function buildEmailHtml({
  firstName,
  lastName,
  email,
  phone,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
          <tr>
            <td style="background-color:#0c0c0c;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:-0.3px;">New Contact Form Submission</h1>
              <p style="margin:8px 0 0;color:#a1a1aa;font-size:14px;">Andres Castro Architecture</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:block;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Name</span>
                    <span style="display:block;font-size:16px;color:#18181b;font-weight:500;">${firstName} ${lastName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:block;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Email</span>
                    <a href="mailto:${email}" style="display:block;font-size:16px;color:#0c0c0c;font-weight:500;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="display:block;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Phone</span>
                    <span style="display:block;font-size:16px;color:#18181b;font-weight:500;">${phone || "Not provided"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0;">
                    <span style="display:block;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Message</span>
                    <div style="background-color:#fafafa;border-radius:8px;padding:16px;font-size:15px;color:#27272a;line-height:1.6;">${message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 28px;background-color:#fafafa;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;text-align:center;">This email was sent from the contact form on andrescastro.co</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PICA_SECRET = Deno.env.get("PICA_SECRET");
    const PICA_CONNECTION_KEY = Deno.env.get("PICA_CONNECTION_KEY");

    if (!PICA_SECRET || !PICA_CONNECTION_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const recipientEmail = "nunezdilanv@gmail.com";
    const subject = `New Contact: ${firstName} ${lastName} - Andres Castro Architecture`;
    const htmlBody = buildEmailHtml({ firstName, lastName, email, phone, message });

    const response = await fetch(
      "https://api.picaos.com/v1/passthrough/gmail/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pica-secret": PICA_SECRET,
          "x-pica-connection-key": PICA_CONNECTION_KEY,
          "x-pica-action-id": GMAIL_SEND_ACTION_ID,
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          body: htmlBody,
          isHtml: true,
          connectionKey: PICA_CONNECTION_KEY,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Pica API error:", response.status, errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
