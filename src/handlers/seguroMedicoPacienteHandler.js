const { getAllSegurosPacientesController, getSeguroMedicoPacienteController, 
    createSeguroMedicoPacienteController, modificarSeguroMedicoPacienteController, 
    deleteSeguroMedicoPacienteController } = require("../controllers/SeguroMedicoPacienteController.js");


    const getAllSegurosMedicosPacientes = async (req, res) => {
        try {
            const response = await getAllSegurosPacientesController();
            if (response.length === 0) {
                return res.status(404).json({ message: "No existen datos de seguro médico empleados registrados." });
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    

const getSeguroMedicoPaciente = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await getSeguroMedicoPacienteController(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postSeguroMedicoPaciente = async (req, res) => {
    const {  empleado_id, seguromedico_id, importe_mensual,descripcion} = req.body;

            const errors = [];
  
            if (!empleado_id) {
              errors.push('Ingresar el Id empleado');
            }
            if (!seguromedico_id) {
                errors.push('Ingresar el ID del seguro médico');
              }

              if (!importe_mensual) {
                errors.push('Ingresar el importe mensual');
              }
          
            if (!descripcion) {
              errors.push('Ingresar una breve descripción');
            }
           
        
            if (errors.length > 0) {
              return res.status(400).json({ error: `Sin datos o datos inválidos para los campos: ${errors.join(', ')}.` });
            }
   
    try{
        const response = await createSeguroMedicoPacienteController({empleado_id, seguromedico_id, importe_mensual,descripcion})
        res.status(200).json(response);
    }
    catch(error){
    
        res.status(400).json({error: error.message});
    }
}

const putSeguroMedicoPaciente = async (req, res) => {
    const { id } = req.params;
    const { empleado_id,seguromedico_id,importe_mensual, descripcion } = req.body; // Asegúrate de que los datos se envíen en el cuerpo de la solicitud
     
    const errors = [];
  
        if (!id) {
            errors.push('Ingresar el Id del registro del seguro medico del empleado');
        }
        if (!empleado_id) {
            errors.push('Ingresar el Id empleado');
        }
        if (!seguromedico_id) {
            errors.push('Ingresar el ID del seguro médico');
            }

            if (!importe_mensual) {
            errors.push('Ingresar el importe mensual');
            }
        
        if (!descripcion) {
            errors.push('Ingresar una breve descripción');
        }
        
    
        if (errors.length > 0) {
            return res.status(400).json({ error: `Sin datos o datos inválidos para los campos: ${errors.join(', ')}.` });
        }
 

    try {
        const updatedSegurosMedicos = await modificarSeguroMedicoPacienteController(id, empleado_id, seguromedico_id,importe_mensual, descripcion);
        res.status(200).json({
            message: `Se modificó correctamente el seguro médico con el ID ${id}`,
            data: updatedSegurosMedicos
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteSeguroMedicoPaciente = async (req, res) => {
    const { id } = req.params;
    const { activo } = req.query;
    const errors = [];

    if (!id) {
        errors.push('Ingresar un ID para continuar');
      }
      if (!activo) {
        errors.push('Ingresar en activo true o false para borrar');
      }
     
  
      if (errors.length > 0) {
        return res.status(400).json({ error: `Sin datos o datos inválidos para los campos: ${errors.join(', ')}.` });
      }


    try {
        const updatedSegurosMedicos = await deleteSeguroMedicoPacienteController(id,activo);
        res.status(200).json({
            message: `Se activó/desactivó correctamente el seguro médico con el ID ${id}`,
            data: updatedSegurosMedicos
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllSegurosMedicosPacientes,
    getSeguroMedicoPaciente,
    postSeguroMedicoPaciente,
    putSeguroMedicoPaciente,
    deleteSeguroMedicoPaciente
}