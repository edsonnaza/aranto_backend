const dayjs = require('dayjs');
const {
    PacientesPerPageController,
  
    allPacientesController,
    getPacientePorIdController,
    createPacienteController,
    deletePacienteController,
    updatePacienteController,
    //updateHorasExtras,
    //updateHorasCatedras,
    //updateDescuentos,
  } = require("../controllers/pacientesController");
  
//   const getTopProductos = async (req, res) => {
//     const {top} = req.body
//     try {
//       const response = await topProductos(top)
//       res.json(response);
//     }catch(error){
//       res.status(400).json({ error: error.message });
  
//     }
//   }
  
  // const getPacientesHandler = async (req, res) => {
  //   const { paginaActual } = req.query;
  //   if (!paginaActual) {
  //     paginaActual = 1;
  //   }
  
  //   try {
  //     const response = await todosLosPacientesHandler(paginaActual);
  //     res.json(response);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  const getAllPacientesHandler = async (req, res) => {
    try {
      const response = await allPacientesController();
     
      if (response.message) {
        return res.status(404).json({ message: response.message });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

  
//   const getProductosDestacados = async (req, res) => {
//     const { limite } = req.body;
  
//     try {
//       const response = await productosDestacados(limite);
//       res.json(response);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
const getPacientePorIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
      const response = await getPacientePorIdController(id);

      if (response.message) {
          return res.status(200).json({ message: response.message });
      } else {
          res.status(200).json({message:response.details});
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

  
  
  const createPacienteHandler = async (req, res) => {
    const {
      nombres,
      apellidos,
      documento_numero,
      tipo_documento,
      foto,
      genero,
      fechaIngreso,
      fechaNacimiento,
      estado_civil,
      activo,
      seguromedico_id
     
     // remuneracion
    } = req.body;

        // Convertir y validar `fechaIngreso` y `fechaNacimiento`
    const fechaIngresoISO = dayjs(fechaIngreso, 'YYYY-MM-DD', true);
    const fechaNacimientoISO = dayjs(fechaNacimiento, 'YYYY-MM-DD', true);

    if (!fechaIngresoISO.isValid()) {
      return res.status(400).json({ error: "Fecha de ingreso no válida. Formato esperado: YYYY-MM-DD" });
    }

    if (!fechaNacimientoISO.isValid()) {
      return res.status(400).json({ error: "Fecha de nacimiento no válida. Formato esperado: YYYY-MM-DD" });
    }


    // Crear el nuevo paciente con las fechas convertidas
console.log('body paciente handler', req.body )
    const errors = [];
  
    if (!nombres) {
      errors.push('nombres');
    }
  
    if (!apellidos) {
      errors.push('apellidos');
    }
  
    if (!genero) {
      errors.push('genero');
    }
  
    if (!seguromedico_id) {
      errors.push('Falta el seguro medico id');
    }
  
    if (!fechaNacimiento) {
      errors.push('fechaNacimiento');
    }


    // if(!catFun){
    //   errors.push('Seleccionar almenos una Categoria de funcionario')
    // }
  
    // if (typeof activo !== 'boolean') {
    //   errors.push('activo');
    // }

    
  
    if (errors.length > 0) {
      return res.status(400).json({ error: `Missing or invalid data for the following fields: ${errors.join(', ')}.` });
    }
  
    try {
      const response = await createPacienteController({
          nombres,
          apellidos,
          documento_numero,
          tipo_documento,
          estado_civil,
          foto,
          fechaNacimiento, 
          genero,
          fechaIngreso,
          activo,
          seguromedico_id
      });
  
      // Extraer los valores generados tras la creación del paciente
      const { paciente_id, full_name, imagen_principal } = response;
     
      // Si se creó exitosamente el empleado, devolverlo en la respuesta
      return res.json({
          paciente_id,
          full_name,
          imagen_principal,
          message: "Paciente creado exitosamente!"
      });
  } catch (error) {
      console.error('Error al registrar el nuevo paciente:', error);
      res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
  
  };
  
  
//   const decrementarStock = async (req,res)=>{
//     const {producto_id, compra_talla, compra_color, compra_cantidad} = req.body;
//     try {
//       const response = await decrementarCantidad (
//         producto_id,
//         compra_talla,
//         compra_color.toLowerCase(),
//         compra_cantidad);
  
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
  
  const updatePacienteHandler = async (req, res) => {
    const { 
      empleado_id,
      nombres,
      apellidos,
     // descripcion,
      imagen_principal,
     // remuneracion_base,
      genero,
      estado_civil,
     // horasExtras,
     // descuentos,
     // fechaIngreso,
      fechaNacimiento,
      activo} = req.body;
    try {
      const response = await updatePacienteController (
        paciente_id,
        nombres,
        apellidos,
       // descripcion,
        imagen_principal,
       // remuneracion_base,
        genero,
        estado_civil,
       // horasExtras,
       // descuentos,
       // fechaIngreso,
        fechaNacimiento,
        activo);
  
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deletePacienteHandler = async (req, res) => {
    const { id, activo } = req.params; // Obtiene el id de los parámetros de la ruta
    console.log('Paciente handler:',{ id,activo });
    // Borrado Logico siempre. activo/inactivo
    try {
      const response = await deletePacienteController(id);
  
      res.status(200).json({response});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // const horasExtras = async (req, res) => {
  //   const { empleado_id, horasExtras } = req.body;
  //   // Borrado Logico siempre. activo/inactivo
  //   try {
  //     const response = await updateHorasExtras(empleado_id,horasExtras);
  
  //     res.json(response);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // const horasCatedras = async (req, res) => {
  //   const { empleado_id, horasCatedras } = req.body;

  //   try {
  //     const response = await updateHorasCatedras(empleado_id,horasCatedras);
  
  //     res.json(response);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // const addDescuentos = async (req, res) => {
  //   const { empleado_id, descuentos } = req.body;
  //   // Borrado Logico siempre. activo/inactivo
  //   try {
  //     const response = await updateDescuentos(empleado_id,descuentos);
  
  //     res.json(response);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };
  
 
  
  module.exports = {
    getPacientePorIdHandler,
    getAllPacientesHandler,
    deletePacienteHandler,
    updatePacienteHandler,
    deletePacienteHandler,
    createPacienteHandler
   
  };
  