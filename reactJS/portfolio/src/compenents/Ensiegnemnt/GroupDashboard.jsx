import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Indication from "../Etudinet/Overview/OverviewGroup/Indication.jsx";
import CreateGroup from "../groupProjet/CreateGroup";
import { MdIncompleteCircle, MdOutlineTask } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import GroupCharts from "../Etudinet/Overview/charts/chartsGroup/ChartOfBarGroup.jsx";

export default function GroupDashboard() {
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [chartDonnees,setChartDonnes] =useState([])

  const fetchGroups = () => {
    axios.get(`http://localhost:8080/user/${id}`)
        .then((response) => {
          console.log(response.data)
          const transformedGroups = response.data.groups.map(group => {
            const complet = group.taches.filter(tache => tache.status === 'Completed').length;
            const inProgress = group.taches.filter(tache => tache.status === 'In_progress').length;
            const notStarted = group.taches.filter(tache => tache.status === 'To_do').length;


            const members = group.members.map(member => ({
              id: member.id,
              name: member.firstName
                  ? `${member.firstName} ${member.lastName}`
                  : member.lastName
            }));

            return {
              ...group,
              stats: {
                complet,
                inProgress,
                notStarted,
                members: group.members.length
              },
              members
            };
          });

          setGroups(transformedGroups);
          if (transformedGroups.length > 0) {
            setSelectedGroup(transformedGroups[0]);
          }
        })
        .catch(error => console.error("Error fetching data:", error));
  };


  useEffect(() => {
    if (selectedGroup && selectedGroup.id) {
      axios.get(`http://localhost:8080/user/overviewEnd/${selectedGroup.id}`)
          .then((res) => {
            setChartDonnes(res.data);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données:", error);
          });
    }
  }, [selectedGroup]);

  useEffect(fetchGroups, [id]);

  // Configuration des indicateurs
  const indications = selectedGroup ? [
    {
      icon: <MdOutlineTask className="w-6 h-6 text-blue-500" />,
      title: "Tâches Complètes",
      value: selectedGroup.taches.length,
      progress: (selectedGroup.stats.complet / selectedGroup.taches.length) * 100 || 0,
      color: "bg-green-500"
    },
    {
      icon: <GiProgression className="w-6 h-6 text-yellow-500" />,
      title: "En progression",
      value: selectedGroup.stats.inProgress,
      progress: (selectedGroup.stats.inProgress / selectedGroup.taches.length) * 100 || 0,
      color: "bg-yellow-500"
    },
    {
      icon: <GoVerified className="w-6 h-6 text-green-500" />,
      title: "Non Démarrées",
      value: selectedGroup.stats.notStarted,
      progress: (selectedGroup.stats.notStarted / selectedGroup.taches.length) * 100 || 0,
      color: "bg-red-500"
    },
    {
      icon: <MdIncompleteCircle className="w-6 h-6 text-red-500" />,
      title: "Membres",
      value: selectedGroup.stats.members,
      progress: 100,
      color: "bg-blue-500"
    }
  ] : [];

  return (
      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Header fixe avec bouton */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-10 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Groupes</h1>
          <button
              onClick={() => setShowCreateGroup(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            + Nouveau Groupe
          </button>
        </div>

        {/* Modal de création */}
        {showCreateGroup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
              <div className="bg-white  rounded-lg w-full max-w-xl animate-fade-in">
                <CreateGroup
                    superviseurId={id}
                    onClose={() => setShowCreateGroup(false)}
                    onGroupCreated={fetchGroups}
                />
              </div>
            </div>
        )}

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Liste des groupes */}
          {groups.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {groups.map((group) => (
                    <button
                        key={group.id}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedGroup?.id === group.id
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                        }`}
                        onClick={() => setSelectedGroup(group)}
                    >
                      {group.name}
                    </button>
                ))}
              </div>
          )}

          {/* Affichage conditionnel */}
          {selectedGroup ? (
              <>
                {/* Indicateurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {indications.map((ind, i) => (
                      <Indication
                          key={i}
                          icon={ind.icon}
                          title={ind.title}
                          value={ind.value}
                          progress={ind.progress}
                          color={ind.color}
                      />
                  ))}
                </div>

                {/* Liste des membres */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Membres</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGroup.members.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {member.name.charAt(0)}
                          </div>
                          <span className="text-gray-600">{member.name}</span>
                        </div>
                    ))}
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Progression des Tâches</h3>
                    <div className="h-96">
                      <GroupCharts groupData={chartDonnees}/>

                    </div>
                  </div>
                </div>
              </>
          ) : (
              /* Message d'absence de groupe */
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-4">Aucun groupe n'a été créé</p>
                <button
                    onClick={() => setShowCreateGroup(true)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Créer un premier groupe
                </button>
              </div>
          )}
        </div>
      </div>
  );
}