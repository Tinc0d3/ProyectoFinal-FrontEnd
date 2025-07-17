
document.addEventListener("DOMContentLoaded", function () {
    // Cambiar mensaje principal
    const boton = document.getElementById("btn-cambiar-texto");
    const mensaje = document.getElementById("mensaje-bienvenida");

    boton.addEventListener("click", function () {
        mensaje.textContent = "¡Gracias por visitarnos! Tenemos muchas ofertas para vos.";
        console.log("Texto cambiado correctamente.");
    });

    // Mensaje simulado al hacer clic en "Comprar"
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", function () {
            alert("Producto añadido al carrito (simulado).");
        });
    });

    // Agregar nueva tarjeta de oferta
    const btnAgregarOferta = document.getElementById("btn-agregar-oferta");
    const contenedorOfertas = document.getElementById("contenedor-ofertas");
    let contador = 4;

    btnAgregarOferta.addEventListener("click", function () {
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("oferta-tarjeta");

        nuevaTarjeta.innerHTML = `
            <img src="https://picsum.photos/300/200?random=${contador}" alt="producto nuevo">
            <div class="oferta-info">
                <p class="oferta-titulo">Oferta ${contador}</p>
                <p class="precio">$${(1000 + contador * 100)}</p>
                <button class="btn-comprar">Comprar</button>
            </div>
        `;

        contenedorOfertas.appendChild(nuevaTarjeta);

        // Volvemos a agregar el evento al nuevo botón "Comprar"
        const botonNuevo = nuevaTarjeta.querySelector(".btn-comprar");
        botonNuevo.addEventListener("click", function () {
            alert("Producto añadido al carrito (simulado).");
        });

        contador++;
    });
});


// Validación del formulario de contacto
const form = document.getElementById("form-contacto");
if (form) {
    const mensajeError = document.getElementById("mensaje-error");

    form.addEventListener("submit", function (e) {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!nombre || !email || !mensaje) {
            e.preventDefault();
            mensajeError.textContent = "Todos los campos son obligatorios.";
            mensajeError.style.display = "block";
        } else if (!emailValido) {
            e.preventDefault();
            mensajeError.textContent = "El correo electrónico no es válido.";
            mensajeError.style.display = "block";
        } else {
            mensajeError.style.display = "none";
        }
    });
}
