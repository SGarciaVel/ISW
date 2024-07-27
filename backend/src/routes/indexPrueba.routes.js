const express = require("express");
const router = express.Router();

// Importar middlewares
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const authorizationMiddleware = require("../middlewares/authorizationPrueba.middleware");

// Importar las rutas
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const inscripcionRoutes = require("./inscripcionPrueba.routes");
const productosRoutes = require("./productosPrueba.routes");
const emprendedorRoutes = require("./emprendedor.routes");
const carreraRoutes = require("./carrera.routes");
const actividadRoutes = require("./actividad.routes");
const asistenciaRoutes = require("./asistencia.routes");
const ayudantesRoutes = require("./ayudantes.routes");
const reportRoutes = require("./report.routes");
const rolesRoutes = require("./roles.routes");

// Usar las rutas importadas
router.use("/auth", authRoutes);
router.use("/users", authenticationMiddleware, userRoutes);
router.use("/inscripciones", authenticationMiddleware, inscripcionRoutes);
router.use("/productos", authenticationMiddleware, productosRoutes);
router.use("/emprendedores", authenticationMiddleware, emprendedorRoutes);
router.use("/carreras", authenticationMiddleware, carreraRoutes);
router.use("/actividades", authenticationMiddleware, actividadRoutes);
router.use("/asistencias", authenticationMiddleware, asistenciaRoutes);
router.use("/ayudantes", authenticationMiddleware, ayudantesRoutes);
router.use("/reportes", authenticationMiddleware, reportRoutes);
router.use(
  "/roles",
  authenticationMiddleware,
  authorizationMiddleware(["admin"]),
  rolesRoutes,
);

// Ruta de prueba para asegurar que el servidor está funcionando
router.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = router;
