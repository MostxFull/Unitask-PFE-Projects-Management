
import {  Outlet, useNavigate } from "react-router-dom"

export default function emailPass(){
    const navigate =useNavigate();
    return(
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2 p-4 space-y-3 border border-black rounded-md">
                <h1 className="font-bold">Find Your Account</h1>
                <hr />
                <p>Enter your email address to reset your password.</p>
                <input className="border w-full py-3 px-3 rounded-md" type="email" placeholder="Enter your email address" />
                <hr />
                <div className=" space-x-2 flex justify-end">
                    <button className="border py-2 px-4 rounded-md" onClick={()=>navigate("/login")}>Cancel</button>
                    <button className="border py-2 px-4 rounded-md bg-blue-500" onClick={() => navigate("/codeSend" )}>Send </button>
                </div>
            </div>
            
        </div>

    )
}