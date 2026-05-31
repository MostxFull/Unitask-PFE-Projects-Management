import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddTasks() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTask, setNewTask] = useState({
        titre: "",
        description: "",
        dateFin: "",
        Status: "To_do",
        Idassigne: ""
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/group/groupUser/${id}`);
                setMembers(response.data.members || []);
            } catch (err) {
                setError('Erreur de chargement des membres');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [id]);

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.titre.trim()) return alert("Le titre est obligatoire !");
        if (!newTask.Idassigne) return alert("Veuillez sélectionner un membre assigné.");

        try {
            await axios.post('http://localhost:8080/tache/add', {
                Idresponsable: id,
                ...newTask
            });

            alert('Tâche créée avec succès !');
            setNewTask({
                titre: "",
                description: "",
                dateFin: "",
                Status: "To_do",
                Idassigne: ""
            });
        } catch (err) {
            console.error("Erreur:", err.response?.data || err.message);
            alert("Erreur lors de la création de la tâche");
        }finally {
            window.location.reload();

        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">
            {error}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Ajouter une nouvelle tâche
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Titre *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="titre"
                            value={newTask.titre}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nom de la tâche"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Assigné à *
                        </label>
                        <div className="relative">
                            <select
                                name="Idassigne"
                                value={newTask.Idassigne}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-select-arrow bg-no-repeat bg-right-4"
                                required
                            >
                                <option value="">Sélectionner un membre</option>
                                {members.map(member => (
                                    <option
                                        key={member.id}
                                        value={member.id}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="inline-block w-6 h-6 rounded-full bg-gray-100"></span>
                                        {member.firstName || member.lastName
                                            ? `${member.firstName || ''} ${member.lastName || ''}`
                                            : member.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Date limite
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="dateFin"
                                value={newTask.dateFin}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Statut
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { value: "To_do", label: "À faire", color: "bg-red-100 text-red-800" },
                            { value: "In_progress", label: "En cours", color: "bg-yellow-100 text-yellow-800" },
                            { value: "Completed", label: "Terminé", color: "bg-green-100 text-green-800" }
                        ].map((status) => (
                            <label
                                key={status.value}
                                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors ${
                                    newTask.Status === status.value
                                        ? `${status.color} ring-2 ring-current`
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="Status"
                                    value={status.value}
                                    checked={newTask.Status === status.value}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium">{status.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                        placeholder="Décrivez la tâche..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Créer la tâche
                </button>
            </form>
        </div>
    );
}

export default AddTasks;