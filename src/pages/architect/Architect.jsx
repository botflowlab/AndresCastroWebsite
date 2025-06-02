import React from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';

export default function Architect() {
  return (
    <div className="font-cormorant">
      <Hero />
      <About />
      <Experience />
    </div>
  );
}