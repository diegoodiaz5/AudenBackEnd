const { Pool } = require("pg");
const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "audn",
    password: "apka",
    port: 3001
});

exports.setearModal1enFalse = async (req, res) => {
    const { user_id } = req.body;
    try {
        await client.query(
            "UPDATE modals SET modal1 = false WHERE user_id=$1",
            [user_id]
        );
        res.send({ error: null, patched: true })
    } catch (error) {
        res.send(error);
    }
}