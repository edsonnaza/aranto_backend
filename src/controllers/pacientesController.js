require("dotenv").config();

// const { pacientes,Remuneraciones, CatFun, 
//         HorasCatedrasTrabajadas, HorasCatedrasMensual, 
//         TiposDescuento, Descuentos, SeguroMedicopaciente, SeguroMedico, HorasExtras } = require("../DB_connection");
//const resultadosPaginados = require("../utils/paginacion");
const {Pacientes} = require("../db");
const cloudinary = require("cloudinary").v2;
const { Sequelize } = require('sequelize');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const PacientesPerPageController= async (paginaActual) => {
  const itemsPorPagina = 8;

  return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
};

// const productosDestacados = async (limite) => {
//   try {
//     const productos = await Productos.findAll({
//       where: {
//         destacado: true,
//       },
//       limit: limite,
//       attributes: [
//         "producto_id",
//         "nombre",
//         "descripcion",
//         "imagen_principal",
//         "precio",
//       ],
//     });

//     return productos;
//   } catch (error) {
//     return error;
//   }
// };

const getPacienteController = async (id) => {
  try {
    const paciente = await Pacientes.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
//       include: [
//         {
//           model: Remuneraciones,
//           attributes: ['importe', 'activo'],
//           where: { activo: true }
//         },
//         {
//           model: CatFun,
//           attributes: ['catfun_nombre'],
//           through: { attributes: [] }
//         },
//         {
//           model: HorasCatedrasMensual,
//           attributes: [
//             [Sequelize.literal('"HorasCatedrasMensuals"."importe_porhora"'), 'importe_porhora'],
//             'total_horasmensual',
//             'descripcion',
//             [Sequelize.literal('"HorasCatedrasMensuals"."importe_porhora" * "HorasCatedrasMensuals"."total_horasmensual"'), 'total']
//           ],
//         },
        
//         {
//           model: HorasExtras, // Agrega la asociación con HorasExtras
//           attributes: ['horasextras_id', 
//                       'importe_porhora', 
//                       'horas_trabajadas', 
//                       'fecha_trabajado', 
//                       'descripcion', 
//                       'activo',
                    
//                       [Sequelize.literal('"HorasExtras"."importe_porhora" * "HorasExtras"."horas_trabajadas"'), 'total'] // Calcula el total parcial para cada fecha
// ],
//          // where: { paciente_id: Sequelize.col('Pacientes.paciente_id') } // Filtra las horas extras por el paciente actual
//         },
//         {
//           model: HorasCatedrasTrabajadas,
//           attributes: [
//             'importe_porhora',
//             'horas_trabajadas',
//             'fecha_trabajado',
//             [Sequelize.literal('"HorasCatedrasTrabajadas"."importe_porhora" * "HorasCatedrasTrabajadas"."horas_trabajadas"'), 'total']
//           ],
//         },
//         {
//           model: Descuentos,
//           attributes: ['importe_descuento', 'fecha_descuento', 'descripcion'],
//           include: [
//             {
//               model: TiposDescuento,
//               attributes: ['descuento_nombre']
//             }
//           ]
//         },
//         {
//           model: SeguroMedicopaciente,
//           attributes: ['importe_mensual'],
//           include: [
//             {
//               model: SeguroMedico,
//               attributes: ['seguromedico_nombre', 'descripcion']
//             }
//           ]
//         }
//       ]
    });

    if (!paciente) {
      return { message: `No existe el paciente con el id ${id}!` };
    }

    // Formatear la fecha de ingreso antes de devolver la respuesta
    const pacienteFormateado = {
      ...paciente.toJSON(),
      fechaIngreso: paciente.fechaIngreso.toISOString().split('T')[0],
    };

    return pacienteFormateado;
  } catch (error) {
    throw new Error("Error al obtener el paciente: " + error.message);
  }
};



const allPacientesController = async () => {
  try {
    const pacientes = await Pacientes.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    //   include: [
    //     {
    //     model: Remuneraciones,
    //     attributes: [ 'importe', 'activo'], // Puedes seleccionar los atributos que deseas incluir de la tabla de remuneraciones
    //     where: { activo: true } // Puedes filtrar las remuneraciones si lo deseas
    //   },
      
    //   {
    //     model: CatFun,
    //     //as: 'pacientes_categorias', // Aquí asignamos el alias 'Categorias' a la relación Pacientes-CatFun
    //     attributes: ['catfun_nombre'],
    //     through: { attributes: [] }
    //    },

    //    {
    //     model: HorasCatedrasMensual,
    //     attributes: [
    //       [Sequelize.literal('"HorasCatedrasMensuals"."importe_porhora"'), 'importe_porhora'],
    //       'total_horasmensual',
    //       'descripcion',
    //       'activo',
    //       [Sequelize.literal('"HorasCatedrasMensuals"."importe_porhora" * "HorasCatedrasMensuals"."total_horasmensual"'), 'total']
    //     ],
    //    // where: { activo: true } // Filtra solo los registros activos del modelo HorasCatedrasMensual
    //   },

    //   {
    //     model: HorasExtras, // Agrega la asociación con HorasExtras
    //     attributes: ['horasextras_id', 
    //                  'importe_porhora', 
    //                  'horas_trabajadas', 
    //                  'fecha_trabajado', 
    //                  'descripcion', 
    //                  'activo',
    //                  [Sequelize.literal('"HorasExtras"."importe_porhora" * "HorasExtras"."horas_trabajadas"'), 'total'] // Calcula el total parcial para cada fecha
                     
    //                 ],
    //     //where: { paciente_id: Sequelize.col('Pacientes.paciente_id') } // Filtra las horas extras por el paciente actual
    //   },
      
    //   {
    //     model: HorasCatedrasTrabajadas,
    //     attributes: [
    //         'importe_porhora',
    //         'horas_trabajadas',
    //         'fecha_trabajado',
    //         [Sequelize.literal('"HorasCatedrasTrabajadas"."importe_porhora" * "HorasCatedrasTrabajadas"."horas_trabajadas"'), 'total'] // Calcula el total parcial para cada fecha
    //     ],
    //     // Agrupa por mes utilizando la función DATE_TRUNC de PostgreSQL para truncar la fecha al primer día del mes
    //     // group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('HorasCatedrasTrabajadas.fecha_trabajado'))]
    // },

    // {
    //   model: Descuentos,
    //   attributes: ['importe_descuento', 'fecha_descuento', 'descripcion'],
    //   include: [
    //     {
    //       model: TiposDescuento,
    //       attributes: ['descuento_nombre'] // Agrega aquí los campos que deseas mostrar del modelo TiposDescuento
    //     }
    //   ]
    // },

    // {
    //   model: SeguroMedicopaciente,
    //   attributes: ['importe_mensual'],
    //   include: [
    //     {
    //       model: SeguroMedico,
    //       attributes: ['seguromedico_nombre','descripcion'] // Agrega aquí los campos que deseas mostrar del modelo TiposDescuento
    //     }
    //   ]
    // }
    
    // ]
    });

    if (pacientes.length === 0) {
     
        return { message: "No existen pacientes registrados!" };
    } else {
      // Formatear la fecha de ingreso antes de devolver la respuesta
      const pacientesFormateados = pacientes.map(paciente => {
        return {
          ...paciente.toJSON(),
          fechaIngreso: paciente.fechaIngreso.toISOString().split('T')[0], // Formatear la fecha a "YYYY-MM-DD"
        //  remuneraciones: paciente.Remuneraciones // Incluir las remuneraciones en el objeto de paciente
        };
      });
      return pacientesFormateados;
    }
  } catch (error) {
    throw new Error("Error al obtener los pacientes: " + error.message);
  }
};


const deletePacienteController = async (paciente_id) => {

  try {
    const paciente = await Pacientes.findByPk(paciente_id);

    if (!paciente) {
      return "No existe el paciente buscado!";
    }
    // if (paciente.destacado == true) {
    //   await Pacientes.update(
    //     { inactivo: !paciente.inactivo },
    //     {
    //       where: { paciente_id: paciente_id },
    //     }
    //   );
    // } else {
      await Pacientes.update(
        { activo: !paciente.activo },
        {
          where: { paciente_id: paciente_id },
        }
      );
   // }
    return await Pacientes.findByPk(paciente_id);
  } catch (error) {
    return error;
  }
};

const updatePacienteController = async (
  paciente_id,
  nombres,
  apellidos,
  descripcion,
  imagen_principal,
  fechaNacimiento,
  genero,
  activo,

) => {
  try {
    const pacienteActual = await Pacientes.findByPk(paciente_id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const cloudinaryRegex =
      /^https:\/\/res\.cloudinary\.com\/dk4ysl2hw\/image\/upload\//;

    //todo Actualizacion por cambio de nombre
    if (nombres !== pacienteActual.nombres) {
      await Pacientes.update(
        { nombres: nombres },
        { where: { paciente_id: paciente_id } }
      );
    }
   
    // Actualizacion de apellidos

    if(apellidos !== pacienteActual.apellidos){
        await Pacientes.update(
            {apellidos : apellidos},
            {where : {paciente_id : paciente_id}}
        );
    }

    //todo Actualizacion por cambio de descripcion
    if (descripcion !== pacienteActual.descripcion) {
      await Pacientes.update(
        { descripcion: descripcion },
        { where: { paciente_id: paciente_id } }
      );
    }

    //todo Actualizacion por cambio de Imagen Principal
    if (imagen_principal !== pacienteActual.imagen_principal) {
      if (!cloudinaryRegex.test(imagen_principal)) {
        const img_principal_cloud = await cloudinary.uploader.upload(
          imagen_principal,
          {
            upload_preset: "preset_imagenes_productos",
            allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
          },
          function (err, result) {
            if (err) {
              throw new Error("Error al subir la imagen primaria: ", err);
            }
            try {
              return result.secure_url;
            } catch (err) {
              throw new Error("Error en img_principal_cloud: ", err);
            }
          }
        );

        await Pacientes.update(
          { imagen_principal: img_principal_cloud.secure_url },
          { where: { paciente_id: paciente_id } }
        );
      } else {
        await Pacientes.update(
          { imagen_principal: imagen_principal },
          { where: { paciente_id: paciente_id } }
        );
      }
    }

    // //todo Actualizacion por cambio de Imagenes secundarias
    // imagenes_secundarias = [...new Set(imagenes_secundarias)];
    // const imagenes_secundarias_cloud = [];

    // for (let i = 0; i < imagenes_secundarias.length; i++) {
    //   if (!cloudinaryRegex.test(imagenes_secundarias[i])) {
    //     await cloudinary.uploader.upload(
    //       imagenes_secundarias[i],
    //       {
    //         upload_preset: "preset_imagenes_productos",
    //         allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
    //       },
    //       function (err, result) {
    //         if (err) {
    //           throw new Error("Error al subir las imagenes secundarias: ", err);
    //         }

    //         try {
    //           imagenes_secundarias_cloud.push(result.secure_url);
    //         } catch (err) {
    //           throw new Error(
    //             "Error al construir el array imagenes_secundarias_cloud: ",
    //             err
    //           );
    //         }
    //       }
    //     );
    //   } else {
    //     imagenes_secundarias_cloud.push(imagenes_secundarias[i]);
    //   }
    // }

    // await Pacientes.update(
    //   { imagenes_secundarias: imagenes_secundarias_cloud },
    //   { where: { producto_id: producto_id } }
    // );

    //todo Actualizacion por cambio de edad/categoría
    if (fechaNacimiento !== pacienteActual.fechaNacimiento) {
      await Pacientes.update(
        { fechaNacimiento: fechaNacimiento },
        { where: { paciente_id: paciente_id } }
      );
    }

    //todo Actualizacion por cambio de genero
    if (genero !== pacienteActual.genero) {
      await Pacientes.update(
        { genero: genero },
        { where: { paciente_id: paciente_id } }
      );
    }

    //todo Actualizacion por cambio de precio
    // if (remuneracion_base !== pacienteActual.remuneracion_base) {
    //   await Pacientes.update(
    //     { remuneracion_base: remuneracion_base },
    //     { where: { paciente_id: paciente_id } }
    //   );
    // }

    //todo Actualizacion por cambio de inactivo
    if (activo !== pacienteActual.activo) {
      await Pacientes.update(
        { activo: activo },
        { where: { paciente_id: paciente_id } }
      );
    }

    //todo Actualizacion por cambio de stock
    // if (horasCatedras !== pacienteActual.horasCatedras) {
    //  // if (Object.keys(horasCatedras).length === 0 && pacienteActual.activo === true) {
    // //     if (pacienteActual.destacado === true) {
    // //         pacienteActual.destacado = false;
    // //     }
    // //     await paciente.update(
    // //       { horasCatedras: horasCatedras, activo: true},
    // //       { where: { paciente_id: paciente_id } }
    // //     );
    // //   } else {
    //     await Pacientes.update(
    //       { horasCatedras: horasCatedras},
    //       { where: { paciente_id: paciente_id } }
    //     );
    //   //}
    // }

    //Horas Extras
    // if(horasExtras !==pacienteActual.horasExtras){
    //     await Pacientes.update(
    //         { horasExtras : horasExtras},
    //         { where:{paciente_id : paciente_id}}
    //     )
    // }

    // if(descuentos !==pacienteActual.descuentos){
    //     await Pacientes.update(
    //         {descuentos : descuentos},
    //         { where : {paciente_id : paciente_id}}
    //     )
    // }

    //todo Se retorna el elemento modificado
    console.log(`Se modificó exitosamente el paciente ${paciente_id}`);
    return await paciente.findByPk(paciente_id);
  } catch (error) {
    console.error(error);
    throw new Error("Error en modificar el registro del paciente");
  }
};



const createPacienteController = async ({
  nombres,
  apellidos,
  documento_numero,
  tipo_documento,
  estado_civil,
  foto,
  fechaNacimiento,
  genero,
  fechaIngreso
 
  
}) => {
  console.log('Datos recibidos en el controlador:', {
    nombres,
    apellidos,
    documento_numero,
    tipo_documento,
    foto,
    fechaNacimiento,
    estado_civil,
    genero,
    fechaIngreso
     
    
  });
  try {
    
    const imagen_principal_cloud = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        foto,
        {
          upload_preset: "pacientes",
          allowed_formats: ["png", "jpg", "jpeg", "gif", "webp"],
        },
        (err, result) => {
          if (err) {
            reject(new Error("Error al subir la imagen primaria: " + JSON.stringify(err)));        
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });

    // Crear el paciente
    const paciente = await Pacientes.create({
      nombres,
      apellidos,
      documento_numero,
      tipo_documento,
      imagen_principal: imagen_principal_cloud,
      fechaNacimiento,
      genero,
      estado_civil,
      fechaIngreso,
     
    });

    // Verifica si el paciente se creó correctamente y tiene un ID
if (paciente) {
//   // Obtiene el ID del paciente recién creado
  const pacienteId = paciente.get('paciente_id');
  
//   // Crea la remuneración del paciente si se proporciona
//   if (remuneracion) {
//     await guardarRemuneracion(pacienteId, remuneracion.importe);
//   }
//   //Guarda el el seguro del paciente
  if (seguromedico) {
    await asociarSeguroMedicoPaciente(paciente, [seguroMedicoPaciente.seguromedico_id]);
  }
}

   

   return paciente;
  } catch (error) {
    throw new Error("Error en el controller crear paciente: " + error.message);
  }
};

const getPacientePorIdController = async (id) => {
  const response = await Pacientes.findByPk(id);
  if (response === null) {
    return "El paciente no existe";
  } else {
    return response;
  }
};

// Define la función para guardar la remuneración
// const guardarRemuneracion = async (pacienteId, importe) => {
//   try {
//     // Inserta la remuneración con el pacienteId proporcionado
//     const remuneracion = await Remuneraciones.create({
//       paciente_id: pacienteId,
//       importe: importe
//     });

//     return remuneracion; // Devuelve la remuneración creada
//   } catch (error) {
//     // Maneja cualquier error que ocurra durante la creación de la remuneración
//     console.error("Error al crear la remuneración:", error);
//     throw new Error("Error al crear la remuneración: " + error.message);
//   }
// };

// const asociarCatFun = async (paciente, catfunIds) => {
//   try {
//     // Asocia las categorías funcionales (CatFun) con el paciente
//     await paciente.addCatFun(catfunIds);

//     return true; // Devuelve verdadero si la asociación se realizó correctamente
//   } catch (error) {
//     // Maneja cualquier error que ocurra durante la asociación de categorías funcionales
//     console.error("Error al asociar categorías del paciente:", error);
//     throw new Error("Error al asociar categorías del paciente: " + error.message);
//   }
// };

// const updateHorasExtras = async (paciente_id, horasExtras) => {
//   try {
//     if (!paciente_id) {
//       throw new Error("El ID del paciente no fue proporcionado");
//     }

//     // Buscar el paciente en la base de datos
//     const paciente = await Pacientes.findByPk(paciente_id);
    
//     if (!paciente) {
//       throw new Error("El paciente no existe");
//     }

//     // Actualizar el estado del paciente y establecer la fecha de desvinculación
//     await Pacientes.update(
//       { horasExtras: horasExtras },
//       { where: { paciente_id: paciente_id } }
//     );

//     // Retornar el objeto paciente actualizado
//     return paciente;
//   } catch (error) {
//     console.error("Error al desvincular paciente:", error.message);
//     throw error;
//   }
// };

// const updateHorasCatedras = async (paciente_id, horasCatedras) => {
//   try {
//     if (!paciente_id) {
//       throw new Error("El ID del paciente no fue proporcionado");
//     }

//     // Buscar el paciente en la base de datos
//     const paciente = await Pacientes.findByPk(paciente_id);
    
//     if (!paciente) {
//       throw new Error("El paciente no existe");
//     }

//     // Actualizar el estado del paciente y establecer la fecha de desvinculación
//     await Pacientes.update(
//       { horasCatedras: horasCatedras },
//       { where: { paciente_id: paciente_id } }
//     );

//     // Retornar el objeto paciente actualizado
//     return paciente;
//   } catch (error) {
//     console.error("Error al registrar horas catedras del paciente:", error.message);
//     throw error;
//   }
// };

// const updateDescuentos = async (paciente_id, descuentos) => {
//   try {
//     if (!paciente_id) {
//       throw new Error("El ID del paciente no fue proporcionado");
//     }

//     // Buscar el paciente en la base de datos
//     const paciente = await Pacientes.findByPk(paciente_id);
    
//     if (!paciente) {
//       throw new Error("El paciente no existe");
//     }

//     // Actualizar el estado del paciente y establecer la fecha de desvinculación
//     await Pacientes.update(
//       { descuentos: descuentos },
//       { where: { paciente_id: paciente_id } }
//     );

//     // Retornar el objeto paciente actualizado
//     return paciente;
//   } catch (error) {
//     console.error("Error al registrar horas catedras del paciente:", error.message);
//     throw error;
//   }
// };


// const decrementarCantidad = async (
//   producto_id,
//   compra_talla,
//   compra_color,
//   compra_cantidad
// ) => {
//   const producto = await Productos.findByPk(producto_id);
//   const modificado = producto.dataValues.stock[compra_talla].filter((item) => {
//     if (item.color === compra_color) {
//       if (item.cantidad - compra_cantidad > 0) {
//         item.cantidad = item.cantidad - compra_cantidad;
//         item.cantidad = item.cantidad.toString();
//         return item;
//       }
//     } else {
//       return item;
//     }
//   });
//   console.log(modificado);
//   if (modificado.length) {
//     producto.dataValues.stock[compra_talla] = modificado;
//   } else {
//     delete producto.dataValues.stock[compra_talla];
//   }
//   if (
//     producto.dataValues.stock == null ||
//     producto.dataValues.stock == undefined
//   ) {
//     producto.dataValues.stock = {};
//   }
//   if (
//     Object.keys(producto.dataValues.stock).length === 0 &&
//     producto.dataValues.inactivo == false
//   ) {
//     if (producto.dataValues.destacado == true) {
//       producto.dataValues.destacado = false;
//     }
//     await Productos.update(
//       {
//         stock: producto.dataValues.stock,
//         inactivo: true,
//         destacado: producto.dataValues.destacado,
//       },
//       { where: { paciente_id: paciente_id } }
//     );
//   } else {
//     await Productos.update(
//       { stock: producto.dataValues.stock },
//       { where: { paciente_id: paciente_id } }
//     );
//   }
//   return await Productos.findByPk(paciente_id);
// };

// const filtrarpacientes = async () => {};

// const desvincularpaciente = async (paciente_id) => {
//   try {
//     if (!paciente_id) {
//       throw new Error("El ID del paciente no fue proporcionado");
//     }

//     // Buscar el paciente en la base de datos
//     const paciente = await Pacientes.findByPk(paciente_id);

//     if (!paciente) {
//       throw new Error("El paciente no existe");
//     }

//     // Actualizar el estado del paciente y establecer la fecha de desvinculación
//     await Pacientes.update(
//       { activo: !paciente.activo, fechaDesvinculado: new Date() },
//       { where: { paciente_id: paciente_id } }
//     );

//     // Retornar el objeto paciente actualizado
//     //return paciente;
//     return await Pacientes.findByPk(paciente_id);
//   } catch (error) {
//     console.error("Error al desvincular paciente:", error.message);
//     throw error;
//   }
// };



// const topProductos = async (top) =>{
//   try {
//     const ordenes = await Ordenes.findAll();
//     let array = []
//     for(orden of ordenes){
//       for (prod of orden.productos_compra){
//         let esta = false
//           array = array.map((item) => {
//             if(item.producto.paciente_id === prod.id){
//               item.cantidad = parseInt(item.cantidad)
//               item.cantidad += parseInt(prod.quantity)
//               esta = true
//             }
//             return item;
//           });
//           if (esta === false){
//             let nuevo = {
//               producto :{ 
//                 paciente_id : prod.id,
//                 producto_nombre : prod.title,
//                 producto_precio : prod.unit_price,
//                 producto_imagen : prod.picture_url
//               },
//               cantidad : parseInt(prod.quantity)
//             }
//             array.push(nuevo)
//           }
//         }
//       } 
//       array.sort((a, b) => b.cantidad - a.cantidad);
//       if (array.length < top){
//         return array
//       }else{
//       return array.slice(0,top)
//       }
//   } catch (error) {
//     console.error("Error al obtener los productos más vendidos:", error);
//     throw error;
//   }

// }

module.exports = {
  PacientesPerPageController,
  allPacientesController,
  getPacientePorIdController,
  deletePacienteController,
  updatePacienteController,
  createPacienteController,
 
   
   
   
   
};
