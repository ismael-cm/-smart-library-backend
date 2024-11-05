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

        // Crear libros con category_id asignado y el campo `image`
        const books = await Book.insertMany([
            { title: 'Foundation', isbn: '978-0-553-80371-0', author_id: authors[0]._id, genre_id: genres[0]._id, category_id: genres[0]._id, total_stock: 10, available_stock: 10, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b', description: 'A science fiction classic by Isaac Asimov.' },
            { title: 'Harry Potter and the Philosopher\'s Stone', isbn: '978-0-7475-3269-9', author_id: authors[1]._id, genre_id: genres[1]._id, category_id: genres[1]._id, total_stock: 15, available_stock: 15, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b', description: 'The first book in the Harry Potter series by J.K. Rowling.' },
            { title: 'Murder on the Orient Express', isbn: '978-0-00-711931-8', author_id: authors[2]._id, genre_id: genres[2]._id, category_id: genres[2]._id, total_stock: 8, available_stock: 8, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F13.jpg?alt=media&token=fc925640-b8d1-44ab-b5c5-b7ac28a7d6e8', description: 'A classic mystery novel by Agatha Christie.' },
            { title: 'A Game of Thrones', isbn: '978-0-553-10354-0', author_id: authors[3]._id, genre_id: genres[1]._id, category_id: genres[1]._id, total_stock: 12, available_stock: 12, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F14.jpg?alt=media&token=50f7dc54-65ff-4433-bde9-1dc68eea793b', description: 'The first book in the epic fantasy series by George R.R. Martin.' },
            { title: 'The Shining', isbn: '978-0-385-12167-5', author_id: authors[4]._id, genre_id: genres[2]._id, category_id: genres[2]._id, total_stock: 9, available_stock: 9, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F18.jpg?alt=media&token=30bc9e17-7ebc-43fb-8462-83144d7b38c3', description: 'A horror novel by Stephen King.' },
            { title: 'Clean Code', isbn: '978-0-13-235088-4', author_id: authors[10]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 20, available_stock: 20, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F6.jpg?alt=media&token=7d316b1f-52ce-4052-90bc-a07bf0a04206', description: 'A guide to writing clean and maintainable code by Robert C. Martin.' },
            { title: 'Operating Systems: Design and Implementation', isbn: '978-0-13-142938-3', author_id: authors[11]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F7.jpg?alt=media&token=a84b9b0b-b066-4622-a9cb-3c4a1e1936dd', description: 'A comprehensive book on operating systems by Andrew S. Tanenbaum.' },
            { title: 'The C++ Programming Language', isbn: '978-0-321-56384-2', author_id: authors[12]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 15, available_stock: 15, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b', description: 'A definitive guide to C++ programming by Bjarne Stroustrup.' },
            { title: 'The Art of Computer Programming', isbn: '978-0-201-89683-1', author_id: authors[13]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 8, available_stock: 8, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F10.jpg?alt=media&token=0ae883fa-bf3d-4d29-8e4b-52d3b8214a01', description: 'A comprehensive series on algorithms by Donald E. Knuth.' },
            { title: 'Refactoring: Improving the Design of Existing Code', isbn: '978-0-201-48567-7', author_id: authors[14]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 12, available_stock: 12, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F13.jpg?alt=media&token=fc925640-b8d1-44ab-b5c5-b7ac28a7d6e8', description: 'A classic book on refactoring and design by Martin Fowler.' },
            { title: 'Introduction to Algorithms', isbn: '978-0-262-03384-8', author_id: authors[10]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 10, available_stock: 10, image: 'https://m.media-amazon.com/images/I/71wHpqZ0zgL._AC_UL320_.jpg', description: 'An essential guide to algorithms by Thomas H. Cormen and co-authors.' },
            { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', isbn: '978-0-201-63361-9', author_id: authors[14]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 12, available_stock: 12, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F16.jpg?alt=media&token=861635ca-f2c4-4cef-bd6f-1be1f096ba03', description: 'A must-read on design patterns by the Gang of Four.' },
            { title: 'Artificial Intelligence: A Modern Approach', isbn: '978-0-13-604259-4', author_id: authors[13]._id, genre_id: genres[5]._id, category_id: genres[5]._id, total_stock: 14, available_stock: 14, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F7.jpg?alt=media&token=a84b9b0b-b066-4622-a9cb-3c4a1e1936dd', description: 'A comprehensive book on AI by Stuart Russell and Peter Norvig.' },
            { title: 'Ingeniería de Software: Un Enfoque Práctico', isbn: '978-0-470-84772-9', author_id: authors[15]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10, image: 'https://m.media-amazon.com/images/I/71M-Wo2j1iL._AC_UL320_.jpg', description: 'A practical approach to software engineering by Carlos García.' },
            { title: 'Cálculo: Trascendentes Tempranas', isbn: '978-607-15-1120-4', author_id: authors[16]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 18, available_stock: 18, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b', description: 'An advanced calculus book for engineers by José Sánchez.' },
            { title: 'Mecánica de Materiales', isbn: '978-84-291-5161-6', author_id: authors[17]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 10, available_stock: 10, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F15.jpg?alt=media&token=3e33440d-22e3-44b0-acf8-f205233cd5dc', description: 'A guide to the mechanics of materials by Alejandra Pérez.' },
            { title: 'Circuitos Eléctricos', isbn: '978-607-15-0743-6', author_id: authors[18]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 15, available_stock: 15, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F2.jpg?alt=media&token=b9e65485-e69a-44bc-bea0-57578d82ec6c', description: 'A comprehensive book on electric circuits by Javier Fernández.' },
            { title: 'Análisis Estructural', isbn: '978-84-291-5360-3', author_id: authors[19]._id, genre_id: genres[6]._id, category_id: genres[6]._id, total_stock: 8, available_stock: 8, image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F9.jpg?alt=media&token=060076c3-c8f1-4c39-ac8b-2c83a41628be', description: 'An advanced guide to structural analysis by Ana Gómez.' },
            { 
                title: 'JavaScript: The Good Parts', 
                isbn: '978-0596517748',
                author_id: authors[10]._id,
                genre_id: genres[5]._id,
                category_id: genres[5]._id,
                total_stock: 15,
                available_stock: 15,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b',
                description: 'Douglas Crockford reveals the good features of JavaScript that make the language so powerful.'
            },
            {
                title: 'Python Crash Course',
                isbn: '978-1593279288',
                author_id: authors[11]._id,
                genre_id: genres[5]._id,
                category_id: genres[5]._id,
                total_stock: 20,
                available_stock: 20,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F10.jpg?alt=media&token=0ae883fa-bf3d-4d29-8e4b-52d3b8214a01',
                description: 'A hands-on, project-based introduction to programming.'
            },
            {
                title: 'Head First Design Patterns',
                isbn: '978-0596007126',
                author_id: authors[12]._id,
                genre_id: genres[5]._id,
                category_id: genres[5]._id,
                total_stock: 12,
                available_stock: 12,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F10.jpg?alt=media&token=0ae883fa-bf3d-4d29-8e4b-52d3b8214a01',
                description: 'A brain-friendly guide to design patterns.'
            },
            
            // Engineering Books (English)
            {
                title: 'Engineering Mathematics',
                isbn: '978-0831134709',
                author_id: authors[13]._id,
                genre_id: genres[6]._id,
                category_id: genres[6]._id,
                total_stock: 10,
                available_stock: 10,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F11.jpg?alt=media&token=cfe47e67-4d91-429c-bc82-4861b57fbb1f',
                description: 'Comprehensive guide to engineering mathematics fundamentals.'
            },
            {
                title: 'Materials Science and Engineering',
                isbn: '978-1119405499',
                author_id: authors[14]._id,
                genre_id: genres[6]._id,
                category_id: genres[6]._id,
                total_stock: 8,
                available_stock: 8,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F12.jpg?alt=media&token=f86dd470-349e-4ed4-b56a-4293d5b4c051',
                description: 'An introduction to materials science and engineering principles.'
            },
            
            // Libros de Programación (Español)
            {
                title: 'Python para Principiantes',
                isbn: '978-8441542105',
                author_id: authors[15]._id,
                genre_id: genres[5]._id,
                category_id: genres[5]._id,
                total_stock: 15,
                available_stock: 15,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F11.jpg?alt=media&token=cfe47e67-4d91-429c-bc82-4861b57fbb1f',
                description: 'Una guía completa para aprender Python desde cero.'
            },
            {
                title: 'Desarrollo Web con React',
                isbn: '978-8426732590',
                author_id: authors[16]._id,
                genre_id: genres[5]._id,
                category_id: genres[5]._id,
                total_stock: 10,
                available_stock: 10,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F10.jpg?alt=media&token=0ae883fa-bf3d-4d29-8e4b-52d3b8214a01',
                description: 'Aprende a crear aplicaciones web modernas con React.'
            },
            
            // Libros de Ingeniería (Español)
            {
                title: 'Fundamentos de Ingeniería Eléctrica',
                isbn: '978-6073227395',
                author_id: authors[17]._id,
                genre_id: genres[6]._id,
                category_id: genres[6]._id,
                total_stock: 12,
                available_stock: 12,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F71UBPNAvmAL.jpg?alt=media&token=6d5ba1b6-91dc-42c5-ae04-30fb063e4d3b',
                description: 'Conceptos fundamentales de la ingeniería eléctrica.'
            },
            {
                title: 'Resistencia de Materiales',
                isbn: '978-8436271669',
                author_id: authors[18]._id,
                genre_id: genres[6]._id,
                category_id: genres[6]._id,
                total_stock: 8,
                available_stock: 8,
                image: 'https://firebasestorage.googleapis.com/v0/b/gamingjr-7a862.appspot.com/o/books%2F1.jpg?alt=media&token=dacb019e-00fb-496f-9b22-94568b1b4a0f',
                description: 'Teoría y problemas de resistencia de materiales para ingenieros.'
            }
        ]);
        

        console.log('Books added:', books);

        // Cerrar la conexión
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

module.exports = { seed };
