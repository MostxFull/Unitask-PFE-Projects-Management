import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { LuSend } from "react-icons/lu";

function EnvoyerMess() {
  return (
    <div className="flex items-center w-full p-3 justify-center bg-yellow-200">
      <div className="flex items-center justify-between w-5/6 border bg-white rounded-full px-2">
        <input
          className="p-2 w-full outline-none"
          type="text"
          placeholder="Votre message"
        />
        <div className="flex items-center space-x-1">
          <FaPlus className="h-5 w-5 text-gray-600" />
          <MdInsertEmoticon className="h-5 w-5 text-gray-600" />
        </div>
      </div>
      <div className="flex items-center justify-center grow">
        <button className="border p-2 rounded-full bg-blue-600">
          <LuSend className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}

export default EnvoyerMess;
