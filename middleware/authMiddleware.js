const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado
    if (!token) {
        return res.status(401).json({ message: 'No tienes permiso de realizar esta acción' });
    }

    try {
        console.log(`verificando token ${token}`)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = decoded; // Guardar la información del usuario en `req.user`
        next(); // Continuar con la solicitud
    } catch (error) {
        console.log(error)
        res.status(403).json({ message: 'Sesión inválida, accede nuevamente!' });
    }
};

module.exports = authenticateToken;
