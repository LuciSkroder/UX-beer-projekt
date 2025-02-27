"use strict";

//En array der indeholder alle vores produkter der kan være i kurven, hvor mange de er, deres pris og den totale pris.
let cart = [
    {type: "brownAle", quantity: 0, price: 15, total: 0},
    {type: "passion", quantity: 0, price: 15, total: 0},
    {type: "lime", quantity: 0, price: 15, total: 0},
    {type: "pilsner", quantity: 0, price: 15, total: 0},
    {type: "hyldeblomst", quantity: 0, price: 15, total: 0},
    {type: "grape", quantity: 0, price: 15, total: 0},
];


//To functions der gemmer og henter vores kurv fra session til session så den ikke slettes hver gang.
function saveCartToLocalStorage(){
    localStorage.setItem(`cart`, JSON.stringify(cart));
}
function loadCartFromLocalStorage(){
    const storedCart = localStorage.getItem(cart)
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateUIFromCart();
    }
}

//En function der opdatere de tal der bliver vist i vores array baseret på om der er blevet tilføjet eller fjernet produkter.
function updateUIFromCart(){
    cart.forEach( item => {
        let quantityField = document.getElementById(item.type);
        let totalField = document.getElementById(item.type +"-total");

        if (quantityField && totalField) {
            quantityField.value = item.quantity;
            totalField.value = item.total;
        }
    });
    totalPrice();
}

//En function der tilføjer en enhed af det valgte produkt.
function addToCart(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.quantity++;
        updateSubTotal(beer);
        updateTotalPrice(beer);
        saveCartToLocalStorage();
    }
}

//En function der fjerner en enhed af det valgte produkt.
function removeOne(beer){
    let product = cart.find( item => item.type === beer);

    if (product && product.quantity > 0) {
        product.quantity--;
        updateSubTotal(beer);
        updateTotalPrice(beer);
        saveCartToLocalStorage();
    }
}

//En function der fjerner alle enheder af det valgte produkt.
function removeAll(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.quantity = 0;
        updateSubTotal(beer);
        updateTotalPrice(beer);
        saveCartToLocalStorage();
    }
}

//En function der opdatere total pris af hvert individuelt produkt.
function updateSubTotal(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.subTotal = product.quantity * product.price;
        document.getElementById(beer).value = product.quantity;
        document.getElementById(beer + "-total").value = product.total;

        totalPrice();
    }
}

//En function der opdatere total prisen af hele kurven.
function updateTotalPrice(beer){
    let product = cart.find( item => item.type === beer);

    if (product) {
        product.total = cart.forEach(product.quantity * product.price);
        document.getElementById(beer).value = product.quantity;
        document.getElementById(beer + "-total").value = product.total;

        totalPrice();
    }
}