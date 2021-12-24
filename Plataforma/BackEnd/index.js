const express = require("express");
const app = express();
const cors = require("cors");
var mysql = require("mysql");
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "5mb", extended: true }));
const { Client } = require("pg");
const port = 9090;

var con = mysql.createConnection({
  host: "34.125.74.101",
  user: "proyectoclase",
  password: "bases2vacas",
  database: "proyecto"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Conexion Exitosa");
  app.post('/registrar', (req, res) => {
    if ("password" in req.body && "nickname" in req.body) {
      var sql = `INSERT INTO usuario(user, pass) SELECT '${req.body.nickname}', '${req.body.password}'
                  WHERE NOT EXISTS(SELECT user FROM usuario WHERE user = '${req.body.nickname}');`
      con.query(sql, function(err, result){
        if(err) throw err;
        
        console.log("Registrado");
        return res.json(result.nickname)
      });
    }
  });

  app.post('/login', (req, res) => {
    if ("password" in req.body && "nickname" in req.body) {
      var sql = `SELECT user FROM usuario where user = '${req.body.nickname}' and pass = '${req.body.password}';`
      con.query(sql, function(err, result){
        if(err) throw err;
          if(result.length!=0){
            return res.json(result[0]); 
          }else{
           return res.json("false");
          }  
      });
    }
  });

  app.post('/informacion_usuario', (req, res) => {
    if("nickname" in req.body){
      var sql = `SELECT user FROM usuario WHERE user = '${req.body.nickname} ';`
      con.query(sql, function(err, result){
        if(err) throw err;
          if(result.length!=0){
            return res.json(result[0]); 
          }else{
           return res.json("false");
          }  
      });
    }
  });

});

/* const connectionData = {
  user: "postgres",
  host: "database",
  database: "aydisco",
  password: "ayd2Server",
  port: 5432,
};

const client = new Client(connectionData);

client.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  app.post("/register", (req, res) => {
    if (
      "password" in req.body &&
      "nombre" in req.body &&
      "fechanacimiento" in req.body &&
      "nickname" in req.body &&
      "email" in req.body
    ) {
      client
        .query(
          `
          INSERT INTO usuario
          (nickname, nombre, email, fechanacimiento, "password")
          SELECT '` + req.body.nickname  + `', '` + req.body.nombre  + `', '` + req.body.email  + `', '` + req.body.fechanacimiento  + `', '` + req.body.password  + `'
          WHERE
              NOT EXISTS (
                  SELECT nickname FROM usuario WHERE nickname = '` + req.body.nickname  + `'
              )RETURNING nickname
          `
        )
        .then((response) => {
          if(response.rows[0] === undefined)
            res.json({error: "ya existe el usuario"});
          res.json(response.rows[0]);
        })
        .catch(error => {
          let succAnsw = { error: error };
          res.json(succAnsw);
        });
    } else {
      let succAnsw = { error: "request with incomplete data" };
      res.json(succAnsw);
    }
  });

  app.post("/login", (req, res) => {
    //login and verification
    if ("nickname" in req.body && "password" in req.body) {
      client
        .query(
          "SELECT EXISTS (SELECT nickname FROM usuario WHERE nickname = '" +
            req.body.nickname +
            "' AND password = '" +
            req.body.password +
            "')::int;"
        )
        .then((response) => {
          res.json(response.rows[0]);
        })
        .catch(error => {
          let succAnsw = { error: error };
          res.json(succAnsw);
        });
    } else {
      let succAnsw = { error: "request with incomplete data" };
      res.json(succAnsw);
    }
  });

  app.post("/informacion_usuario", (req, res) => {
    //login and verification
    if ("nickname" in req.body) {
      client
        .query(
          "SELECT nombre, email, fechanacimiento FROM usuario WHERE nickname = '" +
            req.body.nickname +
            "';"
        )
        .then((response) => {
          res.json(response.rows[0]);
        })
        .catch(error => {
          let succAnsw = { error: error };
          res.json(succAnsw);
        });
    } else {
      let succAnsw = { error: "request with incomplete data" };
      res.json(succAnsw);
    }
  });

});

 */

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
