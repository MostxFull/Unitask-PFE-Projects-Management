import { useState } from "react";

const faqData = [
  { question: "Comment créer un projet de groupe ?", answer: "Vous pouvez créer un projet en allant dans l'onglet 'Créer un projet' et en ajoutant les membres de votre groupe." },
  { question: "Comment ajouter un encadrant ?", answer: "L'encadrant peut être ajouté via la section 'Gestion des encadrants' dans les paramètres du projet." },
  { question: "Comment soumettre un rapport ?", answer: "Les rapports peuvent être soumis via l'onglet 'Documents' en sélectionnant 'Nouveau rapport'." },
  { question: "Comment modifier un projet ?", answer: "Vous pouvez modifier un projet en accédant à l'onglet 'Projets' et en sélectionnant l'option de modification." },
  { question: "Comment supprimer un membre d'un groupe ?", answer: "Vous pouvez supprimer un membre depuis la section 'Gestion des membres' en sélectionnant l'option de suppression." }
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredFaq = faqData.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Votre feedback a été envoyé : " + feedback);
    setFeedback("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Centre d'aide</h1>
      <input
        type="text"
        placeholder="Rechercher une question..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((faq, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune question trouvée.</p>
        )}
      </div>
      <div className="mt-6 p-4 border rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Envoyer un feedback ou une question</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Écrivez votre message ici..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
