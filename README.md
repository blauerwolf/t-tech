# Entrega Final - Web "Musica y Noticias"

## Uso de la web
La web posee un menu de navegacion superior para acceder facilmente a las distintas secciones y paginas, como Inicio, Noticias, Musica, Contacto y Favoritos.

En la pagina principal se puede escuchar en un reproductor de audio streaming en vivo de Radio Universidad (UNLP) AM y FM como tambien Radio Provincia (AM y FM).

Al hacer click en el boton de reproduccion cambia el fondo acorde a la estacion que se esta reproduciendo.

Para el caso de las estaciones de Radio Universidad, las imagenes se encuentran almacenadas en la web, mientras que para Radio Provincia se consume un endpoint de una API Rest para obtener la imagen del programa que esta al aire al momento de comenzar la reproduccion.  
El reproductor se adapta sin problemas tanto a pantallas grandes o pequeñas, y posee efectos de animacion muy vistosos.  
En la seccion de noticias se pueden ver 10 trarjetas (cards) con las noticias que se consumen de una API Rest, mostrando un resumen de la imagen, titulo y parte del texto. Las cards poseen todas el mismo tamaño y cada una cuenta con un boton "Leer mas" que al hacer click sobre el abrira un modal con el detalle de la noticia completa.  
Un icono de un corazon permite marcar o desmarcar a la noticia como favorita.  

Acompañan al diseño un footer con redundancia para el acceso a los enlaces de la pagina.

Tanto los enlaces de Inicio, Noticias y Musica hacen referencia a las secciones de la pagina principal.  

La entrada de menu "Contacto" lleva al formulario de contacto, el cual cuenta con su validacion por javascript correspondiente, y envio de datos por FormSpree.

La entrada de menu "Favoritos" permite ver el detalle de las noticias que fueron marcadas como favoritas en la pantalla principal. Se puede leer el cuerpo completo de la noticia y representa correctamente sus elementos (parrafos, cursivas, audio, etc).
Un boton rojo con el icono de un cesto de basura permite eliminar a la notiia de favoritos, actualizando inmediatamente la vista de la pagina.  
Cuando ya no hayan noticias en favoritos se avisa al usuario mendiante un mensaje y se invita a visitar la pagina principal.

## Instalacion del proyecto
No requiere instalar ningun complemento adicional. El contenido del proyecto debe ser publicado por un servidor web (nginx, apache, etc).




