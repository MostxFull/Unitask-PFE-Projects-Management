import React, { useState, useEffect, useRef } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";

function BarChat({ name, member, online }) {
  return (
    <div className="w-full p-3 flex justify-between bg-white shadow-md rounded-lg">
      <div className="flex items-center">
        <img src="https://robohash.org/1.png?size=100x100" alt="avatar" className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <div className="flex space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <HiOutlineUserGroup className="h-4 w-4 mr-1" />
              <p>{member} Members</p>
            </div>
            <p className="flex items-center">
              <span className="bg-green-400 h-3 w-3 border-2 border-white rounded-full block mr-1"></span>
              {online} Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusMembre({ id, name, email, status }) {
  return (
    <div className="flex justify-between items-center border p-3 rounded-lg bg-white shadow">
      <div className="flex items-center">
        <img src={`https://robohash.org/${id}.png?size=100x100`} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h1 className="text-sm font-medium">{name}</h1>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <span className={`w-3 h-3 border-2 border-white rounded-full ${status ? "bg-green-500" : "bg-red-500"}`}></span>
    </div>
  );
}

function MessageChat({ id, name, message, heure }) {
  return (
    <div className="flex items-start space-x-3">
      <img src={`https://robohash.org/${id}.png?size=100x100`} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="bg-blue-100 p-3 rounded-lg max-w-xs shadow-md">
        <p className="text-sm font-semibold text-blue-700">{name}</p>
        <p className="text-sm text-gray-800">{message}</p>
        <p className="text-xs text-right text-gray-500">{heure}</p>
      </div>
    </div>
  );
}

function EnvoyerMess({ sendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center w-full p-3 bg-gray-100 shadow-md rounded-t-lg">
      <div className="flex items-center justify-between w-5/6 border bg-white rounded-full px-3 shadow-sm">
        <input
          className="p-2 w-full outline-none text-gray-700"
          type="text"
          placeholder="Votre message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center space-x-2 text-gray-600">
          <FaPlus className="h-5 w-5" />
          <MdInsertEmoticon className="h-5 w-5" />
        </div>
      </div>
      <button onClick={handleSend} className="ml-3 p-2 bg-blue-600 rounded-full shadow-md">
        <LuSend className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, name: "Zakaria", message: "Hello", heure: "13:01" },
    { id: 2, name: "Mariam", message: "Hi", heure: "13:02" },
  ]);
  const messagesEndRef = useRef(null);
   const {id} =useParams()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const newMessage = {
      id: 0,
      name: "You",
      message: text,
      heure: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full bg-gray-100 p-5">
      <div className="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
        <h1 className="font-bold text-gray-700 mb-3">Status de Membre</h1>
        <div className="space-y-3">
          {[
            { id: 1, name: "Zakaria", email: "zakaria@gmail.com", status: true },
            { id: 2, name: "Mariam", email: "mariam@gmail.com", status: true },
            { id: 3, name: "Hajar", email: "hajar@gmail.com", status: false },
          ].map((user) => (
            <StatusMembre key={user.id} {...user} />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-grow border bg-white shadow-md rounded-lg mx-4">
        <BarChat name="Group Name" member={12} online={8} />
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
          {messages.map((msg, index) => (
            <MessageChat key={index} {...msg} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <EnvoyerMess sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;