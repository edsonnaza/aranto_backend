const { RefreshToken } = require('../../db'); // Asegúrate de que este modelo está importado

const tokenRevoke = async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ message: 'Token requerido.' });
    }
    
    try {
        const tokenRecord = await RefreshToken.findOne({ where: { token } });
        console.log('revoke token', tokenRecord)
        
        if (!tokenRecord) {
            return res.status(404).json({ message: 'Token no encontrado.' });
        }

        tokenRecord.revoked = true;
        await tokenRecord.save();

        res.status(200).json({ message: 'Token revocado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: `Error al revocar el token: ${error.message}` });
    }
};

module.exports = { tokenRevoke };
