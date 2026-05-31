 import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "../ui/button.jsx";
import Signin from "../CopHome/signLog/Signin/signin.jsx";

export default function Etudinets() {
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEditEtudiant, setCurrentEditEtudiant] = useState(null);
    const handleEditClick = (etud) => {
        setCurrentEditEtudiant(etud);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/user/updateEtu/${currentEditEtudiant.id}`,
                currentEditEtudiant
            );

            setEtudiants(prev => prev.map(etud =>
                etud.id === currentEditEtudiant.id ? response.data : etud
            ));
            setShowEditModal(false);
        } catch (error) {
            console.error('Erreur modification:', error);
        }finally {
            window.location.reload();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEditEtudiant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/getAllEtudiants');
                setEtudiants(response.data);
            } catch (error) {
                console.error('Erreur API:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/user/deleteUser/${id}`);
            setEtudiants(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };

    const handleAddSuccess = (newEtudiant) => {
        setEtudiants(prev => [...prev, newEtudiant]);
        setShowAddModal(false);
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="flex h-screen w-full bg-gray-50">
            <div className="flex-1 p-4 sm:p-6 overflow-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher un étudiant..."
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-md transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        Ajouter
                    </Button>
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-4 ">
                        <h2 className="text-lg font-semibold text-gray-800">Étudiants actifs</h2>
                    </div>

                    <div className="px-4">
                        {/* En-têtes */}
                        <div className="py-3 grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b border-gray-200">
                            <span>Nom</span>
                            <span>Email</span>
                            <span>Classe</span>
                            <span>Admin</span>
                            <span >Actions</span>
                        </div>

                        {/* Lignes */}
                        <div className="divide-y divide-gray-100">
                            {etudiants
                                .filter(etud => `${etud.firstName} ${etud.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(etud => (
                                    <div key={etud.id} className="py-3 grid grid-cols-5 gap-4 items-center hover:bg-gray-50/50">
                                        <span className="font-medium text-gray-900">{etud.firstName} {etud.lastName}</span>
                                        <span className="text-gray-600 text-sm truncate">{etud.email}</span>
                                        <span className="text-gray-600">{etud.classe}</span>
                                        {/*${etud.isAdmin === 'Oui' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}*/}
                                        <span className={`text-sm text px-2 py-1 rounded-full `}>
                  {etud.isAdmin}
                </span>
                                        <div className="flex gap-2 flex-center items-center">
                                            <Button
                                                onClick={() => handleEditClick(etud)}
                                                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-sm"
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(etud.id)}
                                                className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md text-sm"
                                            >
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Modales */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full"
                                onClick={() => setShowAddModal(false)}
                            >
                                ✕
                            </button>
                            <Signin onSuccess={handleAddSuccess} />
                        </div>
                    </div>
                )}

                {showEditModal && currentEditEtudiant && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full"
                                onClick={() => setShowEditModal(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Modifier étudiant</h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={currentEditEtudiant.firstName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={currentEditEtudiant.lastName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentEditEtudiant.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                                    <input
                                        type="text"
                                        name="classe"
                                        value={currentEditEtudiant.classe}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="text-gray-700 hover:bg-gray-100 border border-gray-300 px-4 py-2"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                                    >
                                        Enregistrer
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}