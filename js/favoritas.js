async function getNoticiaById(noticiaId) {
    try {
        const response = await axios.get(`https://api.provinciaradio.com.ar/v1/noticias/${noticiaId}`);

        const noticia = response.data.data.noticia;
        return noticia;

    } catch (err) {
        console.error(err);
    }
}

function crearDetalleNoticia(data) {

    const row = document.createElement('div');
    row.id = data.id;
    row.className = 'row row-noticia border rounded p-2 shadow fade-in';

    const colLeft = document.createElement('div');
    colLeft.className = 'col d-flex flex-column justify-content-between';

    const img = document.createElement('img');
    img.className = 'img-thumbnail';
    img.src = data.cartelera;
    img.alt = 'Imagen de la noticia';

    const button = document.createElement('button');
    button.dataset.id = data.id;
    button.className = 'btn btn-danger';
    
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';
    
    const colRight = document.createElement('div');
    colRight.className = 'col-9';

    const titulo = document.createElement('h2');
    titulo.className = 'noticia-titulo';
    titulo.textContent = data.titulo;

    const autor = document.createElement('p')
    autor.className = 'noticia-autor';
    autor.textContent = data.autor;

    const volanta = document.createElement('h4');
    volanta.className = 'noticia-volanta';
    volanta.textContent = data.volanta;

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.texto, "text/html");
    
    const texto = document.createElement('div');
    texto.className = 'noticia-texto';
    texto.innerHTML = doc.body.innerHTML;

    button.appendChild(icon);

    colLeft.appendChild(img);
    colLeft.appendChild(button);

    colRight.appendChild(titulo);
    colRight.appendChild(autor);
    colRight.appendChild(volanta);
    colRight.appendChild(texto);

    row.appendChild(colLeft);
    row.appendChild(colRight);

    // Agregar la tarjeta al contenedor "noticias-container"
    const noticiasContainer = document.getElementById('listado-favoritas');
    if (noticiasContainer) {
        noticiasContainer.appendChild(row);
    } else {
        console.error('El contenedor con el ID "noticias-container" no existe.');
    }
}

function sinNoticias() {
    const contenedor = document.createElement('div');
    contenedor.className = 'container my-5 fade-in';

    const jumboBody = document.createElement('div');
    jumboBody.className = 'p-5 text-center bg-body-tertiary rounded-3';

    const jumboText = document.createElement('h1');
    jumboText.className = 'text-body-emphasis';
    jumboText.textContent = '¡Aun no hay noticias en tus favoritos!';

    const jumboLead = document.createElement('p');
    jumboLead.className = 'lead';
    jumboLead.textContent = 'Visitá Noticias y dale like a las que te gusten para verlas acá';

    jumboBody.appendChild(jumboText);
    jumboBody.appendChild(jumboLead);
    contenedor.appendChild(jumboBody);

    const noticiasContainer = document.getElementById('listado-favoritas');
    if (noticiasContainer) {
        noticiasContainer.appendChild(contenedor);
    } else {
        console.error('El contenedor con el ID "noticias-container" no existe.');
    }
}

function borrarNoticia(noticiaId) {
    let favoritosIds = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];

    const noticia = document.getElementById(noticiaId.toString());
    if (noticia) {

        if (favoritosIds.includes(noticiaId)) {
            favoritosIds = favoritosIds.filter((id) => id !== noticiaId);
        }

        localStorage.setItem('noticiasFavoritas', JSON.stringify(favoritosIds));

        noticia.classList.add('fade-out');
        setTimeout(() => {
            noticia.remove();
        }, 500);

        if (favoritosIds.length === 0) {
            sinNoticias();
        }
    }
}

function cargarDetalleFavoritos() {
    const favoritosId = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];

    if (favoritosId.length === 0) {
        sinNoticias();
    } else {
        favoritosId.forEach(async (noticiaId) => {

            const noticia = await getNoticiaById(noticiaId);
            crearDetalleNoticia(noticia);
        });
    }    
}


document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleFavoritos();
});

document.getElementById('listado-favoritas').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const button = event.target;
        const noticiaId = button.dataset.id;

        borrarNoticia(noticiaId);
    }
});