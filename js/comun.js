async function getNoticiaById(noticiaId) {
    try {
        const response = await axios.get(`https://api.provinciaradio.com.ar/v1/noticias/${noticiaId}`);

        const noticia = response.data.data.noticia;
        return noticia;

    } catch (err) {
        console.error(err);
    }
}