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

exports.usuarioPorId = async (req, res) => {
    const { user_id } = req.body;
    try {
        const { rows } = await client.query("SELECT u.user_id, u.email, u.nombre_de_usuario, m.modal1 FROM users u INNER JOIN modals m USING(user_id) WHERE user_id = $1",
            [user_id]);
        res.send(rows)
    } catch (error) {

    }
}