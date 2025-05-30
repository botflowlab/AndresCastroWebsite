import React from 'react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';

function Home() {
  return (
    <div className="font-neutra min-w-[1024px]">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default Home;