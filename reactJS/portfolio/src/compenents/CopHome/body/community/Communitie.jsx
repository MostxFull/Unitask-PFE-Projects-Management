import React from 'react';
import ElmCom from './elmCom';

function Communitie() {
  const members = [
    { id: 1, name: 'Zakaria ', content: 'Développeuse passionnée de React.' },
    { id: 2, name: 'Mohemd', content: 'Étudiant en cybersécurité.' },
    { id: 3, name: 'ali', content: 'Enseignant en informatique.' },
    { id: 4, name: 'Youssef', content: 'Spécialiste en bases de données.' },
    { id: 5, name: 'mestafa', content: 'Passionnée par l’IA et le machine learning.' },
    { id: 6, name: 'abd ellah', content: 'Admin système et réseaux.' },
    { id: 7, name: 'moutawakil', content: 'Designer UX/UI.' },
    { id: 8, name: 'amine', content: 'Développeur backend en Node.js.' },
    { id: 9, name: 'zakaria', content: 'Développeuse full-stack.' }
  ];

  return (
    <div className="py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notre Communauté</h1>
        <p className="text-lg text-gray-600">Rejoignez une communauté d'étudiants et d'enseignants passionnés.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <ElmCom key={member.id} name={member.name} content={member.content} id={member.id} />
        ))}
      </div>
    </div>
  );
}

export default Communitie;
