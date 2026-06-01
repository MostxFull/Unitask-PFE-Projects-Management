import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom";
function AllTasksTable() {
  const { tasks } = useOutletContext();
  const {id}=useParams();
  const [tasksUpdate, setTasksUpdate] = useState(null);
  const [roleUser, setRole] = useState(false);

  const StatusValidation = {
    EN_COURS: "En Cours",
    VALIDEE: "Valide",
    REJETEE: "Refuse"
  };

  const [formupdate, setFormupdate] = useState({
    title: "",
    descreption: "",
    deadline: "",
    status: ""
  });

  const checkAdminRole = async () => {
    try {
      const res = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/isAdmin/${id}`);
      setRole(res.data.isAdmin);
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };
  useEffect(() => {
    checkAdminRole();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [month, day, year] = dateString.split(/[/-]/);
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  useEffect(() => {
    if (tasksUpdate) {
      setFormupdate({
        title: tasksUpdate.title,
        descreption: tasksUpdate.description,
        deadline: formatDate(tasksUpdate.deadline),
        status: tasksUpdate.status,
        validation:tasksUpdate.validation
      });
    }
  }, [tasksUpdate]);

  const statusReal = (status) => {
    if (status === "In_progress")
      return 'À Faire';
    else if (status === "To_do")
      return 'En Cours';
    else if (status === "Completed")
      return 'Terminé';
  }

  const deleteTask = async (taskID) => {
    const response = await axios.delete(`https://mostxfull-unitask-pfe-projects-management.hf.space/tache/delete/${taskID}`);
    alert(response.data);
    window.location.reload();
  }

  async function updatetasks() {
    const response = await axios.put(`https://mostxfull-unitask-pfe-projects-management.hf.space/tache/update/${tasksUpdate.id}`, formupdate);
    setTasksUpdate(null); // Fermer le formulaire après mise à jour
    alert(response.data)
    window.location.reload();
  }

  function handleInputChange(e) {
    setFormupdate({...formupdate, [e.target.name]: e.target.value});
  }

  return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">All Tasks</h1>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Task</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Validation</th>
                {roleUser&&(
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    )}
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
              {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">{task.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">{task.description.length > 15 ? task.description.substring(0, 13) + "..." : task.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{task.deadline}</td>
                    <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {statusReal(task.status)}
                </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                      { StatusValidation[task.validation]}
                    </td>
                    {roleUser&&(
                    <td className="px-6 py-4 space-x-3">
                      <button
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                          onClick={() => setTasksUpdate(task)}
                      >
                        Edit
                      </button>
                      <button
                          className="text-rose-600 hover:text-rose-900 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-rose-50 transition-colors"
                          onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                        )}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>


        {tasksUpdate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <input
                        type="text"
                        name="title"
                        value={formupdate.title}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                  </div>
                  <div>
                <textarea
                    name="descreption"
                    value={formupdate.descreption}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                />
                  </div>
                  <div>
                    <input
                        type="date"
                        name="deadline"
                        value={formupdate.deadline}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "To_do", label: "En cours", color: "bg-red-100 text-red-800" },
                      { value: "In_progress", label: "À faire", color: "bg-yellow-100 text-yellow-800" },
                      { value: "Completed", label: "Terminé", color: "bg-green-100 text-green-800" }
                    ].map((status) => (
                        <label
                            key={status.value}
                            className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors ${
                                formupdate.status === status.value
                                    ? `${status.color} ring-2 ring-current`
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                          <input
                              type="radio"
                              name="status"
                              value={status.value}
                              checked={formupdate.status === status.value}
                              onChange={handleInputChange}
                              className="sr-only"
                          />
                          <span className="text-sm font-medium">{status.label}</span>
                        </label>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                      onClick={() => setTasksUpdate(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={updatetasks}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default AllTasksTable;