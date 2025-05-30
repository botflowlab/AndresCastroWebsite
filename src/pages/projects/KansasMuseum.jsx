import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function KansasMuseum() {
  return (
    <div className="font-neutra">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">KANSAS CITY MUSEUM</h1>
          {/* Project content will go here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default KansasMuseum;