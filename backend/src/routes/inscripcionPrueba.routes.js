const express = require("express");
const router = express.Router();
const inscripcionPruebaController = require("../controllers/inscripcionPrueba.controller");
// const authorizationMiddleware = require("../middlewares/authorizationPrueba.middleware");
const {
  authenticateToken,
  isAdmin,
  isOwnerOrAdmin,
  isOwnerOrAdminParams,
  isBusinessOwnerOrAdmin,
  isAdminOrManagement,
  isAdminOrManagementOrBusinessOwner,
} = require("../middlewares/authorization.middleware");

// Asegúrate de que los nombres de las funciones en el controlador coincidan con los que estás usando aquí

router.post(
  "/",
  authenticateToken,
  isAdminOrManagement,
  inscripcionPruebaController.createInscripcion,
);

router.get(
  "/",
  authenticateToken,
  inscripcionPruebaController.getAllInscripciones,
);
router.get("/:id", inscripcionPruebaController.getInscripcionById);

router.put(
  "/:id",
  authenticateToken,
  isAdminOrManagement,
  inscripcionPruebaController.updateInscripcion,
);

// Ruta para actualizar una inscripción
//router.put("/inscripciones/:id", inscripcionPruebaController.updateInscripcion);

// router.post("/", inscripcionPruebaController.createInscripcion);
router.delete("/:id", authenticateToken, inscripcionPruebaController.deleteInscripcion);

module.exports = router;
