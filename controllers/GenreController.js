const Genre = require('../models/Genre');

// Obtener todos los géneros
const getGenres = async (req, res) => {
    try {
        const { limit } = req.query;
        // Si existe un límite en la consulta, lo aplicamos; de lo contrario, obtenemos todos
        const genres = limit ? await Genre.find().limit(Number(limit)) : await Genre.find();
        
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los géneros', error: error.message });
    }
};

module.exports = { getGenres };
