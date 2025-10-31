const url = 'https://api.provinciaradio.com.ar/v1/noticias';
let pagina = 1;

function crearCard(cardId, imageUrl, title, description) {
    const card = document.createElement('div');
    card.className = 'card mb-5 shadow';
    card.id = cardId;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Imagen de la noticia' + title;
    img.className = 'card-img-top card-img-fixed';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.textContent = description;

    const footer = document.createElement('div');
    footer.className = 'card-footer-buttons d-flex justify-content-between align-items-center mt-auto';

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn btn-primary btn-accent btn-leer';
    boton.textContent = 'Leer más';
    boton.dataset.bsToggle = "modal";
    boton.dataset.bsTarget = "#modal-noticias";
    boton.dataset.id = cardId;
    boton.ariaLabel = `Leer más sobre ${title}`;

    const likeButton = document.createElement('button');
    likeButton.className = 'like-btn';
    likeButton.dataset.cardId = cardId;
    likeButton.ariaLabel = `Añadir ${title} a favoritos`;
    likeButton.ariaPressed = false;
    
    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa-regular fa-heart pe-4';
    likeIcon.ariaHidden = true;

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
        cargarFavoritos();
    })
}

function cargarFavoritos() {
    const favoritosId = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];
    favoritosId.forEach((cardId) => {

        const likeHeart = document.querySelector(`button[data-card-id="${cardId}"] i`);

        if (likeHeart) {
            likeHeart.classList.remove('fa-regular');
            likeHeart.classList.add('fa-solid');
        }
    });
}

function toogleFavoritos(cardId, icon) {
    let favoritosIds = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];

    if (favoritosIds.includes(cardId)) {
        favoritosIds = favoritosIds.filter((id) => id !== cardId);
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    } else {
        favoritosIds.push(cardId);
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }

    localStorage.setItem('noticiasFavoritas', JSON.stringify(favoritosIds));
}

function mostrarModal(noticia) {
    
    const titulo = document.getElementById('modal-title');
    titulo.textContent = noticia.titulo;

    const body = document.getElementById('modal-body');
    body.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'img-thumbnail';
    img.src = noticia.cartelera;
    img.alt = 'Imagen de la noticia' + noticia.titulo;

    const autor = document.createElement('p')
    autor.className = 'noticia-autor';
    autor.textContent = noticia.autor;

    const volanta = document.createElement('h3');
    volanta.className = 'noticia-volanta';
    volanta.textContent = noticia.volanta;

    const parser = new DOMParser();
    const doc = parser.parseFromString(noticia.texto, "text/html");
    
    const texto = document.createElement('div');
    texto.className = 'noticia-texto';
    texto.innerHTML = doc.body.innerHTML;

    const contenedor = document.createElement('div');
    contenedor.className = 'container';

    contenedor.appendChild(img);
    contenedor.appendChild(autor);
    contenedor.appendChild(volanta);
    contenedor.appendChild(texto);

    body.appendChild(contenedor);

    const modal = new bootstrap.Modal(document.getElementById('modal-noticias'));
    modal.show();

    const modalDialog = document.querySelector('#modal-noticias .modal-dialog');
    modalDialog.setAttribute('role', 'dialog');
    modalDialog.setAttribute('aria-modal', 'true');
    modalDialog.setAttribute('aria-labelledby', 'modal-title');

    // Mueve el foco al modal al abrirlo
    setTimeout(() => modalDialog.focus(), 300);
}


(async() => {

    const noticias = await getNoticias(url, pagina);
    if (noticias) {
        noticias.forEach(n => {
            crearCard(n.id, n.cartelera, n.titulo, n.subtitulo);
            cargarFavoritos();
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


// Like - unLike
document.getElementById('noticias-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-heart')) {
        const icon = event.target;
        const button = icon.closest('button.like-btn');
        const cardId = button.dataset.cardId;

        toogleFavoritos(cardId, icon);
    }
});


// Muestro el modal
document.getElementById('noticias-container').addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-leer')) {
        const button = event.target;
        const noticiaId = button.dataset.id;
        const noticia = await getNoticiaById(noticiaId);
        console.log(noticia);

        mostrarModal(noticia);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    cargarFavoritos();
});