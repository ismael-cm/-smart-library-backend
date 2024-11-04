const express = require('express');
const {
    registerUser,
    loginUser,

} = require('../controllers/userController');

const router = express.Router();

// Ruta para registrar un nuevo usuario tipo "student"
router.post('/register', registerUser);

// Ruta para iniciar sesión (autenticarse)
router.post('/login', loginUser);

module.exports = router;
