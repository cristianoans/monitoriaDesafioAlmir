const express = require('express');
const usuarios = require('./routes/usuarios');

// config do app express
const app = express();
app.use(express.json());

app.use('/usuarios', usuarios);

app.listen(3000);