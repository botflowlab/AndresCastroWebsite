import React from "react";

export default function MeetTheTeam() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* 
          - <div className="flex flex-col md:grid …">: en móvil será flex-col (imagen arriba, texto abajo). 
          - en md en adelante, cambia a grid de 2 columnas: [imagen][texto]. 
        */}
        <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] md:items-start">
          
          {/** 
            Imagen: 
            - En móvil (<md) mostramos un <img> normal que ocupa 100% de ancho y altura auto. 
            - En md+ ocultamos ese <img> y mostramos el <div> “cuadrado” (aspect-square) cuya altura será la misma que la del texto. 
          **/}
          <div className="w-full">
            {/** Mobile: imagen full width **/}
            <img
              src="/images/theArchitect/ac02.jpg"
              alt="Team Lead"
              className="w-full h-auto object-cover md:hidden"
            />

            {/** Desktop (md+): imagen en contenedor cuadrado que estira su altura igual al texto **/}
            <div className="hidden md:block h-full aspect-square">
              <img
                src="/images/theArchitect/ac02.jpg"
                alt="Team Lead"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/** Texto: 
               - Padding-top en móvil para separar de la imagen. 
               - En md+ se quita ese padding-top y se añade padding-left para separar columnas. 
          **/}
          <div className="pt-12 md:pt-0 md:pl-12 lg:pl-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest mb-8">
              Meet the Team
            </h2>
            <div className="max-w-prose space-y-6 font-serif text-sm md:text-base lg:text-lg leading-relaxed text-black">
              <p>
                Philip Scheinfeld Team, led by Philip Scheinfeld, services an organically growing client base consisting of homeowners, prospective purchasers,
                landlords, investors, and developers. The team is adamant in delivering data-driven, transparent, empathetic real estate advisory. By
                incorporating an incomparable approach of unparalleled marketing, real-market data, white-glove service, and exceptional client dedication,
                it’s easy to see why The Philip Scheinfeld team outperforms its competitors.
              </p>
              <p>
                Philip Scheinfeld, equipped with a background in entrepreneurial ventures, has had a passion for real estate for as long as he can remember
                hence why he went straight into the industry after college. Philip, accompanied by Director of Operations, James Connors, leads a team comprised
                of 7 other team members in both New York City and Miami: Sam Dahdal, Alex Horgan, Kaitlin Ruddy, Karina Asturias, Rachel Zakheim, Ryan Andrews,
                and Nicole Rapps. Each team member is equipped with a unique background and skillset that entails but is not limited to Finance and Investments,
                Operations, Marketing, and Hospitality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
