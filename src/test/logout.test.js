const request = require('supertest');
const app = require('../server');
const { RefreshToken, Users } = require('../db');

describe('Test logout process', () => {
    let accessToken;
    let refreshToken;
    
    let userId;

    beforeAll(async () => {

    // Buscar el ID del usuario con el correo electrónico especificado
    const userEmail = 'test@email.com'; // Correo electrónico del usuario de prueba
    const user = await Users.findOne({ where: { email: userEmail } });
    
    if (!user) {
        throw new Error(`No se encontró un usuario con el correo electrónico ${userEmail}`);
    }

    userId = user.usuario_id;
  
        // Suponiendo que tienes un endpoint de login para obtener un accessToken y un refreshToken
        const loginResponse = await request(app)
            .post('/api/login')
            .send({
                email: 'test@email.com', // Reemplaza con un correo válido de prueba
                password: 'Test123456' // Reemplaza con la contraseña válida
            });

        accessToken = loginResponse.body.accessToken; // Guarda el accessToken para su uso posterior
        refreshToken = loginResponse.body.refreshToken; // Guarda el refreshToken para su uso posterior
                //console.log('refreshToken', refreshToken)
        // Guardar el refreshToken en la base de datos
        await RefreshToken.create({
            userId,
            token: refreshToken // Guarda el refreshToken, no el accessToken
        });
    });

    
    
    it('debería devolver 200 al cerrar la sesión', async () => {
        const response = await request(app)
            .post('/api/logout')
            .set('Authorization', `Bearer ${accessToken}`) // Usa el accessToken generado
            .send({ accessToken:refreshToken }); // Envía el refreshToken en el cuerpo
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Sessión terminada con éxito.');
    });
    
    
    it('debería devolver 200 al intentar cerrar sesión con un token revocado.', async () => {
        const response = await request(app)
            .post('/api/logout')
            .set('Authorization', `Bearer ${accessToken}`) // Usa el accessToken ya revocado
            .send({accessToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3ZjZkYTM4LWE4YTYtNDAwMS1hNjgyLThkYzVkMDAxYTg1MSIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE3MjQzNDg4MDAsImV4cCI6MTcyNDk1MzYwMH0.QkcINFjBIg2htbgNi3vgtPLPWbF7E1xozR9anQDUgOk'});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Sessión inválido, el token ya ha sido revocado.');
    });

    it('debería devolver 404 al intentar cerrar sesión sin un token.', async () => {
        const response = await request(app)
            .post('/api/logout')
            .set('Authorization', `Bearer ${accessToken}`) // Usa el accessToken ya revocado
            .send({accessToken:null});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Refresh token es necesario.');
    });

    afterAll(async () => {
       // Limpiar la base de datos si es necesario
        await RefreshToken.destroy({ where: { token: refreshToken } });
    });
});
