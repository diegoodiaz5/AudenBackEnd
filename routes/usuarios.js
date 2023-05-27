const express = require("express");
const router = express.Router();
const { nuevoUsuario, verificarEmail } = require("../controllers/nuevoUsuario");
const { usuarios } = require("../controllers/listaUsuarios");

// Lista de usuarios registrados
router.get("/", usuarios);

// Registro de un usuario
router.post("/nuevousuario", nuevoUsuario);

// Verificar si el email está registrado
router.post("/verificarEmail", verificarEmail)

module.exports = router;