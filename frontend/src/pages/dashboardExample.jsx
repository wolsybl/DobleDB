import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Media",
    dueDate: "",
  });
  const [editId, setEditId] = useState(null);

  // Obtén el token del localStorage
  const token = localStorage.getItem("token");

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setNewTask({
      title: "",
      description: "",
      priority: "Media",
      dueDate: "",
    });
    setEditId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() === "") return;

    if (editId) {
      // Editar tarea existente
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === editId ? res.data : t)));
    } else {
      // Crear nueva tarea
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
    }
    setShowModal(false);
    setEditId(null);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleEditTask = (task) => {
    setEditId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">
      <button
        className="absolute top-6 right-6 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50 transition"
        onClick={() => {
          localStorage.removeItem("token");
          onLogout();
        }}
        title="Cerrar sesión"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
          />
        </svg>
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 flex-1">
            Dashboard - To Do List
          </h2>
          <button
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
            onClick={handleOpenModal}
          >
            Nueva tarea
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 bg-gray-50 px-4 py-2 rounded-xl"
            >
              <div className="flex-1">
                <div className="font-semibold">{task.title}</div>
                <div className="text-sm text-gray-600">{task.description}</div>
                <div className="text-xs text-gray-500">
                  Prioridad: {task.priority || "Media"} |{" "}
                  {task.dueDate
                    ? `Límite: ${new Date(task.dueDate).toLocaleDateString()}`
                    : ""}
                </div>
              </div>
              <div className="flex mt-2 sm:mt-0">
                <button
                  className="text-blue-600 mr-3"
                  onClick={() => handleEditTask(task)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <div className="text-gray-400 text-center mt-4">No hay tareas aún.</div>
        )}
      </div>

      {/* Modal para nueva tarea o editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">
              {editId ? "Editar tarea" : "Nueva tarea"}
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Prioridad</label>
                <select
                  name="priority"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newTask.priority}
                  onChange={handleInputChange}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Fecha límite</label>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
              >
                {editId ? "Guardar cambios" : "Guardar tarea"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
