const express = require("express");
const router = express.Router();
const { nuevoUsuario, verificarEmail, verificarNombreUsuario, verificarUsuario } = require("../controllers/nuevoUsuario");
const { usuarios } = require("../controllers/listaUsuarios");
const { iniciarSesion } = require("../controllers/iniciarSesion")

// Lista de usuarios registrados
router.get("/", usuarios);

// Registro de un usuario
router.post("/nuevousuario", nuevoUsuario);

// Verificar si el email está registrado
router.post("/verificarEmail", verificarEmail);

// Verificar si el nombre de usuario ya existe
router.post("/verificarNombreUsuario", verificarNombreUsuario);

// Verificar si el usuario existe por email/nombre de usuario
router.post("/verificarUsuario", verificarUsuario);

// Login de un usuario
router.post("/iniciarSesion", iniciarSesion);

module.exports = router;