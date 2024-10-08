module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'aranto',
    host: process.env.DB_HOST || 'localhost', // Asegúrate de que esto sea correcto
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_TEST_NAME || 'aranto',
    host: process.env.DB_HOST || 'localhost', // Asegúrate de que esto sea correcto
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'aranto',
    host: process.env.DB_HOST || 'localhost', // Asegúrate de que esto sea correcto
    dialect: 'postgres',
  },
};
