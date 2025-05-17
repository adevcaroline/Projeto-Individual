CREATE DATABASE hp;

USE hp;

CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(45),
    Email VARCHAR(80),
    senha VARCHAR(20)
);

CREATE TABLE Casa (
    idCasa INT PRIMARY KEY AUTO_INCREMENT,
    nomeCasa VARCHAR(45),
    descricao VARCHAR(45)
);

CREATE TABLE CasaIdeal (
    fkusuario INT,
    fkCasa INT,
    dtResposta DATE,
    PRIMARY KEY (fkusuario, fkCasa),
    FOREIGN KEY (fkusuario) REFERENCES usuario(idusuario),
    FOREIGN KEY (fkCasa) REFERENCES Casa(idCasa)
);

SELECT * FROM usuario;
