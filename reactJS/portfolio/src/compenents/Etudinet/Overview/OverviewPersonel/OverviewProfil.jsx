import React from 'react';
import { useParams } from "react-router-dom";

function OverviewProfil({ name, prenom, email, classe }) {
    const { id } = useParams();

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                        <img
                            src={`https://robohash.org/${id}.png?size=200x200`}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* User Info Section */}
                <div className="text-center md:text-left space-y-4">
                    {/* Name and Class */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {prenom} {name}
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">{classe}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid gap-3">
                        <div className="flex-col items-center gap-3">
                            <span className="text-sm text-gray-600 min-w-[70px]">Email</span>
                            <span className=" block font-medium break-all text-gray-800">{email}</span>
                        </div>
                        <div className="flex-col items-center gap-3">
                            <span className="block text-sm text-gray-600 min-w-[70px]">Classe</span>
                            <span className="block-inline font-medium text-gray-800">{classe}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewProfil;