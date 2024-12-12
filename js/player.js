document.addEventListener("DOMContentLoaded", function () {
    const playerTrack = document.getElementById("player-track");
    //const bgArtwork = document.getElementById("player-bg-artwork");
    const bgArtwork = document.getElementById("musica");
    const albumName = document.getElementById("album-name");
    const trackName = document.getElementById("track-name");
    const albumArt = document.getElementById("album-art");
    const sArea = document.getElementById("seek-bar-container");
    const seekBar = document.getElementById("seek-bar");
    const trackTime = document.getElementById("track-time");
    const seekTime = document.getElementById("seek-time");
    const sHover = document.getElementById("s-hover");
    const playPauseButton = document.getElementById("play-pause-button");
    const tProgress = document.getElementById("current-time");
    const tTime = document.getElementById("track-length");
    const playPreviousTrackButton = document.getElementById("play-previous");
    const playNextTrackButton = document.getElementById("play-next");
  
    const albums = ["Radio Universidad", "Radio Universidad", "Radio Provincia", "Radio Provincia"];
    const trackNames = [
      "AM 1390 UNLP",
      "FM 107.5 UNLP",
      "AM 1270",
      "FM 97.1 La Une"
    ];
    const albumArtworks = ["_1", "_2", "_3", "_4"];
    const trackUrl = [
      "https://stream.radiouniversidad.unlp.edu.ar:8050/am",
      "https://stream.radiouniversidad.unlp.edu.ar:8040/fm",
      "https://streaming.provinciaradio.com.ar:7008/am",
      "https://streaming.provinciaradio.com.ar:3352/fm"
    ];
  
    let bgArtworkUrl,
      seekT,
      seekLoc,
      seekBarPos,
      cM,
      ctMinutes,
      ctSeconds,
      curMinutes,
      curSeconds,
      durMinutes,
      durSeconds,
      playProgress,
      bTime,
      nTime = 0,
      buffInterval = null,
      tFlag = false,
      currIndex = -1;
  
    const audio = new Audio();
  
    function playPause() {
      setTimeout(() => {
        const icon = playPauseButton.querySelector("i");
        if (audio.paused) {
          playerTrack.classList.add("active");
          albumArt.classList.add("active");
          checkBuffering();
          icon.className = "fas fa-pause";
          audio.play();
        } else {
          playerTrack.classList.remove("active");
          albumArt.classList.remove("active");
          clearInterval(buffInterval);
          albumArt.classList.remove("buffering");
          icon.className = "fas fa-play";
          audio.pause();
        }
      }, 300);
    }
  
    function showHover(event) {
      const rect = sArea.getBoundingClientRect();
      seekT = event.clientX - rect.left;
      seekLoc = audio.duration * (seekT / rect.width);
  
      sHover.style.width = `${seekT}px`;
  
      cM = seekLoc / 60;
      ctMinutes = Math.floor(cM);
      ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
  
      if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
      if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;
  
      seekTime.textContent = isNaN(ctMinutes) || isNaN(ctSeconds) ? "--:--" : `${ctMinutes}:${ctSeconds}`;
      seekTime.style.left = `${seekT}px`;
      seekTime.style.marginLeft = "-21px";
      seekTime.style.display = "block";
    }
  
    function hideHover() {
      sHover.style.width = "0px";
      seekTime.textContent = "00:00";
      seekTime.style.left = "0px";
      seekTime.style.marginLeft = "0px";
      seekTime.style.display = "none";
    }
  
    function playFromClickedPos() {
      audio.currentTime = seekLoc;
      seekBar.style.width = `${seekT}px`;
      hideHover();
    }
  
    function updateCurrTime() {
      nTime = Date.now();
      if (!tFlag) {
        tFlag = true;
        trackTime.classList.add("active");
      }
  
      curMinutes = Math.floor(audio.currentTime / 60);
      curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
  
      durMinutes = Math.floor(audio.duration / 60);
      durSeconds = Math.floor(audio.duration - durMinutes * 60);
  
      playProgress = (audio.currentTime / audio.duration) * 100;
  
      tProgress.textContent = isNaN(curMinutes) || isNaN(curSeconds) ? "00:00" : `${curMinutes}:${curSeconds}`;
      tTime.textContent = isNaN(durMinutes) || isNaN(durSeconds) ? "00:00" : `${durMinutes}:${durSeconds}`;
  
      seekBar.style.width = `${playProgress}%`;
  
      if (playProgress === 100) {
        const icon = playPauseButton.querySelector("i");
        icon.className = "fas fa-play";
        seekBar.style.width = "0px";
        tProgress.textContent = "00:00";
        albumArt.classList.remove("buffering", "active");
        clearInterval(buffInterval);
      }
    }
  
    function checkBuffering() {
      clearInterval(buffInterval);
      buffInterval = setInterval(() => {
        if (nTime === 0 || bTime - nTime > 1000) {
          albumArt.classList.add("buffering");
        } else {
          albumArt.classList.remove("buffering");
        }
        bTime = Date.now();
      }, 100);
    }
  
    function selectTrack(flag) {
      if (flag === 0 || flag === 1) ++currIndex;
      else --currIndex;
  
      if (currIndex > -1 && currIndex < albumArtworks.length) {
        const icon = playPauseButton.querySelector("i");
        if (flag === 0) {
          icon.className = "fas fa-play";
        } else {
          albumArt.classList.remove("buffering");
          icon.className = "fas fa-pause";
        }
  
        seekBar.style.width = "0px";
        trackTime.classList.remove("active");
        tProgress.textContent = "00:00";
        tTime.textContent = "00:00";
  
        const currAlbum = albums[currIndex];
        const currTrackName = trackNames[currIndex];
        const currArtwork = albumArtworks[currIndex];
  
        audio.src = trackUrl[currIndex];
  
        nTime = 0;
        bTime = Date.now();
  
        if (flag !== 0) {
          audio.play();
          playerTrack.classList.add("active");
          albumArt.classList.add("active");
  
          clearInterval(buffInterval);
          checkBuffering();
        }
  
        albumName.textContent = currAlbum;
        trackName.textContent = currTrackName;
  
        const activeImg = albumArt.querySelector("img.active");
        if (activeImg) activeImg.classList.remove("active");
  
        const newActiveImg = document.getElementById(currArtwork);
        if (newActiveImg) newActiveImg.classList.add("active");
  
        bgArtworkUrl = newActiveImg ? newActiveImg.src : "";
        //bgArtwork.style.backgroundImage = `url(${bgArtworkUrl})`;
        bgArtwork.style.setProperty(
          '--background-image', 
           `url(${bgArtworkUrl})`
        );

      } else {
        currIndex += flag === 0 || flag === 1 ? -1 : 1;
      }
    }
  
    function initPlayer() {
      selectTrack(0);
      audio.loop = false;
  
      playPauseButton.addEventListener("click", playPause);
  
      sArea.addEventListener("mousemove", showHover);
      sArea.addEventListener("mouseout", hideHover);
      sArea.addEventListener("click", playFromClickedPos);
  
      audio.addEventListener("timeupdate", updateCurrTime);
  
      playPreviousTrackButton.addEventListener("click", () => selectTrack(-1));
      playNextTrackButton.addEventListener("click", () => selectTrack(1));
    }
  
    initPlayer();
  });
  