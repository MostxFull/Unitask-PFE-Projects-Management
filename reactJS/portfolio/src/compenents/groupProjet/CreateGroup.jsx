import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateGroup({ superviseurId, onClose, onGroupCreated }) {
  const [groupName, setGroupName] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/user/getAllEtudiants")
      .then((response) => {
        setStudents(response.data.map(user => ({
          ...user,
          fullName: `${user.firstName} ${user.lastName}`
        })));
      })
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const handleToggleMember = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName || selectedMembers.length === 0 || !responsable) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    axios.post("http://localhost:8080/group/create", {
      name: groupName,
      superviseur: superviseurId,
      members: selectedMembers,
      Admin: responsable
    })
    .then(() => {
      alert("Groupe créé avec succès");
      onGroupCreated();
      onClose();
    })
    .catch(error => console.error("Error creating group:", error));
    window.location.reload();
  };

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="max-w-full  p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Créer un Groupe</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <input
        type="text"
        placeholder="Nom du groupe"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Rechercher un étudiant"
        value={searchStudent}
        onChange={(e) => setSearchStudent(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      <div className="mb-4 max-h-48 overflow-y-auto">
        {filteredStudents.map(student => (
          <div key={student.id} className="flex items-center p-2 border-b">
            <input
              type="checkbox"
              checked={selectedMembers.includes(student.id)}
              onChange={() => handleToggleMember(student.id)}
              className="mr-2"
            />
            <span>{student.fullName}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Responsable du groupe </p>
        {students
          .filter(student => selectedMembers.includes(student.id))
          .map(student => (
            <div key={student.id} className="flex items-center p-2">
              <input
                type="radio"
                name="responsable"
                checked={responsable === student.id}
                onChange={() => setResponsable(student.id)}
                className="mr-2"
              />
              {student.fullName}
            </div>
          ))}
      </div>

      <button
        onClick={handleCreateGroup}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Créer le groupe
      </button>
    </div>
  );
}