//Variables
const iva105 = 1.105 ;
const iva21 = 1.21 ;
const descuento = 0.9;
let cantidad = 0
let sumaConDescuento
let sumaSinDescuento
//Objetos
class PRODUCTOS {
    constructor (codigo, nombre, descripcion, precio) {
        this.codigo = codigo;
        this.nombre = nombre.toLowerCase();
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

const producto1 = new PRODUCTOS(001, "Taladro", " Black & Decker 750W 13mm ", 10000);
const producto2 = new PRODUCTOS(002, "Taladro", " Black & Decker 500W 10mm ", 8000);
const producto3 = new PRODUCTOS(003, "Taladro", " De Walt 1100W 13mm ", 20000);
const producto4 = new PRODUCTOS(004, "Amoladora", " Amoladora Black & Decker 1100W disco 4,5mm ", 13000);
const producto5 = new PRODUCTOS(005, "Amoladora", " Amoladora DeWalt 1800W disco 7mm ", 30000);

//Arrays
const cart = [];
const list = [producto1, producto2, producto3, producto4, producto5];

//Funciones
const suma = (a, b) => a + b ;
const resta = (a, b) => a - b ;
const multiplicacion = (a, b) => a * b ;


function catalogo (){
alert("Este es nuestro catálogo de productos")
list.forEach((producto) => {
    alert(producto.codigo + producto.nombre + producto.descripcion + "$" + producto.precio + "+IVA")
})
}

function buy(){
    alert("Este es nuestro catálogo de productos")
list.forEach((producto) => {
    alert(producto.codigo + ") " + producto.nombre + producto.descripcion + "$" + producto.precio + "+IVA")
})
let addProduct = prompt("Ingrese el código del artículo que desea agregar al carrito. Ingrese 0 si desea volver a ver el catálogo");
switch (addProduct){
    case "0":
        catalogo
    break;
    case "1":
        cantidad = parseFloat(prompt("Usted seleccionó: 1) Taladro Black & Decker 750W 13mm. Su costo es de $10.000 + IVA. Seleccione la cantidad:"));
            if(cantidad>=10){
                sumaConDescuento = multiplicacion(cantidad, producto1.precio) * iva21 * descuento;
                alert(sumaConDescuento);
                cart.push(sumaConDescuento);
                console.log(cart);
            }else{
                sumaSinDescuento = multiplicacion(cantidad, producto1.precio) * iva21
                alert(sumaSinDescuento);
                cart.push(sumaSinDescuento);
                console.log(cart);
            };
    break;
    case "2":
        cantidad = parseFloat(prompt("Usted seleccionó 2) Taladro Black & Decker 500W 10mm. Su costo es de $8.000 + IVA. Seleccione la cantidad: "));
            if(cantidad>=10){
                sumaConDescuento = multiplicacion(cantidad, producto2.precio) * iva21 * descuento;
                alert(sumaConDescuento);
                cart.push(sumaConDescuento);
                console.log(cart);
            }else{
                sumaSinDescuento = multiplicacion(cantidad, producto2.precio) * iva21
                alert(sumaSinDescuento);
                cart.push(sumaSinDescuento);
                console.log(cart);
            };
    break;
    case "3": 
        cantidad = parseFloat(prompt("Usted seleccionó 3) Taladro DeWalt 1100W 13mm. Su costo es de $20.000 + IVA. Seleccione la cantidad: "));
            if(cantidad>=10){
                sumaConDescuento = multiplicacion(cantidad, producto3.precio) * iva21 * descuento;
                alert(sumaConDescuento);
                cart.push(sumaConDescuento);
                console.log(cart);
            }else{
                sumaSinDescuento = multiplicacion(cantidad, producto3.precio) * iva21
                alert(sumaSinDescuento);
                cart.push(sumaSinDescuento);
                console.log(cart);
            };
    break;
    case "4":
        cantidad = parseFloat(prompt("Usted seleccionó 4) Amoladora Black & Decker 1100W disco 4,5mm. Su costo es de $13.000 + IVA. Seleccione la cantidad: "));
            if(cantidad >= 10){
                sumaConDescuento = multiplicacion(cantidad, producto4.precio) * iva21 * descuento;
                alert(sumaConDescuento);
                cart.push(sumaConDescuento);
                console.log(cart);
            }else{
                sumaSinDescuento = multiplicacion(cantidad, producto4.precio) * iva21
                alert(sumaSinDescuento);
                cart.push(sumaSinDescuento);
                console.log(cart);
                
            };
    break;
    case "5":
        cantidad = parseFloat(prompt("Usted seleccionó 5) Amoladora DeWalt 1800W disco 7mm. Su costo es de $30.000 + IVA. Seleccione la cantidad: "));
            if(cantidad>=10){
                sumaConDescuento = multiplicacion(cantidad, producto5.precio) * iva21 * descuento;
                alert(sumaConDescuento);
                cart.push(sumaConDescuento);
                console.log(cart);
            }else{
                sumaSinDescuento = multiplicacion(cantidad, producto5.precio) * iva21
                alert(sumaSinDescuento);
                cart.push(sumaSinDescuento);
                console.log(cart);
            };
    break;
    default: 
        catalogo;        
}
seguirComprando();
}

function seguirComprando(){
    const seguirComprando = prompt("¿Desea continuar añadiendo productos a su carrito?").toLowerCase();
    if (seguirComprando == "si"){
        buy();
    }
    else if (seguirComprando == "no"){
        mostrarCarrito();
    }
}

function mostrarCarrito(){
    console.log(cart.reduce ((a, b) => a + b, 0));
    alert("Usted tiene: " + cart.length + " artículos añadidos a su carrito. Los costos de cada uno son: " + cart + " . El total a abonar es de: $" + cart.reduce ((a, b) => a + b, 0))
    modoDePago()

}

function modoDePago(){
    const modoDePago = prompt("¿Cómo desea abonar? 1) Tarjeta de crédito/ débito; 2) Pago en efectivo (Emitir cupón); 3) Transferencia/ Interdepósito")
    switch (modoDePago){
        case "1":
            prompt("Ingrese número de tarjeta");
            prompt("Ingrese código de seguridad");
        break;
        case "2":
            alert("Imprimiendo cupón para pago en efectivo");
        break;
        case "3": 
            alert("Transferir a: Fulanito Mengano. Cta Banco de la Nación. CBU: 00001012312314322111. CUIT: 20/31477654/2.")
            alert("No olvide enviar el comprobante de la transferencia a nuestro mail: ferreteriaferros@yahoo.com")
        break;
        default:
            alert("Imprimiendo cupón para pago en efectivo");
    }
    modoDeEnvio()
}

function modoDeEnvio(){
    prompt("Elija un modo de envío: 1) Correo Andreani; 2) Retiro por el local")
    compraEfectuada();
}

function compraEfectuada(){
    alert("¡Listo! Ya estamos preparando tu pedido, tendrás noticias de él a la brevedad")
    alert("¡Muchas gracias por tu compra " + welcome + ", esperamos verte pronto!");
}



//Código ejecutable

const welcome = prompt("Bienvenidos a Ferretería Ferros, por favor, ingrese su usuario:");
alert("Bienvenido " + welcome + "!");
const productSearch = prompt ("Ingrese el nombre del artículo que desea buscar");
const productFound = list.filter ((producto) => producto.nombre == productSearch)
alert ("Cantidad de productos encontrados con esa descripción: " + productFound.length)
productFound.forEach((producto) => {
    alert(producto.codigo + ") " + producto.nombre + producto.descripcion + "$" + producto.precio + "+IVA")
})
buy();
