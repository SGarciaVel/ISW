"use strict";
const express = require("express");
const router = express.Router();

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Importa los enrutadores
const userRoutes = require("./user.routes.js");
const rolesRoutes = require("./roles.routes.js");
const authRoutes = require("./auth.routes.js");
const carreraRoutes = require("./carrera.routes.js");
const ayudantesRoutes = require("./ayudantes.routes.js");
const productosRoutes = require("./productos.routes.js");
const emprendedorRoutes = require("./emprendedor.routes.js");
const inscripcionRoutes = require("./inscripcion.routes.js");
const actividadRoutes = require("./actividad.routes.js");
const reportRoutes = require("./report.routes.js"); // Añadir importación de report.routes.js
const productRoutes = require("./productRoutes.js");

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
router.use("/roles", authenticationMiddleware, rolesRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las carreras /api/carrera
router.use("/carrera", authenticationMiddleware, carreraRoutes);
// Define las rutas para los ayudantes /api/ayudantes
router.use("/ayudantes", authenticationMiddleware, ayudantesRoutes);
// Define las rutas para los productos /api/productos
router.use("/productos", authenticationMiddleware, productosRoutes);
// Define las rutas para el emprendedor /api/emprendedores
router.use("/emprendedor", authenticationMiddleware, emprendedorRoutes);
// Define las rutas para las inscripciones /api/inscripcion
router.use("/inscripcion", authenticationMiddleware, inscripcionRoutes);
// Define las rutas para las actividades /api/actividades
router.use("/actividad", authenticationMiddleware, actividadRoutes);
// Define las rutas para los reportes /api/reports
router.use("/reports", authenticationMiddleware, reportRoutes); // Añadir uso de rutas de reportes
// dsa
router.use("/prueba", authenticationMiddleware, productRoutes);
// Exporta el enrutador
module.exports = router;
