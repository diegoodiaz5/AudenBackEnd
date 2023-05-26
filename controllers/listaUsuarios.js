const { Pool } = require("pg");
const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "audn",
    password: "apka",
    port: 3001
});

exports.usuarios = async (req, res) => {
    try {
        const { rows } = await client.query("SELECT user_id,nombre_de_usuario FROM users")
        return res.send(rows);
    } catch (error) {
        res.send(error);
    }

};