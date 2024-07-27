"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

/** Controlador de autenticación */
// const authController = require("../controllers/auth.controller.js");
const { login, logout, refresh } = require("../controllers/auth.controller.js");

// Define las rutas para la autenticación
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);
// router.post("/refresh", authController.refresh);

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

// Exporta el enrutador
module.exports = router;
