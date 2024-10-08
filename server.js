const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const loginRoutes = require('./routes/profileRoutes')

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

app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
})