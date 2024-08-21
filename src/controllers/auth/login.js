const { Users } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Por favor, proporciona un email y una contraseña." });
    }

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Correo electrónico no registrado." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: "Contraseña inválida." });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.usuario_id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        return res.json({
            id: user.id,
            email: user.email,
            user_name: user.user_name,
            user_lastname: user.user_lastname,
            token // Envía el token de vuelta al cliente
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { login };
