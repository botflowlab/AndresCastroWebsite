import React from "react";

export default function MeetTheTeam() {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-start">
          
          {/* --- Imagen (lado izquierdo) --- */}
          <div className="relative w-full md:w-7/12 lg:w-7/12 aspect-[4/3] md:aspect-[16/9] overflow-visible">
            {/* Contenedor “overflow-visible” para que la imagen pueda salirse */}
            <div className="absolute top-0 left-0 w-[120%] md:w-[110%] lg:w-[105%] h-full md:-translate-x-20 lg:-translate-x-32">
              <img
                src="/images/theArchitect/ac02.jpg" 
                alt="Team Lead"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* --- Texto (lado derecho) --- */}
          <div className="w-full md:w-5/12 lg:w-5/12 mt-12 md:mt-0 md:pl-12 lg:pl-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest mb-8">
              Meet the Team
            </h2>
            <div className="max-w-prose space-y-6 font-serif text-sm md:text-base lg:text-lg leading-relaxed text-black">
              <p>
                Philip Scheinfeld Team, led by Philip Scheinfeld, services an organically growing client base consisting of homeowners, prospective purchasers,
                landlords, investors, and developers. The team is adamant in delivering data-driven, transparent, empathetic real estate advisory. By incorporating
                an incomparable approach of unparalleled marketing, real-market data, white-glove service, and exceptional client dedication, it’s easy to see why
                The Philip Scheinfeld team outperforms its competitors.
              </p>
              <p>
                Philip Scheinfeld, equipped with a background in entrepreneurial ventures, has had a passion for real estate for as long as he can remember hence why
                he went straight into the industry after college. Philip, accompanied by Director of Operations, James Connors, leads a team comprised of 7 other
                team members in both New York City and Miami: Sam Dahdal, Alex Horgan, Kaitlin Ruddy, Karina Asturias, Rachel Zakheim, Ryan Andrews, and Nicole
                Rapps. Each team member is equipped with a unique background and skillset that entails but is not limited to Finance and Investments, Operations,
                Marketing, and Hospitality.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}