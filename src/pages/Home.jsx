import React from 'react';
import Hero from '../components/sections/Hero';
import Architect from '../components/sections/Architect';
import ProjectsSection from '../components/sections/ProjectsSection';

function Home() {
  return (
    <div className="font-cormorant">
      <Hero />
      <Architect />
      <ProjectsSection />
    </div>
  );
}

export default Home;