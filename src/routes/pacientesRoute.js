const { Router } = require("express");
const {
  getPacientePorIdHandler,
  createPacienteHandler,
  deletePacienteHandler,
  updatePacienteHandler,
  getAllPacientesHandler,
 
 
} = require("../handlers/pacientesHandler");
//const pacientesFiltrados = require("../controllers/pacientesFiltradosController");
const pacientes = Router();

pacientes.get("/", getAllPacientesHandler);
pacientes.get("/detalle/:id", getPacientePorIdHandler);
pacientes.post("/", createPacienteHandler);
pacientes.put("/update", updatePacienteHandler);
pacientes.put('/:id/delete-logico', deletePacienteHandler);


module.exports = pacientes;
