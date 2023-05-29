const express = require("express");
const router = express.Router();
const { nuevoUsuario, verificarEmail, verificarNombreUsuario } = require("../controllers/nuevoUsuario");
const { usuarios } = require("../controllers/listaUsuarios");

// Lista de usuarios registrados
router.get("/", usuarios);

// Registro de un usuario
router.post("/nuevousuario", nuevoUsuario);

// Verificar si el email está registrado
router.post("/verificarEmail", verificarEmail);

// Verificar si el nombr de usuario ya existe
router.post("/verificarNombreUsuario", verificarNombreUsuario)

module.exports = router;