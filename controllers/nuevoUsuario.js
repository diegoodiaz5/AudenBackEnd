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

exports.nuevoUsuario = async (req, res) => {
    const { contraseña } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(contraseña, salt);

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
        res.send(newUser);
    }
    catch (error) {
        res.send(error)
    }
};