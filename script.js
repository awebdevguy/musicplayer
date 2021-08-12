const image = document.getElementById("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.getElementById("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
var curTimeEl = document.getElementById("current-time");
var durationEl = document.getElementById("duration");
const progressContainer = document.getElementById("progress-container");
var progress = document.getElementById("progress");

var songs = [
  {
    name: "can't you see",
    displayName: "Can't You See",
    artist: "Minglewood Band"
  },
  {
    name: "dorchester",
    displayName: "Dorchester",
    artist: "Minglewood Band"
  },
  {
    name: "how high is high enough",
    displayName: "How High Is High Enough",
    artist: "Minglewood Band"
  },
  {
    name: "eastcoast blues",
    displayName: "East Coast Blues",
    artist: "Minglewood Band"
  }
];

let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  // music.src = "/Users/lesliequines/Desktop/Music1/Minglewood Band - The Best Of Minglewood Band/04 - Can't You See.mp3";
  music.src = `music/${song.name}.mp3`;
  durationLength = music.duration;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

//  Previous Song
function prevSong() {
  songIndex > 0 ? songIndex-- : (songIndex = songs.length - 1);
  loadSong(songs[songIndex]);
  playSong();
}

//  Next Song
function nextSong() {
  songIndex < songs.length - 1 ? songIndex++ : (songIndex = 0);
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    let { duration, currentTime } = e.srcElement;
    // Update progress bar width
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    // Divide by 60 (minute) and get remainder (modulo) as seconds
    let durationSeconds = Math.floor(duration % 60);
    // Add 0 to single digit second
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current progress time
    let currentMinutes = Math.floor(currentTime / 60);
    // Divide by 60 (minute) and get remainder (modulo) as seconds
    let currentSeconds = Math.floor(currentTime % 60);
    // Add 0 to single digit second
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    curTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set progress bar manually
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
