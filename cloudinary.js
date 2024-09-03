const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para crear la URL optimizada
const createUrl = (public_id, format, version) => {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto/v${version}/${public_id}.${format}`;
};

// Función para subir una imagen usando streams
const uploadStream = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            upload_preset: "avatar",
            allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
            folder: "avatar" // Especifica la carpeta donde se almacenará la imagen
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        stream.end(buffer);
    });
};


// Función que envuelve uploadStream y createUrl
const uploadImage = async (file) => {
    try {
        const result = await uploadStream(file.buffer);
        const url = createUrl(result.public_id, result.format, result.version);
        return { url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error al subir la imagen a Cloudinary: ' + error.message);
    }
};

module.exports = {
    uploadImage,
};
