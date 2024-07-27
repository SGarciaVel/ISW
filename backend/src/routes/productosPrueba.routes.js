const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosPrueba.controller");

// Asegúrate de que las rutas están correctamente definidas
router.get("/", productosController.getAllProductos);
router.get("/:id", productosController.getProductoById);
router.post("/", productosController.createProducto);
router.put("/:id", productosController.updateProducto);
router.delete("/:id", productosController.deleteProducto);

module.exports = router;
