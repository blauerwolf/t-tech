const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.provinciaradio.com.ar/v1/noticias');

axios.get(url)
.then(response => {
    let noticias = response.data.data.noticias;
    console.log(noticias);
    for (let i = 0; i < 4; i++) {
        let card = document.getElementById(i);
        let h3 = card.querySelector("h3");
        let p = card.querySelector("p");

        h3.textContent = "prueba";
    }
    /*
    let card = 
    <div class="card">
                    <img src="https://via.placeholder.com/300" alt="Imagen de la tarjeta" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Título de la Tarjeta</h3>
                        <p class="card-description">Esta es una descripción breve de la tarjeta. Aquí puedes poner más detalles si lo deseas.</p>
                        <button class="card-button">Leer más</button>
                    </div>
                </div>
    */
})
.catch(error => {
    console.error('Error:', error); // Maneja errores
});