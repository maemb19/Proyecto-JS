let answer = localStorage.getItem('mayor')
if (answer !== 'Si'){
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
    else{
      localStorage.setItem('mayor',"Si")
    }
  })
}

let stockProducto
const contenedorproducto = document.getElementById("container");
const contenedorCarrito = document.getElementById("carrito");
const bodyTable = document.getElementById("table-product");
let carrito = JSON.parse(localStorage.getItem ('carrito')) || [];

async function starPage(){
  stockProducto = await fetch('./assets/js/producto.json')
  stockProducto = await stockProducto.json();

  stockProducto.forEach((producto, indice) =>{
    let card = document.createElement("div");
    card.classList.add("col-sm-4");
    card.innerHTML = ` 
    <div class="item-card  shadow p-3 m-5 bg-body rounded">
      <img src="${producto.img}" class="card-img-top" alt="producto.producto">
      <div class="card-body text-center">
        <h4 class="card-title fw-bold">${producto.producto}</h4>
        <p class="card-subtitle text-muted fs-5 fw-semibold">${producto.descripcion}</p>
        <p class="card-text fs-4 fw-bold"> $ ${producto.precio}</p>
        <a href="javascript:void(0)"  class="btn btn-outline-info" onClick="agregarAlcarrito(${indice})">Añadir al Carrito</a>
      </div>
    </div>`
    contenedorproducto.appendChild(card);
});
}

const agregarAlcarrito=(indice)=>{
  const indiceCarrito = carrito.findIndex((elemento)=>{
    return elemento.id === stockProducto[indice].id
  });
    if(indiceCarrito === -1){
      const agregarProducto = stockProducto[indice];
      agregarProducto.cantidad =1;
      carrito.push(agregarProducto);
      actualizarStorage(carrito);
      iniciarCarrito(indice)
    } else{
      carrito[indiceCarrito].cantidad += 1;
      actualizarStorage(carrito);
      iniciarCarrito()
    }
};

const iniciarCarrito = ()=> {
  let total = 0;
  carrito.forEach((producto)=>{
    total += producto.precio * producto.cantidad
  });
  let contenedorTotal = document.getElementById('total');
  contenedorTotal.innerHTML=total;
  bodyTable.innerHTML=""
  carrito.forEach((producto,index)=>{
    const tableCar =document.createElement("tr");
    tableCar.className =("product-item");
    tableCar.innerHTML = `
          <th scope="row">${producto.producto}</th>
          <td>${producto.cantidad}</td>
          <td>${producto.precio}</td>
          <td>${producto.precio*producto.cantidad}</td>
          <td class="delete-column"><button class="btn btn-info" id="eliminar-producto" onClick="eliminarProducto(${index})"><i class="fas fa-trash-alt"></button></td>`;
    bodyTable.appendChild(tableCar)
  });
}

const actualizarCarrito =(position)=>{
  contenedorCarrito.className="carrito";
  contenedorCarrito.innerHTML="";
  let total = 0;
  carrito.forEach((producto)=>{
    total += producto.precio * producto.cantidad
  });
  let contenedorTotal = document.getElementById('total');
  contenedorTotal.innerHTML=total;
  const tableCar =document.createElement("tr");
  tableCar.className =("carrito");
  tableCar.innerHTML = `
    <th scope="row">${stockProducto[position].producto}</th>
    <td>${stockProducto[position].cantidad}</td>
    <td>${stockProducto[position].precio}</td>
    <td>${stockProducto[position].precio*stockProducto[position].cantidad}</td>
    <td class="delete-column"><button class="btn btn-info" id="eliminar-producto" onClick="eliminarProducto(${position})"><i class="fas fa-trash-alt"></button></td>`;
  bodyTable.appendChild(tableCar)
}

const eliminarProducto=(indice)=>{
  carrito.splice(indice, 1);
  actualizarStorage(carrito);
  iniciarCarrito()
};

const actualizarStorage =(carrito)=>{
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

starPage()

if(carrito.length){
  iniciarCarrito()
};

