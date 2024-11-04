const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    loan_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Loan', loanSchema);
