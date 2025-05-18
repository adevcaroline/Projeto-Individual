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

function registrarCasa(idUsuario, idCasa) {
    console.log("ACESSEI O USUARIO MODEL - registrarCasa():", idUsuario, idCasa);

    var instrucaoSql = `
        INSERT INTO CasaIdeal (fkusuario, fkCasa, dtResposta)
        VALUES (${idUsuario}, ${idCasa}, CURRENT_DATE());
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEstatisticas() {
    const instrucaoSql = `
        SELECT c.nomeCasa, COUNT(*) as quantidade
        FROM CasaIdeal ci
        JOIN Casa c ON ci.fkCasa = c.idCasa
        GROUP BY c.nomeCasa;
    `;

    return database.executar(instrucaoSql);
}

function buscarCasaDoUsuario(idUsuario) {
    const instrucaoSql = `
        SELECT c.nomeCasa, c.descricao
        FROM CasaIdeal ci
        JOIN Casa c ON ci.fkCasa = c.idCasa
        WHERE ci.fkusuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    registrarCasa,
    obterEstatisticas,
    buscarCasaDoUsuario
};
