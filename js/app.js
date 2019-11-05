// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Listeners
cargarEventListener();

function cargarEventListener(){
    // Dispara cuando se presiona 
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito con delegation
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}


// Funciones
// Fucnión que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
// Se utiliza contains ya que es una lista de clases para ver si contiene esa clase de agregar carrito
// Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // enviamos el curso seleccionado en esta funcion para leer sus datos
        leerDatosCurso(curso);
    }
}
// función lee los datos del curso
function leerDatosCurso(curso){
//Aqui recogemos la información del carrito
// Construimos el objeto y lo pasamos a insertarCarrito
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);

}
// La información del curso va pasando como parámetros
// Funcion muestra el curso seleccionado en el carrito
// Aqui transportamos la informacion del carrito que fue previamente seleccionada
function insertarCarrito(curso){
    const row = document.createElement('tr');
    // Creamos una tabla porque es la estructura que está en el HTML 
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row); // con appenchild recreamos en la tabla de lista carrito los elementos que se han creado en la función de insertarCarrito
    guardarCursoLocalStorage(curso);
}
// Elimina un curso del carrito por default
function eliminarCurso(e){
    e.preventDefault();

    let curso;
    // Usando Delegation para reaccionar a elementos que se crean dinamicamente
    if(e.target.classList.contains('borrar-curso')){ // Si existe este curso ){
        e.target.parentElement.parentElement.remove();
    }
}
// Elimina los curso del carrito en el DOM
function vaciarCarrito(){
    //listaCursos.innerHTML = ''; // forma lenta

    // forma rapida y recomendada
    // mientras siga habiendo cursos eliminalos

    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    } // forma recomendada
    return false;

}

// Almacena cursos en el carrito en LocalStorage

function guardarCursoLocalStorage(curso){
    let cursos;
     // toma el valor con datos de un LS o vacio
    cursos = obtenerCursosLocalStorage();

    // El curso seleccionado se agrega al array
    cursos.push(curso);

    // Esta linea de codigo es vital para añadir al LS y convertimos el array en strings
    localStorage.setItem('cursos', JSON.stringify(cursos) );

}
// comprueba que hay elementos en localStorage
// Verifica que hay algo en localStorage si hay array vacio o con cursos
function obtenerCursosLocalStorage(){
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('cursos')===null){
        cursosLS = []; // array vacio

    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos') ); // Leemos curso y lo guardamos como array con JSON .parse
    }
    return cursosLS; // devuelvo lo que hay en el array
}