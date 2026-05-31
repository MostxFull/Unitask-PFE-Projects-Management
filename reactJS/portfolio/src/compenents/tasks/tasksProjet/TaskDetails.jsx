import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
  const { taskId } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tache/${taskId}`);
        const apiTask = response.data;

        const formattedTask = {
          ...apiTask,
          deadline: new Date(apiTask.dateFin).toLocaleDateString(),
          validation:apiTask.validate,
          comments: apiTask.commentaireList?.map(comment => ({
            text: comment.content,
            date: new Date(comment.date).toLocaleDateString(),
            auteurId: comment.auteurId
          })) || [],
          fichiers: apiTask.fichiers || []
        };

        setTask(formattedTask);
      } catch (err) {
        setError("Échec du chargement des détails de la tâche");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Le commentaire ne peut pas être vide");
      return;
    }

    setCommentLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/comment/add`, {
        auteurId: id,
        tacheId: taskId,
        content: newComment,
        date: new Date().toISOString()
      });

      const newCommentFormatted = {
        text: response.data.content,
        date: new Date(response.data.date).toLocaleDateString(),
        auteurId: response.data.auteurId
      };

      setTask(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentFormatted],
        commentaireList: [...prev.commentaireList, response.data]
      }));

      setNewComment("");
    } catch (err) {
      console.error("Erreur:", err.response?.data || err.message);
      alert("Erreur lors de l'ajout du commentaire");
    } finally {
      setCommentLoading(false);
    }
  };

  const downloadFile = (fileData, fileName, fileType) => {
    const byteCharacters = atob(fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return <div className="p-4">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!task) {
    return (
        <div className="p-4">
          <p>Tâche non trouvée</p>
          <button
              onClick={() => navigate(-1)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retour
          </button>
        </div>
    );
  }

  return (
      <div className="p-4 bg-gray-100 rounded-md shadow-md max-w-2xl mx-auto">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-500 hover:text-blue-700"
        >
          &larr; Retour
        </button>

        <h2 className="text-2xl font-bold mb-4">{task.titre}</h2>
        <div className="space-y-2 mb-6">
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Date limite:</strong> {task.deadline}</p>
          <p><strong>Statut:</strong> {task.status.replace(/_/g, ' ')}</p>
          <p><strong>Validation:</strong> {task.validation}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Fichiers attachés</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {task.fichiers.length > 0 ? (
                <div className="space-y-2">
                  {task.fichiers.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="truncate">{file.filename}</span>
                        <button
                            onClick={() => downloadFile(file.data, file.filename, file.fileType)}
                            className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded"
                        >
                          Télécharger
                        </button>
                      </div>
                  ))}
                </div>
            ) : (
                <p className="text-gray-500">Aucun fichier attaché</p>
            )}
          </div>


        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Commentaires</h3>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            {task.comments.length > 0 ? (
                task.comments.map((comment, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                      <p className="text-gray-800">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comment.date}
                        {/*(Par utilisateur #{comment.auteurId})*/}
                      </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Aucun commentaire pour le moment</p>
            )}
          </div>

          <div className="mt-6">
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows="3"
          />
            <button
                onClick={handleAddComment}
                disabled={commentLoading}
                className={`mt-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors ${
                    commentLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {commentLoading ? "Envoi..." : "Ajouter le commentaire"}
            </button>
          </div>
        </div>
      </div>
  );
}

export default TaskDetails;