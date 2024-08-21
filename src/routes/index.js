const { Router } = require("express");
const authenticateToken = require('../middlewares/authenticateToken');
//const users = require("./usuarios");
const {login} = require('../controllers/auth/login');
const {addNewUser} = require('../controllers/auth/addNewUser');
const { getAllUsers } = require('../controllers/auth/getAllUsers');
const {tokenRefresh} = require('../controllers/auth/tokenRefresh')
const {tokenRevoke } = require('../controllers/auth/tokenRevoke');
const productos = require("./productos");
const ordenes = require("./ordenes");
const promociones = require("./promociones");
const entidad = require("./entidad");
const direcciones = require("./direcciones");
const carritos = require("./carritos.js");
const productos_favoritos = require("./productos_favoritos");
const productos_descuentos = require("./productos_descuentos");
const categorias = require("./categorias");
const colores = require("./colores");
const stock = require("./stock");
const tallas = require("./tallas");
const payment = require("./payment");
const vaciarTabla = require("./vaciarTabla.js");
const reviews = require("./reviews.js");
const verifyApiKey = require('../middlewares/verifyApiKey');
const router = Router();

// Ruta de bienvenida
router.get('/', function(req, res) {
    res.status(200).send('Welcome to Aranto');
});

// Ruta de login
router.post('/login', login);

// Ruta para añadir nuevo usuario
router.post('/user', addNewUser);

// Middleware de verificación de API Key para todas las rutas siguientes
//router.use(verifyApiKey);

// Route para refresh el token
router.post('/token/refresh',tokenRefresh);

 
// Ruta para revocar el token
router.post('/token/revoke', tokenRevoke);

// Middleware de autenticación para rutas protegidas
router.use(authenticateToken);

// Rutas protegidas
router.get('/user/pagination', getAllUsers);
router.use("/productos", productos);
router.use("/ordenes", ordenes);
router.use("/promociones", promociones);
router.use("/entidad", entidad);
router.use("/direcciones", direcciones);
router.use("/carritos", carritos);
router.use("/productos_favoritos", productos_favoritos);
router.use("/productos_descuentos", productos_descuentos);
router.use("/categorias", categorias);
router.use("/colores", colores);
router.use("/stock", stock);
router.use("/tallas", tallas);
router.use("/payment", payment);
router.use("/vaciar", vaciarTabla);
router.use("/reviews", reviews);

module.exports = router;
