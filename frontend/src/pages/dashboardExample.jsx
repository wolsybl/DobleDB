import { useState } from "react";

//interfaz para el dashboard despues de iniciar sesion

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[index] = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">
      {/* Botón de logout fuera del card */}
      <button
        className="absolute top-6 right-6 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50 transition"
        onClick={onLogout}
        title="Cerrar sesión"
      >
        {/* Icono de logout SVG */}
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
        </div>
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
          {tasks.map((task, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between mb-3 bg-gray-50 px-4 py-2 rounded-xl"
            >
              {editIndex === idx ? (
                <>
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 border rounded-xl mr-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    className="text-green-600 mr-2"
                    onClick={() => handleSaveEdit(idx)}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-gray-500"
                    onClick={() => setEditIndex(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>{task}</span>
                  <div>
                    <button
                      className="text-blue-600 mr-3"
                      onClick={() => handleEditTask(idx)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteTask(idx)}
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