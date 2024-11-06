const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');
const Reservation = require('../models/Reservation')
const { processLoanWithReservation, checkExpiredReservations } = require('./ReservationController');



const hasExistingLoan = async (userId, bookId) => {
    return await Loan.findOne({
        user_id: userId,
        book_id: bookId,
        actual_return_date: null
    });
}

const hasOverdueLoan = async (userId) => {
    return await Loan.findOne({
        user_id: userId,
        actual_return_date: null,
        return_date: { $lt: new Date() }
    });
}

const checkBoockStock = async (bookId, book) => {
    const reservations = await Reservation.find({
        book_id: bookId,
        status: 'Pending'
    }).sort({ reservation_date: 1 }); // Ordenar por fecha de reserva

    let availableStock = book.available_stock - reservations.length;

    // Verificar si el usuario tiene una reserva válida
    const userReservation = reservations.find(reservation => reservation.user_id.toString() === userId);
    if (availableStock <= 0 && !userReservation) {
        return false;
    }

    return { reservations, userReservation }
}


// **Crear un nuevo préstamo**
const createLoan = async (req, res) => {
    console.log('/loan/create')
    console.log(req.body)
    try {
        const { userId, bookId, days } = req.body;
        
        // Primero, actualizar reservas expiradas
        await checkExpiredReservations();

        const existingLoan = await hasExistingLoan(userId, bookId);

        if(existingLoan) {
            return res.status(400).json({ message: 'El usuario ya tiene este libro prestado'})
        }

        const overdueLoan = await hasOverdueLoan(userId);
        if(overdueLoan) {
            return res.status(400).json({ message: 'Tiene una devolución pendiente. Devuelve el libro antes de prestar otro'})
        }

        // Verificar disponibilidad del libro
        const book = await Book.findById(bookId);
        const activeLoans = await Loan.countDocuments({
            book_id: bookId,
            actual_return_date: null
        });
        if(!book) {
            return res.status(400).json({ message: 'El libro que quieres prestar no existe'})
        }

        // Procesar préstamo con reserva si es necesario
        const reservationResult = await processLoanWithReservation(userId, bookId);
        
        if (activeLoans >= book.total_stock && !reservationResult.success) {
            return res.status(400).json({ 
                message: 'No hay copias disponibles y no tienes una reserva válida' 
            });
        }

        // Crear el préstamo
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + days); // 14 días de préstamo

        const newLoan = new Loan({
            user_id: userId,
            book_id: bookId,
            loan_date: new Date(),
            return_date: returnDate
        });

        await newLoan.save();

        // Actualizar stock del libro
        book.available_stock -= 1;
        await book.save();

        res.status(201).json({
            message: 'Préstamo creado exitosamente',
            loan: newLoan
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error al crear el préstamo', 
            error: error.message 
        });
    }
};


// **Devolver un libro**
const returnBook = async (req, res) => {
    try {
        const { loanId } = req.params;

        // Encontrar el préstamo
        const loan = await Loan.findById(loanId).populate('book_id');
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Actualizar el stock del libro
        const book = await Book.findById(loan.book_id._id);
        book.available_stock += 1;
        await book.save();

        // Registrar la fecha de devolución real
        loan.actual_return_date = new Date();
        await loan.save();

        res.json({ message: 'Book returned successfully', loan });
    } catch (error) {
        res.status(500).json({ message: 'Error returning book', error: error.message });
    }
};

// **Listar todos los préstamos**
const getAllLoans = async (req, res) => {
    try {
        const userId = req.user.id;
        const loans = await Loan.find({ user_id: userId }).populate('user_id book_id');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loans', error: error.message });
    }
};

// **Obtener préstamos por usuario**
const getLoansByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const loans = await Loan.find({ user_id: userId }).populate('book_id');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loans for user', error: error.message });
    }
};

module.exports = { createLoan, returnBook, getAllLoans, getLoansByUser, hasExistingLoan };
