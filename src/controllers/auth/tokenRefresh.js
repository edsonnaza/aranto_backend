const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../../db'); // Asegúrate de que este modelo está importado

const tokenRefresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No se proporcionó refresh token' });
    }

    try {
        // Verificar si el refresh token es válido y existe en la base de datos
        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!tokenRecord || tokenRecord.revoked || new Date() > new Date(tokenRecord.expiresAt)) {
            return res.status(403).json({ message: 'Refresh token no válido o expirado' });
        }

        // Decodificar el refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Generar un nuevo access token
        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Refresh token inválido', error: error.message });
    }
};

module.exports = { tokenRefresh };
