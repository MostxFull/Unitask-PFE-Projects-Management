import { Outlet, NavLink } from 'react-router-dom';
import React, { useState } from 'react';  // Correction : import useState depuis 'react'
import { FiChevronDown, FiChevronUp, FiActivity, FiUsers } from "react-icons/fi";

export default function Admin() {
    const [openSections, setOpenSections] = useState({
        dashboard: true,
        utilisateurs: true,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="bg-white w-64 border-r border-gray-200 p-4 flex-shrink-0">
                <h1 className='text-2xl p-2 font-bold bg-gradient-to-tr from-blue-400 to-purple-400 bg-clip-text text-transparent border-b border-b-1 border-gray-300'>UniTask</h1>

                <nav className="space-y-4 mt-4">
                    {/* Dashboard Section */}
                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-blue-100 transition-colors"
                            onClick={() => toggleSection("dashboard")}
                        >
                            <h1 className="text-lg font-semibold flex items-center gap-2">
                                <FiActivity className="text-blue-500" />
                                Dashboard
                            </h1>
                            {openSections.dashboard ? (
                                <FiChevronUp className="text-gray-500" />
                            ) : (
                                <FiChevronDown className="text-gray-500" />
                            )}
                        </div>
                        {openSections.dashboard && (
                            <div className="ml-6 space-y-2 mt-2">
                                <NavLink
                                    to="/Admin/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 text-gray-700'
                                        }`
                                    }
                                >
                                    <FiActivity className="text-lg" />
                                    Overview
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Utilisateurs Section */}
                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-blue-100 transition-colors"
                            onClick={() => toggleSection("utilisateurs")}
                        >
                            <h1 className="text-lg font-semibold flex items-center gap-2">
                                <FiUsers className="text-blue-500" /> {/* Icône plus appropriée */}
                                Utilisateurs
                            </h1>
                            {openSections.utilisateurs ? (
                                <FiChevronUp className="text-gray-500" />
                            ) : (
                                <FiChevronDown className="text-gray-500" />
                            )}
                        </div>
                        {openSections.utilisateurs && (
                            <div className="ml-6 space-y-2 mt-2">
                                <NavLink
                                    to="/Admin/etudiants"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 text-gray-700'
                                        }`
                                    }
                                >
                                    <FiUsers className="text-lg" />
                                    Etudiants
                                </NavLink>
                                <NavLink
                                    to="/Admin/enseignants"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 text-gray-700'
                                        }`
                                    }
                                >
                                    <FiUsers className="text-lg" />
                                    Enseignants
                                </NavLink>
                                <NavLink
                                    to="/Admin/groups"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                            isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 text-gray-700'
                                        }`
                                    }
                                >
                                    <FiUsers className="text-lg" />
                                    Groupes
                                </NavLink>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <div className="flex flex-col w-full">
                <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}