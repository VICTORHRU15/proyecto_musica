const URL = "http://localhost:3000/canciones";

const contenedor = document.getElementById("contenedorCanciones");

const buscador = document.getElementById("busqueda");

const btnNombre = document.getElementById("ordenarNombre");
const btnAnio = document.getElementById("ordenarAnio");

let canciones = [];


async function obtenerCanciones(){

    const respuesta = await fetch(URL);

    const datos = await respuesta.json();

    canciones = datos;

    mostrarCanciones(canciones);

}

obtenerCanciones();

function mostrarCanciones(lista){

    contenedor.innerHTML = "";

    lista.forEach(cancion => {

        contenedor.innerHTML += `

        <div class="tarjeta">

            <img 
                src="${cancion.url_imagen}" 
                width="200"
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

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtradas = canciones.filter(cancion =>

        cancion.nombreCancion.toLowerCase().includes(texto) ||
        cancion.artista.toLowerCase().includes(texto) ||
        cancion.genero.toLowerCase().includes(texto)

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

        a.anio - b.anio

    );

    mostrarCanciones(canciones);

});

async function eliminarCancion(id){

    await fetch(`${URL}/${id}`, {

        method: "DELETE"

    });

    obtenerCanciones();

}


function editar(id){

    const cancion = canciones.find(c => c.id === id);

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

}