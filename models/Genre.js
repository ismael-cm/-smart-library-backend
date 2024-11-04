const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    description: { type: String, required: true },
});

module.exports = mongoose.model('Genre', genreSchema);
