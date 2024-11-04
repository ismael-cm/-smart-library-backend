const express = require('express');
const {
    createReservation,
    getReservationsByUser,
    getReservationsByBook,
    updateReservationStatus,
    getBookAvailabilityDate
} = require('../controllers/ReservationController');

const router = express.Router();

router.post('/create', createReservation); // Crear una nueva reserva
router.get('/user/:userId', getReservationsByUser); // Obtener reservas por usuario
router.get('/book/:bookId', getReservationsByBook); // Obtener reservas por libro
router.put('/update-status', updateReservationStatus); // Actualizar el estado de la reserva
router.get('/book/:bookId/availability-date', getBookAvailabilityDate);
router.patch('/update-status', updateReservationStatus);

module.exports = router;
