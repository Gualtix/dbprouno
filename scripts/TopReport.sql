/*Mostrar los 5 primeros bancos en orden ascendente que hayan tenido el mejor punteo en el
Ranking Bancario para el mes de noviembre 2020.*/

set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS NOVIEMBRE_2020 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2020-11-30 00:00:00" ORDER BY PerfilFinanciero.Activo ASC LIMIT 12,17;
;


/*Mostrar los últimos 5 bancos en orden descendente que hayan tenido el peor punteo en el
Ranking Bancario para el mes de febrero 2021*/

set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,PerfilFinanciero.Activo,PerfilFinanciero.fecha AS NOVIEMBRE_2020 from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha = "2020-11-30 00:00:00" ORDER BY PerfilFinanciero.Activo DESC LIMIT 12,17;
;


/*Mostrar los primeros 3 bancos en orden ascendente que hayan obtenido el mejor punteo en el
Ranking Bancario en el primer semestre quiere; decir del 30/11/2020 al 30/04/2021*/

set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,SUM(PerfilFinanciero.Activo) AS Activo from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	AND 
	PerfilFinanciero.fecha >= '2020-11-30' AND PerfilFinanciero.fecha <= '2021-04-30'
	GROUP BY Banco.Banco
	ORDER BY Activo ASC LIMIT 14,17
;



/*Mostrar al mejor banco quiere decir al banco que tenga la posición 1 en el Ranking Bancario
durante el año completo; quiere decir del 30/11/2020 al 31/10/2021*/

set @tmp=0;
SELECT (@tmp := @tmp +1) as Ranking,Banco.Banco,SUM(PerfilFinanciero.Activo) AS Activo from Banco,BancoPerfil,PerfilFinanciero 
WHERE 
	BancoPerfil.idBanco = Banco.IdBanco 
	AND 
	BancoPerfil.idPerfil = PerfilFinanciero.IdPerfil
	GROUP BY Banco.Banco
	ORDER BY Activo ASC LIMIT 16,17
;


