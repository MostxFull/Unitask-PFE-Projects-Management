import React from 'react';
import {NavLink} from "react-router-dom";

function ElmCom({ id, name, content }) {
  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-30 to-purple-30 p-6 space-y-4 bg-white shadow-md rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-100">
      {/* Avatar généré dynamiquement */}
      <div className="flex space-x-4 items-center">
        <img
          src={`https://robohash.org/${id}.png?size=50x50`}
          alt="avatar"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">@{name.toLowerCase()}</p>
        </div>
      </div>

      {/* Contenu */}
      <p className="text-gray-700">{content}</p>

      {/* Bouton Voir Plus */}
      {/*<NavLink to="" className="px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition">*/}
      {/*  Voir plus*/}
      {/*</NavLink>*/}
    </div>
  );
}

export default ElmCom;
