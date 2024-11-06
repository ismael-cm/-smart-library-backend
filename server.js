const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const {seed} = require('./seeding/seedData')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const booksRoutes = require('./routes/bookRoutes')
const loansRoutes = require('./routes/loanRoutes')
const reservationsRoutes = require('./routes/reservationRoutes');
const genreRoutes = require('./routes/genreRoutes');
const authenticateToken = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

//CONEXION A MONGO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.log('Error al conectar a MongoDB:', error);
    })


app.use('/api', authRoutes);
app.use('/api', authenticateToken, userRoutes);
app.use('/api/books', authenticateToken, booksRoutes);
app.use('/api/loans', authenticateToken, loansRoutes);
app.use('/api/reservations', authenticateToken, reservationsRoutes);
app.use('/api/genres',authenticateToken, genreRoutes)


app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
})

//seed()