import React from 'react';
import Hero from './Hero';
import Publications from './Publications';
import Testimonials from './Testimonials';
import MediaCoverage from './MediaCoverage';
import ParallaxContact from '../../components/sections/ParallaxContact';

export default function News() {
  return (
    <div className="font-cormorant">
      <Hero />
      <Publications />
      {/*<Testimonials />*/}
      <MediaCoverage />
      <ParallaxContact />
    </div>
  );
}