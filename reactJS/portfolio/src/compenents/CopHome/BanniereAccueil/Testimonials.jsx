import React from "react";

const testimonials = [
  {
    name: "Alice Dupont",
    role: "Étudiante en informatique",
    feedback: "Grâce à cette plateforme, notre groupe a pu mieux organiser notre projet et respecter les délais.",
  },
  {
    name: "Prof. Martin",
    role: "Enseignant encadrant",
    feedback: "L'outil de suivi des tâches facilite énormément le suivi des projets et l'encadrement des étudiants.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ce que disent nos utilisateurs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testi, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-700">"{testi.feedback}"</p>
              <h3 className="text-blue-600 font-semibold mt-4">{testi.name}</h3>
              <p className="text-gray-500 text-sm">{testi.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
