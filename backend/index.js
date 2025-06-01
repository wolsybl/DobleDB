
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', tasksRouter);

app.listen(5000, () => console.log('Servidor backend corriendo en http://localhost:5000'));
