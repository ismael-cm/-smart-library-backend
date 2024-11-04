const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservation_date: { type: Date, required: true, default: Date.now },
    expiration_date: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Expired'], default: 'Pending' },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
