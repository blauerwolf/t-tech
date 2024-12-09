function listarNoticias() {

}

function verificarForm() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");

    if (name.value.trim() === "" && 
        email.value.trim() === "" &&
        message.value.trim() === ""
    ) {
        return false;
    } else {
        return true;
    }
}

function clearForm() {
    const form = document.getElementById('myForm');
    form.reset(); // Limpia todos los campos del formulario
}

// Detectar el parámetro en la URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('status') === 'success') {
    clearForm(); // Limpiar el formulario si el envío fue exitoso
    alert('¡Formulario enviado con éxito!'); // Opcional: Mensaje de confirmación
}

const form = document.getElementById('contactForm');

// Validación en el evento submit
form.addEventListener('submit', function(event) {
    if (!verificarForm()) {
        event.preventDefault();

        // Mostrar mensaje de error
        errorMessage.style.display = "block";
    } else {
        // Ocultar mensaje de error
        errorMessage.style.display = "none";
        form.reset();
    }
});