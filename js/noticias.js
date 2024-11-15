const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.provinciaradio.com.ar/v1/noticias');

axios.get(url)
.then(response => {
    let noticias = response.data.data.noticias;
    console.log(noticias);
    for (let i = 0; i < 4; i++) {
        let card = document.getElementById(i);
        let h3 = card.querySelector("h3");
        let p = card.querySelector("p");
        let img = card.querySelector("img");

        h3.textContent = noticias[i].titulo;
        p.textContent = noticias[i].subtitulo;
        img.src = noticias[i].cartelera;
    }
})
.catch(error => {
    console.error('Error:', error); // Maneja errores
});