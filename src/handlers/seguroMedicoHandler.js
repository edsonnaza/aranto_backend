const { getAllSegurosMedicosController, getSeguroMedicoController, 
    createSeguroMedicoController, 
    modificarSeguroMedicoController, 
    deleteSeguroMedicoController } = require("../controllers/seguroMedicoController.js");


const getAllSegurosMedicos = async (req, res) => {
    try{
        const response = await getAllSegurosMedicosController()
        if (response.length === 0) {
            return res.status(404).json({ message: "Sin datos registrados en seguro médico." });
        }  

            res.status(200).json(response);
       
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getSeguroMedico = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await getSeguroMedicoController(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postSeguroMedico = async (req, res) => {
    const {  seguromedico_nombre,
             descripcion,
           } = req.body;

            const errors = [];
  
            if (!seguromedico_nombre) {
              errors.push('Ingresar seguro medico nombre');
            }
          
            if (!descripcion) {
              errors.push('Ingresar una breve descripción');
            }
           
        
            if (errors.length > 0) {
              return res.status(400).json({ error: `Sin datos o datos inválidos para los campos: ${errors.join(', ')}.` });
            }
   
    try{
        const response = await createSeguroMedicoController({seguromedico_nombre,
            descripcion})
        res.status(200).json(response);
    }
    catch(error){
    
        res.status(400).json({error: error.message});
    }
}

const putSeguroMedico = async (req, res) => {
    const { id } = req.params;
    const { seguromedico_nombre, descripcion } = req.body; // Asegúrate de que los datos se envíen en el cuerpo de la solicitud
     
    const errors = [];
  
    if (!seguromedico_nombre) {
      errors.push('Ingresar seguro medico nombre');
    }
  
    if (!descripcion) {
      errors.push('Ingresar una breve descripción');
    }
   

    if (errors.length > 0) {
      return res.status(400).json({ error: `Sin datos o datos inválidos para los campos: ${errors.join(', ')}.` });
    }

    try {
        const updatedSegurosMedicos = await modificarSeguroMedicoController(id, seguromedico_nombre, descripcion);
        res.status(200).json({
            message: `Se modificó correctamente el seguro médico con el ID ${id}`,
            data: updatedSegurosMedicos
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteSeguroMedico = async (req, res) => {
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
        const updatedSegurosMedicos = await deleteSeguroMedicoController(id,activo);
        res.status(200).json({
            message: `Se borró correctamente el seguro médico con el ID ${id}`,
            data: updatedSegurosMedicos
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllSegurosMedicos,
    getSeguroMedico,
    postSeguroMedico,
    putSeguroMedico,
    deleteSeguroMedico
}