import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

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

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const res = await axios.post(
      "http://localhost:5000/api/tasks",
      { title: input },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, res.data]);
    setInput("");
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleEditTask = (task) => {
    setEditId(task._id);
    setEditValue(task.title);
  };

  const handleSaveEdit = async () => {
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${editId}`,
      { title: editValue },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTasks(tasks.map((t) => (t._id === editId ? res.data : t)));
    setEditId(null);
    setEditValue("");
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Dashboard - To Do List
        </h2>

        <form onSubmit={handleAddTask} className="flex mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nueva tarea"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700 transition duration-300"
          >
            Agregar
          </button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between mb-3 bg-gray-50 px-4 py-2 rounded-xl"
            >
              {editId === task._id ? (
                <>
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 border rounded-xl mr-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    className="text-green-600 mr-2"
                    onClick={handleSaveEdit}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-gray-500"
                    onClick={() => setEditId(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div>
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
                </>
              )}
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <div className="text-gray-400 text-center mt-4">No hay tareas aún.</div>
        )}
      </div>
    </div>
  );
}
