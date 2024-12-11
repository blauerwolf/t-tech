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
    console.log(data);

    const row = document.createElement('div');
    row.className = 'row row-noticia border rounded p-2 shadow';

    const colLeft = document.createElement('div');
    colLeft.className = 'col d-flex flex-column justify-content-between';

    const img = document.createElement('img');
    img.className = 'img-thumbnail';
    img.src = data.cartelera;
    img.alt = 'Imagen de la noticia';

    const button = document.createElement('button');
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

    const texto = document.createElement('div');
    texto.className = 'noticia-texto';
    texto.textContent = data.texto;

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

function borrarNoticia(noticiaId) {
    let favoritosIds = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];

    if (favoritosIds.includes(noticiaId)) {
        favoritosIds = favoritosIds.filter((id) => id !== cardId);
    }

    localStorage.setItem('noticiasFavoritas', JSON.stringify(favoritosIds));

    // TODO: Borrar el div con la noticia
}

function cargarDetalleFavoritos() {
    const favoritosId = JSON.parse(localStorage.getItem('noticiasFavoritas')) || [];
    favoritosId.forEach(async (noticiaId) => {

        const noticia = await getNoticiaById(noticiaId);
        crearDetalleNoticia(noticia);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleFavoritos();
});