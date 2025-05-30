import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
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

export default App;