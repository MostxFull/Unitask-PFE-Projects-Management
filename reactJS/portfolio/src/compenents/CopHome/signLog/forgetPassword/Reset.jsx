import React from 'react'
import { useNavigate } from 'react-router-dom'

function Reset() {
  const navigate = useNavigate();
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='border p-9 space-y-4 rounded-lg ' >
            <h1 className='text-center font-bold text-3xl'>Reset Password</h1>
            <p className='text-center'>Please enter your new password and confirm it</p>

            <div className='flex flex-col space-y-4'>
                <input className="border py-3 px-4 rounded-md" type="password" placeholder='Entrer new password'/>
                <input  className="border py-3 px-4 rounded-md" type="password" placeholder='confirme your password' />
            </div>
            <button className='w-full bg-slate-100 text-center border py-3 px-4 rounded-md' onClick={()=> navigate('/login')}>change Password</button>
        </div>
    </div>
  )
}

export default Reset