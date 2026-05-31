import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Simplifiez la gestion de vos projets académiques
        </h1>
        <p className="text-lg mb-6">
          Collaborez avec votre équipe, suivez l'avancement des tâches et travaillez efficacement.
        </p>
        <Link to="'/Login" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200">
          Commencer maintenant
        </Link>
      </div>
    </section>
  );
};

export default Hero;
