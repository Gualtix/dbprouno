DROP TABLE BancoPerfil;
DROP TABLE BancoPerfilUsuario;
DROP TABLE Banco;

CREATE TABLE Banco
(
  IdBanco integer NOT NULL AUTO_INCREMENT,
  Banco varchar(100),
  CONSTRAINT IdBanco PRIMARY KEY (IdBanco)
);

CREATE TABLE BancoPerfil
(
  idBanco integer,
  idPerfil integer
);



CREATE TABLE PerfilFinanciero
(
  IdPerfil integer NOT NULL AUTO_INCREMENT,
  Activo float,
  Pasivo float,
  Patrimonio float,
  fecha datetime,
  CONSTRAINT IdPerfil PRIMARY KEY (IdPerfil)
);

ALTER TABLE BancoPerfil ADD CONSTRAINT FK_BancoPerfil_
FOREIGN KEY (idBanco) REFERENCES Banco (IdBanco);

ALTER TABLE BancoPerfil ADD CONSTRAINT FK_BancoPerfil_1
FOREIGN KEY (idPerfil) REFERENCES PerfilFinanciero (IdPerfil);
