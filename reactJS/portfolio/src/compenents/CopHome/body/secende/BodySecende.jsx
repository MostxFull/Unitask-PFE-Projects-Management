import React from 'react'

function BodySeconde() {
    return (
        <div className='space-y-12 py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50'>
            {/* En-tête */}
            <div className='text-center space-y-4 mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    Transformez la Collaboration Académique
                </h1>
                <p className='text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed'>
                    Une plateforme unifiée pour simplifier la gestion de projets, améliorer la communication étudiant-enseignant et booster la productivité académique.
                </p>
            </div>

            {/* Grille améliorée */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {[
                    {id: 1, title: "Gestion Centralisée", desc: "Espace collaboratif unique pour tous les projets et ressources pédagogiques"},
                    {id: 2, title: "Communication Intelligente", desc: "Messagerie intégrée et système de notifications en temps réel"},
                    {id: 3, title: "Suivi des Performances", desc: "Tableaux de bord analytiques pour évaluer la progression"},
                    {id: 4, title: "Workflow Automatisé", desc: "Assignation de tâches et échéanciers interactifs"}
                ].map((item) => (
                    <div
                        key={item.id}
                        className={`group p-8 rounded-xl transition-all duration-300 
              ${item.id === 1 ? 'md:col-span-2 bg-blue-50 hover:bg-blue-100' :
                            item.id === 4 ? 'md:col-span-2 bg-purple-50 hover:bg-purple-100' :
                                'bg-gray-50 hover:bg-gray-100'} 
              hover:-translate-y-3 shadow-sm hover:shadow-lg border border-gray-100`}
                    >
                        <div className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center 
                                                  ${item.id === 1 ? 'bg-blue-600' :
                                    item.id === 4 ? 'bg-purple-600' :
                                        'bg-gray-600'}`}
                                >
                                    <span className='text-white font-bold text-xl'>{item.id}</span>
                                </div>
                                <h2 className='text-2xl font-bold text-gray-800'>{item.title}</h2>
                            </div>
                            <p className='text-gray-600 leading-relaxed'>
                                {item.desc}
                            </p>
                            <div className={`w-fit flex items-center gap-2 text-sm font-semibold 
                ${item.id === 1 ? 'text-blue-600' :
                                item.id === 4 ? 'text-purple-600' :
                                    'text-gray-600'} 
                 group-hover:gap-3 transition-all`}>
                                Découvrir
                                <span className='text-lg'>&rarr;</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BodySeconde;