
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authDB } = require('../db');
const User = require('../models/User')(authDB);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ email }, 'clave_secreta', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
