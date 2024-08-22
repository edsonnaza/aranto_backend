'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async up (queryInterface, Sequelize) {
    // Asegúrate de usar async/await dentro de una función async
    const hashedPassword = await bcrypt.hash('Login123456', saltRounds);

    return queryInterface.bulkInsert('Users', [{
      email: 'test@email.com',
      password: hashedPassword, // Contraseña encriptada
      user_name: 'Test',
      user_lastname: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', { email: 'test@email.com' }, {});
  }
};
