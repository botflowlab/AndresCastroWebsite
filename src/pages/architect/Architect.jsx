import React from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import ParallaxContact from '../../components/sections/ParallaxContact';

export default function Architect() {
  return (
    <div className="font-cormorant">
      <Hero />
      <About />
      <Experience />
      <ParallaxContact />
    </div>
  );
}