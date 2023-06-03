//Variables
const iva105 = 1.105 ;
const iva21 = 1.21 ;
const descuento = 0.9;
let cantidad = 0
let sumaConDescuento
let sumaSinDescuento
//Objetos
class Producto {
    constructor (codigo, nombre, nombreMinusculas, descripcion, stock, precio, img) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.nombreMinusculas = nombre.toLowerCase();
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.img = img;
    }
}

const producto1 = new Producto(01, "Taladro", "taladro", " Black & Decker 750W 13mm ", 5, 10000, "../assets/img/Taladro black & decker 10mm 550w.png");
const producto2 = new Producto(02, "Taladro", "taladro", " Black & Decker 500W 10mm ", 6, 8000, "../assets/img/Taladro black & decker 13mm 710w.png");
const producto3 = new Producto(03, "Taladro", "taladro", " De Walt 1100W 13mm ", 3, 20000, "../assets/img/Taladro De Walt 1100w.png");
const producto4 = new Producto(04, "Amoladora", "amoladora", " Amoladora Black & Decker 1100W disco 4,5mm ", 10, 13000, "../assets/img/Amoladora B&D.png");
const producto5 = new Producto(05, "Amoladora", "amoladora", " Amoladora DeWalt 1800W disco 7mm ", 5, 30000, "../assets/img/Amoladora De Walt.png");
const producto6 = new Producto(06, "Mascara Fotosensible", "mascara", "Lusqtoff St-mistery Automatica", 12, 10000, "../assets/img/Caretafotosensible.jpg");
const producto7 = new Producto(07, "Juego de llaves tubo", "llaves tubo", "1/2 pulgada 13 piezas marca Bremen", 10, 29000, "../assets/img/JuegoLlavesTubo12.jpg");
const producto8 = new Producto(08, "Cadena de seguridad", "cadena", "Acero Cementado 3/8 X 1 M Bulit + Candado 72mm", 8,  31000, "../assets/img/Cadena.jpg");
const producto9 = new Producto(09, "Cartucho Gas Butano", "cartucho", "Pack X 4 u.Descartable 227gr p/ anafe tipo camping", 42, 4000, "../assets/img/Gasbutano.jpg");
const producto10 = new Producto(10, "Barbijo", "barbijo", "Respirador Mascarilla N95 3m X 5 Unidades", 130, 3500, "../assets/img/Barbijo3MN95.jpg");


//Arrays
const list = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10];
console.log(list)

//Funciones
const suma = (a, b) => a + b ;
const resta = (a, b) => a - b ;
const multiplicacion = (a, b) => a * b ;

//Buscador
const productSearch = ()=>{
    const productSearch = document.querySelector ("#productSearch");
    productSearch.addEventListener("submit", (e)=>{
        e.preventDefault()
        const productSearch = e.target
        console.log(productSearch.children[0].value)
        const productSearched = productSearch.children[0].value;
        const productFound = list.filter ((producto) => producto.nombreMinusculas == productSearched)
        const showProductsFound = productFound.forEach(product =>{
            showProduct(product);
        });
        const productsFoundQuantity = document.createElement("p");
        productsFoundQuantity.className = "productsFoundQuantity";
        productsFoundQuantity.innerHTML = `Cantidad de productos encontrados con esa descripción: ${productFound.length}`;
        const quantityProductsMessage = document.querySelector("#quantityProductsMessage");
        quantityProductsMessage.append(productsFoundQuantity);
    })
    }
    
//Cambio del número de items en el carrito
const changeItemsNumberInCart = () => { 
    const itemsNumberInCart = document.querySelector ("#itemsNumberInCart");
    itemsNumberInCart.innerHTML = `${cart.length}`
}
    
// Ir al carrito
const cartButton = document.querySelector ("#cartButton");
cartButton.addEventListener("click", (e) =>{
    e.preventDefault();
    const displayCart = document.createElement ("div");
    displayCart.innerHTML = `
                            <p>${cart}</p>
                             `
    cartButton.append(displayCart)
})
const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

//


    
// Creación de las tarjetas de productos
const showProduct = ({codigo, nombre, descripcion, stock, precio, img}) => {
    const catalogoProductos = document.querySelector ("#catalogoProductos");
    const card = document.createElement ("div");
    card.className = "productCard";
    card.innerHTML = `
                        <img src="${img}" alt="">
                        <p><b>${nombre}</b></p>
                        <p>${descripcion}</p>
                        <span>Precio: $${precio} +IVA</span>
                        <form id="addButton${codigo}">
                        <input name="code" type="hidden" value="${codigo}">
                        <input name="quantity" type="number" value="0" min="1" max="${stock}">
                        <button type="submit">Añadir al carrito</button>
                        </form>`
    catalogoProductos.append(card);
}

//Función para añadir productos al carrito
const addProduct = (codigo) => {
    const addToCart = document.querySelector("#addButton" + codigo);
    addToCart.addEventListener("submit", (e)=>{
        e.preventDefault();
        const quantity = e.target.children["quantity"].value;
        console.log(quantity);
        cart.push({
            codigo, 
            quantity
        })
        localStorage.setItem("cart",JSON.stringify(cart));
    });
}
    
const catalogo = () => {
    list.forEach(product => {
        showProduct(product);
        addProduct(product.codigo);
    });
}
    
changeItemsNumberInCart();
catalogo();
productSearch();

/*
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
*/
/*
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
*/

//buy();

//Código ejecutable
/*
const welcome = prompt("Bienvenidos a Ferretería Ferros, por favor, ingrese su usuario:");
alert("Bienvenido " + welcome + "!");
*/

