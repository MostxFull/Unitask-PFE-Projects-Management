import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskDetails({ taskId, userId, onClose }) {
  const [task, setTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/tache/${taskId}`);
        const apiTask = response.data;

        const formattedTask = {
          ...apiTask,
          deadline: new Date(apiTask.dateFin).toLocaleDateString(),
          validation: apiTask.validate,
          comments: apiTask.commentaireList?.map(comment => ({

            text: comment.content,
            date: new Date(comment.date).toLocaleDateString(),
            auteurId: comment.auteurId
          })) || [],
          fichiers: apiTask.fichiers || []
        };

        setTask(formattedTask);
        setSelectedStatus(apiTask.validate);
      } catch (err) {
        setError("Échec du chargement des détails de la tâche");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleUpdateStatus = async () => {
    if (!selectedStatus || selectedStatus === task.validation) return;

    setStatusLoading(true);
    try {
      await axios.put(
          `https://mostxfull-unitask-pfe-projects-management.hf.space/tache/valide/${taskId}`,
          {
            validateStatus: selectedStatus
          }
      );

      setTask(prev => ({
        ...prev,
        validation: selectedStatus
      }));
    } catch (err) {
      console.error("Erreur de mise à jour:", err.response?.data || err.message);
      alert("Échec de la mise à jour du statut");
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Le commentaire ne peut pas être vide");
      return;
    }

    setCommentLoading(true);

    try {
      const response = await axios.post(`https://mostxfull-unitask-pfe-projects-management.hf.space/comment/add`, {
        auteurId: userId,
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
              onClick={onClose}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retour
          </button>
        </div>
    );
  }

  return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
        <button
            onClick={onClose}
            className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          &larr; Retour
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{task.titre}</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong className="text-gray-900">Description:</strong> {task.description}</p>
          <p><strong className="text-gray-900">Date limite:</strong> {task.deadline}</p>
          <p><strong className="text-gray-900">Statut:</strong> {task.status.replace(/_/g, ' ')}</p>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Statut de validation
            </label>
            <div className="mt-1 flex gap-4 items-center">
              <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2 border rounded-md bg-white flex-1"
              >
                <option value="VALIDEE">VALIDEE</option>
                <option value="EN_COURS">EN_COURS</option>
                <option value="REJETEE">REJETEE</option>
              </select>
              <button
                  onClick={handleUpdateStatus}
                  disabled={statusLoading || selectedStatus === task.validation}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                      statusLoading || selectedStatus === task.validation
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                  }`}
              >
                {statusLoading ? "Enregistrement..." : "Mettre à jour"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fichiers attachés</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            {task.fichiers.length > 0 ? (
                <div className="space-y-2">
                  {task.fichiers.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                        <span className="truncate">{file.filename}</span>
                        <button
                            onClick={() => downloadFile(file.data, file.filename, file.fileType)}
                            className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded transition-colors"
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

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Commentaires</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              rows="3"
          />
            <button
                onClick={handleAddComment}
                disabled={commentLoading}
                className={`mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
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