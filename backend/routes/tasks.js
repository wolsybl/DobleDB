const express = require('express');
const router = express.Router();
const { crudDB } = require('../db');
const Task = require('../models/Task')(crudDB);
const authMiddleware = require('../middleware/auth');

// Todas las rutas usan el middleware
router.use(authMiddleware);

// Obtener solo las tareas del usuario autenticado
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userEmail: req.user.email });
  res.json(tasks);
});

// Crear una tarea asociada al usuario
router.post('/', async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;
  const newTask = new Task({
    title,
    description,
    priority,      // <-- ahora sí se guarda lo que envía el frontend
    dueDate,
    status,
    userEmail: req.user.email
  });
  await newTask.save();
  res.status(201).json(newTask);
});

// Actualizar tarea (opcional: verifica que sea del usuario)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userEmail: req.user.email },
    req.body,
    { new: true }
  );
  res.json(updatedTask);
});

// Eliminar tarea (opcional: verifica que sea del usuario)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ _id: id, userEmail: req.user.email });
  res.status(204).send();
});

module.exports = router;
