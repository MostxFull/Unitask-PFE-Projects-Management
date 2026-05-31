import React from 'react'


const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-purple-50">
      <section className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Besoin d'aide ou d'informations ? Envoyez-nous un message et nous vous répondrons rapidement.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom complet
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Votre message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>
      <footer className="w-full bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Gestion de Projets Académiques</p>
      </footer>
    </div>
  );
};

export default ContactUs;
