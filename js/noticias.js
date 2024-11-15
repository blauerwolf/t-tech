fetch('https://api.provinciaradio.com.ar/v1/noticias', {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));