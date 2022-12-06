/*Sección Compras en tienda de galletas
La tienda tiene 3 variedades de galletas que se venden en cajas de 800gr*/


let subTotal = 0;
let cantidad;
let galleta;
let agregar;
let iva;
const precioChipChocolate = 2000;
const precioDobleChocolate = 1900;
const precioMani = 1800;

function ivaPrecio() {
    iva = subTotal * 0.21;
}
function elegirGalleta() {
    switch (galleta) {
        case "a": 
            cantidad = prompt("Cuantas unidades desea comprar? (ingrese un numero)");
            subTotal = precioChipChocolate * cantidad;
            break;
        case "b":
            cantidad = prompt("Cuantas unidades desea comprar? (ingrese un numero)");
            subTotal = precioDobleChocolate * cantidad;
            break;
        case "c":
            cantidad = prompt("Cuantas unidades desea comprar? (ingrese un numero)");
            subTotal = precioMani * cantidad;
            break;
        case "d":
            alert("Entendido! que tengas un buen día.");
            break;
        default: 
            alert("La opción que elegiste no es correcta, volvé a intentarlo!");
            break;
    }
}

galleta = prompt("Escriba la letra de la variedad que desea comprar: \na- Galletas chip de chocolate\nb- Galletas doble chocolate\nc- Galletas de maní\nd- No deseo, gracias.").toLowerCase();

do {
    elegirGalleta();
    if (galleta == "d") {
        break;
    } else if (galleta == "a" || galleta == "b" || galleta =="c") {
        agregar = prompt("Desea agregar algo más a su pedido? (escriba la letra de la opción)\na-  Si, deseo agregar algo más\nb-  No, esta bien.").toLowerCase();
        if (agregar == "b") {
            break;
        }
    } else {
        break;
    }
    galleta = prompt("Escriba la letra de la variedad que desea comprar: \na- Galletas chip de chocolate\nb- Galletas doble chocolate\nc- Galletas de maní").toLowerCase();
}while (agregar == "a")

ivaPrecio();
let total = subTotal + iva;

if (subTotal != 0) {
    alert("Datos de su pedido:\nSubtotal: $"+subTotal+"\nIVA: $"+ iva+"\nPrecio Total: $"+total);
    let confir = prompt("Quiere confirmar el pedido? (escriba la letra de la opción)\na- SI \nb- NO").toLowerCase();
        if (confir == "a") {
            alert("Felicitaciones, su pedido fue realizado correctamente");
        } else {
            alert("Su pedido fue cancelado exitosamente");
        }
} 

