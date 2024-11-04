const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

// **Búsqueda avanzada de materiales bibliográficos**
const advancedSearch = async (req, res) => {
    try {
        const { title, author, genre, publicationDate } = req.query;

        // Crear un objeto de búsqueda dinámica
        let searchCriteria = {};

        if (title) {
            searchCriteria.title = { $regex: title, $options: 'i' }; // Búsqueda insensible a mayúsculas
        }
        if (author) {
            // Buscar el autor por nombre y obtener su ID
            const authorData = await Author.findOne({ name: { $regex: author, $options: 'i' } });
            if (authorData) {
                searchCriteria.author_id = authorData._id;
            }
        }
        if (genre) {
            // Buscar el género por descripción y obtener su ID
            const genreData = await Genre.findOne({ description: { $regex: genre, $options: 'i' } });
            if (genreData) {
                searchCriteria.genre_id = genreData._id;
            }
        }
        if (publicationDate) {
            searchCriteria.publicationDate = new Date(publicationDate);
        }

        // Buscar libros que coincidan con los criterios
        const books = await Book.find(searchCriteria).populate('author_id genre_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error in advanced search', error: error.message });
    }
};

// **Visualización de la disponibilidad de libros y otros recursos**
const getAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el libro por ID
        const book = await Book.findById(id).populate('author_id genre_id');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Devolver la disponibilidad del libro
        res.json({
            title: book.title,
            total_stock: book.total_stock,
            available_stock: book.available_stock,
            isAvailable: book.available_stock > 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting availability', error: error.message });
    }
};

// **Filtros por autor, título, género y fecha de publicación**
const filterBooks = async (req, res) => {
    try {
        const { author, title, genre, publicationDate } = req.query;

        // Crear un objeto de filtros dinámico
        let filterCriteria = {};

        if (author) {
            const authorData = await Author.findOne({ name: { $regex: author, $options: 'i' } });
            if (authorData) {
                filterCriteria.author_id = authorData._id;
            }
        }
        if (title) {
            filterCriteria.title = { $regex: title, $options: 'i' };
        }
        if (genre) {
            const genreData = await Genre.findOne({ description: { $regex: genre, $options: 'i' } });
            if (genreData) {
                filterCriteria.genre_id = genreData._id;
            }
        }
        if (publicationDate) {
            filterCriteria.publicationDate = new Date(publicationDate);
        }

        // Filtrar libros según los criterios
        const books = await Book.find(filterCriteria).populate('author_id genre_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering books', error: error.message });
    }
};

module.exports = { advancedSearch, getAvailability, filterBooks };
