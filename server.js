const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const {seed} = require('./seeding/seedData')
const loginRoutes = require('./routes/profileRoutes')
const userRoutes = require('./routes/userRoutes')
const booksRoutes = require('./routes/bookRoutes')
const loansRoutes = require('./routes/loanRoutes')
const reservationsRoutes = require('./routes/reservationRoutes');

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


app.use('/api', loginRoutes);
app.use('/api', userRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/reservations', reservationsRoutes);


app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
})

//seed()