document.addEventListener("DOMContentLoaded", function () {
    // 👉 Cambiar texto del mensaje principal
    const boton = document.getElementById("btn-cambiar-texto");
    const mensaje = document.getElementById("mensaje-bienvenida");

    if (boton && mensaje) {
        boton.addEventListener("click", function () {
            mensaje.textContent = "¡Gracias por visitarnos! Tenemos muchas ofertas para vos.";
            console.log("Texto cambiado correctamente.");
        });
    }

    // 👉 Función para agregar productos al carrito (localStorage)
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`"${producto.nombre}" se añadió al carrito.`);
    }

    // 👉 Asociar evento a botones "Comprar" ya existentes
    const botonesComprar = document.querySelectorAll(".btn-comprar");

    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", function () {
            const tarjeta = btn.closest(".oferta-tarjeta");
            const nombre = tarjeta.querySelector(".oferta-titulo").textContent;
            const precioTexto = tarjeta.querySelector(".precio").textContent;
            const precio = parseFloat(precioTexto.replace("$", "").replace(".", "").trim());

            const producto = {
                nombre,
                precio
            };

            agregarAlCarrito(producto);
        });
    });

    // 👉 Botón para agregar una nueva tarjeta dinámica
    const btnAgregarOferta = document.getElementById("btn-agregar-oferta");
    const contenedorOfertas = document.getElementById("contenedor-ofertas");
    let contador = 4;

    if (btnAgregarOferta && contenedorOfertas) {
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

            // Evento al botón "Comprar" nuevo
            const botonNuevo = nuevaTarjeta.querySelector(".btn-comprar");
            botonNuevo.addEventListener("click", function () {
                const nombre = nuevaTarjeta.querySelector(".oferta-titulo").textContent;
                const precioTexto = nuevaTarjeta.querySelector(".precio").textContent;
                const precio = parseFloat(precioTexto.replace("$", "").replace(".", "").trim());

                const producto = {
                    nombre,
                    precio
                };

                agregarAlCarrito(producto);
            });

            contador++;
        });
    }

    // 👉 Validación del formulario de contacto
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
});


// Mostrar carrito si estamos en carrito.html
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

if (contenedorCarrito && totalCarrito && btnVaciarCarrito) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalCarrito.textContent = "";
    } else {
        let total = 0;
        const lista = document.createElement("ul");

        carrito.forEach((producto) => {
            const item = document.createElement("li");
            item.textContent = `${producto.nombre} - $${producto.precio}`;
            lista.appendChild(item);
            total += producto.precio;
        });

        contenedorCarrito.appendChild(lista);
        totalCarrito.textContent = `Total: $${total}`;
    }

    // Botón para vaciar carrito
    btnVaciarCarrito.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        contenedorCarrito.innerHTML = "<p>El carrito fue vaciado.</p>";
        totalCarrito.textContent = "";
    });
}
