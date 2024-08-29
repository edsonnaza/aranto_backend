const { Router } = require("express");
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

const users = Router();

users.get("/", usuariosFiltrados);
users.get("/top", getTopUsuarios);
users.get("/user", getUsuario);
users.post("/user", postUsuario);
users.put("/", putUsuario);
users.put("/rol", putUsuarioRol);
users.put("/delete", deleteUsuario);
users.put("/update-user-avatar",putUpddateUsuarioAvatarHandler);

module.exports = users;
