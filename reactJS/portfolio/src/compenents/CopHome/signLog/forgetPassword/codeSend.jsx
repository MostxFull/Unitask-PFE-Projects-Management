import React from 'react'
import { useNavigate } from 'react-router-dom'

function codeSend(props) {
  const navigate = useNavigate();
  function verification(){
    navigate(`/changePass`)

  }
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='p-10 flex flex-col items-center border w-1/2'>
            <h1 className='text-2xl font-bold'>Verify your email address</h1>
            <p>enter the verification that we send to<br/>
            <p className='text-center'>@email.com{props.email}</p>
            <p className='text-center'>your code</p>
            </p>
            <div className='flex justify-center space-x-5 my-4'>
                <input className="border w-10 h-10 px-3 rounded-md block " type="text" maxLength={1} minLength={1} />
                <input className="border w-10 h-10 px-3 rounded-md block " type="text" maxLength={1} minLength={1} />
                <input className="border w-10 h-10 px-3 rounded-md block " type="text" maxLength={1} minLength={1} />
                <input className="border w-10 h-10 px-3 rounded-md block " type="text" maxLength={1} minLength={1} />
                <input className="border w-10 h-10 px-3 rounded-md block " type="text" maxLength={1} minLength={1} />

            </div>
            <p className='text-center'>Please check your inbox for a verification link. If you don't receive it, click the resend link below.</p>
            <button className="border py-2 w-full my-5 px-4 rounded-md " onClick={verification}>Resert</button>
        </div>
    </div>
  )
}

export default codeSend