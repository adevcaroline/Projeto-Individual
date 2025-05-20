var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        idusuario: resultadoAutenticar[0].idusuario,
                        email: resultadoAutenticar[0].Email,
                        nome: resultadoAutenticar[0].nomeCompleto,
                        senha: resultadoAutenticar[0].senha
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function registrarCasa(req, res) {
    var idUsuario = req.body.idUsuario;
    var idCasa = req.body.idCasa;

    usuarioModel.registrarCasa(idUsuario, idCasa)
        .then(resultado => {
            res.status(200).json({ mensagem: "Casa registrada com sucesso" });
        })
        .catch(erro => {
            console.log("Erro ao registrar casa:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterEstatisticas(_req, res) {
    usuarioModel.obterEstatisticas()
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar estatísticas:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarCasaDoUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    usuarioModel.buscarCasaDoUsuario(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send(); // No Content
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar casa do usuário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    registrarCasa,
    obterEstatisticas,
    buscarCasaDoUsuario 
};




