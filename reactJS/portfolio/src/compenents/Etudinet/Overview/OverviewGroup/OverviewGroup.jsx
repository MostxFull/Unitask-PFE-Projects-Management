// OverviewGroup.jsx
import  { useEffect, useState } from 'react';
import MembesProjet from './MembesProjet';
import Indication from './Indication';
// import { MdIncompleteCircle } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
// import ChartBar from '../charts/chartsGroup/ChartOfBarPersonnel.jsx';
import axios from "axios";
import { useParams } from 'react-router-dom';
import GroupCharts from "../charts/chartsGroup/ChartOfBarGroup.jsx";
function OverviewGroup() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [taches, setTaches] = useState([]);
    const [encadrement, setEncadrement] = useState(null);
    const [MembreGroup, setMembreGroup] = useState([]);
    const [chartDonnees,setChartDonnes] =useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/user/Overview/${id}`)
            .then(response => {
                setChartDonnes(response.data);
                setEncadrement(response.data.Encadrement || null);
                setMembreGroup(response.data.MembreGroup || []);
                setTaches(response.data.TacheGroup || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
                setLoading(false);
            });
    }, [id]);

    // Statistiques des tâches
    const nbrtasks = taches.length;
    const taskComplete = taches.filter(t => t.status === "Completed").length;
    const taskInProgress = taches.filter(t => t.status === "In_progress").length;
    const taskNotStarted = taches.filter(t => t.status === "To_do").length;

    const indications = [

        {
            icon: <GiProgression className="w-6 h-6 text-green-500" />,
            title: "Tâches totales",
            value: nbrtasks,
            progress: (nbrtasks/nbrtasks)*100 || 0,
            color: "bg-green-100"
        },
        {
            icon: <GoVerified className="w-6 h-6 text-purple-500" />,
            title: "Tâches complètes",
            value: taskComplete,
            progress: (taskComplete/nbrtasks)*100 || 0,
            color: "bg-purple-100"
        },
        {
            icon: <GoVerified className="w-6 h-6 text-yellow-500" />,
            title: "En progression",
            value: taskInProgress,
            progress: (taskInProgress/nbrtasks)*100 || 0,
            color: "bg-yellow-100"
        },
        {
            icon: <GoVerified className="w-6 h-6 text-red-500" />,
            title: "Non démarrées",
            value: taskNotStarted,
            progress: (taskNotStarted/nbrtasks)*100 || 0,
            color: "bg-red-100"
        }
    ];

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Aperçu du Groupe</h1>
                {encadrement && (
                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <GoVerified className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Encadrant</p>
                            <p className="font-medium">{encadrement.nom} {encadrement.prenom}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MembreGroup.map((mem, i) => (
                    <MembesProjet
                        key={i}
                        img={`https://robohash.org/${mem.id}.png?size=100x100`}
                        name={`${mem.firstName} ${mem.lastName}`}
                        email={mem.email}
                        role={mem.isAdmin}
                    />
                ))}
            </div>

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

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Progression des Tâches</h3>
                <div className="h-96">
                        <GroupCharts groupData={chartDonnees}/>

                </div>
            </div>
        </div>
    );
}

export default OverviewGroup;