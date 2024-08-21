const { DataTypes, UUIDV4, DATEONLY } = require("sequelize");

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
      validate: {
        len: {
          args: [5, 50],
          msg: 'El nombre debe tener entre 5 y 50 caracteres.',
        },
        notNull: {
          msg: 'Favor ingrese su nombre, este campo no puede estar vacío.',
        },
      },
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: 'El apellido debe tener entre 5 y 50 caracteres.',
        },
        notNull: {
          msg: 'Favor ingrese su apellido, este campo no puede estar vacío.',
        },
      },
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: true, // Este campo será llenado automáticamente
    },
    imagen_principal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("Hombre", "Mujer"),
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.ENUM("Soltero", "Casado", "Divorciado", "Otro"),
      allowNull: false,
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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
      },
    },
  });
};
