const express = require('express');
const {getGenres  } = require('../controllers/GenreController');

const router = express.Router();

router.get('/', getGenres); 
module.exports = router;
