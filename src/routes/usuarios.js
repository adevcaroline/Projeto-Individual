var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/registrar-casa", function (req, res) {
    usuarioController.registrarCasa(req, res);
});

router.get("/estatisticas", function (req, res) {
    usuarioController.obterEstatisticas(req, res);
});

router.get("/casa/:idUsuario", function (req, res) {
    usuarioController.buscarCasaDoUsuario(req, res);
});


module.exports = router;


