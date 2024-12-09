//const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.provinciaradio.com.ar/v1/noticias');
const url = 'https://api.provinciaradio.com.ar/v1/noticias';
let pagina = 1;


function crearCard(cardId, imageUrl, title, description) {
    // Crear el contenedor de la tarjeta
    const card = document.createElement('div');
    card.className = 'card';
    card.id = cardId; // Asignar el ID dinámicamente

    // Crear la imagen de la tarjeta
    const img = document.createElement('img');
    img.src = imageUrl; // Asignar la URL de la imagen
    img.alt = 'Imagen de la tarjeta';
    img.className = 'card-image';

    // Crear el contenedor del contenido
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // Crear el título de la tarjeta
    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title; // Asignar el título dinámicamente

    // Crear la descripción de la tarjeta
    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-description';
    cardDescription.textContent = description; // Asignar la descripción dinámica

    // Crear el botón de la tarjeta
    const cardButton = document.createElement('button');
    cardButton.className = 'card-button';
    cardButton.textContent = 'Leer más';

    // Ensamblar la tarjeta
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardButton);
    card.appendChild(img);
    card.appendChild(cardContent);

    // Agregar la tarjeta al contenedor "noticias-container"
    const noticiasContainer = document.getElementById('noticias-container');
    if (noticiasContainer) {
        noticiasContainer.appendChild(card);
    } else {
        console.error('El contenedor con el ID "noticias-container" no existe.');
    }
}

async function getNoticias(url, pagina = 1) {
    try {
        const response = await axios.get(url, {
            mode: 'no-cors',
            params: { pagina: pagina }            
        });

        const noticias = response.data.data.noticias;
        console.log(noticias);
        return noticias;

    } catch (err) {
        console.error(err);
    }
}

function agregarNoticias(noticias) {
    noticias.forEach((e) => {
        crearCard(e.id, e.cartelera, e.titulo, e.subtitulo);
    })
}


axios.get(url)
.then(response => {
    let noticias = response.data.data.noticias;
    console.log(noticias);
    for (let i = 0; i < 4; i++) {
        crearCard(noticias[i].id, noticias[i].cartelera, noticias[i].titulo, noticias[i].subtitulo);
        /*
        let card = document.getElementById(i);
        let h3 = card.querySelector("h3");
        let p = card.querySelector("p");
        let img = card.querySelector("img");

        h3.textContent = noticias[i].titulo;
        p.textContent = noticias[i].subtitulo;
        img.src = noticias[i].cartelera;
        */
    }
})
.catch(error => {
    console.error('Error:', error); // Maneja errores
});




(async() => {
    const noticias = await getNoticias(url, pagina);
    if (noticias) {
        noticias.forEach(e => {
            crearCard(noticias[i].id, noticias[i].cartelera, noticias[i].titulo, noticias[i].subtitulo);
        })

        pagina++;
    }   
})()

const btnMasNoticias = document.getElementById("btnCargar")
.addEventListener('click', async function() {
    const noticias = await getNoticias(url, pagina);
    agregarNoticias(noticias);
    pagina++;
})