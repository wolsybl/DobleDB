const express = require('express');
const router = express.Router();

const { crudDB } = require('../db');
const Task = require('../models/Task')(crudDB);

// Obtener todas las tareas
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear una tarea
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  await newTask.save();
  res.status(201).json(newTask);
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTask);
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;
