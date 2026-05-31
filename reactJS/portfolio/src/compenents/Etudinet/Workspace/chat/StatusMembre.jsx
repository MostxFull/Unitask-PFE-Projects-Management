import React from 'react';

function StatusMembre(props) {
  return (
    <div className='flex justify-between border border-black rounded-md p-2'>
      <div className='flex items-center'>
        <div className='w-10 h-10 bg-white border border-black rounded-full mr-1 relative'>
          <span
            className={`w-3 h-3 border-2 border-white p-1 rounded-full absolute bottom-0 right-1 ${
              props.status === "true" ? "bg-green-600" : "bg-red-500"
            }`}
          ></span>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-sm font-medium'>{props.name}</h1>
          <p className='-mt-1 text-xs'>{props.email}</p>
        </div>
      </div>
    </div>
  );
}

export default StatusMembre;