const { DataTypes, UUIDV4,DATEONLY,NOW } = require("sequelize");
const dayjs = require('dayjs');

module.exports = (sequelize) => {
  sequelize.define("Pacientes", {
    paciente_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
   documento_numero: {
        type:DataTypes.STRING(100),
        allowNull:true,
        default:"No registrado."
    },
    tipo_documento:{
      type:DataTypes.ENUM("Cédula de Identidad", "Pasaporte","RG","Otros"),
      allowNull:false,
      default:"Otros"
    },
    imagen_principal:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    // fechaIngreso: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: NOW,
    // },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    hooks: {
      beforeSave: (paciente) => {
        paciente.full_name = `${paciente.nombres} ${paciente.apellidos}`;
        
        // Verificar y convertir fechaIngreso solo si está en un formato distinto a ISO
        // if (paciente.fechaIngreso && typeof paciente.fechaIngreso === 'string') {
        //   const parsedDate = dayjs(paciente.fechaIngreso, 'DD-MM-YYYY', true);
        //   if (parsedDate.isValid()) {
        //     paciente.fechaIngreso = parsedDate.format('YYYY-MM-DD');
        //   } else {
        //     console.log("Fecha de ingreso no está en el formato esperado (DD-MM-YYYY)");
        //   }
        // }
      },
    }
    
  });
};
