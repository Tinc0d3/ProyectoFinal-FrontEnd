document.addEventListener("DOMContentLoaded", () => {
  // 🔷 Carga de productos en productos.html
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

  // 🔷 Carga de ofertas en index.html
  const contenedorOfertas = document.getElementById("contenedor-ofertas");

  if (contenedorOfertas) {
    fetch("./data/productos.json")
      .then(res => res.json())
      .then(productos => {
        const ofertas = productos.filter(p => p.oferta === true);
        if (ofertas.length === 0) {
          contenedorOfertas.innerHTML = "<p>No hay ofertas disponibles en este momento.</p>";
          return;
        }

        ofertas.forEach(producto => {
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

          contenedorOfertas.appendChild(tarjeta);
        });
      })
      .catch(error => {
        contenedorOfertas.innerHTML = "<p>Error al cargar las ofertas.</p>";
        console.error("Error al cargar productos.json:", error);
      });
  }

  // 🔷 Función común para agregar al carrito
  function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.nombre === producto.nombre);
    if (index !== -1) {
      carrito[index].cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  }

  // 🔷 Carrito en carrito.html
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
