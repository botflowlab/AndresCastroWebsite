import React from 'react';

function Architect() {
  return (
    <section className="h-screen flex flex-col justify-center overflow-hidden">
      {/* Top Section with Centered Content */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">ANDRÉS CASTRO - EL ARQUITECTO</h1>
        <h2 className="text-xl md:text-2xl mb-4 font-light">#1 in sustainable architecture in Costa Rica</h2>
        <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
          With over two decades of experience in sustainable architecture, Andrés Castro has established himself as a leading figure in eco-friendly and bioclimatic design throughout Costa Rica.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex-1 flex items-center px-4">
        <div className="container mx-auto flex flex-col md:flex-row h-full max-h-[700px]">
          {/* Left Column - Image */}
          <div className="w-full md:w-[60%] h-full">
            <div className="h-full">
              <img
                src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg"
                alt="Professional architect"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full md:w-[40%] bg-[#f5f5f0] p-6 md:p-8 lg:p-12 flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">ANDRÉS CASTRO</h2>
            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-600 font-light">
              As a pioneer in sustainable architecture, Andrés has led numerous groundbreaking projects that seamlessly blend environmental consciousness with stunning design. His work has earned international recognition and has set new standards for sustainable architecture in Central America.
            </p>
            <a
              href="/arquitecto"
              className="inline-block border-2 border-black px-2 py-1 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
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