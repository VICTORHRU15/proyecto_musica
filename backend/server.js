const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const conexion = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "bd_musica"

});

conexion.connect((error) => {

    if (error) {

        console.log("Error conexión MYSQL");

        return;

    }

    console.log("MYSQL conectado");

});


app.get("/canciones", (req, res) => {

    conexion.query(

        "CALL sp_listar_canciones()",

        (error, resultado) => {

            if (error) {

                res.status(500).json(error);

                return;

            }

            res.json(resultado[0]);

        }

    );

});


app.post("/canciones", (req, res) => {

    const datos = req.body;

    conexion.query(

        "CALL sp_insertar_cancion(?,?,?,?,?,?)",

        [

            datos.nombreCancion,

            datos.artista,

            datos.album,

            datos.anio,

            datos.genero,

            datos.url_imagen

        ],

        (error, resultado) => {

            if (error) {

                res.status(500).json(error);

                return;

            }

            res.json({

                mensaje: "Canción agregada"

            });

        }

    );

});


app.put("/canciones/:id", (req, res) => {

    const id = req.params.id;

    const datos = req.body;

    conexion.query(

        "CALL sp_actualizar_cancion(?,?,?,?,?,?,?)",

        [

            id,

            datos.nombreCancion,

            datos.artista,

            datos.album,

            datos.anio,

            datos.genero,

            datos.url_imagen

        ],

        (error, resultado) => {

            if (error) {

                res.status(500).json(error);

                return;

            }

            res.json({

                mensaje: "Canción actualizada"

            });

        }

    );

});

app.delete("/canciones/:id", (req, res) => {

    const id = req.params.id;

    conexion.query(

        "CALL sp_eliminar_cancion(?)",

        [id],

        (error, resultado) => {

            if (error) {

                res.status(500).json(error);

                return;

            }

            res.json({

                mensaje: "Canción eliminada"

            });

        }

    );

});

app.listen(3000, () => {

    console.log("Servidor corriendo en puerto 3000");

});


const formulario = document.getElementById("formCancion");


formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nuevaCancion = {

        nombreCancion:
            document.getElementById("nombreCancion").value,

        artista:
            document.getElementById("artista").value,

        album:
            document.getElementById("album").value,

        anio:
            document.getElementById("anio").value,

        genero:
            document.getElementById("genero").value,

        url_imagen:
            document.getElementById("imagen").value

    };

    await fetch(URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(nuevaCancion)

    });

    formulario.reset();

    obtenerCanciones();

});