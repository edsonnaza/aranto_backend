const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: "Token de autorización no proporcionado." });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido." });
        }
        req.user = user;
        next(); // Si el token es válido, pasa al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;
