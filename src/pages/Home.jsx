import React from 'react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Architect from '../components/sections/Architect';

function Home() {
  return (
    <div className="font-cormorant">
      <Navbar />
      <main>
        <Hero />
        <Architect />
      </main>
      <Footer />
    </div>
  );
}

export default Home;