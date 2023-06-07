const { Pool } = require("pg");
const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "audn",
    password: "apka",
    port: 3001
});

const bcrypt = require("bcrypt");

exports.verificarEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const { rows } = await client.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
        );
        // Si el email existe, devuelve true
        if (rows[0].email !== null) {
            res.send(true);
        }
    } catch (error) {
        res.send(error)
    }
}

exports.verificarNombreUsuario = async (req, res) => {
    const { nombre_de_usuario } = req.body;
    try {
        const { rows } = await client.query(
            "SELECT nombre_de_usuario FROM users WHERE nombre_de_usuario = $1",
            [nombre_de_usuario]
        );
        if (rows[0].nombre_de_usuario !== null) {
            res.send(true);
        }
    } catch (error) {
        res.send(error)
    }
}


// verifica nombre de usuario y email al mismo tiempo
exports.verificarUsuario = async (req, res) => {
    const { info } = req.body;
    try {
        const { rows } = await client.query(
            "SELECT * FROM users WHERE email = $1 OR nombre_de_usuario = $1",
            [info]
        );
        if (rows[0] !== undefined) {
            res.send({ existe: true, email: rows[0].email })
        } else {
            res.send({ existe: false })
        }
    } catch (error) {
        res.send(error);
    }
}

exports.nuevoUsuario = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.contraseña, salt);

    const newUser = {
        email: req.body.email,
        nombre_de_usuario: req.body.nombre_de_usuario,
        contraseña: password,
    };

    try {
        await client.query(
            "INSERT INTO users (email, nombre_de_usuario, contraseña) VALUES ($1, $2, $3)",
            [newUser.email, newUser.nombre_de_usuario, newUser.contraseña]
        );
        await client.query(
            "INSERT INTO modals (modal1) VALUES (true)",
        )
        res.sendStatus(200);
    }
    catch (error) {
        res.send(error)
    }
};
