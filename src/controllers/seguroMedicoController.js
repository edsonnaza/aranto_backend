const { SeguroMedico } = require('../db');

  

const getAllSegurosMedicosController = async () =>{
    const response = await SeguroMedico.findAll();
    return(response);
}
const getSeguroMedicoController = async (id) =>{
    const response = await SeguroMedico.findByPk(id);
    if(response === null){
       return('El seguro medico no existe!');
    }else{
       
       return(response);
    }
}

const deleteSeguroMedicoController = async (id,activo) =>{
   
    
    try {
        const [updatedRowsCount, updatedSegurosMedicos] = await SeguroMedico.update(
            { activo:activo },
            { where: { seguromedico_id:id }, returning: true } // Establece "returning: true" para obtener los registros actualizados
        );

        if (updatedRowsCount > 0) {
            // Se actualizó al menos un registro, devuelve el resultado de la actualización
            return updatedSegurosMedicos;
        } else {
            throw new Error(`No se encontró ningún seguro médico con el ID ${id}`);
        }
    } catch (error) {
        throw new Error(`Error al intentar borrar el seguro médico: ${error.message}`);
    }
      
}
const modificarSeguroMedicoController = async (id, seguromedico_nombre, descripcion) => {
    try {
        const [updatedRowsCount, updatedSegurosMedicos] = await SeguroMedico.update(
            { seguromedico_nombre, descripcion },
            { where: { seguromedico_id:id }, returning: true } // Establece "returning: true" para obtener los registros actualizados
        );

        if (updatedRowsCount > 0) {
            // Se actualizó al menos un registro, devuelve el resultado de la actualización
            return updatedSegurosMedicos;
        } else {
            throw new Error(`No se encontró ningún seguro médico con el ID ${id}`);
        }
    } catch (error) {
        throw new Error(`Error al modificar el seguro médico: ${error.message}`);
    }
};

const createSeguroMedicoController = async ({seguromedico_nombre, descripcion}) =>{
   
    try {
       
        const seguroMedico= await SeguroMedico.create({seguromedico_nombre, descripcion});
       
       
        return seguroMedico;
        
    } catch (error) {
        throw new Error("Error en el controller al intentar registrar el seguro medico.: " + error.message);
    }
}

 

module.exports = {
    getAllSegurosMedicosController,
    getSeguroMedicoController,
    createSeguroMedicoController,
    modificarSeguroMedicoController,
    deleteSeguroMedicoController
    
     
   
}