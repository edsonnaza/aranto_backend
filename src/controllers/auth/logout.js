const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../../db'); // Asegúrate de que este modelo está importado

const logout = async (req, res) => {
    try {
        const { accessToken } = req.body;
      // console.log('antes del await logoutn', accessToken)
       // Verifica que el token esté presente
       if (!accessToken) {
        return res.status(400).json({ message: 'Refresh token es necesario.' });
    }
        // Busca el token en la base de datos
        const token = await RefreshToken.findOne({ where: { token: accessToken } });
         
       // console.log('logout process token', token)
        if (!token) {
            return res.status(404).json({ message: 'Token no encontrado.' });
        }
        if(token.revoked===true){
            return res.status(200).json({message:'Sessión inválido, el token ya ha sido revocado.'})
        }

        // Revoca el token
        token.revoked = true;
        await token.save();

        res.status(200).json({ message: 'Sessión terminada con éxito.' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error); 
        res.status(500).json({ message: 'Error al revocar el token y cerrar la sessión.', error });
    }
};

module.exports= {logout};
