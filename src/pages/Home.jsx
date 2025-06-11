import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonial from '../components/sections/Testimonial';
import Architect from '../components/sections/Architect';
import LemaArchitec from '../components/sections/LemaArchitec';
import ProjectsSection from '../components/sections/ProjectsSection';
import NewsSection from '../components/sections/NewsSection';
import Cta from '../components/sections/Cta';
import ImageGalleryHome from '../components/sections/ImageGalleryHome';

function Home() {
  return (
    <div className="font-cormorant">
      <Hero />
      <Architect />
      <LemaArchitec />
      <ProjectsSection />
      <NewsSection />
      <Cta />
    </div>
  );
}

export default Home;