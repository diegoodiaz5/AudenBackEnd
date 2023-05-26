const express = require("express");
const app = express();
const PORT = 1234;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const usuarios = require("./routes/usuarios");

app.use("/", usuarios);

app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);