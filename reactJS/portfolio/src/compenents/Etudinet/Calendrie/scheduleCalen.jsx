import React from 'react'; 
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import FormulaireUpdate from './FormulaireUpdate';
import FormulaireAdd from './FormulaireAdd';
import { useParams } from 'react-router-dom';
import axios from "axios"; 
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const ScheduleCalen = () => {
  const { id } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [roleUser, setRole] = useState(false);
  const [isEns,setIsEns]=useState(false);


const checkAdminRole = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/user/isAdmin/${id}`);
            setRole(res.data.isAdmin);
            console.log(res.data.isAdmin)
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
  useEffect(() => {
    axios.get(`http://localhost:8080/Meeting/user/${id}`)
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.debutDate),
          end: new Date(event.finDate),
          title: event.title,
          id: event.id
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(evt => 
      evt.id === event.id ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
  };

  const handleAddEvent = (newEvent) => {
    const eventWithDates = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      id: Date.now()
    };
    setEvents([...events, eventWithDates]);
    setShowAddForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    // Conversion des dates en ISO pour le backend
    const payload = {
      title: updatedEvent.title,
      debutDate: updatedEvent.start.toISOString(),
      finDate: updatedEvent.end.toISOString(),
      description: updatedEvent.description,
      groupId: null
    };
  
    axios.put(`http://localhost:8080/Meeting/update/${updatedEvent.id}`, payload)
      .then(() => {
        const updatedEvents = events.map(evt => 
          evt.id === updatedEvent.id ? {
            ...evt,
            ...updatedEvent,
            start: new Date(updatedEvent.start),
            end: new Date(updatedEvent.end)
          } : evt
        );
        setEvents(updatedEvents);
        setSelectedEvent(null);
      })
      .catch(error => {
        console.error("Échec de la mise à jour", error);
        // Optionnel : Revert state ou afficher une erreur
      });
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(evt => evt.id !== eventId);
    setEvents(updatedEvents);
    axios.delete(`http://localhost:8080/Meeting/delete/${eventId}`)
    setSelectedEvent(null);
  };

  // const eventStyleGetter = (event) => ({
  //   style: {
  //     backgroundColor: event.type === 'TEACHER_MEETING' ? '#3174ad' : '#5cb85c',
  //     color: 'white',
  //     borderRadius: '4px',
  //     border: 'none'
  //   }
  // });
    const eventStyleGetter = (event) => {
        const isTeacherMeeting = event.type === 'TEACHER_MEETING';
        const baseColor = isTeacherMeeting ? '#c30b0b' : '#2d862d'; // Vert plus contrasté
        const hoverColor = isTeacherMeeting ? '#c80636' : '#247247';

        return {
            style: {
                backgroundColor: baseColor,
                color: 'white',
                borderRadius: '6px',
                borderLeft: `4px solid ${isTeacherMeeting ? '#721212' : '#1a5c1a'}`, // Bordure accent
                padding: '4px 8px',
                width:'100%',
                height:'100%',
                fontSize: '0.9em',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                opacity: 0.95,
                ':hover': {
                    backgroundColor: hoverColor,
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                }
            }
        };
    };

  return (
    <div className="calendar-container p-4">
      <div className="controls mb-4">
          {(roleUser || isEns) &&(
        <button 
          className="bg-gradient-to-br from-blue-700 to-purple-700 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddForm(true)}
        >
          Ajouter un événement
        </button>
          )}
        {showAddForm && (
          <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <FormulaireAdd 
              onClose={() => setShowAddForm(false)}
              onAdd={handleAddEvent}
            />
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
          <FormulaireUpdate
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onDelete={handleDeleteEvent}
            onUpdate={handleUpdateEvent}
          />
        </div>
      )}

      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        resizable
        selectable
        style={{ height: '80vh', marginTop: '20px' }}
        onSelectEvent={setSelectedEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventDrop}
        eventPropGetter={eventStyleGetter}
        messages={{
          today: "Aujourd'hui",
          previous: 'Précédent',
          next: 'Suivant',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour'
        }}
      />
    </div>
  );
};

export default ScheduleCalen;