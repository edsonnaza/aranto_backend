const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users, RefreshToken } = require('../../db');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Por favor, proporciona un email." });
    }

    if (!password) {
        return res.status(400).json({ error: "Por favor, proporciona una contraseña." });
    }
    try {
      // 1. Verificar si el email está registrado
      const user = await Users.findOne({ where: { email } });
      //console.log('login user', user,email,password)
      if (!user) {
          // Si el email no está registrado, devolver un error 404
          return res.status(404).json({ message: 'El email no está registrado.' });
        }
        
        // 2. Verificar si la contraseña es correcta solo si el email existe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Si la contraseña no es correcta, devolver un error 401
            return res.status(401).json({ message: 'La contraseña es incorrecta.' });
        }

        // Generar tokens de acceso y refresh
        const accessToken = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Guardar el refreshToken en la base de datos
        await RefreshToken.create({
            userId: user.usuario_id,
            token: refreshToken
        });

        // Enviar tokens como respuesta
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        // Manejo de errores internos del servidor
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud de login.', error: error.message });
    }
};

module.exports = { login };
