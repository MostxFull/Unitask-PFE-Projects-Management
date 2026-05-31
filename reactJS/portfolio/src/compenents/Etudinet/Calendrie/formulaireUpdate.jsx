import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from "axios";
import {useParams} from "react-router-dom";

function FormulaireUpdate({ event, onDelete, onClose, onUpdate }) {
  const [isEns,setIsEns]=useState(false);

  const [localEvent, setLocalEvent] = useState({
    ...event,
    start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
    end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    description: event.description // Correction du nom du champ
  });
  const [roleUser, setRole] = useState(true);
  const {id} =useParams();

  const checkAdminRole = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/user/isAdmin/${id}`);
      setRole(res.data.isAdmin);
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
    try {
      const resp = await axios.get(`http://localhost:8080/user/role/${id}`);
      const bool  = resp.data.role=="Enseignant"?true:false;
      setIsEns(bool);
    }catch (error) {
      console.error("Error checking admin role:", error);
    }
  };
  useEffect(() => {
    checkAdminRole();
  }, [id]);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalEvent(prev => ({ ...prev, [name]: value }));
  };

  const HandleColorChange = (e) => {
    setLocalEvent(prev => ({ ...prev, color: e.target.value }));
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    onUpdate({
      ...localEvent,
      id: event.id,
      start: new Date(localEvent.start),
      end: new Date(localEvent.end)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className='bg-white p-8 rounded-lg w-full max-w-2xl'>
        <h1 className='text-2xl font-bold mb-4'>Modifier l'événement</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Titre</label>
            <input
              className="p-2 border rounded-md"
              type="text"
              name="title"
              value={localEvent.title}
              onChange={HandleInputChange}
              required
              readOnly={!roleUser && true}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Description</label>
            <textarea
                name="description"
                value={localEvent.description}
                rows="3"
                onChange={HandleInputChange}
                className="p-2 border rounded-md"
                readOnly={!roleUser && true}
    />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Début</label>
              <input
                className="p-2 border rounded-md"
                type="datetime-local"
                name="start"
                value={localEvent.start}
                onChange={HandleInputChange}
                required

                  readOnly={!roleUser && true}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Fin</label>
              <input
                className="p-2 border rounded-md"
                type="datetime-local"
                name="end"
                value={localEvent.end}
                onChange={HandleInputChange}
                required
                readOnly={!roleUser && true}
              />
            </div>
          </div>

          {/*<div className="flex flex-col">*/}
          {/*  <label className="mb-1 font-medium">Couleur</label>*/}
          {/*  <input*/}
          {/*    className="w-20 h-10 cursor-pointer"*/}
          {/*    type="color"*/}
          {/*    name="color"*/}
          {/*    value={localEvent.color || '#3174ad'}*/}
          {/*    onChange={HandleColorChange}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              onClick={handleClose}
            >
              Annuler
            </button>
            {(roleUser || isEns)&&(
                <div className="flex space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Supprimer
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Mettre à jour
            </button>
                </div>
              )}

          </div>
        </form>
      </div>
    </div>
  );
}

export default FormulaireUpdate;