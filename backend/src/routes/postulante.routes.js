const express = require("express");
const router = express.Router();
const postulanteController = require("../controllers/postulante.controller");

router.post("/postulantes", postulanteController.createPostulante);

module.exports = router;
