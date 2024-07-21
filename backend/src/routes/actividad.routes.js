"use strict";
const express = require("express");
const router = express.Router();
const actividadController = require("../controllers/actividad.controller.js");
const authorizationMw = require("../middlewares/authorization.middleware.js");
const authenticationMw = require("../middlewares/authentication.middleware.js");

router.use(authenticationMw);

router.get("/", authorizationMw.isAdminOrManagementOrBusinessOwner, actividadController.getAllActividades);
router.get("/:id", authorizationMw.isAdminOrManagementOrBusinessOwner, actividadController.getActividadById);
router.post("/", authorizationMw.isAdminOrManagement, actividadController.createActividad);
router.put("/:id", authorizationMw.isAdminOrManagement, actividadController.updateActividad);
router.delete("/:id", authorizationMw.isAdminOrManagement, actividadController.deleteActividad);
router.post("/inscribir", authorizationMw.isAdminOrManagement, actividadController.inscribirYNotificarEmprendedor);


module.exports = router;
//
