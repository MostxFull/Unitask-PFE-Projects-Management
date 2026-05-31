import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Rejoignez-nous dès aujourd’hui</h2>
        <p className="text-lg mb-6">Inscrivez-vous et commencez à gérer vos projets académiques de manière efficace.</p>
        <Link to="/signin" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200">
          S'inscrire maintenant
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
