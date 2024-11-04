const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    total_stock: { type: Number, required: true },
    available_stock: { type: Number, required: true },
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', bookSchema);
