// const { uploadImage } = require("../../cloudinary.js");

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
 
 


// const putUpddateUsuarioAvatarHandler = async (req, res) => {
//   const { file } = req;
//   const usuario_id = req.body.usuario_id;
//   console.log('multipart:',{file}, usuario_id);
   

//   const url = await uploadImage(file);
   
//   if (!url) {
//     return res
//       .status(500)
//       .json({ error: "error to upload file" });
//   }
  
//   res.json({ url });
//   // Obtener `usuario_id` desde la query string o desde el cuerpo de la solicitud
//   //const usuario_id = req.query.usuario_id || req.body.usuario_id;
//   // Validamos que nos envíen algún archivo
//   //console.log('file avatar body', req.body.avatar);
//  // console.log('file avatar requery',req );
//   // if (!req.files || Object.keys(req.files).length === 0) {
//   //  // return res.status(400).send('No files were uploaded.');
//   // }
  
//   //const avatarFile = req.files.file; // El archivo cargado estará en req.file
// // Extraemos el archivo de la request
// // el nombre "file" debe coincidir
// // con el valor del atributo name del input
//  console.log(usuario_id);
//   // Validar si `usuario_id` está presente
//   if (!usuario_id || !usuario_id.trim()) {
//     //  return res.status(400).json({ message: 'Usuario Id no proporcionado' });
//   }

//   let avatarUrl = '';

//   // Si se ha subido un archivo, procesa el archivo
//   // if (avatarFile) {
//   //     try {
//   //         // Convertir el archivo en un buffer para enviarlo al controlador
//   //         avatarUrl = avatarFile.buffer; 
//   //     } catch (err) {
//   //         return res.status(500).json({ message: 'Error al procesar el archivo: ' + err.message });
//   //     }
//   // } else if (req.body.avatar) {
//   //     // Si se proporciona una URL de avatar en el cuerpo de la solicitud
//   //     avatarUrl = req.body.avatar;
//   // } else {
//   //     return res.status(400).json({ message: 'Avatar no proporcionado' });
//   // }

//   // try {
//   //     // Si ambas validaciones pasan, proceder a actualizar el avatar
//   //     const response = await updateUserAvatarController(usuario_id, avatarFile);

//   //     // Verificar si la respuesta contiene un error
//   //     if (response.error) {
//   //         return res.status(400).json({ message: response.error });
//   //     }

//   //     // Si todo es exitoso, enviar un mensaje de éxito
//   //     res.status(200).send('Se modificó el avatar del usuario actual');
//   // } catch (error) {
//   //     res.status(400).json({ error: error.message });
//   // }
// };


 
const putUpddateUsuarioAvatarHandler = async (req, res) => {
  const { usuario_id } = req.body;
  const avatarFile = req.file; // Archivo cargado en req.file

  if (!usuario_id || !usuario_id.trim()) {
      return res.status(400).json({ message: 'Usuario Id no proporcionado' });
  }

  try {
      //let avatarUrl = '';

      if (avatarFile) {
           //const result = await uploadImage(avatarFile);
           const response = await updateUserAvatarController(usuario_id, avatarFile);
           return res.status(200).json({response})
      //     avatarUrl = result.url;
      // } else if (req.body.avatar) {
      //     avatarUrl = req.body.avatar;
      } else {
          return res.status(400).json({ message: 'Avatar no proporcionado' });
      }


      // if (response.error) {
      //     return res.status(400).json({ message: response.error });
      // }

     // res.status(200).send('Se modificó el avatar del usuario actual');
  } catch (error) {
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
