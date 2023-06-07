const productos = [
    {
        nombre: "Celular Galaxy A04",
        almacenamiento: "64 GB",
        id: "Celulares",
        memoria: "4gb ram",
        imagen: "./img/celulares/galaxya04.jpg",
        color: "negro",
        precio: 62.999,
    },
    {
        nombre: "Celular Galaxy A24",
        almacenamiento: "128 GB",
        id: "Celulares",
        memoria: "6gb ram",
        imagen: "./img/celulares/galaxya24.jpg",
        color: "negro",
        precio: 143.999
    },
    {
        nombre: "Celular Motorola e22",
        almacenamiento: "32 GB",
        id: "Celulares",
        memoria: "3gb ram",
        imagen: "./img/celulares/motoe22.jpg",
        color: "plata",
        precio:  53.999
    },
    {
        nombre: "Celular Motorola e32",
        almacenamiento: "64 GB",
        id: "Celulares",
        memoria: "4gb ram",
        imagen: "./img/celulares/motog32.jpg",
        color: "plata",
        precio:  65.999
    },
    {
        nombre: "Notebook Bangho Max L5",
        procesador: "Intel i5 7generación",
        id: "Notebooks",
        almacenamiento: "ssd 240gb",
        memoria: "8gb ram",
        color: "Plata",
        imagen: "./img/notebooks/bangho-maxl5.jpg",
        precio: 407.099
    },
    {
        nombre: "Notebook Dell Inspiron",
        procesador: "AMD Ryzen 5 5625U",
        id: "Notebooks",
        almacenamiento: "SSD 256gb",
        memoria: "8gb ram",
        color: "Negro",
        imagen: "./img/notebooks/dell-inspiron3525.jpg",
        precio: 316.795
    },
    {
        nombre: "Notebook Lenovo",
        procesador: "Intel i3 1215u",
        id: "Notebooks",
        almacenamiento: "ssd 128gb",
        memoria: "4gb ram",
        color: "Plata",
        imagen: "./img/notebooks/lenovo-i3.jpg",
        precio: 205.999
    },
    {
        nombre: "Notebook Exo T56",
        procesador: "Intel Celeron N4020",
        id: "Notebooks",
        almacenamiento: "ssd 128gb",
        memoria: "4gb ram",
        color: "Negro",
        imagen: "./img/notebooks/exo-celeron.jpg",
        precio: 407.099
    },
    {
        nombre: "Tablet Samsung A8",
        id: "Tablets",
        almacenamiento: "32gb",
        memoria: "3gb ram",
        pulgadas: "10.5''",
        color: "Negro",
        imagen: "./img/tablets/tablet-samsung-A8.jpg",
        precio: 114.999
    },
    {
        nombre: "Tablet Samsung A7 Lite",
        id: "Tablets",
        almacenamiento: "32gb",
        color: "Plata",
        memoria: "3gb ram",
        pulgadas: "8.7''",
        imagen: "./img/tablets/tablet-samsung-A7.jpg",
        precio: 114.999
    },
    {
        nombre: "Tablet Samsung S6 Lite",
        id: "Tablets",
        almacenamiento: "64gb",
        color: "Plata",
        memoria: "4gb ram",
        pulgadas: "10.4''",
        imagen: "./img/tablets/tablet-samsung-S6.jpg",
        precio: 193.999
    },
    {
        nombre: "Tablet Xiaomi Redmi",
        id: "Tablets",
        almacenamiento: "128gb",
        color: "Verde Menta",
        memoria: "4gb ram",
        pulgadas: "10.61' ",
        imagen: "./img/tablets/tablet-xiaomi-redmi.jpg",
        precio: 129.999
    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".btn-nav");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");
let botonesAgregar = document.querySelectorAll(".btn-compra");

function cargarProductos (productosElegidos) {

        contenedorProductos.innerHTML = "";
        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <div>
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                    <div>
                        <h3 class="titulo-card">${producto.nombre}</h3>
                        <h3 class="titulo-card">${producto.memoria}</h3>
                        <p class="precio-card">$ ${producto.precio}</p>
                        <button class="btn-compra" id="${producto.nombre}">Comprar</button>
                    </div>
                </div>`; 
                
                contenedorProductos.append(div);
    
        })
        actualizarBotonesAgregar ();
}
cargarProductos(productos);

botonCategoria.forEach(boton => {

    boton.addEventListener("click", (e) => {

        botonCategoria.forEach (boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
        const productosCategoria = productos.find(producto => producto.id === e.currentTarget.id)
        tituloPrincipal.innerText = productosCategoria.id;

        const productosElegidos = productos.filter (producto => producto.id === e.currentTarget.id)
        cargarProductos(productosElegidos);

        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
})
 

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".btn-compra");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

        const idBoton = e.currentTarget.id;
        const productoAgregado =  productos.find (producto => producto.nombre  === idBoton);
       
        if(productosEnCarrito.some(producto => producto.nombre === idBoton)) {

           const index = productosEnCarrito.findIndex(producto => producto.nombre === idBoton);
           productosEnCarrito[index].cantidad++;
        } else {

            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
        actualizarNumerito();

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

