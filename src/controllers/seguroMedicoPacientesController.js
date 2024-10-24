const { SeguroMedicoPaciente } = require('../DB_connection');

  

const getAllSegurosPacientesController = async () =>{
    const response = await SeguroMedicoPaciente.findAll();
    
    if(response === null){
        return('Seguro medico de funcionarios no existe!');
     }else{
        
        return(response);
     }
}
const getSeguroMedicoPacienteController = async (id) =>{
    const response = await SeguroMedicoPaciente.findByPk(id);
    if(response === null){
       return('El seguro medico del funcionario no existe!');
    }else{
       
       return(response);
    }
}

const deleteSeguroMedicoPacienteController = async (id,activo) =>{
   
    console.log('controller ID', id);
    console.log('activo', activo);
    try {
        const [updatedRowsCount, updatedSegurosMedicos] = await SeguroMedicoPaciente.update(
            { activo:activo },
            { where: { seguromedemp_id:id }, returning: true } // Establece "returning: true" para obtener los registros actualizados
        );

        if (updatedRowsCount > 0) {
            // Se actualizó al menos un registro, devuelve el resultado de la actualización
            return updatedSegurosMedicos;
        } else {
            throw new Error(`Controller: No se encontró ningún registro del seguro médico con el ID ${id}`);
        }
    } catch (error) {
        throw new Error(`Error al intentar borrar el seguro médico del empleado: ${error.message}`);
    }
      
}
const modificarSeguroMedicoPacienteController = async (id, empleado_id, seguromedico_id, importe_mensual,descripcion) => {
    try {
        const [updatedRowsCount, updatedSegurosMedicos] = await SeguroMedicoPaciente.update(
            { seguromedico_id, empleado_id, importe_mensual,descripcion },
            { where: { seguromedemp_id:id }, returning: true } // Establece "returning: true" para obtener los registros actualizados
        );

        if (updatedRowsCount > 0) {
            // Se actualizó al menos un registro, devuelve el resultado de la actualización
            return updatedSegurosMedicos;
        } else {
            throw new Error(`Controller: No se encontró ningún seguro médico registrado con el ID ${id}`);
        }
    } catch (error) {
        throw new Error(`Error al modificar el seguro médico del empleado: ${error.message}`);
    }
};

const createSeguroMedicoPacienteController = async ({empleado_id, seguromedico_id, importe_mensual,descripcion}) =>{
   
    try {
       
        const seguroMedico= await SeguroMedicoPaciente.create({empleado_id, seguromedico_id, importe_mensual,descripcion});
       
       
        return seguroMedico;
        
    } catch (error) {
        throw new Error("Error en el controller al intentar registrar el seguro medico del empleado.: " + error.message);
    }
}

 

module.exports = {
    getAllSegurosPacientesController,
    getSeguroMedicoPacienteController,
    createSeguroMedicoPacienteController,
    modificarSeguroMedicoPacienteController,
    deleteSeguroMedicoPacienteController
    
     
   
}