

const URL = "http://localhost:3000/canciones";


const contenedor = document.getElementById("contenedorCanciones");

const buscador = document.getElementById("busqueda");

const btnNombre = document.getElementById("ordenarNombre");

const btnAnio = document.getElementById("ordenarAnio");

const formulario = document.getElementById("formCancion");


let canciones = [];

let editando = false;

let idEditar = null;



async function obtenerCanciones(){

    try{

        const respuesta = await fetch(URL);

        const datos = await respuesta.json();

        canciones = datos;

        mostrarCanciones(canciones);

    }catch(error){

        console.log(error);

    }

}


function mostrarCanciones(lista){

    contenedor.innerHTML = "";

    lista.forEach(cancion => {

        contenedor.innerHTML += `

        <div class="tarjeta">

            <img 
                src="${cancion.url_imagen}" 
                alt="imagen"
            >

            <h2>${cancion.nombreCancion}</h2>

            <p>
                <strong>Artista:</strong>
                ${cancion.artista}
            </p>

            <p>
                <strong>Álbum:</strong>
                ${cancion.album}
            </p>

            <p>
                <strong>Año:</strong>
                ${cancion.anio}
            </p>

            <p>
                <strong>Género:</strong>
                ${cancion.genero}
            </p>

            <button onclick="editar(${cancion.id})">
                Editar
            </button>

            <button onclick="eliminarCancion(${cancion.id})">
                Eliminar
            </button>

        </div>

        `;

    });

}



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

    try{


        if(editando){

            await fetch(`${URL}/${idEditar}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(nuevaCancion)

            });

            editando = false;

            idEditar = null;

        }

        else{

            await fetch(URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(nuevaCancion)

            });

        }

        formulario.reset();

        obtenerCanciones();

    }catch(error){

        console.log(error);

    }

});


async function eliminarCancion(id){

    try{

        await fetch(`${URL}/${id}`, {

            method: "DELETE"

        });

        obtenerCanciones();

    }catch(error){

        console.log(error);

    }

}



function editar(id){

    const cancion = canciones.find(c => c.id == id);

    document.getElementById("nombreCancion").value =
        cancion.nombreCancion;

    document.getElementById("artista").value =
        cancion.artista;

    document.getElementById("album").value =
        cancion.album;

    document.getElementById("anio").value =
        cancion.anio;

    document.getElementById("genero").value =
        cancion.genero;

    document.getElementById("imagen").value =
        cancion.url_imagen;

    editando = true;

    idEditar = id;

}


buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtradas = canciones.filter(cancion =>

        cancion.nombreCancion
        .toLowerCase()
        .includes(texto)

        ||

        cancion.artista
        .toLowerCase()
        .includes(texto)

        ||

        cancion.genero
        .toLowerCase()
        .includes(texto)

    );

    mostrarCanciones(filtradas);

});


btnNombre.addEventListener("click", () => {

    canciones.sort((a,b)=>

        a.nombreCancion.localeCompare(
            b.nombreCancion
        )

    );

    mostrarCanciones(canciones);

});



btnAnio.addEventListener("click", () => {

    canciones.sort((a,b)=>

        b.anio - a.anio

    );

    mostrarCanciones(canciones);

});


obtenerCanciones();