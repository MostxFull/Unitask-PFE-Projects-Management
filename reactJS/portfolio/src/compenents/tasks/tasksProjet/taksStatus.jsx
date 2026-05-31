import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

function TasksByStatus() {
  const { tasks } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const columns = ["To_do", "In_progress", "Completed"];

  const formatColumnName = (column) => {
    return column.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex gap-3 p-4">
      {columns.map((column) => (
        <div key={column} className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-center">{formatColumnName(column)}</h3>
          <div>
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 mb-4 rounded-lg shadow-sm border border-gray-300"
                >
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {task.deadline}
                  </p>
                  {/*Deadline {new Date(task.dateFin).toLocaleDateString()*/}
                  {/* Afficher le bouton seulement pour In_progress et Done */}
                  {(column === "In_progress" || column === "Completed") && (
                    <button
                      className="mt-2  bg-gradient-to-br from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                      onClick={() => 
                        navigate(`/etudiant/${id}/tasks/TaskProjet/TaskDetails/${task.id}`)
                      }
                    >
                      View Details
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksByStatus;