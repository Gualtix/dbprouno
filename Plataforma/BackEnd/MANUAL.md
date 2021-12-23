# Api con NodeJs

Contenido
- [Api con NodeJs](#api-con-nodejs)
    - [Api Rest](#api-rest)
      - [Endpoints](#endpoints)
    - [Dockerizando](#dockerizando)
      - [Dockerfile](#dockerfile)

### Api Rest
Las dependencias para levantar la Api Rest con Node, son:
```json
"dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-force-https": "^1.0.0",
    "pg": "^8.7.1"
}
```

Primero se conecta a la base de datos, y se defina un ```GET``` raíz que tiene un mensaje de bienvenida.

```js
client.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log("Conectado a la base de datos!")

    app.get('/', (req, res) => {
        console.log('inicio de api')
        res.send('API SOPES 1 :D');
    });

    //-----------------------------------------------------------------------------------
    // ------------------ ACÁ SE COLOCAN TODOS LOS ENDPOINTS ----------------------------
    //-----------------------------------------------------------------------------------

    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error)
```
A continuación se definen los endpoints utilizados.

#### Endpoints
- Existe usuario

```js
app.post('/existUser', (req, res) => {
    client.query('select count(u.username) as exist from "user" u where u.username = \'' + req.body.username + '\'')
        .then(response => {
            res.json(response.rows[0]);
        })
        .catch(err => {
            res.send(err);
        })
})
```

### Dockerizando
Para colocar la Api y el servicio de base de datos MongoDB en un contenedor cada uno, se creó un archivo Dockerfile para la Api de NodeJs y se bajó una imagen pública de Mongo para la base de datos.

#### Dockerfile

Se especifica que el servicio es de Node y se obtiene la última versión. Se especifica el directorio de trabajo para NodeJs. Se copian los dos archivos JSON donde están especificadas todas las dependencias necesarias para la API a la raíz del contenedor. Se corre el comando ```npm install``` para que instale las dependencias. Se copian todos los archivos de raíz a raíz del contenedor. Se expone el puerto 8080, que es donde se va a exponer la API. Se corre el comando ```mkdir -p /elements/procs``` para crear la carpeta dentro del contenedor y así ahí poder montar el módulo de procesos y el módulo de RAM. Por último, se levanta la Api con ```node index.js```.
```dockerfile
FROM node:latest
WORKDIR /usr/src/nodejs
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN mkdir -p /elements/procs

CMD ["node", "index.js"]
```