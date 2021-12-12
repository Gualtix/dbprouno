SELECT * FROM Banco;
SELECT * FROM BancoPerfil;
SELECT * FROM PerfilFinanciero;

USE proyecto;
SELECT Banco.IdBanco,Banco.Banco,SUM(PerfilFinanciero.Activo) AS suma from Banco,BancoPerfil,PerfilFinanciero 
WHERE BancoPerfil.idBanco = Banco.IdBanco and BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil 
GROUP BY (Banco.IdBanco) ORDER BY suma DESC;


/*NOVIEMBRE_2020*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS NOVIEMBRE_2020 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2020-11-30 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*DICIEMBRE_2020*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS DICIEMBRE_2020 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2020-12-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;


/*ENERO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS ENERO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-01-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*FEBRERO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS FEBRERO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-02-28 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*MARZO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS MARZO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-03-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;


/*ABRIL_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS ABRIL_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-04-30 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*MAYO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS MAYO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-05-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*JUNIO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS JUNIO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-06-30 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;


/*JULIO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS JULIO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-07-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

/*AGOSTO_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS AGOSTO_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-08-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;


/*SEPTIEMBRE_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS SEPTIEMBRE_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-09-30 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;


/*OCTUBRE_2021*/
set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS OCTUBRE_2021 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2021-10-31 00:00:00" ORDER BY PerfilFinanciero.Activo DESC
;

