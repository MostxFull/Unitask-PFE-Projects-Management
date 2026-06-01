import { useState, useEffect } from "react";
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useParams } from "react-router-dom";
import axios from "axios";

const StatusValidation = {
  EN_COURS: "En Cours",
  VALIDEE: "Valide",
  REJETEE: "Refuse"
};



const DraggableItem = ({ task, onShowDetails }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : "none",
    zIndex: transform ? 999 : 'auto',
    transition: 'transform 0.2s ease',
  };

  const statusColors = {
    To_do: 'bg-red-100 border-red-500',
    In_progress: 'bg-yellow-100 border-yellow-500',
    Completed: 'bg-green-100 border-green-500'
  };

  return (
      <div
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className={`group relative p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move border-l-4 ${statusColors[task.status]} mb-3`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{task.titre}</h3>
            <p className="text-sm text-gray-600 mt-1 truncate">{task.description}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
              {/* Date */}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.dateFin).toLocaleDateString()}
              </div>

              {/* Statut de validation */}
              <div className="flex items-center">
                {StatusValidation[task.validate] === 'Valide' && (
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
                {StatusValidation[task.validate] === 'Refuse' && (
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
                {StatusValidation[task.validate] === 'En Cours' && (
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                <span className="">
                       {StatusValidation[task.validate]}
                </span>
              </div>

            </div>

          </div>
          <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(task);
              }}
              className="ml-2 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
  );
};

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  const columnTitles = {
    To_do: '🚧 En Cours',
    In_progress: '📝 À Faire',
    Completed: '✅ Terminé'
  };

  return (
      <div ref={setNodeRef} className="bg-gray-50 p-4 rounded-xl shadow-sm h-full min-h-[500px]">
        <div className="mb-4 px-2 py-3 bg-white rounded-lg shadow-xs">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            {columnTitles[id]}
            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {children.props.items.length}
          </span>
          </h2>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
  );
};

const TaskDetailsModal = ({ task, onClose, onAddComment, onAddFile, onModifieDescription }) => {
  const [newComment, setNewComment] = useState("");
  const [description, setDescription] = useState(task.description);
  const [activeTab, setActiveTab] = useState('details');
  const [fichiers, setFichiers] = useState(task.fichiers || []);
  const { id } = useParams();

  const handleAddFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tacheId', task.id);
    formData.append('membreId', id);

    try {
      const response = await axios.post('https://mostxfull-unitask-pfe-projects-management.hf.space/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newFile = {
        id: response.data.id,
        filename: response.data.filename,
        fileType: response.data.fileType
      };

      setFichiers([...fichiers, newFile]);
      onAddFile(task.id, newFile);
    } catch (error) {
      console.error('Erreur upload:', error);
    }
  };

  const downloadFile = async (fileId, filename) => {
    try {
      const response = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/file/${fileId}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur téléchargement:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`https://mostxfull-unitask-pfe-projects-management.hf.space/file/${fileId}`);
      setFichiers(fichiers.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(task.id, newComment);
      setNewComment("");
    }
  };

  const handleModifieDescription = () => {
    onModifieDescription(task.id, description);
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-start p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{task.titre}</h2>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex border-b">
            {['details', 'files', 'comments'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize ${
                        activeTab === tab
                            ? 'text-blue-600 border-b-2 border-blue-500'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                </button>
            ))}
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === 'details' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                    />
                    <button
                        onClick={handleModifieDescription}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Description
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-gray-200">
                    {/* Ligne Deadline */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700 min-w-[80px]">
                        Deadline
                      </label>

                      <div className="flex items-center text-gray-600 gap-2">
                        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">
        {new Date(task.dateFin).toLocaleDateString()}
      </span>
                      </div>
                    </div>

                    {/* Ligne Status */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700 min-w-[80px]">
                        Status
                      </label>

                      <div className="flex items-center gap-2">
                        {/* Icône dynamique */}
                        {StatusValidation[task.validate] === 'Valide' && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm font-medium text-green-700">Valide</span>
                            </div>
                        )}

                        {StatusValidation[task.validate] === 'Refuse' && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-red-50 rounded-full">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span className="text-sm font-medium text-red-700">Refusé</span>
                            </div>
                        )}

                        {StatusValidation[task.validate] === 'En Cours' && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-full">
                              <svg className="w-5 h-5 text-amber-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium text-amber-700">En Cours</span>
                            </div>
                        )}
                      </div>
                    </div>
                    </div>
                </div>
            )}

            {activeTab === 'files' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uploader un fichier
                    <input
                        type="file"
                        onChange={handleAddFile}
                        className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>

                  <div className="space-y-2">
                    {fichiers.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <button
                                onClick={() => downloadFile(file.id, file.filename)}
                                className="text-blue-500 hover:text-blue-700 truncate"
                            >
                              {file.filename}
                            </button>
                            <span className="text-xs text-gray-500">
                        ({file.fileType})
                      </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}

            {activeTab === 'comments' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    {task.commentaireList?.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zm9 11v-1a7 7 0 00-7-7H10a7 7 0 00-7 7v1h2v-1a5 5 0 015-5h4a5 5 0 015 5v1z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-800">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

const KanbanBoard = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState({
    To_do: [],
    In_progress: [],
    Completed: []
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/etudient/${id}`);
        const apiTasks = response.data.tache;

        const organizedTasks = apiTasks.reduce((acc, task) => {
          const formattedTask = {
            ...task,
            commentaireList: task.commentaireList || [],
            fichiers: task.fichiers || [],
            comments: task.commentaireList?.map(comment => ({
              id: comment.id,
              text: comment.content,
              createdAt: comment.date
            })) || []
          };

          acc[task.status] = [...acc[task.status], formattedTask];
          return acc;
        }, { To_do: [], In_progress: [], Completed: [] });

        setTasks(organizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceColumn = Object.keys(tasks).find((key) =>
        tasks[key].some((task) => task.id === active.id)
    );

    const destinationColumn = over.id;

    if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
      try {
        const prevTasks = { ...tasks };
        const movedTask = tasks[sourceColumn].find(task => task.id === active.id);
        const updatedTask = { ...movedTask, status: destinationColumn };

        const newTasks = {
          ...tasks,
          [sourceColumn]: tasks[sourceColumn].filter(task => task.id !== active.id),
          [destinationColumn]: [...tasks[destinationColumn], updatedTask]
        };

        setTasks(newTasks);

        await axios.put(`https://mostxfull-unitask-pfe-projects-management.hf.space/tache/${active.id}/status`, destinationColumn, {
          headers: { "Content-Type": "text/plain" }
        });

        const response = await axios.get(`https://mostxfull-unitask-pfe-projects-management.hf.space/user/etudient/${id}`);
        const apiTasks = response.data.tache;

        const organizedTasks = apiTasks.reduce((acc, task) => {
          const formattedTask = {
            ...task,
            commentaireList: task.commentaireList || [],
            fichiers: task.fichiers || [],
            comments: task.commentaireList?.map(comment => ({
              id: comment.id,
              text: comment.content,
              createdAt: comment.date
            })) || []
          };

          acc[task.status] = [...acc[task.status], formattedTask];
          return acc;
        }, { To_do: [], In_progress: [], Completed: [] });

        setTasks(organizedTasks);

      } catch (error) {
        setTasks(prevTasks);
        console.error("Erreur lors de la mise à jour:", error);
      }
    }
  };

  const handleAddComment = async (taskId, commentText) => {
    try {
      const response = await axios.post("https://mostxfull-unitask-pfe-projects-management.hf.space/comment/add", {
        auteurId: id,
        tacheId: taskId,
        content: commentText,
        date: new Date().toISOString().split("T")[0]
      });

      const newComment = {
        id: response.data.id,
        text: response.data.content,
        createdAt: response.data.date
      };

      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach((column) => {
        updatedTasks[column] = updatedTasks[column].map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              commentaireList: [...task.commentaireList, response.data],
              comments: [...task.comments, newComment]
            };
          }
          return task;
        });
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddFile = (taskId, newFile) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((column) => {
      updatedTasks[column] = updatedTasks[column].map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            fichiers: [...task.fichiers, newFile]
          };
        }
        return task;
      });
    });
    setTasks(updatedTasks);
  };

  const handleModifieDescription = async (taskId, newDescription) => {
    try {
      await axios.put(`https://mostxfull-unitask-pfe-projects-management.hf.space/tache/${taskId}/description`, {
        descreption: newDescription
      });

      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach((column) => {
        updatedTasks[column] = updatedTasks[column].map((task) => {
          if (task.id === taskId) {
            return { ...task, description: newDescription };
          }
          return task;
        });
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
      <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {Object.keys(tasks).map((column) => (
              <DroppableColumn key={column} id={column}>
                <SortableContext
                    items={tasks[column].map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                  {tasks[column].map((task) => (
                      <DraggableItem
                          key={task.id}
                          task={task}
                          onShowDetails={setSelectedTask}
                      />
                  ))}
                </SortableContext>
              </DroppableColumn>
          ))}
        </div>

        {selectedTask && (
            <TaskDetailsModal
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onAddComment={handleAddComment}
                onAddFile={handleAddFile}
                onModifieDescription={handleModifieDescription}
            />
        )}
      </DndContext>
  );
};

export default KanbanBoard;