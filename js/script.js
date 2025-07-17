// 🟢 Función global para agregar al carrito (fuera de DOMContentLoaded)
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(item => item.nombre === producto.nombre);

    if (existente) {
        existente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`"${producto.nombre}" se añadió al carrito.`);
}

document.addEventListener("DOMContentLoaded", function () {
    // 🟢 Cambiar mensaje en index.html
    const boton = document.getElementById("btn-cambiar-texto");
    const mensaje = document.getElementById("mensaje-bienvenida");

    if (boton && mensaje) {
        boton.addEventListener("click", function () {
            mensaje.textContent = "¡Gracias por visitarnos! Tenemos muchas ofertas para vos.";
        });
    }

    // 🟢 Botones "Comprar" en ofertas/index
    const botonesComprar = document.querySelectorAll(".btn-comprar");

    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", function () {
            const tarjeta = btn.closest(".oferta-tarjeta");
            const nombre = tarjeta.querySelector(".oferta-titulo").textContent;
            const precioTexto = tarjeta.querySelector(".precio").textContent;
            const precio = parseFloat(precioTexto.replace("$", "").replace(".", "").trim());

            const producto = { nombre, precio };
            agregarAlCarrito(producto);
        });
    });

    // 🟢 Agregar tarjeta nueva dinámicamente (en ofertas.html)
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

            const botonNuevo = nuevaTarjeta.querySelector(".btn-comprar");
            botonNuevo.addEventListener("click", function () {
                const nombre = nuevaTarjeta.querySelector(".oferta-titulo").textContent;
                const precioTexto = nuevaTarjeta.querySelector(".precio").textContent;
                const precio = parseFloat(precioTexto.replace("$", "").replace(".", "").trim());

                const producto = { nombre, precio };
                agregarAlCarrito(producto);
            });

            contador++;
        });
    }

    // 🟢 Validación de formulario (contacto.html)
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

    // 🟢 Mostrar productos desde productos.json (productos.html)
    const contenedorProductos = document.getElementById("contenedor-productos");

    if (contenedorProductos) {
        fetch("../data/productos.json")
            .then(res => res.json())
            .then(productos => {
                productos.forEach(producto => {
                    const tarjeta = document.createElement("div");
                    tarjeta.classList.add("oferta-tarjeta");

                    tarjeta.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="oferta-info">
                            <p class="oferta-titulo">${producto.nombre}</p>
                            <p class="precio">$${producto.precio}</p>
                            <button class="btn-comprar">Agregar al carrito</button>
                        </div>
                    `;

                    const boton = tarjeta.querySelector(".btn-comprar");
                    boton.addEventListener("click", () => {
                        agregarAlCarrito({
                            nombre: producto.nombre,
                            precio: producto.precio
                        });
                    });

                    contenedorProductos.appendChild(tarjeta);
                });
            })
            .catch(error => {
                contenedorProductos.innerHTML = "<p>Error al cargar los productos.</p>";
                console.error("Error al cargar productos.json:", error);
            });
    }

    // 🟢 Carrito con tabla, botones + y – (carrito.html)
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

    if (contenedorCarrito && totalCarrito && btnVaciarCarrito) {
        function renderizarCarrito() {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            if (carrito.length === 0) {
                contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
                totalCarrito.textContent = "";
                return;
            }

            let total = 0;

            const tabla = document.createElement("table");
            tabla.innerHTML = `
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = tabla.querySelector("tbody");

            carrito.forEach((producto, index) => {
                const subtotal = producto.precio * producto.cantidad;
                total += subtotal;

                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td data-label="Producto">${producto.nombre}</td>
                    <td data-label="Precio">$${producto.precio}</td>
                    <td data-label="Cantidad">${producto.cantidad}</td>
                    <td data-label="Subtotal">$${subtotal}</td>
                    <td data-label="Acciones">
                        <button class="sumar" data-index="${index}">+</button>
                        <button class="restar" data-index="${index}">–</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });

            contenedorCarrito.innerHTML = "";
            contenedorCarrito.appendChild(tabla);
            totalCarrito.textContent = `Total: $${total}`;

            document.querySelectorAll(".sumar").forEach(btn => {
                btn.addEventListener("click", () => {
                    const i = parseInt(btn.dataset.index);
                    carrito[i].cantidad += 1;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    renderizarCarrito();
                });
            });

            document.querySelectorAll(".restar").forEach(btn => {
                btn.addEventListener("click", () => {
                    const i = parseInt(btn.dataset.index);
                    if (carrito[i].cantidad > 1) {
                        carrito[i].cantidad -= 1;
                    } else {
                        carrito.splice(i, 1);
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    renderizarCarrito();
                });
            });
        }

        renderizarCarrito();

        btnVaciarCarrito.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            renderizarCarrito();
        });
    }
});
