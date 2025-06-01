import { useEffect, useState } from "react";
import axios from "axios";

const STATUS = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  COMPLETADO: "Completado",
};

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Media",
    dueDate: "",
    status: STATUS.PENDIENTE,
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

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
      status: STATUS.PENDIENTE,
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
      status: task.status || STATUS.PENDIENTE,
    });
    setShowModal(true);
  };

  // Cambiar el estado de la tarea
  const handleMoveTask = async (task, newStatus) => {
    if (task.status === newStatus) return;
    const updatedTask = { ...task, status: newStatus };
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      updatedTask,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  // Agrupa tareas por estado
  const tasksByStatus = (status) => tasks.filter((t) => (t.status || STATUS.PENDIENTE) === status);

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

      <div className="w-full max-w-5xl">
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

        {/* Carriles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Pendiente */}
          <div className="md:col-span-4 bg-yellow-50 rounded-xl border-2 border-yellow-300 p-2 min-h-[300px] flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-yellow-700 text-center">Pendiente</h3>
            <div className="space-y-4 flex-1">
              {tasksByStatus(STATUS.PENDIENTE).length === 0 && (
                <div className="text-gray-400 text-center">Sin tareas</div>
              )}
              {tasksByStatus(STATUS.PENDIENTE).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onMove={handleMoveTask}
                  status={STATUS}
                />
              ))}
            </div>
          </div>
          {/* En proceso */}
          <div className="md:col-span-4 bg-blue-50 rounded-xl border-2 border-blue-300 p-2 min-h-[300px] flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-blue-700 text-center">En proceso</h3>
            <div className="space-y-4 flex-1">
              {tasksByStatus(STATUS.EN_PROCESO).length === 0 && (
                <div className="text-gray-400 text-center">Sin tareas</div>
              )}
              {tasksByStatus(STATUS.EN_PROCESO).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onMove={handleMoveTask}
                  status={STATUS}
                />
              ))}
            </div>
          </div>
          {/* Completado */}
          <div className="md:col-span-4 bg-green-50 rounded-xl border-2 border-green-300 p-2 min-h-[300px] flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-green-700 text-center">Completado</h3>
            <div className="space-y-4 flex-1">
              {tasksByStatus(STATUS.COMPLETADO).length === 0 && (
                <div className="text-gray-400 text-center">Sin tareas</div>
              )}
              {tasksByStatus(STATUS.COMPLETADO).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onMove={handleMoveTask}
                  status={STATUS}
                />
              ))}
            </div>
          </div>
        </div>
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
              <div>
                <label className="block text-gray-700 mb-1">Estado</label>
                <select
                  name="status"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newTask.status}
                  onChange={handleInputChange}
                >
                  <option value={STATUS.PENDIENTE}>Pendiente</option>
                  <option value={STATUS.EN_PROCESO}>En proceso</option>
                  <option value={STATUS.COMPLETADO}>Completado</option>
                </select>
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

// Componente para mostrar cada tarea y mover entre carriles
function TaskCard({ task, onEdit, onDelete, onMove, status }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <div className="font-semibold">{task.title}</div>
      <div className="text-sm text-gray-600">{task.description}</div>
      <div className="text-xs text-gray-500">
        Prioridad: {task.priority || "Media"}<br />
        {task.dueDate ? `Límite: ${new Date(task.dueDate).toLocaleDateString()}` : ""}
      </div>
      <div className="flex gap-2 mt-2">
        {task.status !== status.PENDIENTE && (
          <button
            className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
            onClick={() => onMove(task, status.PENDIENTE)}
          >
            Pendiente
          </button>
        )}
        {task.status !== status.EN_PROCESO && (
          <button
            className="px-2 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
            onClick={() => onMove(task, status.EN_PROCESO)}
          >
            En proceso
          </button>
        )}
        {task.status !== status.COMPLETADO && (
          <button
            className="px-2 py-1 bg-green-200 text-green-800 rounded hover:bg-green-300"
            onClick={() => onMove(task, status.COMPLETADO)}
          >
            Completado
          </button>
        )}
        <button
          className="text-blue-600 ml-auto"
          onClick={() => onEdit(task)}
        >
          Editar
        </button>
        <button
          className="text-red-600"
          onClick={() => onDelete(task._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
