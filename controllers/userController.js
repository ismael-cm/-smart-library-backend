const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// **Registro de usuario tipo "student"**
const registerUser = async (req, res) => {
    const { name, carnet, email, password } = req.body;
    try {
        console.log('Registration attempt for email:', email);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists with this email');
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        const newUser = new User({
            name,
            carnet,
            email,
            type: 'student',
            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved successfully with id:', newUser._id);
        
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userResponse 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

//** Autenticar usuario **/
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Login attempt for email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with this email');
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Password matched, generating token');
        const token = jwt.sign(
            { 
                id: user._id, 
                type: user.type,
                email: user.email 
            }, 
            process.env.JWT_SECRET || 'secretKey',
            { 
                expiresIn: '1h' 
            }
        );

        console.log('Login successful');
        res.json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                type: user.type
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};



// **Actualizar información del usuario**
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, carnet, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { name, carnet, email },
            { new: true } // Devolver el usuario actualizado
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userResponse = user.toObject();
        delete userResponse.password;
        res.json({ message: 'User updated successfully', userResponse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// **Cambiar la contraseña**
const changePassword = async (req, res) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar la contraseña actual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hashear la nueva contraseña
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        // Acceder a la información del usuario autenticado
        const userId = req.user.id;
        const userEmail = req.user.email;
        const userType = req.user.type;

        // Usar `userId` para buscar el perfil del usuario en la base de datos
        const user = await User.findById(userId).select('-password'); // Excluir la contraseña
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUser, changePassword, getProfile };
