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
let duplicado;
let value1;
let value2;
let value3;



// funcion para mostrar los valores del producto por defecto, luego de recibir los productos del archivo Json y pushearlos al array de productos.
function defecto (){
    nombreGalleta.innerText = productos[0].nombre;
    ingredientes.innerText = productos[0].ingredientes;
    imagen.src = productos[0].imagen;
}

// funcion para cambiar la imagen de la galleta seleccionada
function cambiarGalleta (galleta, source) {
    galleta.src = source;
}

// funcion para sumar el subtotal al total y mostrarlo en el carrito
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
}


//función para dar los datos para el envio del pedido y que se muestren al final
async function datosEnvio () {
    const { value: formValues } = await Swal.fire({
        title: 'Datos para el envío',
        html:
            'Nombre <input type="text" id="swal-input1" class="swal2-input">' +
            'Apellido <input id="swal-input2" class="swal2-input">'+
            'Dirección <input id="swal-input3" class="swal2-input">',
        focusConfirm: false,    
        preConfirm: () => {
            return [
            
            value1 = document.getElementById('swal-input1').value,
            value2 = document.getElementById('swal-input2').value,
            value3 = document.getElementById('swal-input3').value
            ]
        },
    })
        if (!value1 || !value2 || !value3) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...no se pudo completar la compra',
            text: 'Debes completar todos los campos para poder completar la compra.',
            footer: 'Vuelve a intentarlo!'
        })

    } else {
        Swal.fire(
        'Pedido Realizado!',
        'Felicidades ' + value1 + ' '+ value2 + ', tu pedido fue registrado exitosamente. El envío llegara dentro de las proximas 48hs a 72hs a ' + value3 + '.',
        'success')
        limpiarCarrito ();
        localStorage.clear();
        duplicado = undefined;
    }
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


// array y constructor de productos
const productos = [];

class producto {
    constructor (nombre, precio, ingredientes, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.imagen = imagen;
        this.id = id;
    }
    // ivaPrecio() {
    //     this.precio = this.precio * 1.21;
    // }
}

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


//fetch para recibir los productos del archivo Json y pushearlos al array de productos
fetch('./productos.json')
    .then( res => res.json())
    .then( data => data.forEach (prod => {
        let nuevoProd = new producto (prod.nombre, prod.precio, prod.ingredientes, prod.imagen, prod.id)
        nuevoProd.precio = nuevoProd.precio * 1.21; //precio con iva
        productos.push(nuevoProd)
    }))
    .then (data => {
        defecto ()
    })


// evento click para que se cambien las imagenes y que se marque la seleccionada
for (const element of opcionesGalleta) {
    element.addEventListener("click", ()=> {
        
        variedadElegida = element.id;   
        elegida = productos.find(variedad => variedad.nombre == variedadElegida);
        posicion = productos.findIndex(variedad => variedad.nombre == variedadElegida);
        cambiarGalleta(imagen, elegida.imagen);
        nombreGalleta.innerText = elegida.nombre;
        ingredientes.innerText = elegida.ingredientes;

        for (const objeto of opcionesGalleta) {
            objeto.id == variedadElegida ?  objeto.classList.add("active") : objeto.classList.remove("active")}
    })
}

// evento boton menos cantidad
botonMenos.addEventListener("click", ()=> {
    if (cantidad.value > 1){
        cantidad.value --;
    }
})

// evento boton más cantidad
botonMas.addEventListener("click", ()=> {
    cantidad.value ++;
})


// evento del boton agregar para pushear los productos en el array del carrito y que se muestren, evitando duplicados. 
botonAgregar.addEventListener("click", ()=> {

    if (posicion == undefined) {
        if (carrito.length == 0) {
            carrito.push(new pedido (productos[0].nombre, productos[0].precio, cantidad.value, productos[0].imagen, productos[0].id));
        } else {
            for (const cosa of carrito) {
                duplicado = carrito.find(cosa => cosa.id == 1);
            }
            if (duplicado == undefined){
                carrito.push(new pedido (productos[0].nombre, productos[0].precio, cantidad.value, productos[0].imagen, productos[0].id));
            } else {
                duplicado.cantidad= parseInt(cantidad.value) + parseInt(duplicado.cantidad);
            }
        }
        localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    } else {
        
        for (const cosa of carrito) {
            duplicado = carrito.find(cosa => cosa.id == elegida.id);
        }
            if (duplicado == undefined){
                carrito.push(new pedido (productos[posicion].nombre, productos[posicion].precio, cantidad.value, productos[posicion].imagen, productos[posicion].id)); 
            } else {
                duplicado.cantidad= parseInt(cantidad.value) + parseInt(duplicado.cantidad);
            }
        localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    }    

    agregarCarrito()

})

// evento del boton finalizar compra

botonComprar.addEventListener("click", ()=> {
    carrito.length == 0 ? 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se puede realizar el pedido!',
            footer: 'Agrega artículos al carrito!'
        })
        :
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras realizar modificaciones al pedido!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, deseo confirmar la compra'
        }).then((result) => {
            if (result.isConfirmed) {
                datosEnvio ();
            }
        })
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

//llamada a la función para recuperar el carrito del localStorage
recupCarrito();





