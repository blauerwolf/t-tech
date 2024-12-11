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

    const contenedor = document.createElement('div');
    contenedor.className = 'card';

    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    img.src = data.cartelera;
    img.alt = 'Imagen de la noticia';

    

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