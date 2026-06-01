import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from "../ui/button.jsx";
import Signin from "../CopHome/signLog/Signin/signin.jsx";

export default function Ensiegnments() {
    const [enseignants, setEnseignants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEditEnseignant, setCurrentEditEnseignant] = useState(null);

    const [newEnseignant, setNewEnseignant] = useState({
        firstName: '',
        lastName: '',
        email: '',
        departement: '',
        groups: ''
    });

    // Modification de la fonction handleEditClick
    const handleEditClick = (ens) => {
        setCurrentEditEnseignant(ens);
        setShowEditModal(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEditEnseignant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Nouvelle version de handleUpdate
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                firstName: currentEditEnseignant.firstName,
                lastName: currentEditEnseignant.lastName,
                email: currentEditEnseignant.email,
                departement: currentEditEnseignant.departement
            };

            const response = await axios.put(
                `https://mostxfull-unitask-pfe-projects-management.hf.space/user/updateEnsg/${currentEditEnseignant.id}`,
                updatedData
            );

            setEnseignants(prev =>
                prev.map(ens =>
                    ens.id === currentEditEnseignant.id ? response.data : ens
                )
            );
            setShowEditModal(false);
        } catch (error) {
            console.error('Erreur modification:', error);
        }finally {
            window.location.reload();
        }
    };


    // Récupération des enseignants
    useEffect(() => {
        const fetchEnseignants = async () => {
            try {
                const response = await axios.get('https://mostxfull-unitask-pfe-projects-management.hf.space/user/getAllEnsieg');
                setEnseignants(response.data);
            } catch (error) {
                console.error('Erreur API:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnseignants();
    }, []);

    // Suppression d'un enseignant
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/deleteUser/${id}`);
            setEnseignants(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };



    // Ajout d'un nouvel enseignant
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mostxfull-unitask-pfe-projects-management.hf.space/user/addEnseignant', newEnseignant);
            setEnseignants([...enseignants, response.data]);
            setNewEnseignant({
                firstName: '',
                lastName: '',
                email: '',
                departement: '',
                groups: ''
            });
        } catch (error) {
            console.error('Erreur ajout:', error);
        }finally {
            window.location.reload();
        }
    };
    const handleAddSuccess = (newEtudiant) => {
        setEnseignants(prev => [...prev, newEtudiant]);
        setShowAddModal(false);
    };

    if (loading) return <div className="p-6">Chargement...</div>;

    return (
        <div className="flex h-screen w-full bg-gray-50">
            <div className="flex-1 p-4 sm:p-6 overflow-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Ajouter
                    </Button>
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Enseignants</h2>
                    </div>

                    <div className="px-4">
                        {/* En-têtes */}
                        <div className="py-3 grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b border-gray-200">
                            <span>Nom</span>
                            <span>Email</span>
                            <span>Département</span>
                            <span>Groupes</span>
                            <span>Actions</span>
                        </div>

                        {/* Lignes */}
                        <div className="divide-y divide-gray-100">
                            {enseignants
                                .filter(ens =>
                                    `${ens.firstName} ${ens.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map(ens => (
                                    <div key={ens.id} className="py-3 grid grid-cols-5 gap-4 items-center hover:bg-gray-50">
                                        <span className="text-gray-900">{ens.firstName} {ens.lastName}</span>
                                        <span className="text-gray-600 text-sm">{ens.email}</span>
                                        <span className="text-gray-600">{ens.departement}</span>
                                        <span className="text-gray-500 text-sm">
                  {ens.groups?.map(g => g.name).join(', ') || '-'}
                </span>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleEditClick(ens)}
                                                className="text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100"
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(ens.id)}
                                                className="text-red-600 hover:text-red-800 px-3 py-1.5 rounded-md bg-red-50 hover:bg-red-100"
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
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowAddModal(false)}
                            >
                                ✕
                            </button>
                            <Signin onSuccess={handleAddSuccess} />
                        </div>
                    </div>
                )}

                {showEditModal && currentEditEnseignant && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowEditModal(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Modifier</h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={currentEditEnseignant.firstName || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={currentEditEnseignant.lastName || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentEditEnseignant.email || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Département</label>
                                    <input
                                        type="text"
                                        name="departement"
                                        value={currentEditEnseignant.departement || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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