const express = require("express");
const router = express.Router();
const asistenciaController = require("../controllers/asistenciaPrueba.controller");

// Define las rutas para asistencia
router.get("/", asistenciaController.getAllAsistencia);
router.get("/:id", asistenciaController.getAsistenciaById);
router.post("/", asistenciaController.createAsistencia);
router.put("/:id", asistenciaController.updateAsistencia);
router.delete("/:id", asistenciaController.deleteAsistencia);

module.exports = router;
