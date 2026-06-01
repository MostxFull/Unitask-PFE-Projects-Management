import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TaskDetails from "./TaskDetails";

const statusLabels = {
  To_do: "To Do",
  In_progress: "In Progress",
  Completed: "Completed"
};

const statuses = ["To_do", "In_progress", "Completed"];

function TaskBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeGroup, setActiveGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/${id}`)
        .then(response => {
          const userGroups = response.data.groups;
          setGroups(userGroups);
          if (userGroups.length > 0) {
            setActiveGroup(userGroups[0].name);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
  }, [id]);

  const getTasksForGroup = () => {
    const group = groups.find(g => g.name === activeGroup);
    if (!group) return [];

    return group.taches.map(tache => ({
      id: tache.id,
      group: group.name,
      status: tache.status,
      title: tache.titre,
      description: tache.description,
      deadline: tache.dateFin.split('T')[0],
      comments: tache.commentaireList
    }));
  };

  const handleCloseDetails = () => {
    setSelectedTaskId(null);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Group tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          {groups.map((group) => (
              <button
                  key={group.name}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200
              ${
                      group.name === activeGroup
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveGroup(group.name)}
              >
                {group.name}
              </button>
          ))}
        </div>

        {/* Task columns */}
        <div className="flex space-x-4">
          {statuses.map((status) => (
              <div key={status} className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold mb-4 text-gray-800">{statusLabels[status]}</h3>
                {getTasksForGroup()
                    .filter((task) => task.status === status)
                    .map((task) => (
                        <div
                            key={task.id}
                            className="bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                        >
                          <h4 className="font-semibold text-gray-800">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Deadline: {task.deadline}</p>
                          {(status === "Completed" || status==="In_progress")  && (
                              <button
                                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                  onClick={() => setSelectedTaskId(task.id)}
                              >
                                View Details
                              </button>
                          )}
                        </div>
                    ))}
              </div>
          ))}
        </div>

        {/* Task Details Popup */}
        {selectedTaskId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <TaskDetails
                    taskId={selectedTaskId}
                    userId={id}
                    onClose={handleCloseDetails}
                />
              </div>
            </div>
        )}
      </div>
  );
}

export default TaskBoard;