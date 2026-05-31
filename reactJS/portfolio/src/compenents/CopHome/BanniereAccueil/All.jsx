import React from "react";
import Hero from "./Hero";
import CallToAction from "./CallToAction";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "../footer/Footer";
function All() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default All;
