import React from 'react';
import { HiOutlineUserGroup } from "react-icons/hi2";

function BarChat(props) {
  return (
    <div className='w-full'>
      <div className='flex justify-between p-2'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-white border border-black rounded-full mr-1 relative'></div>
          <div className='flex flex-col space-y-1'>
            <h1 className='text-sm font-medium'>{props.name}</h1>
            <div className='flex items-center space-x-5'>
              <div className='flex items-center'>
                <HiOutlineUserGroup className='h-3 w-3 mr-1' />
                <p className='-mt-1 text-xs'>{props.member + " Member"}</p>
              </div>
              <p className='-mt-1 text-xs flex items-center'>
                <span className='bg-green-300 h-2 w-2 border-2 border-white rounded-full block mr-1'></span>
                {props.online + " Online"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChat;