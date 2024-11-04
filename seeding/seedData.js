const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

const seed = async (req, res) => {
    try {
        await Book.deleteMany({});
        await Author.deleteMany({});
        await Genre.deleteMany({});
        console.log('Cleared existing collections');

        // Crear géneros
        const genres = await Genre.insertMany([
            { description: 'Science Fiction' },
            { description: 'Fantasy' },
            { description: 'Mystery' },
            { description: 'Historical Fiction' },
            { description: 'Non-Fiction' },
            { description: 'Programming' },
            { description: 'Engineering' },
        ]);

        console.log('Genres added:', genres);

        // Crear autores
        const authors = await Author.insertMany([
            { name: 'Isaac Asimov' },
            { name: 'J.K. Rowling' },
            { name: 'Agatha Christie' },
            { name: 'George R.R. Martin' },
            { name: 'Stephen King' },
            { name: 'Jane Austen' },
            { name: 'Dan Brown' },
            { name: 'Haruki Murakami' },
            { name: 'Mark Twain' },
            { name: 'Mary Shelley' },
            { name: 'Robert C. Martin' },
            { name: 'Andrew S. Tanenbaum' },
            { name: 'Bjarne Stroustrup' },
            { name: 'Donald E. Knuth' },
            { name: 'Martin Fowler' },
            { name: 'Carlos García' },
            { name: 'José Sánchez' },
            { name: 'Alejandra Pérez' },
            { name: 'Javier Fernández' },
            { name: 'Ana Gómez' },
        ]);

        console.log('Authors added:', authors);

        // Crear libros con category_id asignado
        const books = await Book.insertMany([
            { title: 'Foundation', isbn: '978-0-553-80371-0', author_id: authors[0]._id, genre_id: genres[0]._id, category_id: genres[0]._id, total_stock: 10, available_stock: 10 },
            { title: 'Harry Potter and the Philosopher\'s Stone', isbn: '978-0-7475-3269-9', author_id: authors[1]._id, genre_id: genres[1]._id, category_id: genres[1]._id, total_stock: 15, available_stock: 15 },
            { title: 'Murder on the Orient Express', isbn: '978-0-00-711931-8', author_id: authors[2]._id, genre_id: genres[2]._id, category_id: genres[2]._id, total_stock: 8, available_stock: 8 },
            { title: 'A Game of Thrones', isbn: '978-0-553-10354-0', author_id: authors[3]._id, genre_id: genres[1]._id, category_id: genres[1]._id, total_stock: 12, available_stock: 12 },
            { title: 'The Shining', isbn: '978-0-385-12167-5', author_id: authors[4]._id, genre_id: genres[2]._id, category_id: genres[2]._id, total_stock: 9, available_stock: 9 },
            { title: 'Clean Code', isbn: '978-0-13-235088-4', author_id: authors[10]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 20, available_stock: 20 },
            { title: 'Operating Systems: Design and Implementation', isbn: '978-0-13-142938-3', author_id: authors[11]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10 },
            { title: 'The C++ Programming Language', isbn: '978-0-321-56384-2', author_id: authors[12]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 15, available_stock: 15 },
            { title: 'The Art of Computer Programming', isbn: '978-0-201-89683-1', author_id: authors[13]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 8, available_stock: 8 },
            { title: 'Refactoring: Improving the Design of Existing Code', isbn: '978-0-201-48567-7', author_id: authors[14]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 12, available_stock: 12 },
            { title: 'Ingeniería de Software: Un Enfoque Práctico', isbn: '978-0-470-84772-9', author_id: authors[15]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10 },
            { title: 'Cálculo: Trascendentes Tempranas', isbn: '978-607-15-1120-4', author_id: authors[16]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 18, available_stock: 18 },
            { title: 'Mecánica de Materiales', isbn: '978-84-291-5161-6', author_id: authors[17]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10 },
            { title: 'Circuitos Eléctricos', isbn: '978-607-15-0743-6', author_id: authors[18]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 15, available_stock: 15 },
            { title: 'Análisis Estructural', isbn: '978-84-291-5360-3', author_id: authors[19]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 8, available_stock: 8 },
            { title: 'Introduction to Algorithms', isbn: '978-0-262-03384-8', author_id: authors[10]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 10, available_stock: 10 },
            { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', isbn: '978-0-201-63361-9', author_id: authors[14]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 12, available_stock: 12 },
            { title: 'Artificial Intelligence: A Modern Approach', isbn: '978-0-13-604259-4', author_id: authors[13]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 14, available_stock: 14 },
            { title: 'Ingeniería Ambiental', isbn: '978-84-291-5345-0', author_id: authors[15]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10 },
            { title: 'Matemáticas Avanzadas para Ingeniería', isbn: '978-84-291-5370-2', author_id: authors[16]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 20, available_stock: 20 },
        ]);

        console.log('Books added:', books);

        // Cerrar la conexión
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

module.exports = { seed };
