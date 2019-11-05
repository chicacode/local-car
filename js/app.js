// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');


// Listeners
cargarEventListener();

function cargarEventListener(){
    // Dispara cuando se presiona 
    cursos.addEventListener('click', comprarCurso);

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
            <img src="${curso.imagen}">
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

}