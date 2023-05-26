const express = require("express");
const router = express.Router();
const { nuevoUsuario } = require("../controllers/nuevoUsuario");
const { usuarios } = require("../controllers/listaUsuarios");

// Lista de usuarios registrados
router.get("/", usuarios);

// Registro de un usuario
router.post("/nuevousuario", nuevoUsuario);

module.exports = router;