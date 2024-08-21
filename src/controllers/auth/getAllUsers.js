const { Users } = require('../../db');

const getAllUsers = async (req, res) => {
    try {
        const filters = req.query; // Aplicar filtros si es necesario
        const users = await Users.findAll({
            where: filters,
            attributes: ['usuario_id', 'user_name', 'user_lastname', 'email', 'roles', 'inactivo'] // Seleccionar solo los campos específicos
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "Sin usuarios registrados." });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios.", error: error.message });
    }
};

module.exports = { getAllUsers };
