'use strict';
const {   Users } = require('../src/db');
const { v4: uuidv4 } = require('uuid'); // Importar el generador de UUID
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Buscar el ID del usuario con el correo electrónico especificado
   const userEmail = 'test@email.com';
  
   // Consulta para obtener el usuario basado en el correo electrónico
   // Buscar el ID del usuario con el correo electrónico especificado
   
   const user = await Users.findOne({ where: { email: userEmail } });
   
   if (!user) {
       throw new Error(`No se encontró un usuario con el correo electrónico ${userEmail}`);
   }

   
   
   const userId = user.usuario_id;
   console.log('userId', userId);

    return queryInterface.bulkInsert('RefreshTokens', [{
      id: uuidv4(),
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3ZjZkYTM4LWE4YTYtNDAwMS1hNjgyLThkYzVkMDAxYTg1MSIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE3MjQzNDg4MDAsImV4cCI6MTcyNDk1MzYwMH0.QkcINFjBIg2htbgNi3vgtPLPWbF7E1xozR9anQDUgOk',
      userId: userId,
      revoked: true, // Marcar como revocado
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('RefreshTokens', { 
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3ZjZkYTM4LWE4YTYtNDAwMS1hNjgyLThkYzVkMDAxYTg1MSIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE3MjQzNDg4MDAsImV4cCI6MTcyNDk1MzYwMH0.QkcINFjBIg2htbgNi3vgtPLPWbF7E1xozR9anQDUgOk' 
    }, {});
  }
};
