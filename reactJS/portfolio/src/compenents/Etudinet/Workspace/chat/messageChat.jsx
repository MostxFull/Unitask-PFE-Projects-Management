import React from 'react';

function MessageChat(props) {
  return (
    <div className=''>
      <div className='flex'>
        <div className='w-10 h-10 bg-black rounded-full mr-2'>
          <img src='' alt='img' className='w-full h-full' />
        </div>
        <div className='flex flex-col w-full space-y-1'>
          <div className='flex space-x-3 items-center'>
            <span>{props.name}</span>
            <span className='text-xs'>{props.heure}</span>
          </div>
          <p className='text-xs border rounded-md rounded-tl-none w-1/2 p-1'>
            {props.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageChat;