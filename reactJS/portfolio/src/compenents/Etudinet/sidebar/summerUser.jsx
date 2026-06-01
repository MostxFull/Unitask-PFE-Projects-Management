import  { useState,useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import {useParams} from "react-router-dom";
import axios from "axios";
function SummerUser() {
  const {id} = useParams()
  const [isOpen, setIsOpen] = useState(false);
  const [dataUser, setDataUser]=useState({
    username:"",
    email:"",

  })
  useEffect(()=>{
    axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/${id}`)
        .then((response)=>{
          setDataUser({
            username: response.data.firstName +" "+response.data.lastName,
            email: response.data.email,
          })

        })


  },[id])


  return (
    <div className='relative flex items-center'>
      <div 
        className='flex justify-between border border-1 rounded-md p-2 cursor-pointer' 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center space-x-2'>
          <div className='w-12 h-12 border border-1 border-gray-100 bg-white rounded-full text-white flex items-center justify-center '>
            <img
            src={`https://robohash.org/${id}.png?size=100x100`}
            alt="userProfil"
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-xs font-bold'>{dataUser.username.toUpperCase()}</h1>
            <p className='mt-1 text-xs text-gray-600'>{dataUser.email}</p>
          </div>
        </div>

        <div className='flex flex-col -space-y-1 justify-center items-center'>
          {isOpen ? <FiChevronUp className='text-sm' /> : <FiChevronDown className='text-sm' />}
        </div>
      </div>
      
      {isOpen && (
        <div className='absolute z-50 right-0 p-4 border border-black border-1 bottom-20 w-32 bg-gray-200 shadow-md border rounded-md overflow-hidden'>
          <NavLink to='/Settings/Profil' className='block px-4 py-2 text-black text-sm hover:bg-gray-100'>Profil</NavLink>
          <NavLink to='/logout' className='block px-4 py-2 text-black  text-sm hover:bg-gray-100'>Log out</NavLink>
        </div>
      )}
    </div>
  );
}

export default SummerUser;


{/* <div className='absolute z-50 right-0 p-4 border border-black border-1 bottom-20 w-32 bg-gray-200 shadow-md border rounded-md overflow-hidden'>
          <NavLink to='/Settings/Profil' className='block px-4 py-2 text-black text-sm hover:bg-gray-100'>Profil</NavLink>
          <NavLink to='/logout' className='block px-4 py-2 text-black  text-sm hover:bg-gray-100'>Log out</NavLink>
        </div> */}