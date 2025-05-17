var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL - autenticar():", email, senha);
    
    var instrucaoSql = `
        SELECT idusuario, nomeCompleto, Email, senha
        FROM usuario
        WHERE Email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL - cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nomeCompleto, Email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
