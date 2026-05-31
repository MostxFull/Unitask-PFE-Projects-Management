// MembesProjet.jsx
import React from 'react';
import { IoMdMore } from "react-icons/io";
import { FiMail } from "react-icons/fi";

function MembesProjet({ img, name, role, email }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="font-semibold text-gray-800">{name}</h1>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiMail className="w-4 h-4" />
                        <span>{email}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {role =="Oui" && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
            Admin
          </span>
                )}
                <IoMdMore className="text-xl text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
        </div>
    );
}

export default MembesProjet;