// Seleccionamos todos los contenedores de reproductores de audio
const audioPlayers = document.querySelectorAll(".audio-player-container");

// Recorremos todos los reproductores
audioPlayers.forEach(container => {
    const audio = container.querySelector(".audio-player");
    const playPauseBtn = container.querySelector(".play-btn");

    if (audio && playPauseBtn) {

        function togglePlayPause() {
            pauseOtherAudios(audio);

            if (audio.paused) {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }

        // Función para pausar otros audios activos
        function pauseOtherAudios(currentAudio) {
            audioPlayers.forEach(otherContainer => {
                const otherAudio = otherContainer.querySelector(".audio-player");
                const otherPlayPauseBtn = otherContainer.querySelector(".play-btn");
                if (otherAudio !== currentAudio) { // Si no es el audio actual
                    otherAudio.pause(); // Pausar el otro audio
                    otherPlayPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // Cambiar el ícono a "play"
                }
            });
        }

        // Asignamos el evento de click al botón para cada reproductor
        playPauseBtn.addEventListener("click", togglePlayPause);
        

        // Listener para el evento "ended" del audio y resetear el botón a play
        audio.addEventListener("ended", () => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            progressBar.value = 0; // Reiniciar la barra de progreso
            timeDisplay.textContent = "00:00 / 00:00"; // Reiniciar el tiempo mostrado
        });

    } else {
        console.error('No se encontro elemento de audio, boton o barra de progreso');
    }
});