"use strict";

const productosController = require("../controllers/productos.controller.js");

const express = require("express");
const routera = express.Router();
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
router.use(authenticationMiddleware);

//multer para subir archivos
const {
  uploadFile,
  handleMulterError,
} = require("../utils/fileUploadHandler.js");

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
