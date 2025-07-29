const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/login", (req, res) => {
    res.render("pages/login", { errors: [], old: {} });
});

app.post("/login",
    [
        body("email").isEmail().withMessage("Digite um e-mail válido"),
        body("password").isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("pages/login", { errors: errors.array(), old: req.body });
        }

        
        res.send(`<h1>Bem-vindo, ${req.body.email}!</h1>`);
    }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));