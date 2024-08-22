'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // Reemplaza 'user_id' con el ID del usuario test
    const userId = 1; // Cambia esto al ID correcto del usuario test

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
