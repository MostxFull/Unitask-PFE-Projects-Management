import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Ajout de la fonction de traitement des données
const processGroupData = (groupData) => {
    if (!groupData) return { groupStatus: [], memberStats: [] };

    // Traitement des statuts du groupe
    const groupStatusCounts = groupData.TacheGroup?.reduce((acc, tache) => {
        acc[tache.status] = (acc[tache.status] || 0) + 1;
        return acc;
    }, {});

    // Traitement des statistiques des membres
    const memberStats = groupData.MembreGroup?.map(membre => ({
        name: `${membre.firstName} ${membre.lastName}`,
        ...membre.tache?.reduce((acc, t) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            return acc;
        }, { To_do: 0, In_progress: 0, Completed: 0 })
    })) || [];

    return {
        groupStatus: Object.entries(groupStatusCounts || {}).map(([status, count]) => ({
            status,
            count
        })),
        memberStats
    };
};

const GroupCharts = ({ groupData }) => {
    const { groupStatus, memberStats } = processGroupData(groupData);

    return (
        <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Graphique des statuts du groupe */}
            <div>
                <h3>Répartition des tâches du groupe</h3>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={groupStatus}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="count"
                                name="Nombre de tâches"
                                fill="#8884d8"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Graphique des contributions des membres */}
            <div>
                <h3>Répartition des tâches par membre</h3>
                <div style={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={memberStats}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="To_do" stackId="a" fill="#ffc658" name="À faire" />
                            <Bar dataKey="In_progress" stackId="a" fill="#82ca9d" name="En cours" />
                            <Bar dataKey="Completed" stackId="a" fill="#8884d8" name="Terminé" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GroupCharts;

// Correction du nom du composant dans l'utilisation
