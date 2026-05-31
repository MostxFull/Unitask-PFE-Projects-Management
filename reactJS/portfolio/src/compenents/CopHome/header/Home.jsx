import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hello() {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen  overflow-hidden">


            <div className="relative z-10 space-y-8 px-4 text-center">
                {/* Titre avec animation */}
                <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up'>
                    Bienvenue sur UniTask
                </h1>

                {/* Description avec puces animées */}
                <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up delay-100">
                    <p className='text-xl md:text-2xl text-gray-600 leading-relaxed'>
                        UniTask révolutionne la collaboration académique avec
                    </p>
                    <ul className="grid grid-cols-2 gap-4 text-left">
                        {[
                            'Gestion de projets centralisée',
                            'Communication étudiant-enseignant',
                            'Suivi en temps réel des progrès',
                            'Partage de ressources sécurisé'
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bouton amélioré */}
                <button
                    className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white
          rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up delay-100"
                    onClick={() => navigate("/Login")}
                >
                    <span className="text-lg font-semibold">Commencer maintenant</span>
                    <svg
                        className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}