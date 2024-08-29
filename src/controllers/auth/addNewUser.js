const { Users } = require('../../db');
const bcrypt = require('bcrypt');
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const addNewUser = async (req, res) => {
  const { email, password, user_name, user_lastname,avatar } = req.body;

  // if (!email || !password || !user_name || !user_lastname) {
  //   return res.status(400).json({
  //     error: 'Campos vacíos',
  //     details: {
  //       email: req.body.email,
  //       password: password,
  //       name: user_name,
  //       lastname: user_lastname
  //     }
  //   });

    let emptyFields = {};

if (!req.body.email) {
  emptyFields.email = 'Email es un campo obligatorio, favor ingresar un email válido';
}
if (!password) {
  emptyFields.password = 'Contraseña es un campo obligatorio, favor ingresar una contraseña';
}
if (!user_name) {
  emptyFields.name = 'Nombre es un campo obligatorio, favor ingresar una contraseña';
}
if (!user_lastname) {
  emptyFields.lastname = 'Apellido es un campo obligatorio, favor ingresar el apellido';
}

if (Object.keys(emptyFields).length > 0) {
  return res.status(400).json({
    error: 'Campos vacíos',
    details: emptyFields
  });
}

// Continue with the rest of your logic if there are no empty fields

  

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) res.status(500).json({'error':`Error with hashed password ${hashedPassword}`});


    const avatar_cloud = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        avatar,
        {
          upload_preset: "preset_imagenes_empleados",
          allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
        },
        (err, result) => {
          if (err) {
            reject(new Error("Error al subir la imagen primaria: " + JSON.stringify(err)));        
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });

    const user = await Users.create({
     // id: null,
      email,
      user_name,
      user_lastname,
      password: hashedPassword,
      avatar:avatar_cloud
    });

    return res.status(201).json(user);

  } catch (error) {
    // Verificar si el error es un error de validación por correo electrónico duplicado
    if (error.name === 'SequelizeUniqueConstraintError' && error.fields.email) {
      return res.status(400).send('Email already exists');
    }
     // Verificar si el error es un error 404 (Recurso no encontrado)
     if (error.name === 'SequelizeEmptyResultError') {
      return res.status(404).send('Resource not found');
    }
    return res.status(500).send(error.message);
  }
}

module.exports = { addNewUser };
