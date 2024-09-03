const { Router } = require("express");
const multer = require('multer');
const {
  // getUsuarios,
  putUpddateUsuarioAvatarHandler,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  putUsuarioRol,
  getTopUsuarios
} = require("../handlers/usuariosHandlers");
const usuariosFiltrados = require('../controllers/usuariosFiltradosControllers');
// Configuración de multer para manejar archivos
const storage = multer.memoryStorage(); // O usa diskStorage si prefieres almacenar en disco
const upload = multer({ storage }).single("avatar");
const users = Router();


users.get("/", usuariosFiltrados);
users.get("/top", getTopUsuarios);
users.get("/user", getUsuario);
users.post("/user", postUsuario);
users.put("/", putUsuario);
users.put("/rol", putUsuarioRol);
users.put("/delete", deleteUsuario);
users.put("/update-user-avatar", upload, putUpddateUsuarioAvatarHandler);

module.exports = users;
