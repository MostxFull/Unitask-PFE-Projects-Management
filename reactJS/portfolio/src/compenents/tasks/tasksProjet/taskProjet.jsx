import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [roleUser, setRole] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tache/groupUser/${id}`);
        const formattedTasks = response.data.map(task => ({
          id: task.id,
          title: task.titre,
          description: task.description,
          deadline: new Date(task.dateFin).toLocaleDateString(),
          status: task.status,
          validation: task.validate,
          comments: task.commentaireList?.map(comment => ({
            id: comment.id,
            text: comment.content,
            createdAt: new Date(comment.date).toLocaleDateString()
          })) || []
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const checkAdminRole = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/isAdmin/${id}`);
        setRole(res.data.isAdmin);
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };

    fetchTasks();
    checkAdminRole();
  }, [id]);

  return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TASKS Project</h1>
          <p className="text-gray-600">Gérez vos tâches de projet efficacement</p>
        </div>

        <nav className="mb-8">
          <ul className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            {[
              // 📋📊➕
              { to: 'Alltask', affiche: true, label: 'Toutes les tâches', icon: '' },
              { to: 'bystatus', affiche: true, label: 'Par statut', icon: '' },
              { to: 'addtasks', affiche: roleUser, label: 'Ajouter', icon: '' }
            ].map((link) => (
                <li
                    key={link.to}
                    className={link.affiche ? 'block' : 'hidden'}
                >
                  <NavLink
                      to={`/etudiant/${id}/tasks/TaskProjet/${link.to}`}
                      className={({ isActive }) =>
                          `flex items-center px-6 py-3 rounded-lg transition-colors ${
                              isActive
                                  ? 'bg-gradient-to-br from-blue-700 to-purple-700 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`
                      }
                  >
                    <span className="mr-2 text-lg">{link.icon}</span>
                    {link.label}
                  </NavLink>
                </li>
            ))}
          </ul>
        </nav>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <Outlet context={{ tasks, setTasks }} />
        </div>
      </div>
  );
}

export default AllTasks;