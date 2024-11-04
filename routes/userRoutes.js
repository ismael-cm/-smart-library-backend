const express = require('express');
const {
    updateUser,
    changePassword,
    getProfile
} = require('../controllers/userController');

const router = express.Router();

// Ruta para actualizar información del usuario
router.put('/update/:userId', updateUser);

// Ruta para cambiar la contraseña
router.put('/change-password/:userId', changePassword);
router.get('/profile', getProfile);

module.exports = router;
