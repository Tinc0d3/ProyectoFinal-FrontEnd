document.addEventListener("DOMContentLoaded", function () {
    // Botón de bienvenida
    const boton = document.getElementById("btn-cambiar-texto");
    const mensaje = document.getElementById("mensaje-bienvenida");

    boton.addEventListener("click", function () {
        mensaje.textContent = "¡Gracias por visitarnos! Tenemos muchas ofertas para vos.";
        console.log("Texto cambiado correctamente.");
    });

    // Botones "Comprar"
    const botonesComprar = document.querySelectorAll(".btn-comprar");

    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", function () {
            alert("Producto añadido al carrito (simulado).");
        });
    });
});