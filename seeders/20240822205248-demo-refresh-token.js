'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Buscar el ID del usuario con el correo electrónico especificado
   const userEmail = 'test@email.com';
  
   // Consulta para obtener el usuario basado en el correo electrónico
   const user = await queryInterface.sequelize.query(
     'SELECT id FROM Users WHERE email = :email',
     {
       replacements: { email: userEmail },
       type: Sequelize.QueryTypes.SELECT
     }
   );
   
   if (user.length === 0) {
     throw new Error(`No se encontró un usuario con el correo electrónico ${userEmail}`);
   }
   
   const userId = user[0].usuario_id;

    return queryInterface.bulkInsert('RefreshTokens', [{
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
