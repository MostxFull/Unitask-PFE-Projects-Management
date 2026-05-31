import React from 'react'
import { FiChevronRight } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';


function topBar() {
    const location = useLocation();
     const chemin = location.pathname.split('/')  // affiche le nom de la page actuelle dans la barre de titre
    console.log(chemin)  // affiche le chemin actuel dans la console
  return (
    <div className='flex bg-gradient-to-b from-blue-50 to-purple-50 text-gray-800 justify-between h-12 p-8 border-b border-b-gray-200'>
        <div className='flex items-center'>
            <h1>{chemin[1]}</h1>
            <FiChevronRight className='h-3 h-3' />
            <h1 className='font-semibold'>{chemin[3]} </h1>
            {chemin[5] && <FiChevronRight className='h-3 h-3' /> }
             <h1 className='font-semibold'>{chemin[5]} </h1>


        </div>

    </div>
  )
}

export default topBar