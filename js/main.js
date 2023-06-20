//Recuperar productos del json y pasarlos a objetos
const getProducts = async () => {
    const res = await fetch("../productos.json");
    const products = await res.json();
    return products
}
//Array con todos los productos y la función para traerlos
const bringProductsToList = async () => {
    const res = await fetch("../productos.json");
    const products = await res.json();
    products.forEach(product => {
        list.push(product);
    })
}
bringProductsToList();
const list = []

// Array con carrito
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

//Buscador de productos
const productSearch = ()=>{
    const productSearch = document.querySelector ("#productSearch");
    productSearch.addEventListener("submit", (e)=>{
        e.preventDefault()
        const productSearch = e.target
        console.log(productSearch.children[0].value)
        const productSearched = productSearch.children[0].value;
        const productFound = list.filter ((producto) => producto.nombreMinusculas == productSearched)
        const catalogoProductos = document.querySelector ("#catalogoProductos");
        if (productFound.length != 0) { 
            catalogoProductos.innerHTML = ``
            productFound.forEach(product =>{
                showProduct(product);
        }) }
        else {
            catalogoProductos.innerHTML =`  <div class="noResultsFound">
                                            <h2>Lo sentimos, no hay resultados para tu búsqueda</h2>
                                            <h3> Por favor, intenta realizar una nueva búsqueda, o regresa a nuestro catálogo</h3>
                                            </div>
                                            ` 
        }
        const productsFoundQuantity = document.querySelector("#quantityProductsFound");
        productsFoundQuantity.className = "productsFoundQuantity";
        productsFoundQuantity.innerHTML = ``
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
    getProducts().then((products) => {
        const cartContainer = document.querySelector("#principal");
        const carrito = document.querySelector("#cartDisplay");
        if (!carrito){
            const div = document.createElement("div");
            div.className = "cartDisplay col-4"
            div.id = "cartDisplay"
            const cartList = document.createElement("ul");
            cartList.className = "listStyle"
            const itemsSelected = cart.map((item) => {
                return item.codigo
            })
            let productsCart = products.filter(product => {
                return itemsSelected.includes(product.codigo)});
            productsCart = productsCart.map((product) =>{
                return {
                    ...product, 
                    quantity: cart.filter((productCart) => {
                        return product.codigo === productCart.codigo
                    })[0].quantity
                }
            })
            console.log(productsCart)
            div.innerHTML = `<h2>Carrito de compras:</h2>`
            productsCart.forEach(({codigo, img, nombre, descripcion, precio, quantity}) => {
                const itemsCartList = document.createElement("li");
                itemsCartList.id = "product" + codigo
                itemsCartList.className = "listItem"
                itemsCartList.innerHTML =   `
                                        <img src="${img}"> <div><b>Producto:</b> ${nombre} ${descripcion} <b>Precio: $</b>${precio} <b>Cantidad seleccionada: </b>${quantity}</div>
                                        <button id="deleteBtn" type="submit" onClick="deleteProduct(${codigo})"><i class="fa-solid fa-trash"></i></button>
                                        `
                cartList.append(itemsCartList);
            })
            div.append(cartList)
            cartContainer.append(div);
            const resultadosPrecioPorCantidad = []
            productsCart.forEach(({precio, quantity}) => {
                const precioPorCantidad = precio * quantity
                resultadosPrecioPorCantidad.push(precioPorCantidad)
            })
            console.log(resultadosPrecioPorCantidad)
            const result = resultadosPrecioPorCantidad.reduce((a, b) => a + b, 0) 
            const total = document.createElement("h3");
            total.innerHTML = `<b>Total a abonar:</b> ${result}`
            div.append(total);
            const endBtn = document.createElement("button");
            endBtn.className = "endBtn"
            endBtn.id = "endBtn"
            endBtn.innerText = "Finalizar compra"
            div.append(endBtn);
        }else{
            carrito.remove()
        }
        endBuy();
    })
})

//Función para borrar productos del carrito
const deleteProduct = (codigo) => {
    const codeFilter = cart.filter((product) => {
        return product.codigo === codigo
    })
    const indexToDelete = cart.indexOf(codeFilter[0])
    cart.splice(indexToDelete, 1)
    const deleteItem = document.querySelector("#product" + codigo);
    deleteItem.remove()
    localStorage.setItem("cart",JSON.stringify(cart));
}

//Función para finalizar compra
const endBuy = () => {
        const endBtn = document.querySelector("#endBtn");
        endBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            if (cart.length != 0){
                localStorage.clear();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Compra efectuada!',
                    text: 'Nos estaremos comunicando contigo a la brevedad. ¡Gracias por elegirnos!',
                    showConfirmButton: false,
                    timer: 2500
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '¡El carrito está vacío!',
                    text: ' Por favor, añade un producto y vuelve a intentarlo',
                    showConfirmButton: false,
                    timer: 2500
                    })
            }  
        })
} 

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
        const itemsSelected = cart.map((item) => {
            return item.codigo
        })
        const existInCart = itemsSelected.includes(codigo)
        if (existInCart){
            cart = cart.map((product) => {
                return {
                    ...product,
                    quantity: product.codigo === codigo ? parseInt(product.quantity) + parseInt(quantity) : product.quantity
                }
            })
        }else{
            cart.push({
                codigo, 
                quantity
            })
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500
          })
        changeItemsNumberInCart();
    });
}
    
//Función para visualizar todos los productos
const catalogo = async () => {
    const res = await fetch("../productos.json");
    const products = await res.json();
    list.forEach(product => {
        if (product.stock != 0){
        showProduct(product);
        addProduct(product.codigo);
        }
    });
}

//Código ejecutable
catalogo();
productSearch();
goToCart();
