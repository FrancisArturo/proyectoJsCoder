/*Sección Compras en tienda de galletas veganas 
La tienda tiene 3 variedades de galletas que se venden en cajas de 800gr*
Se hacen envios gratis a partir de $8000*/



let cantidad;
let galleta;
let agregar;
let iva;
let sumaSubtotal = 0;
const envio = 2000;
let confir;
let total;

//constructor para los productos

class variedad {
    constructor(nombre, precio, peso, ingred, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.ingred = ingred;
        this.id = id;
    }
    ivaPrecio() {
        this.precio = this.precio * 1.21;
    }
}

//array de productos y de los precios de los productos pedidos para sumar el subtotal
const productos = []
const subtotal = []

//objetos del array de productos

productos.push(new variedad ("Galletas Chip de chocolate", 2000, 800, "anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), vainilla, sal marina, bicarbonato de sodio.", "a"));
productos.push(new variedad ("Galletas Doble chocolate", 1900, 800, "anacardos, jarabe de arce, chips de chocolate orgánico (azúcar de caña orgánico, licor de cacao orgánico, manteca de cacao orgánico), cacao orgánico, vainilla, sal marina, bicarbonato de sodio.", "b"));
productos.push(new variedad ("Galletas Maní", 1800, 800, "anacardos, jarabe de arce, maní orgánico, vainilla, sal marina, bicarbonato de sodio.", "c"));

// metodo para sumar el iva a los precios de los productos

for (const variedad of productos) {
    variedad.ivaPrecio();
}

// función usando reduce para calcular el subtotal

function sumarSubtotal() {
    sumaSubtotal = subtotal.reduce((acumulador, elemento) => acumulador + elemento, 0)
}

//función para que el usuario elija el tipo de galleta

function elegirGalleta() {
    switch (galleta) {
        case "a": 
            cantidad = prompt("Datos del producto \nNombre del producto: "+productos[0].nombre+ "\nPeso: "+productos[0].peso+" gr.\nIngredientes: "+productos[0].ingred+"\nPrecio: $"+productos[0].precio+ "\n\nCuantas unidades desea comprar? (ingrese un numero)");
            subtotal.push(productos[0].precio * cantidad);
            sumarSubtotal();
            break;
        case "b":
            cantidad = prompt("Datos del producto \nnNombre del producto: "+productos[1].nombre+ "\nPeso: "+productos[1].peso+" gr.\nIngredientes: "+productos[1].ingred+"\nPrecio: $"+productos[1].precio+ "\n\nCuantas unidades desea comprar? (ingrese un numero)");
            subtotal.push(productos[1].precio * cantidad);
            sumarSubtotal();
            break;
        case "c":
            cantidad = prompt("Datos del producto \nNombre del producto: "+productos[2].nombre+ "\nPeso: "+productos[2].peso+" gr.\nIngredientes: "+productos[2].ingred+"\nPrecio: $"+productos[2].precio+ "\n\nCuantas unidades desea comprar? (ingrese un numero)");
            subtotal.push(productos[2].precio * cantidad);
            sumarSubtotal();
            break;
        case "d":
            alert("Entendido! que tengas un buen día.");
            break;
        default: 
            alert("La opción que elegiste no es correcta, volvé a intentarlo!");
            break;
    }
}



galleta = prompt("Escriba la letra de la variedad que desea comprar: \n\na- Galletas chip de chocolate\nb- Galletas doble chocolate\nc- Galletas de maní\nd- No deseo, gracias.").toLowerCase();

//ciclo para elegir y agregar productos

do {
    elegirGalleta();
    if (galleta == "d") {
        break;
    } else if (galleta == "a" || galleta == "b" || galleta =="c") {
        agregar = prompt("El subtotal de su pedido es: $"+sumaSubtotal+"\n\nDesea agregar algo más a su pedido? (escriba la letra de la opción)\na-  Si, deseo agregar algo más\nb-  No, esta bien.").toLowerCase();
        if (agregar == "b") {
            break;
        }
    } else {
        break;
    }
    galleta = prompt("Escriba la letra de la variedad que desea comprar: \n\na- Galletas chip de chocolate\nb- Galletas doble chocolate\nc- Galletas de maní").toLowerCase();
}while (agregar == "a")


//condicionales para mostrar los datos del pedido y averiguar si el envio es gratis o no. 

if (sumaSubtotal != 0) {
    if(sumaSubtotal >= 8000) {
        total = sumaSubtotal;
        alert("Datos de su pedido:\nSubtotal: $"+sumaSubtotal+"\nEnvío: Gratis\nPrecio Total: $"+total);
        confir = prompt("Quiere confirmar el pedido? (escriba la letra de la opción)\na- SI \nb- NO").toLowerCase();
    } else {
        total = sumaSubtotal + envio;
        alert("Datos de su pedido:\nSubtotal: $"+sumaSubtotal+"\nEnvío: $"+envio+"\nPrecio Total: $"+total);
        confir = prompt("Quiere confirmar el pedido? (escriba la letra de la opción)\na- SI \nb- NO").toLowerCase();
    }
    if (confir == "a") {
        alert("Felicitaciones, su pedido fue realizado correctamente");
    } else {
        alert("Su pedido fue cancelado exitosamente");
    }
} 

