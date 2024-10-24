const {Router} = require ('express');
const { getAllSegurosMedicosEmpleados,
    getSeguroMedicoPaciente,
    postSeguroMedicoPaciente,
    putSeguroMedicoPaciente,
    deleteSeguroMedicoPaciente
   } = require('../handlers/SeguroMedicoPacienteHandler.js');
const SeguroMedicoPacienteRoute = Router();

SeguroMedicoPacienteRoute.get('/',getAllSegurosMedicosEmpleados)
SeguroMedicoPacienteRoute.get('/:id',getSeguroMedicoPaciente)
SeguroMedicoPacienteRoute.post('/',postSeguroMedicoPaciente)
SeguroMedicoPacienteRoute.put('/:id',putSeguroMedicoPaciente)
SeguroMedicoPacienteRoute.put('/:id/delete-logico-empleado',deleteSeguroMedicoPaciente)

module.exports = SeguroMedicoPacienteRoute;