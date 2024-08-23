'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Users'
    await queryInterface.createTable('Users', {
      usuario_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true, // Considera si quieres que sea obligatorio
      },
      user_lastname: {
        type: Sequelize.STRING,
        allowNull: true, // Considera si quieres que sea obligatorio
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // Validación para asegurar que sea un correo electrónico
        },
        unique: true, // Asegura que el email sea único en la tabla
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roles: {
        type: Sequelize.ENUM("client", "admin"),
        defaultValue: "client",
      },
      inactivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Valor booleano por defecto
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la tabla 'Users'
    await queryInterface.dropTable('Users');
  }
};
