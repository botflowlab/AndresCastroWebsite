import React from 'react';

export default function MeetTheTeam() {
  return (
    <section className="py-20 px-6 md:px-10 lg:px-20 bg-white">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-20">
        
        {/* Left - Image */}
        <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/theArchitect/ac02.jpg" // Replace with actual path
            alt="Team Lead"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Text */}
        <div className="w-full md:w-1/2 text-black">
          <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-8 uppercase">
            Meet the Team
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p>
              Philip Scheinfeld Team, led by Philip Scheinfeld, services an organically growing client base consisting of homeowners, prospective purchasers, landlords, investors, and developers. The team is adamant in delivering data-driven, transparent, empathetic real estate advisory. By incorporating an incomparable approach of unparalleled marketing, real-market data, white-glove service, and exceptional client dedication, it’s easy to see why The Philip Scheinfeld team outperforms its competitors.
            </p>
            <p>
              Philip Scheinfeld, equipped with a background in entrepreneurial ventures, has had a passion for real estate for as long as he can remember hence why he went straight into the industry after college. Philip, accompanied by Director of Operations, James Connors, leads a team comprised of 7 other team members in both New York City and Miami: Sam Dahdal, Alex Horgan, Kaitlin Ruddy, Karina Asturias, and Rachel Zakheim, Ryan Andrews, and Nicole Rapps. Each team member is equipped with a unique background and skillset that entails but is not limited to Finance and Investments, Operations, Marketing, and Hospitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}