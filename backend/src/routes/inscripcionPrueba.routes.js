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
  isAdminOrManagement,
  inscripcionPruebaController.getAllInscripciones,
);
router.get("/:id", inscripcionPruebaController.getInscripcionById);

// Define la ruta para obtener inscripciones
router.get("/inscripciones", async (req, res) => {
  try {
    // Obtener inscripciones desde la base de datos
    const inscripciones = await Inscripcion.find();
    res.json({ inscripciones });
  } catch (error) {
    console.error("Error al obtener inscripciones:", error); // Imprime el error en los logs
    res.status(500).json({ error: "Error al obtener inscripciones" });
  }
});

router.put(
  "/:id",
  authenticateToken,
  isAdminOrManagement,
  inscripcionPruebaController.updateInscripcion,
);

// Ruta para actualizar una inscripción
//router.put("/inscripciones/:id", inscripcionPruebaController.updateInscripcion);

// router.post("/", inscripcionPruebaController.createInscripcion);
router.delete(
  "/:id",
  authenticateToken,
  inscripcionPruebaController.deleteInscripcion,
);

module.exports = router;
