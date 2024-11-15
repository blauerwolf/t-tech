const url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.provinciaradio.com.ar/v1/noticias');

axios.get(url)
.then(response => {
    console.log(response.data); // Maneja los datos de la respuesta
})
.catch(error => {
    console.error('Error:', error); // Maneja errores
});