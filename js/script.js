/*Sección Compras en tienda de galletas veganas 
La tienda tiene 3 variedades de galletas que se venden en cajas de 800gr*/






let elegida;
let posicion;
let pedidoRecup;
let suma;
let subtotal;

function cambiarGalleta (galleta, source) {
    galleta.src = source;
}
function recupCarrito () {
    pedidoRecup = JSON.parse(localStorage.getItem("carritoStorage"));
    return pedidoRecup;
}

// function sumarTotal() {
//     for (elemento of pedidoRecup) {
//         subtotal += elemento.precio * cantidad.value;
//     }
// }



class variedad {
    constructor(nombre, precio, peso, ingred, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.ingred = ingred;
        this.imagen = imagen;
        this.id = id;
    }
    ivaPrecio() {
        this.precio = this.precio * 1.21;
    }
}

const productos = [];

productos.push(new variedad ("Galletas Chips de Chocolate", 2000, 800, "Anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), vainilla, sal marina, bicarbonato de sodio.", "./images/galletaChip Chocolate.jpg", 1));
productos.push(new variedad ("Galletas Doble Chocolate", 1900, 800, "Anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), cacao orgánico, vainilla, sal marina, bicarbonato de sodio.", "./images/galletaDobleChocolate.jpg", 2));
productos.push(new variedad ("Galletas Mani", 1800, 800, "Anacardos, jarabe de arce, maní orgánico, vainilla, sal marina, bicarbonato de sodio.", "./images/galletaMani.jpg", 3));

for (const variedad of productos) {
    variedad.ivaPrecio();
}

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

cantidad.value = 1;





for (const element of opcionesGalleta) {
    element.addEventListener("click", ()=> {
        
        let variedadElegida = element.id;   
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

botonMenos.addEventListener("click", ()=> {
    if (cantidad.value > 1){
        cantidad.value --;
    }
})

botonMas.addEventListener("click", ()=> {
    cantidad.value ++;
})

let carrito = [];

class pedido {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

botonAgregar.addEventListener("click", ()=> {
    carrito.push(new pedido (productos[posicion].nombre, productos[posicion].precio, cantidad.value));
    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    recupCarrito();
    agregarCarrito();
})

function agregarCarrito () {
    if (pedidoRecup.length > 0){
        ultimoElemento = pedidoRecup[pedidoRecup.length - 1]
        const elemento = document.createElement("P");
        elemento.classList.add("borde");
        elemento.innerHTML = `Nombre: ${ultimoElemento.nombre} <br> Precio: ${ultimoElemento.precio} <br> Cantidad: ${cantidad.value} `;  
        suma += ultimoElemento.precio * cantidad.value;
        sumaTotal.innerHTML = `Total: ${suma}`;
        productosPedidos.appendChild(elemento);
    }
}


