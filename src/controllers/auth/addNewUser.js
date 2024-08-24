const { Users } = require('../../db');
const bcrypt = require('bcrypt');

const addNewUser = async (req, res) => {
  const { email, password, user_name, user_lastname } = req.body;

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
  emptyFields.email = 'Email is required';
}
if (!password) {
  emptyFields.password = 'Password is required';
}
if (!user_name) {
  emptyFields.name = 'Name is required';
}
if (!user_lastname) {
  emptyFields.lastname = 'Lastname is required';
}

if (Object.keys(emptyFields).length > 0) {
  return res.status(400).json({
    error: 'Empty fields',
    details: emptyFields
  });
}

// Continue with the rest of your logic if there are no empty fields

  

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) res.status(500).json({'error':`Error with hashed password ${hashedPassword}`});

    const user = await Users.create({
     // id: null,
      email,
      user_name,
      user_lastname,
      password: hashedPassword
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
