import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonial from '../components/sections/Testimonial';
import Architect from '../components/sections/Architect';
import ProjectsSection from '../components/sections/ProjectsSection';
import NewsSection from '../components/sections/NewsSection';

function Home() {
  return (
    <div className="font-cormorant">
      <Hero />
      <Testimonial />
      <Architect />
      <ProjectsSection />
      <NewsSection />
    </div>
  );
}

export default Home;