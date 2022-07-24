Swal.fire({
  title: 'Eres mayor de edad?',
  showDenyButton: true,
  confirmButtonText: 'Si',
  denyButtonText: `No`,
  allowEscapeKey: false,
  allowOutsideClick: false,
}).then((result) => {
  if (result.isDenied) {
    location.href ="http://www.google.com"
  }
})
  
let stockProducto = [
  { 
    id: 1,
    producto:"Satysfyer", 
    precio:"8000",
    img: "./assets/img/Satysfyer.png",
  },
  {
    id: 2,
    producto:"Lubricante", 
    precio:"600",
    img:"./assets/img/lubricante.png",
  },
  {
    id: 3,
    producto:"Vibrador",
    precio:"4000",
    img:"./assets/img/vibrador.png",
  },  
];
 
const contenedorproducto = document.getElementById("container");
const contenedorCarrito = document.getElementById("carrito");
let carrito = JSON.parse(localStorage.getItem ('carrito')) || [];

stockProducto.forEach((producto, indice) =>{
  let card = document.createElement("div");
  card.classList.add("col-s-m-12");
  card.innerHTML = ` 
  <div class="item-card  shadow p-3 m-5 bg-body rounded">
    <img src="${producto.img}" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${producto.producto}</h5>
      <p class="card-text"> $${producto.precio}</p>
      <a href="#"  class="btn btn-outline-info" onClick="agregarAlcarrito(${indice})">Agregar</a>
    </div>
  </div>`
  contenedorproducto.appendChild(card);
});

const agregarAlcarrito=(indice)=>{
  const indiceCarrito = carrito.findIndex((elemento)=>{
    return elemento.id === stockProducto[indice].id
  });
    if(indiceCarrito === -1){
      const agregarProducto = stockProducto[indice];
      agregarProducto.cantidad =1;
      carrito.push(agregarProducto);
      actualizarStorage(carrito);
      actualizarCarrito()
    } else{
      carrito[indiceCarrito].cantidad += 1;
      actualizarStorage(carrito);
      actualizarCarrito()
    }
};
  
const actualizarCarrito =()=>{
  contenedorCarrito.className="carrito";
  contenedorCarrito.innerHTML="";
  let total = 0;
    if(carrito.length > 0){
      carrito.forEach((producto, indice)=>{
        total += producto.precio * producto.cantidad;
        const boxCar =document.createElement("div");
        boxCar.className =("carrito");
        boxCar.innerHTML = `<img class="car-img" src="${producto.img}"/>
        <p>${producto.producto}</p>
        <p>Precio: $ ${producto.precio}</p>
        <p>Cantidad: <span id ="cantidad"> ${producto.cantidad}</span></p>
        <p>Subtotal: $ ${producto.precio * producto.cantidad}</p>
        <button class="btn btn-info" id="eliminar-producto" onClick="eliminarProducto(${indice})"><i class="fas fa-trash-alt"></button>`; 
        contenedorCarrito.appendChild(boxCar)
      });
    }
  const contenedorTotales =document.createElement("div");
  contenedorTotales.className="container-total";
  contenedorTotales.innerHTML=`<div class="total"> TOTAL: $ ${total}</div>`;
  contenedorCarrito.appendChild(contenedorTotales);  
};

const eliminarProducto=(indice)=>{
  carrito.splice(indice, 1);
  actualizarStorage(carrito);
  actualizarCarrito()
};

const actualizarStorage =(carrito)=>{
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

if(carrito.length){
  actualizarCarrito()
};
