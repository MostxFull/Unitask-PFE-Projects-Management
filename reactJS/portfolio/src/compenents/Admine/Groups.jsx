import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from "../ui/button.jsx";
export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/getAllEnsieg');
                // Extraire tous les groupes de tous les enseignants
                const allGroups = response.data.flatMap(enseignant => enseignant.groups);
                // Éliminer les doublons par ID de groupe
                const uniqueGroups = Array.from(new Map(allGroups.map(g => [g.id, g])).values());
                setGroups(uniqueGroups);
            } catch (error) {
                console.error('Erreur API:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    const handleDelete = async (groupId) => {
        try {
            await axios.delete(`http://localhost:8080/group/delete/${groupId}`);
            setGroups(prev => prev.filter(g => g.id !== groupId));
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };

    const getLastActivity = (taches) => {
        if (!taches || taches.length === 0) return 'Aucune activité';
        const dates = taches.map(t => new Date(t.dateFin));
        const lastDate = new Date(Math.max(...dates));
        return lastDate.toLocaleDateString();
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="flex-1 p-6 bg-gray-50 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between mb-8">
                        <input
                            type="text"
                            placeholder="Rechercher un groupe..."
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl w-1/3 shadow-sm focus:outline-none focus:border-blue-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        {groups
                            .filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(group => (
                                        <div
                                            key={group.id}
                                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                                        >
                                            {/* Header Section */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                                        {group.name}
                                                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      ID: {group.id}
                    </span>
                                                    </h3>
                                                </div>
                                                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Actif
                </span>
                                            </div>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-3 gap-6 mb-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                                        </svg>
                                                        <span className="font-medium">Tâches</span>
                                                    </div>
                                                    <div className="flex gap-3">
    <span className="text-1xl font-bold text-blue-600">
        {group.taches.length} Tâches
    </span>
    {/*                                                    <span className="text-1xl font-bold text-gray-600">*/}
    {/*    | {group.members.length} Membres*/}
    {/*</span>*/}
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                        </svg>
                                                        <span className="font-medium">Membres</span>
                                                    </div>
                                                    <div className="text-gray-800 font-medium">
                                                        {group.members.length} membres •                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                        </svg>
                                                        <span className="font-medium">Responsable</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            {group.members.find(m => m.isAdmin === "Oui")?.firstName[0]}
                                                        </div>
                                                        <span className="font-medium text-gray-800">
                      {group.members.find(m => m.isAdmin === "Oui")?.firstName + " " + group.members.find(m => m.isAdmin === "Oui")?.lastName || 'Non défini'}
                    </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Section */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                            </svg>
                                                            <span>
                        {group.members.length} membres •
                                                                {group.members.slice(0, 3).map(m => m.firstName).join(', ')}
                                                                {group.members.length > 3 && ` +${group.members.length - 3}`}
                      </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                            </svg>
                                                            <span>{group.members[0]?.classe || 'Département non spécifié'}</span>
                                                        </div>
                                                    </div>
                                                    {/*<Button*/}
                                                    {/*    variant="destructive"*/}
                                                    {/*    className="px-5 py-2 rounded-lg"*/}
                                                    {/*    onClick={() => handleDelete(group.id)}*/}
                                                    {/*>*/}
                                                    {/*    Supprimer le groupe*/}
                                                    {/*</Button>*/}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}