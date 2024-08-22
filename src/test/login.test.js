const request = require('supertest');
const app = require('../server'); 

describe('POST /', () => {
  it('Welcome to Aranto', async ()=>{
    const response = await request(app).get('/api/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Welcome to Aranto');
});

it('debería devolver 401 si la contraseña es incorrecta', async () => {
  const response = await request(app)
      .post('/api/login')
      .send({
          email: 'edsonnaza@email.com',
          password: 'Contrasenha12',
      });

  console.log('Respuesta del test:', response.status, response.body);

  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty('message', 'La contraseña es incorrecta.');
});



it('deberia devolver 404 si el email no existente', async () => {
  const response = await request(app)
  .post('/api/login')
  .send({
    email: '1@gmail.com',
    password: 'Login123456',
  });
  
 
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('message','El email no está registrado.');
  
});


  it('debería devolver 200 y un token para credenciales válidas', async () => {
    const response = await request(app)
    .post('/api/login')
    .send({
      email: 'edsonnaza@email.com',
      password: 'Login123456',
    });
    
    //console.log('response test',response.status,response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('debería devolver 400 si el email está vacío.', async () => {
    const response = await request(app)
    .post('/api/login')
    .send({
      email: '',
      password: 'Login123456',
    });
    
    //console.log('response test',response.status,response.body)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message','Por favor, proporciona un email.');
     
  });
  it('debería devolver 400 si la contraseña está vacío.', async () => {
    const response = await request(app)
    .post('/api/login')
    .send({
      email: 'edsonnaza@email.com',
      password: '',
    });
    
    //console.log('response test',response.status,response.body)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message','Por favor, proporciona una contraseña.');
     
  });

  
});
