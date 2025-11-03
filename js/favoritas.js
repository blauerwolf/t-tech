function crearDetalleNoticia(data) {

    const row = document.createElement('div');
    row.id = data.id;
    row.className = 'row row-noticia border rounded p-2 shadow fade-in';

    const colLeft = document.createElement('div');
    colLeft.className = 'col d-flex flex-column justify-content-between';

    const img = document.createElement('img');
    img.className = 'img-thumbnail';
    img.src = data.cartelera;
    img.alt = `Imagen de la noticia ${data.titulo}`;

    const button = document.createElement('button');
    button.dataset.id = data.id;
    button.className = 'btn btn-danger';
    button.ariaLabel = `Eliminar la noticia: ${data.titulo} de tus favoritos`;
    button.ariaPressed = false;
    button.role = 'button';
    
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';
    
    const colRight = document.createElement('div');
    colRight.className = 'col-9';

    const titulo = document.createElement('h3');
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
        console.error('El contenedor con el ID "listado-container" no existe.');
    }
}

function sinNoticias() {
    const contenedor = document.createElement('div');
    contenedor.className = 'container my-5 fade-in';

    const jumboBody = document.createElement('div');
    jumboBody.className = 'p-5 text-center bg-body-tertiary rounded-3 shadow';

    const jumboText = document.createElement('h2');
    jumboText.className = 'text-body-emphasis';
    jumboText.textContent = '¡Aun no hay noticias en tus favoritos!';

    const jumboLead = document.createElement('p');
    jumboLead.className = 'lead';
    jumboLead.textContent = 'Visitá Noticias y dale like a las que te gusten para verlas acá';

    const link = document.createElement('a');
    link.className = 'btn btn-primary btn-accent';
    link.href = 'index.html#noticias';
    link.textContent = 'Ver noticias';

    jumboBody.appendChild(jumboText);
    jumboBody.appendChild(jumboLead);
    jumboBody.appendChild(link);
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
            setTimeout(() => { sinNoticias(); }, 500);
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