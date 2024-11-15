fetch('https://api.provinciaradio.com.ar/v1/noticias')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));