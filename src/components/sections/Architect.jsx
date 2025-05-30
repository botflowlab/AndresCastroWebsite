import React from 'react';

function Architect() {
  return (
    <section className="py-20">
      {/* Top Section with Centered Content */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">ANDRÉS CASTRO - EL ARQUITECTO</h1>
        <h2 className="text-2xl md:text-3xl mb-6 font-light">#1 in sustainable architecture in Costa Rica</h2>
        <p className="text-lg md:text-xl text-gray-600 font-light">
          With over two decades of experience in sustainable architecture, Andrés Castro has established himself as a leading figure in eco-friendly and bioclimatic design throughout Costa Rica.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left Column - Image */}
          <div className="w-full md:w-[60%]">
            <div className="aspect-[3/4] w-full">
              <img
                src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg"
                alt="Professional architect"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-[40%] bg-[#f5f5f0] p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">ANDRÉS CASTRO</h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-600 font-light">
              As a pioneer in sustainable architecture, Andrés has led numerous groundbreaking projects that seamlessly blend environmental consciousness with stunning design. His work has earned international recognition and has set new standards for sustainable architecture in Central America.
            </p>
            <a
              href="/arquitecto"
              className="inline-block border-2 border-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              LEARN MORE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architect;