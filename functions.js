// MODELO DE DATOS

let mis_peliculas_iniciales = [
    {
        titulo: "Superlópez",
        director: "Javier Ruiz Caldera",
        miniatura: "files/superlopez.png",
    },
    {
        titulo: "Jurassic Park",
        director: "Steven Spielberg",
        miniatura: "files/jurassicpark.png",
    },
    {
        titulo: "Interstellar",
        director: "Christopher Nolan",
        miniatura: "files/interstellar.png",
    },
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);


// VISTAS
const indexView = (peliculas) => {
    let i = 0;
    let view = "";

    while (i < peliculas.length) {
        view += `
        <div class="movie">
            <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
            </div>
            <div class="title">
                ${peliculas[i].titulo || "<em>Sin título</em>"}
            </div>
            <div class="actions">
                <button class="show" data-my-id="${i}">Ver</button>          <!-- ALUMNA -->
                <button class="edit" data-my-id="${i}">Editar</button>
                <button class="delete" data-my-id="${i}">Borrar</button>     <!-- ALUMNA -->
            </div>
        </div>\n`;
        i++;                                                                // ALUMNA
    }

    view += `<div class="actions">
                <button class="new">Añadir</button>                         <!-- ALUMNA -->
                <button class="reset">Reset</button>                        <!-- ALUMNA -->
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar Película </h2>
        <div class="field">
            Título <br>
            <input  type="text" id="titulo" placeholder="Título" value="${pelicula.titulo}">
        </div>
        <div class="field">
            Director <br>
            <input  type="text" id="director" placeholder="Director" value="${pelicula.director}">
        </div>
        <div class="field">
            Miniatura <br>
            <input  type="text" id="miniatura" placeholder="URL de la miniatura" value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">Actualizar</button>
            <button class="index">Volver</button>
        </div>
       `;
};

const showView = (pelicula) => {
return `
     <p>
        La película <b>${pelicula.titulo}</b>, fue     <!-- ALUMNA -->
        dirigida por <b>${pelicula.director}!</b>      <!-- ALUMNA -->
     
     </p>
     <div class="actions">
        <button class="index">Volver</button>
     </div>`;
};

const newView = () => {
    return `<h2>Crear Película</h2>
    <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título">                   <!-- ALUMNA -->
    </div>
    <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director">               <!-- ALUMNA -->
    </div>
    <div class="field">                         
            Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura">   <!-- ALUMNA -->
    </div>
    <div class="actions">
        <button class="create">Crear</button>                                   <!-- ALUMNA -->
        <button class="index">Volver</button>                                   <!-- ALUMNA -->
    </div>`;
};

// CONTROLADORES
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById("main").innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];       // ALUMNA
    document.getElementById("main").innerHTML = showView(pelicula); // ALUMNA
};

const newContr = () => {
    document.getElementById("main").innerHTML = newView();          // ALUMNA
};

const createContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);     // ALUMNA
    mis_peliculas.push(                                             // ALUMNA
        {
            titulo: document.getElementById("titulo").value,        // ALUMNA
            director: document.getElementById("director").value,    // ALUMNA
            miniatura: document.getElementById("miniatura").value,  // ALUMNA
        }
    );
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);     // ALUMNA
    indexContr();                                                   // ALUMNA
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById("main").innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo = document.getElementById("titulo").value;
    mis_peliculas[i].director = document.getElementById("director").value;
    mis_peliculas[i].miniatura = document.getElementById("miniatura").value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const deleteContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);     // ALUMNA
    let msg = confirm("¿Desea borrar la oelicula");                 // ALUMNA
    if (msg) {                                                      // ALUMNA
        mis_peliculas.splice(i,1);                                  // ALUMNA
        localStorage.mis_peliculas = JSON.stringify(mis_peliculas); // ALUMNA
        indexContr();
    } else {
        indexContr();                                               // ALUMNA
    }
};

const resetContr = () => {
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);     // ALUMNA
    indexContr();                                                             // ALUMNA
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener("click", (ev) => {
    if (matchEvent(ev, ".index")) indexContr();
    else if (matchEvent(ev, ".edit")) editContr(myId(ev));
    else if (matchEvent(ev, ".update")) updateContr(myId(ev));
    else if (matchEvent(ev, ".show")) showContr(myId(ev));      // ALUMNA
    else if (matchEvent(ev, ".new")) newContr();                // ALUMNA
    else if (matchEvent(ev, ".create")) createContr();          // ALUMNA
    else if (matchEvent(ev, ".delete")) deleteContr(myId(ev));  // ALUMNA
    else if (matchEvent(ev, ".reset")) resetContr();            // ALUMNA
});

// Inicialización
document.addEventListener("DOMContentLoaded", indexContr);
