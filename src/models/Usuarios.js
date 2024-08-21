const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Users", {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true, // Considera si quieres que sea obligatorio
    },
    user_lastname: {
      type: DataTypes.STRING,
      allowNull: true, // Considera si quieres que sea obligatorio
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validación para asegurar que sea un correo electrónico
      },
      unique: true, // Asegura que el email sea único en la tabla
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ENUM("client", "admin"),
      defaultValue: "client",
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Usa un valor booleano en lugar de una cadena
    },
  }, {
    tableName: 'Users', // Asegúrate de que el nombre de la tabla sea correcto
    timestamps: true, // Esto creará `createdAt` y `updatedAt`
  });
};
