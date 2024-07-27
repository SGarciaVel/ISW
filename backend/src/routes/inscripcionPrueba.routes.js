const express = require("express");
const router = express.Router();
const inscripcionPruebaController = require("../controllers/inscripcionPrueba.controller");
const authorizationMiddleware = require("../middlewares/authorizationPrueba.middleware");
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
  authorizationMiddleware,
  inscripcionPruebaController.getAllInscripciones,
);
router.get("/:id", inscripcionPruebaController.getInscripcionById);

router.put(
  "/:id",
  authorizationMiddleware,
  inscripcionPruebaController.updateInscripcion,
);

// router.post("/", inscripcionPruebaController.createInscripcion);
router.delete("/:id", inscripcionPruebaController.deleteInscripcion);

module.exports = router;
