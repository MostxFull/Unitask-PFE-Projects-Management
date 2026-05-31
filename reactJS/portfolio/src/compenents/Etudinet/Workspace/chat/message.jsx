import React from 'react';
import BarChat from './BarChat';
import MessageChat from './MessageChat';
import EnvoyerMess from './EnvoyerMess';

function Message() {
  const messages = [
    { name: "Zakaria", message: "Hello", heure: "13:01" },
    { name: "Mariam", message: "Hi", heure: "13:02" },
    { name: "Hajar", message: "How are you?", heure: "13:03" },
    { name: "Ali", message: "I'm fine", heure: "13:04" },
    { name: "Mohamed", message: "How about you?", heure: "13:05" },
    { name: "Sara", message: "Good, thanks", heure: "13:06" },
  ];

  return (
    <div className='p-2'>
      <div className='p-3 border border-black rounded-lg'>
        {/* Bar de chat */}
        <BarChat name='GroupName' member={12} online={8} />
        {/* Messages */}
        <div className='h-3/4'>
          <div className='p-4 border border-gray-200 border-b-0 rounded-2xl rounded-b-none overflow-y-auto h-full space-y-3'>
            {messages.map((mess, index) => (
              <MessageChat
                key={index}
                name={mess.name}
                message={mess.message}
                heure={mess.heure}
              />
            ))}
          </div>
        </div>
        {/* Envoyer message */}
        <EnvoyerMess />
      </div>
    </div>
  );
}

export default Message;