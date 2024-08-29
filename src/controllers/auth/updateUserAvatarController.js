const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../../db');
const cloudinary = require('cloudinary').v2; // Asegúrate de tener configurado Cloudinary

const updateUserAvatarController = async (usuario_id, avatar) => {
    try {
        // Buscar el usuario
        const userActual = await Users.findByPk(usuario_id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        // Verificar si el usuario existe
        if (!userActual) {
            return { error: "Usuario no registrado o no encontrado" };
        }

        // Expresión regular para validar la URL de Cloudinary
        const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/dk4ysl2hw\/image\/upload\//;

        let avatarUrl = avatar;

        // Si el avatar proporcionado es diferente al actual
        if (avatar !== userActual.avatar) {
            // Si el avatar no es una URL de Cloudinary, subirlo a Cloudinary
            if (!cloudinaryRegex.test(avatar)) {
                try {
                    const result = await cloudinary.uploader.upload(avatar, {
                        upload_preset: "preset_imagenes_empleados",
                        allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
                    });
                    avatarUrl = result.secure_url;
                } catch (err) {
                    return { error: "Error al subir la imagen del avatar en Cloudinary: " + err.message };
                }
            }

            // Actualizar el avatar del usuario en la base de datos
            await Users.update(
                { avatar: avatarUrl },
                { where: { usuario_id: usuario_id } }
            );
        }

        return { message: 'Avatar actualizada con éxito.' };
    } catch (error) {
        console.error('Error al intentar actualizar el avatar:', error);
        return { error: 'Error al intentar actualizar el avatar del usuario actual.' };
    }
};

module.exports = { updateUserAvatarController };
