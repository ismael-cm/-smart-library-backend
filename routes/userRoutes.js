const express = require('express');
const {
    registerUser,
    loginUser,
    updateUser,
    changePassword
} = require('../controllers/userController');

const router = express.Router();

// Ruta para registrar un nuevo usuario tipo "student"
router.post('/register', registerUser);

// Ruta para iniciar sesión (autenticarse)
router.post('/login', loginUser);

// Ruta para actualizar información del usuario
router.put('/update/:userId', updateUser);

// Ruta para cambiar la contraseña
router.put('/change-password/:userId', changePassword);

module.exports = router;
