//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


// funciones
cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando en agregar
    listaCursos.addEventListener('click', agregarCurso);
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }
}

// leer html y extrar info curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // agregamos elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(infoCurso);

    carritoHTML();
}

// muestra el carrito de compras
function carritoHTML() {

    // limpiamos el html del carro
    limpiarHTML();

    // recorrer el carrito y generar el html
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" alt="carrito"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
        `;

        // agregar el html del carro en tbody
        contenedorCarrito.appendChild(row)

    });
}

// elimina los cursos del tbody
function limpiarHTML() {
    // forma rápida y efectiva
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}