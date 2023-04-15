const express = require('express'); // importando a biblioteca

const usuarios = express.Router(); // definimos usuarios como rota

usuarios.route('/')
.get((req, res) => {})
.post((req, res) => {})
.put((req, res) => {})
.delete((req, res) => {});

module.exports = usuarios;