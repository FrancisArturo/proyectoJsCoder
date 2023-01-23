/*Sección Compras en tienda de galletas veganas 
La tienda tiene 3 variedades de galletas que se venden en cajas de 800gr*/

// Variables
let elegida;
let posicion;
let pedidoRecup = [];
let suma = 0;
let subtotal;
let elemento;
let variedadElegida;
let conteoIdCarrito = 1;


// funcion para cambiar la imagen de la galleta seleccionada
function cambiarGalleta (galleta, source) {
    galleta.src = source;
}

// funcion para asignar el id de los productos en el carrito y de los botones de eliminar
function sumaConteoIdCarrito () {
    conteoIdCarrito ++;
}

// funcion para sumar el iva a los precios de los productos
function sumaSubTotal(precio, cantidad) {
    subtotal = precio * cantidad;
    suma += subtotal;
    sumaTotal.innerHTML = `Total: $${suma}`;
}

// funcion para limpiar el carrito despues de apretar el boton "finalizar compra"
function limpiarCarrito () {
    while (carrito.length > 0) {
    carrito.pop();
    }
    suma = 0;
    productosPedidos.innerHTML = "";
    sumaSubTotal(0, 0);
    productosPedidos.appendChild(sumaTotal);
}

// funcion para que se muestren los productos seleccionados en el carrito
function agregarCarrito () {
    limpiarAgregar ()

    carrito.forEach( item => {
        elemento = document.createElement("DIV");
        elemento.classList.add("borde");
        elemento.classList.add("d-flex");
        elemento.classList.add("align-items-center");
        elemento.innerHTML += `<img class = "imagenCarrito bordeImagen" src= ${item.imagen}></img>`
        elemento.innerHTML += `Nombre: ${item.nombre} <br> Precio: $${item.precio} <br> Cantidad: ${item.cantidad} <button id="${item.id}" type="button" class="btn btn-danger me-2 btnEliminar">Eliminar</button>`;  
        sumaSubTotal(item.precio, item.cantidad); 
        productosPedidos.appendChild(elemento);
        sumaConteoIdCarrito();
    });
}

// funcion para recuperar el carrito en el local storage
function recupCarrito () {
    if (localStorage.length > 0) {
    
        pedidoRecup = JSON.parse(localStorage.getItem("carritoStorage"));
        carrito = pedidoRecup;
        agregarCarrito();     
    }
}


// funcion para limpiar el carrito por cada producto que se agrega
function limpiarAgregar () {
    suma = 0;
    sumaSubTotal(0, 0);
    productosPedidos.innerHTML = "";
    productosPedidos.appendChild(sumaTotal);
    conteoIdCarrito = 1;
}


// contructor de array de productos

class variedad {
    constructor(nombre, precio, peso, ingred, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.ingred = ingred;
        this.imagen = imagen;
    }
    ivaPrecio() {
        this.precio = this.precio * 1.21;
    }
}

// array de productos
const productos = [];

productos.push(new variedad ("Galletas Chips de Chocolate", 2000, 800, "Anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), vainilla, sal marina, bicarbonato de sodio.", "./images/galletaChipChocolate.jpg"));
productos.push(new variedad ("Galletas Doble Chocolate", 1900, 800, "Anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), cacao orgánico, vainilla, sal marina, bicarbonato de sodio.", "./images/galletaDobleChocolate.jpg"));
productos.push(new variedad ("Galletas Mani", 1800, 800, "Anacardos, jarabe de arce, maní orgánico, vainilla, sal marina, bicarbonato de sodio.", "./images/galletaMani.jpg"));

// array y constructor de productos del carrito
let carrito = [];

class pedido {
    constructor(nombre, precio, cantidad, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.id = id;
    }
}


// activando la funcion de sumar iva a los precios
for (const variedad of productos) {
    variedad.ivaPrecio();
}


// elementos obtenidos del html para modificar
let opcionesGalleta = document.getElementsByClassName("variedades");
let imagen = document.getElementById("imagenGalletas");
let nombreGalleta = document.getElementById("titulo-galletas");
let ingredientes = document.getElementById("ingrGalleta");
let cantidad = document.getElementById("inputCantidad");
let botonMenos = document.getElementById("menos");
let botonMas = document.getElementById("mas");
let botonAgregar = document.getElementById("agregar-producto");
let productosPedidos = document.getElementById("productos");
let carritoBoton = document.getElementById("boton-carrito");
let sumaTotal = document.getElementById("total");
let botonComprar = document.getElementById("botonComprar");
let botonEliminar = document.getElementsByClassName("btnEliminar");


cantidad.value = 1;

// agregando evento click para que se cambien las imagenes y que se marque la seleccionada
for (const element of opcionesGalleta) {
    element.addEventListener("click", ()=> {
        
        variedadElegida = element.id;   
        elegida = productos.find(variedad => variedad.nombre == variedadElegida);
        posicion = productos.findIndex(variedad => variedad.nombre == variedadElegida);
        cambiarGalleta(imagen, elegida.imagen);
        nombreGalleta.innerText = elegida.nombre;
        ingredientes.innerText = elegida.ingred;

        for (const objeto of opcionesGalleta) {
            if ( objeto.id == variedadElegida){
                objeto.classList.add("active");
            } else {
                objeto.classList.remove("active");
            }
        }
    })
}

// evento boton menos cantidad
botonMenos.addEventListener("click", ()=> {
    if (cantidad.value > 1){
        cantidad.value --;
    }
})

// evento boton mas cantidad
botonMas.addEventListener("click", ()=> {
    cantidad.value ++;
})


// evento del boton agregar para pushear los productos en el array del carrito y que se muestren
botonAgregar.addEventListener("click", ()=> {
    if (posicion == undefined) {
        carrito.push(new pedido (productos[0].nombre, productos[0].precio, cantidad.value, productos[0].imagen, conteoIdCarrito));
    } else {
        carrito.push(new pedido (productos[posicion].nombre, productos[posicion].precio, cantidad.value, productos[posicion].imagen, conteoIdCarrito));
    }

    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    agregarCarrito();

})

// evento del boton finalizar compra

botonComprar.addEventListener("click", ()=> {
    swal({
        title: "Compra realizada!",
        text: "Tu pedido ha sido registrado con éxito",
        icon: "success",
        button: "Aceptar",
    });
    limpiarCarrito ();
    conteoIdCarrito = 1;
    localStorage.clear();
})


// evento de los botones eliminar 
productosPedidos.addEventListener("click", (event) => {
    botonId = event.target.id;
        carrito = carrito.filter((item) => item.id!= botonId);
        localStorage.clear();
        carrito.forEach (producto => {
            localStorage.setItem("carritoStorage", JSON.stringify(carrito));
        })
        agregarCarrito();
})


recupCarrito();


