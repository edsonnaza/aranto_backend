// verifyApiKey.js

// Middleware para verificar la API Key
const  verifyApiKey=(req, res, next) =>  {
    const apiKey = req.headers['api_key']; // Obtén la API Key del encabezado de la solicitud

    // Verifica si la API Key es válida comparándola con la API Key almacenada en el archivo .env
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Si la API Key es válida, continúa con la siguiente middleware
    next();
}

module.exports = verifyApiKey;
