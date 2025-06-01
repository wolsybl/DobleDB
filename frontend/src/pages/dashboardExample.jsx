import { useState } from "react";

//interfaz para el dashboard despues de iniciar sesion

export default function Dashboard() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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