"use strict";


//En array der indeholder alle vores produkter der kan være i kurven, hvor mange de er, deres pris og den totale pris.
let cart = [
    {type: "brownAle", quantity: 0, price: 5, subTotal: 0},
    {type: "passion", quantity: 0, price: 10, subTotal: 0},
    {type: "lime", quantity: 0, price: 10, subTotal: 0},
    {type: "pilsner", quantity: 0, price: 5, subTotal: 0},
    {type: "hyldeblomst", quantity: 0, price: 10, subTotal: 0},
    {type: "grape", quantity: 0, price: 10, subTotal: 0},
];


//To functions der gemmer og henter vores kurv fra session til session så den ikke slettes hver gang.
function saveCartToLocalStorage(){
    localStorage.setItem(`cart`, JSON.stringify(cart));
}

function loadCartFromLocalStorage(){
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
        cart = JSON.parse(storedCart);
        console.log(cart);
        updateUIFromCart();
    }
}
loadCartFromLocalStorage(); //Ved at load cart her sikre vi at kurven altid er opdateret til den seneste version.

//En function der opdatere de tal der bliver vist i vores array baseret på om der er blevet tilføjet eller fjernet produkter.
function updateUIFromCart(){
    cart.forEach( item => {
        let quantityField = document.getElementById(item.type);
        let totalField = document.getElementById(item.type +"-total");

        if (quantityField && totalField) {
            quantityField.value = item.quantity;
            totalField.value = item.subTotal;
            updateVisuals(item);
        }
    });
    updateTotalPrice();
}

//En function der tilføjer en enhed af det valgte produkt.
function addToCart(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.quantity++;
        
        updateSubTotal(beer);
        updateTotalPrice();
        saveCartToLocalStorage();
        updateUIFromCart();
        updateVisuals(product);

        // Vis kurven, når et produkt tilføjes
        showCart(); // Kalder funktionen til at vise kurven

        // Luk kurven automatisk efter 3 sekunder
        setTimeout(() => {
            hideCart(); // Kalder en funktion til at skjule kurven
        }, 3000);
    }
}

// Funktion til at skjule kurven
function hideCart() {
    const showCart = document.getElementById("cart-body");
    showCart.classList.remove('cartShow');
    showCart.classList.add('cartHide');
}

//En function der fjerner en enhed af det valgte produkt.
function removeOne(beer){
    let product = cart.find( item => item.type === beer);

    if (product && product.quantity > 0) {
        product.quantity--;
        updateSubTotal(beer);
        updateTotalPrice();
        saveCartToLocalStorage();
        updateUIFromCart();
        updateVisuals(product);
    }
}

//En function der fjerner alle enheder af det valgte produkt.
function removeAll(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.quantity = 0;
        updateSubTotal(beer);
        updateTotalPrice();
        saveCartToLocalStorage();
        updateUIFromCart();
        updateVisuals(product);
    }
}

//En function der opdatere total pris af hvert individuelt produkt.
function updateSubTotal(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.subTotal = product.quantity * product.price;
        document.getElementById(beer).value = product.quantity;
        document.getElementById(beer + "-total").value = product.subTotal;

        updateTotalPrice();
    }
}

//En function der opdatere total prisen af hele kurven.
function updateTotalPrice(){
    const totalSum = cart.reduce((sum, item) => sum + item.subTotal, 0);
    document.getElementById("cart-total").value = totalSum;
}

//En function der sletter hele din kurv.
function resetEntireCart(){
    cart.forEach( item => {
        item.quantity = 0;
        item.subTotal = 0;
        updateSubTotal(item.type);
        updateVisuals(item);
    });

    updateTotalPrice()
    saveCartToLocalStorage();
    updateUIFromCart();
    clearCart()
}

//En function der gør at når man klikker på kurv-ikonet så viser eller skjuler den kurven.
function showCart(){
    const showCart = document.getElementById("cart-body");

    if (showCart.classList.contains('cartShow')){
        showCart.classList.remove('cartShow');
        showCart.classList.add('cartHide');
    } else {
        showCart.classList.remove('cartHide');
        showCart.classList.add('cartShow');
    }
}

//En function der gør at et produkt kun bliver vist i kurven hvis den er blevet tilføjet til kurven.
function updateVisuals(item){
    const itemAmount = document.getElementById(item.type + "Cart");
    
    if (item.quantity > 0){
        itemAmount.classList.remove('beerHide');
        itemAmount.classList.add('beerShow');
    } else {
        itemAmount.classList.remove('beerShow');
        itemAmount.classList.add('beerHide');
    }
}

//Sikre at når hele kurven bliver slettet bliver den også fjernet fra localstorage. Dette sikre at priser bliver opdateret mere korrekt.
function clearCart() {
    localStorage.removeItem("cart"); // Remove the cart from localStorage
    cart.forEach(item => {
        item.quantity = 0;
        item.subTotal = 0;
    });

    updateUIFromCart();
    updateTotalPrice();
}