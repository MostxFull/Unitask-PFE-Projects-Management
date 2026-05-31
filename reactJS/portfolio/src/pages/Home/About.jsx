import React from 'react';
import Footer from '../../compenents/CopHome/footer/Footer';

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <section className="flex-1  py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            À propos de notre plateforme
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Notre plateforme facilite la gestion des projets académiques en améliorant la collaboration entre étudiants et enseignants.
            Elle permet d'organiser les tâches, d'échanger des documents et de suivre l'avancement des projets en temps réel.
          </p>
          <div className="flex justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-semibold text-gray-700">Collaboration</h3>
              <p className="text-gray-500 text-sm mt-2">
                Travaillez en équipe, échangez des fichiers et communiquez en temps réel.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-semibold text-gray-700">Gestion des tâches</h3>
              <p className="text-gray-500 text-sm mt-2">
                Suivez l'avancement des tâches et assignez des responsabilités facilement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-semibold text-gray-700">Encadrement</h3>
              <p className="text-gray-500 text-sm mt-2">
                Les enseignants peuvent superviser les projets et donner des retours en direct.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default About;
