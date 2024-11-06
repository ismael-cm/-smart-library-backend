const Reservation = require('../models/Reservation');
const Loan = require('../models/Loan');
const Book = require('../models/Book');




// Función para calcular cuando estará disponible un libro
const calculateBookAvailabilityDate = async (bookId) => {
    // Obtener préstamos activos ordenados por fecha de devolución
    const activeLoans = await Loan.find({
        book_id: bookId,
        actual_return_date: null
    }).sort({ return_date: 1 });

    // Obtener reservas pendientes ordenadas por fecha
    const pendingReservations = await Reservation.find({
        book_id: bookId,
        status: 'Pending'
    }).sort({ reservation_date: 1 });

    const book = await Book.findById(bookId);
    const totalCopies = book.total_stock;
    const reservedCopies = pendingReservations.length;
    const loanedCopies = activeLoans.length;

    // Si hay copias disponibles, retorna null (disponible inmediatamente)
    if (loanedCopies + reservedCopies < totalCopies) {
        return null;
    }

    // Encontrar la próxima fecha disponible basada en devoluciones
    const nextAvailableDate = activeLoans[reservedCopies % totalCopies]?.return_date || new Date();
    return nextAvailableDate;
};

// **Obtener reservas por usuario**
const getBookAvailabilityDate = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        res.json(await calculateBookAvailabilityDate(bookId));
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo reservaciones', error: error.message });
    }
};


// Función para verificar y actualizar reservas expiradas
const checkExpiredReservations = async () => {
    const now = new Date();
    const expiredReservations = await Reservation.find({
        status: 'Pending',
        expiration_date: { $lt: now }
    });

    for (const reservation of expiredReservations) {
        reservation.status = 'Expired';
        await reservation.save();
    }
};

// **Crear una nueva reserva**
const createReservation = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Verificar préstamos existentes y vencidos
        const existingLoan = await Loan.findOne({
            user_id: userId,
            book_id: bookId,
            actual_return_date: null
        });

        if (existingLoan) {
            return res.status(400).json({ 
                message: 'Ya tienes este libro prestado' 
            });
        }

        // Verificar si hay copias disponibles inmediatamente
        const book = await Book.findById(bookId);
        const activeLoans = await Loan.countDocuments({
            book_id: bookId,
            actual_return_date: null
        });

        const pendingReservations = await Reservation.countDocuments({
            book_id: bookId,
            status: 'Pending'
        });

        if (activeLoans + pendingReservations < book.total_stock) {
            return res.status(400).json({ 
                message: 'Hay copias disponibles para préstamo inmediato' 
            });
        }

        // Calcular fecha de disponibilidad
        const availabilityDate = await calculateBookAvailabilityDate(bookId);
        const reservationExpiration = new Date(availabilityDate);
        reservationExpiration.setHours(reservationExpiration.getHours() + 48); // 48 horas para retirar

        const newReservation = new Reservation({
            book_id: bookId,
            user_id: userId,
            expiration_date: reservationExpiration,
            reservation_date: new Date()
        });

        await newReservation.save();
        
        res.status(201).json({ 
            message: 'Reserva creada exitosamente',
            reservation: newReservation,
            availableFrom: availabilityDate,
            mustPickupBefore: reservationExpiration
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error al crear la reserva', 
            error: error.message 
        });
    }
};

// Función para procesar un préstamo con reserva
const processLoanWithReservation = async (userId, bookId) => {
    // Verificar si el usuario tiene una reserva válida
    const reservation = await Reservation.findOne({
        user_id: userId,
        book_id: bookId,
        status: 'Pending',
        expiration_date: { $gt: new Date() }
    }).sort({ reservation_date: 1 });

    if (!reservation) {
        return {
            success: false,
            message: 'No tienes una reserva válida para este libro'
        };
    }

    // Actualizar la reserva
    reservation.status = 'Completed';
    await reservation.save();

    return {
        success: true,
        reservation
    };
};

// **Obtener reservas por usuario**
const getReservationsByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const reservations = await Reservation.find({ user_id: userId }).populate('book_id');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo reservaciones', error: error.message });
    }
};

// **Obtener reservas por libro**
const getReservationsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reservations = await Reservation.find({ book_id: bookId }).populate('user_id');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo reservaciones', error: error.message });
    }
};

// **Actualizar el estado de las reservas**
const updateReservationStatus = async (req, res) => {
    try {
        const { reservationId, status } = req.body;

        // Verificar si el estado proporcionado es válido
        if (!['Pending', 'Completed', 'Expired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Actualizar el estado de la reserva
        const reservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { status },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }

        res.json({ message: 'Reservation status updated successfully', reservation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reservation status', error: error.message });
    }
};

module.exports = {
    createReservation,
    processLoanWithReservation,
    getReservationsByUser,
    checkExpiredReservations,
    getReservationsByBook,
    updateReservationStatus,
    calculateBookAvailabilityDate,
    getBookAvailabilityDate
};
