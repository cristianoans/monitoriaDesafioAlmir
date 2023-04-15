const express = require('express'); // importando a biblioteca
const fs = require('fs'); // importando biblioteca que manipula arquivos.

const usuarios = express.Router(); // definimos usuarios como rota

usuarios.route('/')
    .get((req, res) => {

        // retorna o banco de dados
        const db = lerBancoDados();
        res.status(200).json(db);

    })
    .post((req, res) => {
        const { matricula, nome, media } = req.body;

        // verifica se os campos foram enviados na requisição
        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "campos obrigatórios não preenchidos" });
            return;
        }

        // retorna o banco de dados
        const db = lerBancoDados();

        // verifica se o usuário já existe no banco de dados
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)

        // se ele existe, interrompe a criação.
        if (alunoEncontrado) {
            res.status(400).json({ mensagem: "aluno já existe" });
            return;
        }

        // cria um novo objeto com as informações enviadas na requisição
        const novoAluno = {
            matricula,
            nome,
            media
        }

        // adiciona o objeto criado no array do banco de dados
        db.push(novoAluno);

        // grava os dados atualizados no banco de dados
        gravarBancoDados(db);

        // envia uma resposta de criação com sucesso e status 200
        res.status(200).json({ mensagem: "criado com sucesso" })

    })
    .put((req, res) => {
        const { matricula, nome, media } = req.body;

        // verifica se algun campo está ausente na requisição
        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "campos obrigatórios não informados." });
            return;
        }

        // retorna o banco de dados
        const db = lerBancoDados();

        // verifica se a matricula existe
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);

        // se não existe retorna erro e uma mensagem de aluno não encontrado
        if (!alunoEncontrado) {
            res.status(404).json({ mensagem: "aluno inexistente." });
            return;
        }

        // gera um array sem o objeto que queremos modificar
        const dbModificado = db.filter(aluno => aluno.matricula !== matricula);

        // gera um novo objeto com as informações enviadas na requisição
        const alunoModificado = {
            matricula,
            nome,
            media
        }

        // adiciona o novo objeto ao array modificado
        dbModificado.push(alunoModificado);

        // grava os dados modificados no banco de dados
        gravarBancoDados(dbModificado);

        res.status(200).json({ mensagem: "Aluno atualizado." })
    })
    .delete((req, res) => {
        const { matricula, nome, media } = req.body;

        // verifica se os campos foram enviados na requisição
        if (!matricula || !nome || !media) {
            res.status(400).json({ mensagem: "campos obrigatórios não preenchidos" });
            return;
        }

        // retorna o banco de dados
        const db = lerBancoDados();

        // verifica se o usuário já existe no banco de dados
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);

        // se não existe retorna erro e uma mensagem de aluno não encontrado
        if (!alunoEncontrado) {
            res.status(404).json({ mensagem: "aluno inexistente." });
            return;
        }

        // remove o aluno do array do banco de dados
        const dbModificado = db.filter(aluno => aluno.matricula !== matricula);

        // grava o array modificado no banco de dados
        gravarBancoDados(dbModificado);

        res.status(200).json({ mensagem: "Aluno excluido com sucesso." });
    });

function lerBancoDados() { // função que retorna o banco de dados
    const arquivo = fs.readFileSync('./db/db.json'); // leitura do arquivo
    const db = JSON.parse(arquivo); // converte para objeto
    return db;
}

function gravarBancoDados(db) { // grava o array modificado em formato json no arquivo db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
}


module.exports = usuarios;