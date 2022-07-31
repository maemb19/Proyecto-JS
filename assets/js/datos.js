function errorCampo(campo) {
  Swal.fire({
    icon: 'error',
    tittle: 'Error',
    text: 'Debes completar el campo ' + campo,
    confirmButtonText: 'Ok'
  })
}

function formEnviado(){
  Swal.fire({
    icon: "success",
    title: 'Gracias por VIBRAR con nosotros',
    text: 'tu pedido se enviará dentro de las próximas 24hrs.',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff',
    backdrop: `rgba(0,0,123,0.4)`
  })
}

document.getElementById("boton_enviar").addEventListener("click",formEnviado);

function guardarDatos() {
  let campoNombre = document.getElementById("name").value;
  let campoApellido = document.getElementById("lastname").value;
  let campoEmail = document.getElementById('email').value;
  let campoTelefono = document.getElementById("phone").value;
  let campoDireccion = document.getElementById("adress").valiue;
  let formFields = {name:campoNombre,lastname:campoApellido,email:campoEmail,phone:campoTelefono,adress:campoDireccion};
  localStorage.setItem("datosFormulario", JSON.stringify(formFields));
}

function eliminarDatos() {
  localStorage.removeItem("datosFormulario");
}

function validarFormulario() {
  let campoNombre = document.getElementById("name").value;
  let campoApellido = document.getElementById("lastname").value;
  let campoEmail = document.getElementById('email').value;
  let campoTelefono = document.getElementById("phone").value;
  let campoDireccion = document.getElementById("adress").value;
  if (campoNombre.length === 0) return errorCampo('NOMBRE');

  if (campoApellido.length === 0) return errorCampo('APELLIDO');

  if (campoEmail.length === 0) return errorCampo('E-MAIL');

  if (campoTelefono.length === 0) return errorCampo('TELEFONO');

  if (campoDireccion.length === 0)return errorCampo('DIRECCIÓN');

  guardarDatos();
  formEnviado();
}

document.getElementById("boton_enviar").addEventListener("click",validarFormulario);