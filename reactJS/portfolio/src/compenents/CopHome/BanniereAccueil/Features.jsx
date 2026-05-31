import React from "react";
import { FaUsers, FaTasks, FaChalkboardTeacher } from "react-icons/fa";

const Features = () => {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Pourquoi choisir notre plateforme ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Collaboration facile</h3>
            <p className="text-gray-600 mt-2">Travaillez en équipe avec un espace de discussion et de partage.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaTasks className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Suivi des tâches</h3>
            <p className="text-gray-600 mt-2">Organisez vos projets avec des outils de gestion des tâches intégrés.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaChalkboardTeacher className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Encadrement des enseignants</h3>
            <p className="text-gray-600 mt-2">Bénéficiez d’un suivi et de retours en temps réel de vos encadrants.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
