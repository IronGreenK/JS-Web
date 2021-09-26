'use strict'

const form = document.getElementById('form');
const formLogin = document.getElementById('form-login');
const btnSearch = document.getElementById('button-search');
const user = document.getElementById('username');
const pass = document.getElementById('password');


class Auth{
    #username;
    #password;
    constructor(){}

    get username(){
        return this.#username;
    }

    set username(user){
        return this.#username = user;
    }

    get password(){
        return this.#password;
    }

    set password(pass){
        return this.#password = pass;
    }
};

class Timelapse{
    #now;
    #afterFiveMin;

    get now(){
        return this.#now;
    }

    set now(go){
        return this.#now = go;
    }

    get afterFiveMin(){
        return this.#afterFiveMin;
    }

    set afterFiveMin(after){
        return this.#afterFiveMin = after;
    }
}


const usuario = new Auth();
const time = new Timelapse();
const ingreso = document.getElementById('log');
const loginErrorMsg = document.getElementById("login-error-msg");
const nameUser = document.getElementById("mostrar");
const buttonBuy = document.querySelector(".buy");

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    time.now = new Date();
    if (user.value === "admin" && pass.value === "pass") {
        loginErrorMsg.style.opacity = 0;
        usuario.username = user.value;
        usuario.password = pass.value;
        saveStorageUser();
        createLogUser();
        removeIngreso();
        alert("Estas logueado");
        nameUser.textContent = user.value;
        buttonBuy.disabled = false;
        clear();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})


function saveStorageUser(){
    sessionStorage.setItem("Usuario: ",usuario.username);
    sessionStorage.setItem("Contraseña: ",usuario.password);
};

function removeIngreso(){
    formLogin.className = 'disable';
    formLogin.remove = 'enable';
}


function createLogUser(){
    ingreso.className = 'mostrar';
    ingreso.className = 'enable';
}

function createProgressbar(id, duration, callback) {
    const progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';
  
    const progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';
  
    progressbarinner.style.animationDuration = duration;
  
    if (typeof(callback) === 'function') {
      progressbarinner.addEventListener('animationend', callback);
    }

    progressbar.appendChild(progressbarinner);
  
    progressbarinner.style.animationPlayState = 'running';
}
  
const test = document.getElementById('rm');

function clear() {
    createProgressbar('progressbar', '240s', function() {
        localStorage.clear();
        alert('A pasado el tiempo de sesión');
        buttonBuy.disabled = true;
        window.location.reload(false);

    });
}  



class Product{
    #id;
    #nombre;
    #precio;
    #imagen;
    #stock;

    constructor(id,nombre,precio,imagen,stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        return this.#id = id;
    }

    get nombre(){
        return this.#nombre;
    }

    set nombre(nombre){
        return this.#nombre = nombre;
    }

    get precio(){
        return this.#precio;
    }

    set precio(precio){
        return this.#precio = precio;
    }

    get imagen(){
        return this.#imagen;
    }

    set imagen(imagen){
        return this.#imagen = imagen;
    }

    get stock(){
        return this.#stock;
    }

    set stock(stock){
        return this.#stock = stock;
    }
}


const listProducts = []; 

const products = [
    {
        id: 1,
        nombre: 'Play Station',
        precio: 100000,
        imagen: 'img/ps1.jpg',
        stock: 1
    },
    {
        id: 2,
        nombre: 'XBOX',
        precio: 90000,
        imagen: 'img/xbox.jpg',
        stock: 3
    },
    {
        id: 3,
        nombre: 'Super Nintendo',
        precio: 120000,
        imagen: 'img/snes.jpg',
        stock: 5
    },
    {
        id: 4,
        nombre: 'Nintendo 64',
        precio: 75000,
        imagen: 'img/nes64.jpg',
        stock: 5
    },
    {
        id: 5,
        nombre: 'Play Station 2',
        precio: 60000,
        imagen: 'img/ps2.jpg',
        stock: 2
    },
    {
        id: 6,
        nombre: 'Game boy Advance',
        precio: 80000,
        imagen: 'img/gbadv.jpg',
        stock: 4
    }

];

products.forEach((aux)=>{
    const producto = new Product(aux.id,aux.nombre,aux.precio,aux.imagen,aux.stock);
    listProducts.push(producto);
});


let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonAdd = document.querySelector('#boton-buy');
const miLocalStorage = window.localStorage;
function renderProducts() {
    DOMitems.textContent = '';
    products.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-12');

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
  
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = '$ '+ info.precio;

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.disabled = enable(false);
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', addProductCart);

        const miNodoStock = document.createElement('h5');
        miNodoStock.classList.add('card-stock');
        miNodoStock.textContent = 'El stock es de: ' + info.stock;
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodoCardBody.appendChild(miNodoStock);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

//Funcion para agregar los productos al carro
function addProductCart(evento) {
    const miItem = products.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(evento.target.getAttribute('marcador'));
    });
    if(products[miItem[0].id-1].stock > 0){
        products[miItem[0].id-1].stock -=1;
        carrito.push(evento.target.getAttribute('marcador'));
    }
    renderProducts();
    totalCalculate(); 
    renderShoppingCart();
    saveCartInLocalStorage();
}

//Renderiza y crea el carrito
function renderShoppingCart() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = products.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        let numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
        numeroUnidadesItem >= listProducts[parseInt(item)-1].stock? numeroUnidadesItem:listProducts[parseInt(item)-1].stock;
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);     
    });
}

//Evento para eliminar un item del carrito
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    products[id-1].stock = listProducts[id-1].stock;
    renderShoppingCart();
    renderProducts();
    totalCalculate();
    saveCartInLocalStorage();

}


//Calcula los precios de los productos y los suma para su totalidad
function totalCalculate() {
    total = 0;
    carrito.forEach((item) => {
        const miItem = products.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    DOMtotal.textContent = total;
}

function saveCartInLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    miLocalStorage.setItem('stock', JSON.stringify(products));
}

function cargarCarritoDeLocalStorage () {
    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}


// Init
cargarCarritoDeLocalStorage();
renderProducts();
totalCalculate();
renderShoppingCart();




function cleanAll(){
    carrito = [];
    renderShoppingCart();
    renderProducts();
    totalCalculate();
    localStorage.clear();
    window.location.reload(false);
}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }


function enable(T) {
    if(T === true){
        return true;
    }else{
        return false;
    }
    
}

DOMbotonAdd.addEventListener('click', buy);

async function buy() {
    enable(true);
    renderProducts();
    await wait(5000);
    alert("Gracias por la compra");
    enable(true);
}