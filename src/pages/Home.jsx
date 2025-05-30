import React from 'react';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Architect from '../components/sections/Architect';

function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Architect />
      </main>
      <Footer />
    </div>
  );
}

export default Home;