const express = require('express');
const { advancedSearch, getAvailability, filterBooks, getBooksByGenre, getBookById  } = require('../controllers/BookController');

const router = express.Router();

router.get('/search', advancedSearch); // Búsqueda avanzada
router.get('/availability/:id', getAvailability); // Disponibilidad de un libro
router.get('/filter', filterBooks); // Filtros por autor, título, género y fecha
router.get('/genre', getBooksByGenre);
router.get('/:id', getBookById); // Ruta para obtener libro por ID

module.exports = router;
