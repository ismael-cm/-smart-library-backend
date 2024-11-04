const express = require('express');
const { advancedSearch, getAvailability, filterBooks } = require('../controllers/BookController');

const router = express.Router();

router.get('/search', advancedSearch); // Búsqueda avanzada
router.get('/availability/:id', getAvailability); // Disponibilidad de un libro
router.get('/filter', filterBooks); // Filtros por autor, título, género y fecha

module.exports = router;
