const {
  crearUsuario,
  // todosLosUsuarios,
  traerUsuario,
  // traerUsuarioNombre,
  borrarUsuario,
  modificarUsuario,
  modificarRol,
  topUsuarios
} = require("../controllers/usuariosControllers");
const {updateUserAvatarController} = require('../controllers/auth/updateUserAvatarController')

const getTopUsuarios = async(req, res) =>{
  const {top} = req.body
  try {
    const response = await topUsuarios(top)
    res.json(response);
  }catch(error){
    res.status(400).json({ error: error.message });

  }
}

// const getUsuarios = async (req, res) => {
//   const { nombre_usuario, apellido_usuario } = req.query;
//   try {
//     if (nombre_usuario || apellido_usuario) {
//       const response = await traerUsuarioNombre(
//         nombre_usuario,
//         apellido_usuario
//       );
//       return res.status(200).json(response);
//     } else {
//       const response = await todosLosUsuarios();
//       return res.status(200).json(response);
//     }
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };



const getUsuario = async (req, res) => {
  const { email_usuario } = req.query;
  try {
    const response = await traerUsuario(email_usuario);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postUsuario = async (req, res) => {
  const { nombre_usuario, apellido_usuario, email_usuario, roles } = req.body;
  try {
    const response = await crearUsuario(
      nombre_usuario,
      apellido_usuario,
      email_usuario,
      roles
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUsuario = async (req, res) => {
  const { nombre_usuario, apellido_usuario, email_usuario, usuario_id } =
    req.body;
  try {
    const response = modificarUsuario(
      nombre_usuario,
      apellido_usuario,
      email_usuario,
      usuario_id
    );
    res.status(200).send(`Se actualizó el usuario ${usuario_id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { usuario_id } = req.body;
  console.log(usuario_id);
  try {
    const response = await borrarUsuario(usuario_id);
    if (response.inactivo === true) {
      return res.status(200).send(`Se eliminó el usuario ${usuario_id}`);
    } else {
      return res.status(200).send(`Se activó el usuario ${usuario_id}`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUsuarioRol = async (req, res) => {
  const { roles, usuario_id } = req.body;
  try {
    const response = modificarRol(usuario_id, roles);
    res.status(200).json({message:`Se modificó el rol del usuario ${usuario_id}`});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
 

const putUpddateUsuarioAvatarHandler = async (req, res) => {
    const { avatar, usuario_id } = req.body;

    try {
        // Validar si `usuario_id` está presente
        if (!usuario_id || !usuario_id.trim()) {
            return res.status(400).json({ message: 'Usuario Id no proporcionado' });
        }

        // Validar si `avatar` está presente
        if (!avatar || !avatar.trim()) {
            return res.status(400).json({ message: 'Avatar no proporcionado' });
        }

        // Si ambas validaciones pasan, proceder a actualizar el avatar
        const response = await updateUserAvatarController(usuario_id, avatar);

        // Verificar si la respuesta contiene un error
        if (response.error) {
            return res.status(400).json({ message: response.error });
        }

        // Si todo es exitoso, enviar un mensaje de éxito
        res.status(200).send('Se modificó el avatar del usuario actual');
    } catch (error) {
        // Manejar cualquier error que ocurra en el bloque try
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
  // getUsuarios,
  putUpddateUsuarioAvatarHandler,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  putUsuarioRol,
  getTopUsuarios
};
