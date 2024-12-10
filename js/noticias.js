const url = 'https://api.provinciaradio.com.ar/v1/noticias';
let pagina = 1;

function crearCard(cardId, imageUrl, title, description) {
    const card = document.createElement('div');
    card.className = 'card mb-5 shadow';
    card.id = cardId;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Imagen de la tarjeta';
    img.className = 'card-img-top card-img-fixed';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.textContent = description;

    const footer = document.createElement('div');
    footer.className = 'card-footer-buttons d-flex justify-content-between align-items-center mt-auto';

    const boton = document.createElement('a');
    boton.className = 'btn btn-primary';
    boton.textContent = 'Leer más';

    const likeButton = document.createElement('button');
    likeButton.className = 'like-btn';
    
    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa-regular fa-heart pe-4';


    likeButton.appendChild(likeIcon);
    footer.appendChild(boton);
    footer.appendChild(likeButton);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(footer);
    card.appendChild(img);
    card.appendChild(cardBody);

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


(async() => {

    const noticias = await getNoticias(url, pagina);
    if (noticias) {
        noticias.forEach(n => {
            crearCard(n.id, n.cartelera, n.titulo, n.subtitulo);
        })

        pagina++;
    }   
})()


const btnMasNoticias = document.getElementById("btnCargar")
.addEventListener('click', async function() {
    console.log("PAGINA: ", pagina);
    const noticias = await getNoticias(url, pagina);
    agregarNoticias(noticias);
    pagina++;
})


document.getElementById('noticias-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-heart')) {
        const icon = event.target;

        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');

            // TODO: AGREGAR A FAVORITOS
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');

            // TODO: QUITAR DE FAVORITOS
        }
    }
})