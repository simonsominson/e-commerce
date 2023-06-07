let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#vaciar-carrito");
const borrarCarrito = document.querySelector(".carrito-borrar");
const contenedorTotal = document.querySelector("#total");
const btnComprar = document.querySelector(".btn-der");



function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        contenedorProductos.innerHTML = ""; 
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `   <img src="${producto.imagen}" alt="${producto.nombre}" class="img-carrito">
                                <div class="carrito-titulo">
                                    <small class="smalls">Titulo</small>
                                    <h3>${producto.nombre}</h3>
                                </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad:</small>
                                <p>${producto.cantidad}</p>
                            </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$ ${producto.precio}</p>
                        </div>
                        <div class="carrito-subtotal">
                            <small>Subtotal:</small>
                            <p>$ ${producto.precio * producto.cantidad}</p>   
                            </div>
                            <button class="carrito-borrar" id="${producto.id}"><i class="bi bi-trash"></i></button>`;
    
                            contenedorProductos.append(div);
                           
                            
        });
        actualizarTotal();

    } else {
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar ();
    
}

cargarProductosCarrito();


function actualizarBotonesEliminar () {
    botonesAgregar = document.querySelectorAll(".carrito-borrar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;    
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
}


function actualizarTotal() {
     let totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `${totalCalculado}`;
}


btnComprar.addEventListener("click", thanksMessage);
function thanksMessage () {
    
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    carritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}