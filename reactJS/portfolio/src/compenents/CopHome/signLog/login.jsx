import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
    
    
        axios.post("https://mostxfull-unitask-pfe-projects-management.hf.space/user/login", 
            { "email": email, "password": password }, 
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
            console.log(response.data);
            setError("")
            // Ajoute ici la logique de redirection si nécessaire
           if(response.data.role=="Etudiant"){

                navigate(`/etudiant/${response.data.id}`, { replace: true });

           }else if(response.data.role=="Enseignant"){
                 navigate(`/ensignemnt/${response.data.id}`, { replace: true });
           }else{
               navigate(`/Admin/dashboard`, { replace: true });
           }

        })
        .catch((error) => {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            setError("Invalid email or password"); // Afficher une erreur à l'utilisateur
        });
    };

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
                    <p className='text-gray-500'>Please login to continue</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className='w-full px-4 py-3   border  rounded-lg  focus:outline-none  focus:ring-2   focus:ring-blue-500   focus:border-transparent transition duration-200  bg-gray-50'
                            autoComplete='off'
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className='w-full  px-4 py-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent transition  duration-200 bg-gray-50 '
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg'>
                            <p className='text-sm'>{error}</p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className='w-full py-3  px-4
                    bg-blue-600 text-white font-semibold rounded-lg  hover:bg-blue-700  transition  duration-200 focus:outline-none  focus:ring-2 focus:ring-blue-500  focus:ring-offset-2  '
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
