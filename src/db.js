require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// Destructurar las variables de entorno para la configuración de Sequelize
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    
// DB_DEPLOY,
  { logging: false, 
    native: false,
    alter: true,
    force:true,
    //  dialectOptions: {
    //      ssl:{
    //          require:true,
    //      },
    // },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Calificaciones,
  Carritos,
  Colores,
  Configuraciones,
  Direcciones,
  Entidades,
  Ordenes,
  Productos_Descuentos,
  Productos,
  Promociones,
  Tallas,
  Users,
  RefreshToken,
} = sequelize.models;

// RELACIONES DE MODELOS (TABLAS)
//Token managment
Users.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
});

RefreshToken.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
});
// Users 1:1 Entidades
Users.hasOne(Entidades, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});
Entidades.belongsTo(Users, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});

// Entidades 1:N Direcciones
Entidades.hasMany(Direcciones, {
  foreignKey: {
    allowNull: false,
    name: "entidad_id",
  },
});
Direcciones.belongsTo(Entidades, {
  foreignKey: {
    allowNull: false,
    name: "entidad_id",
  },
});

// Users N:N Productos
Users.belongsToMany(Productos, {
  through: "Productos_Favoritos",
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});
Productos.belongsToMany(Users, {
  through: "Productos_Favoritos",
  foreignKey: {
    allowNull: false,
    name: "producto_id",
  },
});

// Users 1:1 Carritos
Users.hasOne(Carritos, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});
Carritos.belongsTo(Users, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});

// Users 1:N Ordenes
Users.hasMany(Ordenes, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});
Ordenes.belongsTo(Users, {
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});

// Productos 1:1 Productos_Descuentos
Productos.hasOne(Productos_Descuentos, {
  foreignKey: {
    allowNull: false,
    name: "producto_id",
  },
});
Productos_Descuentos.belongsTo(Productos, {
  foreignKey: {
    allowNull: false,
    name: "producto_id",
  },
});

Users.belongsToMany(Productos, {
  through: "Calificaciones",
  foreignKey: {
    allowNull: false,
    name: "usuario_id",
  },
});
Productos.belongsToMany(Users, {
  through: "Calificaciones",
  foreignKey: {
    allowNull: false,
    name: "producto_id",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Calificaciones,
  Carritos,
  Colores,
  Configuraciones,
  Direcciones,
  Entidades,
  Ordenes,
  Productos_Descuentos,
  Productos,
  Promociones,
  Tallas,
  Users,
};
