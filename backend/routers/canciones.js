const express = require("express");

const router = express.Router();

const mysql = require("mysql2");

const conexion = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "bd_musica"

});

router.get("/", (req, res) => {

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

router.post("/", (req, res) => {

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

router.put("/:id", (req, res) => {

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

router.delete("/:id", (req, res) => {

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

module.exports = router;