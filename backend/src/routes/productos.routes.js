"use strict";

const express = require("express");
const productosController = require("../controllers/productos.controller.js");

const router = express.Router();
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const {
  uploadFile,
  handleMulterError,
} = require("../utils/fileUploadHandler.js");

router.use(authenticationMiddleware);

// Define las rutas para los productos
router.get("/", productosController.getProductos);
router.get("/:id", productosController.getProductoById);

router.post(
  "/",
  uploadFile.single("fotografia"),
  handleMulterError,
  authorizationMiddleware.isBusinessOwnerOrAdmin,
  productosController.createProducto,
);

router.put(
  "/:id",
  uploadFile.single("fotografia"),
  handleMulterError, // Asegúrate de manejar errores de multer aquí también
  authorizationMiddleware.isOwnerOrAdmin,
  productosController.updateProducto,
);

router.delete(
  "/:id",
  authorizationMiddleware.isOwnerOrAdmin,
  productosController.deleteProducto,
);

// Exporta el enrutador
module.exports = router;
