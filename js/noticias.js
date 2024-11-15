axios.get('https://api.provinciaradio.com.ar/v1/noticias')
.then(response => {
    console.log(response.data); // Maneja los datos de la respuesta
})
.catch(error => {
    console.error('Error:', error); // Maneja errores
});