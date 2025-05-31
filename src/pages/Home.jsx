import React from 'react';
import Hero from '../components/sections/Hero';
import Architect from '../components/sections/Architect';
import ProjectsSection from '../components/sections/ProjectsSection';
import NewsSection from '../components/sections/NewsSection';

function Home() {
  return (
    <div className="font-cormorant">
      <Hero />
      <Architect />
      <ProjectsSection />
      <NewsSection />
    </div>
  );
}

export default Home;