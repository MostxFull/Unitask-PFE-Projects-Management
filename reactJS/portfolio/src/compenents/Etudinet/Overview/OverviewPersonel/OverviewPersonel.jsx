import React, { useEffect, useState } from "react";
import Indication from "../OverviewGroup/Indication";
import { MdIncompleteCircle, MdOutlineTask } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import OverviewProfil from "./OverviewProfil";
// import ProgressTimelineChart from "../charts/chartsGroup/ChartOfArea";
import { useParams } from "react-router-dom";
import axios from "axios";
import RadialBarChart from "../charts/chartsPrsonnel/RadialBarChart";
import ChartOfBar from "../charts/chartsGroup/ChartOfBarPersonnel.jsx";

function OverviewPersonel() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/${id}`)
            .then(res => setUserData(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, [id]);

    if (!userData) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    const { firstName, lastName, email, tache, classe } = userData;
    const totalTasks = tache.length;

    const taskStats = {
        total: totalTasks,
        completed: tache.filter(t => t.status === "Completed").length,
        inProgress: tache.filter(t => t.status === "In_progress").length,
        notStarted: tache.filter(t => t.status === "To_do").length
    };

    const indications = [
        {
            icon: <MdOutlineTask className="w-6 h-6 text-blue-500" />,
            title: "Tâches totales",
            value: taskStats.total,
            progress: 100,
            color: "bg-blue-100"
        },
        {
            icon: <GiProgression className="w-6 h-6 text-yellow-500" />,
            title: "En progression",
            value: taskStats.inProgress,
            progress: (taskStats.inProgress / totalTasks) * 100 || 0,
            color: "bg-yellow-100"
        },
        {
            icon: <GoVerified className="w-6 h-6 text-green-500" />,
            title: "Tâches complètes",
            value: taskStats.completed,
            progress: (taskStats.completed / totalTasks) * 100 || 0,
            color: "bg-green-100"
        },
        {
            icon: <MdIncompleteCircle className="w-6 h-6 text-red-500" />,
            title: "Non démarrées",
            value: taskStats.notStarted,
            progress: (taskStats.notStarted / totalTasks) * 100 || 0,
            color: "bg-red-100"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OverviewProfil
                    name={firstName || "-"}
                    prenom={lastName || "-"}
                    email={email}
                    classe={classe}
                />

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Task Distribution</h3>
                    <div className="h-80">
                        <RadialBarChart tasks={tache} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                {/*<h3 className="text-xl font-semibold mb-4">Progress Timeline</h3>*/}
                <div className="mt-4" >
                    {/*<Chart />*/}
                    {/*<ProgressTimelineChart userData={userData} />*/}
                    <ChartOfBar userData={userData}/>

                </div>
            </div>
        </div>
    );
}

export default OverviewPersonel;