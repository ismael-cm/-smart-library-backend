const express = require('express');
const {
    updateUser,
    changePassword,
    getProfile
} = require('../controllers/userController');

const router = express.Router();

// Ruta para actualizar información del usuario
router.put('/update/:id', updateUser);

// Ruta para cambiar la contraseña
router.put('/change-password', changePassword);
router.get('/profile', getProfile);

module.exports = router;
