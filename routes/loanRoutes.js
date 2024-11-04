const express = require('express');
const { createLoan, returnBook, getAllLoans, getLoansByUser } = require('../controllers/LoanController');

const router = express.Router();

router.post('/create', createLoan); // Crear un nuevo préstamo
router.patch('/return/:loanId', returnBook); // Devolver un libro
router.get('/', getAllLoans); // Listar todos los préstamos
router.get('/user/:userId', getLoansByUser); // Obtener préstamos por usuario

module.exports = router;