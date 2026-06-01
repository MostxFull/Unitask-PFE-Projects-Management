import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormulaireAdd({ onClose, onAdd }) {
  const [event, setEvent] = useState({
    title: '',
    desc: '',
    start: '',
    end: '',
    color: '#007bff',
    group: '',
    id: Math.random() * 100000,
  });

  const [group, setGroup] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/${id}`)
      .then((response) => {
        if (response.data.groups && response.data.groups.length > 0) {
          setGroup(response.data.groups);
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
        }
      })
      .catch(error => console.error("Erreur lors de la récupération des données :", error));
  }, [id]);

  const handleClose = () => {
    onClose();
  };

  const handleAddEvent = async () => {
    try {
      await axios.post(`https://mostxfull-unitask-pfe-projects-management.hf.space/Meeting/saveMeeting/${id}`, {
        title: event.title,
        description: event.desc,
        debutDate: new Date(event.start).toISOString().replace("Z", ""),
        finDate: new Date(event.end).toISOString().replace("Z", ""),
        groupId: isTeacher ? event.group : null,
      });

      onAdd(event);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'événement :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: new Date(value).toISOString().slice(0, 19), // Format LocalDateTime
    }));
  };

  const handleColorChange = (e) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      color: e.target.value,
    }));
  };

  return (
    <div className="border bg-gray-100 p-9 rounded-lg space-y-6 w-1/2">
      <h2 className="text-center font-bold text-2xl">Formulaire d'ajout</h2>
      
      <div className="flex flex-col">
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" value={event.title} onChange={handleChange} className='p-2 border rounded-md' required />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea name="desc" id="description" value={event.desc} onChange={handleChange} className='p-2 border rounded-md resize-none'></textarea>
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="start">Date de début</label>
        <input type="datetime-local" id="start" name="start" value={event.start} onChange={handleDateChange} className='p-2 border rounded-md' required />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="end">Date de fin</label>
        <input type="datetime-local" id="end" name="end" value={event.end} onChange={handleDateChange} className='p-2 border rounded-md' required />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="color">Couleur</label>
        <input type="color" id="color" name="color" value={event.color} onChange={handleColorChange} className="p-2 border w-1/2 h-12 rounded-md" />
      </div>
      
      {isTeacher && group.length > 0 && (
        <div className="flex flex-col">
          <label htmlFor="group">Groupe</label>
          <select name="group" id="group" value={event.group} onChange={handleChange} className='p-2 border rounded-md'>
            <option value="">Sélectionnez un groupe</option>
            {group.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      )}
      
      <div className="flex justify-end space-x-4">
        <button className="border rounded-md px-5 py-2" onClick={handleAddEvent}>Ajouter</button>
        <button className="border rounded-md px-5 py-2 bg-black text-white" onClick={handleClose}>Fermer</button>
      </div>
    </div>
  );
}

export default FormulaireAdd;
