const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

//Definir el usuario 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    carnet:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingrese un correo electrónico válido']
    },
    type: {
        type: String,
        required: true,
        enum: ['student', 'professor', 'admin']
    },
    register_date: {
        type: Date,
        required: true,
        default: Date.now,
        unique: false
    },
    password: {
        type: String,
        required: true
    }
    
    // ,
    // loan_history: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Loan'
    // }],
    // reservations: [{   
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'reservations'
    // }]
})

// **Hook pre-save** para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha cambiado, sigue
    const salt = await bcrypt.genSalt(10); // Genera el salt
    this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña
    next(); // Continúa con el guardado
});

module.exports = mongoose.model('User', userSchema)