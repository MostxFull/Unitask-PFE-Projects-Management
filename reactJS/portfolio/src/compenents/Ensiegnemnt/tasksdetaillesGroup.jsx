import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function TasksdetaillesGroup() {
  const [tasks, setTasks] = useState( [
      { id: 1, group: "group1", status: "Not Started", title: "Brand Colors", description: "Define brand color palette for marketing materials.", owner: "Alice", deadline: "2025-02-10", priority: "High", comments: [] },
      { id: 2, group: "group1", status: "Not Started", title: "Help Center Redesign", description: "Revamp the help center layout and design.", owner: "Bob", deadline: "2025-02-15", priority: "Medium", comments: [] },
      { id: 3, group: "group2", status: "Completed", title: "Illustrated Portraits", description: "Create illustrated portraits for team profiles.", owner: "Charlie", deadline: "2025-02-20", priority: "High", comments: [] },
      { id: 4, group: "group3", status: "Completed", title: "Email Signature", description: "Create a professional email signature template.", owner: "Frank", deadline: "2025-02-25", priority: "Low", comments: [] },
    ]);
  const { taskId } = useParams();
  const [newComment, setNewComment] = useState("");
  
  const task = tasks.find((t) => t.id === parseInt(taskId));

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, comments: [...t.comments, { 
            text: newComment, 
            date: new Date().toISOString() 
          }] 
        } 
        : t
    );
    
    setTasks(updatedTasks);
    setNewComment("");
  };

  if (!task) {
    return <p>Task not found. Please go back and select a valid task.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Owner:</strong> {task.owner}</p>
      <p><strong>Deadline:</strong> {task.deadline}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Comments</h3>
        <ul className="mt-2">
          {task.comments?.map((comment, index) => (
            <li key={index} className="p-2 bg-white border rounded-md shadow-sm mb-2">
              <p>{comment.text}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your feedback"
          className="w-full mt-2 p-2 border rounded-md"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default TasksdetaillesGroup;