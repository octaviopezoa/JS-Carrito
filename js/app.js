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

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar carrito compra
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] //reseteamos el arreglo
        limpiarHTML();
    })
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo  de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su html
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

    // revisa si un elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados.
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // agregamos elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(infoCurso);

    carritoHTML();
}

// muestra el carrito de compras
function carritoHTML() {

    // limpiamos el html del carro
    limpiarHTML();

    // recorrer el carrito y generar el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100%" alt="carrito"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td> 
            <td><a href="#" class="borrar-curso" data-id="${cantidad}"> x </a></td> 
        `;

        // agregar el html del carro en tbody
        contenedorCarrito.appendChild(row)

    });
}

// elimina los cursos del tbody
function limpiarHTML() {
    // forma r??pida y efectiva
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}