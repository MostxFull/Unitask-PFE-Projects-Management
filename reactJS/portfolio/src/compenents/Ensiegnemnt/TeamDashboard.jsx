import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChartOfBar from "../Etudinet/Overview/charts/chartsGroup/ChartOfBarPersonnel.jsx";

export default function TeamDashboard() {
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/${id}`);
        const userGroups = response.data.groups.map(group => ({
          ...group,
          members: group.members.map(member => ({
            ...member,
            tasks: {
              complet: member.tache.filter(t => t.status === "Completed").length,
              inProgress: member.tache.filter(t => t.status === "In_progress").length,
              notStarted: member.tache.filter(t => t.status === "To_do").length
            }
          }))
        }));

        setGroups(userGroups);
        setSelectedGroup(userGroups[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   if (selectedGroup && selectedGroup.id) {
  //     axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/overviewEnd/${selectedGroup.id}`)
  //         .then((res) => {
  //           setChartDonnes(res.data);
  //         })
  //         .catch((error) => {
  //           console.error("Erreur lors de la récupération des données:", error);
  //         });
  //   }
  // }, [selectedGroup]);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Barre des groupes fixée en haut */}
        <div className="sticky top-0 bg-white rounded-md p-3 z-10 py-4 border-b-2 shadow-sm">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {groups.map((group) => (
                <button
                    key={group.id}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200
                ${
                        selectedGroup?.id === group.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setSelectedGroup(group);
                      setSelectedMember(null);
                    }}
                >
                  {group.name}
                </button>
            ))}
          </div>
        </div>

        {/* Grille des membres */}
        {selectedGroup && (
            <div className="mt-8 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selectedGroup.members.map((member) => (
                    <div
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className={`cursor-pointer p-4 border rounded-lg transition-all duration-200
                  ${
                            selectedMember?.id === member.id
                                ? 'border-blue-500 shadow-lg'
                                : 'border-gray-200 hover:shadow-md'
                        }`}
                    >
                      <div className="w-full h-40 bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
                        <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {member.firstName?.charAt(0) || member.lastName?.charAt(0) || "?"}
                        </div>
                      </div>
                      <p className="text-center font-medium text-gray-800">
                        {member.firstName +" "+ member.lastName || member.email}
                      </p>
                    </div>
                ))}
              </div>

              {/* Détails du membre sélectionné */}
              {selectedMember && (
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Détails du Membre</h2>

                    {/* Informations de base */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Prénom</p>
                        <p className="font-medium text-gray-800">
                          {selectedMember.firstName || "Non renseigné"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium text-gray-800">{selectedMember.lastName}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Admin</p>
                        <p className="font-medium text-gray-800">
                          {selectedMember.isAdmin }
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-800">{selectedMember.email}</p>
                      </div>
                    </div>

                    {/* Statistiques des tâches */}
                    <div className="flex justify-center gap-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center w-32">
                        <p className="text-sm text-green-600 font-medium">Complètes</p>
                        <p className="text-2xl font-bold text-green-700">
                          {selectedMember.tasks.complet}
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center w-32">
                        <p className="text-sm text-yellow-600 font-medium">En Cours</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {selectedMember.tasks.inProgress}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center w-32">
                        <p className="text-sm text-red-600 font-medium">Non Démarrées</p>
                        <p className="text-2xl font-bold text-red-700">
                          {selectedMember.tasks.notStarted}
                        </p>
                      </div>
                    </div>


                <div className="bg-white p-6 rounded-xl shadow-sm">
              {/*<h3 className="text-xl font-semibold mb-4">Progress Timeline</h3>*/}
              <div className="mt-4" >
                {/*<Chart />*/}
                {/*<ProgressTimelineChart userData={userData} />*/}
                <ChartOfBar userData={selectedMember}/>

              </div>
            </div>
                  </div>
              )}
            </div>
        )}
      </div>
  );
}