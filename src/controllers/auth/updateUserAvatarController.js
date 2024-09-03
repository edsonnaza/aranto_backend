const { Users } = require('../../db');
const cloudinary = require('cloudinary').v2; // Asegúrate de tener configurado Cloudinary
const { uploadImage } = require("../../../cloudinary.js");
const updateUserAvatarController = async (usuario_id, avatarFile) => {
 
   


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

        let avatarToUpdate = avatarFile;
        // Hacemos uso de cloudinary para subir el archivo
        //  const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        //   folder: 'images', // Asignamos la carpeta de destino
        // });
 
  
      // Extraemos la url pública del archivo en cloudinary
      
        if (avatarFile !== userActual.avatar) {
            // Si el avatar no es una URL de Cloudinary, subirlo a Cloudinary
           // if (!cloudinaryRegex.test(avatar)) {
            const result = await uploadImage(avatarFile);

            // Actualizar el avatar del usuario en la base de datos
          if(result.url){ 

            await Users.update(
                { avatar: result.url},
                { where: { usuario_id: usuario_id } }
            );
            return { message: "Avatar actualizado con éxito.",
                            "details": result };
          }
        }

    } catch (error) {
        console.error('Error al intentar actualizar el avatar:', error);
        return { error: 'Error al intentar actualizar el avatar del usuario.' };
    }
};

module.exports = { updateUserAvatarController };
