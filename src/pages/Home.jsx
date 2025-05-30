import React from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';

function Home() {
  return (
    <div className="font-neutra">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default Home;