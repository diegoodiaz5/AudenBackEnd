const { Pool } = require("pg");
const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "audn",
    password: "apka",
    port: 3001
});
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TOKEN_SECRET } = require("../middlewares/validar-jwt");

exports.iniciarSesion = async (req, res) => {
    const { info, contraseña } = req.body;

    try {
        const { rows } = await client.query(
            "SELECT * FROM users WHERE email = $1 OR nombre_de_usuario = $1",
            [info]
        );
        if (rows[0] !== undefined) {
            const validPassword = await bcrypt.compare(
                contraseña,
                rows[0].contraseña
            );
            if (!validPassword) {
                return res.status(400).json({ error: "Contraseña no válida" });
            } else {
                const token = jwt.sign(
                    {
                        name: rows[0].nombre_de_usuario,
                        id: rows[0].user_id,
                    },
                    TOKEN_SECRET
                );
                res.json({ error: null, user: rows[0], token });
            }
        } else {
            return res.send({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.send(error)
    }

}