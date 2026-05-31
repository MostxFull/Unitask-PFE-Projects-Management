import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GroupMemberComponent() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]); // Initialisé avec []

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/MembresGroup/${id}`)
      .then((response) => {
        setMembers(response.data.MembresGroup || []);
      })
      .catch((error) => {
        console.error("Error fetching members", error);
      });
  }, [id]);

  // Fonctions pour filtrer les tâches
  const tasksComplet = (tasks) => Array.isArray(tasks) ? tasks.filter(t => t.status === "Completed").length : 0;
  const tasksInProgress = (tasks) => Array.isArray(tasks) ? tasks.filter(t => t.status === "In_progress").length : 0;
  const tasksNotStarted = (tasks) => Array.isArray(tasks) ? tasks.filter(t => t.status === "To_do").length : 0;

  return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Membres du Groupe</h1>
          <p className="text-gray-600 mt-2">Sélectionnez un membre pour voir ses détails</p>
        </div>

        {/* Liste des membres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
              <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`relative cursor-pointer group transition-all duration-200 ${
                      selectedMember?.id === member.id ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-blue-200"
                  } bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden`}
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                        src={`https://robohash.org/${member.id}.png?size=100x100`}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {member.isAdmin=="Oui" && (
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium transform translate-y-1/4">
                          Admin
                        </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{member.email}</p>
                </div>
              </div>
          ))}
        </div>

        {/* Détails du membre sélectionné */}
        {selectedMember && (
            <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Profil du Membre</h2>
              </div>

              <div className="p-8 space-y-6">
                {/* Section Informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Prénom</label>
                    <div className="input-field">
                      {selectedMember.firstName || "Non spécifié"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Nom</label>
                    <div className="input-field">
                      {selectedMember.lastName || "Non spécifié"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <div className="input-field">
                      {selectedMember.email || "Non spécifié"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Admin</label>
                    <div className="input-field">
                      {selectedMember.isAdmin }
                    </div>
                  </div>
                </div>

                {/* Statistiques des tâches */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistiques des Tâches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatBox
                        title="Complétées"
                        value={tasksComplet(selectedMember?.tache)}
                        color="bg-green-100 text-green-800"
                        icon="✅"
                    />
                    <StatBox
                        title="En Cours"
                        value={tasksInProgress(selectedMember?.tache)}
                        color="bg-blue-100 text-blue-800"
                        icon="⏳"
                    />
                    <StatBox
                        title="Non Démarrées"
                        value={tasksNotStarted(selectedMember?.tache)}
                        color="bg-red-100 text-red-800"
                        icon="📭"
                    />
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

// Composant StatBox réutilisable
const StatBox = ({ title, value, color, icon }) => (
    <div className={`${color} p-4 rounded-lg flex items-center space-x-3`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-xs font-medium uppercase tracking-wide">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
);

// Style d'entrée personnalisé
const inputStyle = `w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50/50`;

export default GroupMemberComponent;