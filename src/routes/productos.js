const { Router } = require("express");
const {
  getProducto,
  putProducto,
  deleteProducto,
  postProducto,
  standOutProducto,
  getProductosDestacados,
} = require("../handlers/productosHandlers");
const productosFiltrados = require("../controllers/productosFiltradosController");
const productos = Router();

productos.get("/", productosFiltrados);
productos.get("/detalle/:id", getProducto);
productos.get("/destacados", getProductosDestacados);
productos.post("/", postProducto);
productos.put("/modificar", putProducto);
productos.put("/", deleteProducto);
productos.put("/destacado", standOutProducto);

module.exports = productos;
