const {Router} = require ('express');
const { getAllSegurosMedicos,
    getSeguroMedico,
    postSeguroMedico,
    putSeguroMedico,
    deleteSeguroMedico } = require('../handlers/seguroMedicoHandler.js');
const seguroMedicoRoute = Router();

seguroMedicoRoute.get('/',getAllSegurosMedicos)
seguroMedicoRoute.get('/:id',getSeguroMedico)
seguroMedicoRoute.post('/',postSeguroMedico)
seguroMedicoRoute.put('/:id',putSeguroMedico)
seguroMedicoRoute.put('/:id/delete-logico',deleteSeguroMedico)

module.exports = seguroMedicoRoute;