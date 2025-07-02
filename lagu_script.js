// Select all playlist items and map them to an array of song objects
const songs = Array.from(document.querySelectorAll(".playlist-item")).map(item => {
  return {
    title: item.querySelector(".track-title")?.textContent || "",
    artist: item.querySelector(".track-artist")?.textContent || "",
    src: item.getAttribute("data-src") // Get audio source from data-src attribute
  };
}).filter(s => s.src); // Filter out items without a src (ensures valid audio sources)

// Get audio element and initialize player state
const audio = document.getElementById("global-audio");
let currentIndex = 0; // Current song index
let isPlaying = false; // Track play/pause state

// Get DOM elements for "Now Playing" display and main controls
const nowPlayingBox = document.getElementById("now-playing");
const nowPlayingInner = nowPlayingBox.querySelector("div");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playlistItems = document.querySelectorAll(".playlist-item");
const mainPlayButton = document.querySelector(".btn-icon.play");
const nextButton = document.querySelector(".btn-icon.next");
const prevButton = document.querySelector(".btn-icon.prev");

/**
 * Updates the icon of the main play button based on the current playing state.
 */
function updateMainPlayButtonIcon() {
  if (isPlaying) {
    mainPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="none" width="28" height="28" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
  } else {
    mainPlayButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="none" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>';
  }
}

/**
 * Plays the next song in the playlist.
 * If at the end, it will loop back to the beginning.
 */
function playNextSong() {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= songs.length) {
    nextIndex = 0; // Loop back to the first song
  }
  playSong(nextIndex);
}

/**
 * Plays the previous song in the playlist.
 * If at the beginning, it will loop to the end.
 */
function playPrevSong() {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = songs.length - 1; // Loop to the last song
  }
  playSong(prevIndex);
}

/**
 * Updates the "Now Playing" display with the current song's title and artist.
 * Shows the display with a slide-up animation.
 * @param {string} title - The title of the current song.
 * @param {string} artist - The artist of the current song.
 */
function updateNowPlayingDisplay(title, artist) {
  songTitle.textContent = title;
  songArtist.textContent = artist;
  nowPlayingInner.classList.remove("hidden"); // Make sure it's visible
  nowPlayingInner.classList.remove("animate-slide-up"); // Reset animation
  void nowPlayingInner.offsetWidth; // Trigger reflow to restart animation
  nowPlayingInner.classList.add("animate-slide-up"); // Apply slide-up animation
}

/**
 * Removes all currently displayed "playing bars" animations from playlist items.
 */
function removeAllPlayingBars() {
  document.querySelectorAll(".playing-bars").forEach(e => e.remove());
}

/**
 * Adds the "playing bars" animation to a specific playlist item.
 * Removes any existing bars before adding new ones.
 * @param {HTMLElement} item - The playlist item element to add bars to.
 */
function addPlayingBars(item) {
  removeAllPlayingBars(); // Ensure only one set of bars is visible at a time
  const controls = item.querySelector(".track-controls");
  if (controls) {
    const bars = document.createElement("div");
    bars.className = "playing-bars";
    bars.innerHTML = '<span></span><span></span><span></span>'; // HTML for the bars
    controls.appendChild(bars);
  }
}

/**
 * Sets the active state for a playlist item and updates its play/pause icons.
 * Also adds/removes playing bars.
 * @param {number} index - The index of the playlist item to set as active.
 */
function setActivePlaylistItem(index) {
  playlistItems.forEach((item, i) => {
    const playIcon = item.querySelector(".play-icon");
    const pauseIcon = item.querySelector(".pause-icon");

    if (i === index) {
      item.classList.add("active"); // Add active class for styling
      addPlayingBars(item); // Show playing bars
      if (isPlaying) {
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden"); // Show pause icon if playing
      } else {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden"); // Show play icon if paused
      }
    } else {
      item.classList.remove("active"); // Remove active class from other items
      if (playIcon && pauseIcon) {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden"); // Ensure other items show play icon
      }
    }
  });
}

/**
 * Toggles play/pause for a specific song in the playlist.
 * Updates the main play button and individual item icons.
 * @param {HTMLElement} button - The play/pause button element clicked.
 * @param {number} index - The index of the song associated with the button.
 */
function togglePlayPause(button, index) {
  const playIcon = button.querySelector(".play-icon");
  const pauseIcon = button.querySelector(".pause-icon");

  // If audio is paused OR a different song is clicked
  if (audio.paused || currentIndex !== index) {
    playSong(index); // Play the song
  } else {
    // If the same song is playing, pause it
    audio.pause();
    isPlaying = false;
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    removeAllPlayingBars(); // Remove playing bars when paused
    updateMainPlayButtonIcon(); // Update main play button icon
  }
  setActivePlaylistItem(currentIndex); // Update active state and icons for all items
}

/**
 * Plays a song from the playlist based on its index.
 * Updates the audio source, "Now Playing" display, and active playlist item.
 * @param {number} index - The index of the song to play.
 */
function playSong(index) {
  if (index >= 0 && index < songs.length) {
    currentIndex = index; // Set current index
    const song = songs[currentIndex];
    audio.src = song.src; // Set audio source
    audio.play(); // Play the audio
    isPlaying = true;
    updateNowPlayingDisplay(song.title, song.artist); // Update "Now Playing" bar
    setActivePlaylistItem(currentIndex); // Set active item and show bars
    updateMainPlayButtonIcon(); // Update main play button icon
  } else {
    // If index is out of bounds (e.g., end of playlist), stop playback
    audio.pause();
    isPlaying = false;
    nowPlayingInner.classList.add("hidden"); // Hide "Now Playing" bar
    removeAllPlayingBars(); // Remove playing bars
    playlistItems.forEach(item => item.classList.remove("active")); // Remove active state from all items
    updateMainPlayButtonIcon(); // Update main play button icon
  }
}

// Event Listeners

// Play next song automatically when current song ends
audio.addEventListener("ended", () => {
  playNextSong();
});

// Update main play button icon and active item when audio starts playing
audio.addEventListener("play", () => {
  isPlaying = true;
  updateMainPlayButtonIcon();
  setActivePlaylistItem(currentIndex); // Ensure correct icon for current song
});

// Update main play button icon and active item when audio is paused
audio.addEventListener("pause", () => {
  isPlaying = false;
  updateMainPlayButtonIcon();
  setActivePlaylistItem(currentIndex); // Ensure correct icon for current song
});

// Handle click on the main play button
mainPlayButton.addEventListener("click", () => {
  if (audio.paused) { // If audio is paused
    // If audio is paused AND current time is 0 (meaning no song has started or it finished)
    // OR if it's paused and not currently playing (e.g., after a song ended)
    if (audio.currentTime === 0 || !isPlaying) {
      playSong(0); // Start playing from the first song
    } else {
      audio.play(); // Resume current song
    }
  } else { // If audio is playing
    audio.pause(); // Pause current song
  }
});

// Add event listeners for next and previous buttons
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPrevSong);

// Add event listeners to each playlist item
playlistItems.forEach((item, index) => {
  const playPauseButton = item.querySelector(".play-pause-btn");

  // Event listener for the individual play/pause button within the item
  if (playPauseButton) {
    playPauseButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the parent playlist item click from firing
      togglePlayPause(playPauseButton, index);
    });
  }

  // Event listener for clicking anywhere on the playlist item
  item.addEventListener("click", () => {
    // If clicking on an item that is not currently playing, play it.
    // If clicking on the currently playing item, toggle play/pause.
    if (currentIndex === index) {
      togglePlayPause(playPauseButton, index);
    } else {
      playSong(index);
    }
  });
});

// Initialize the state of the play/pause buttons and active item on page load
setActivePlaylistItem(currentIndex);
updateMainPlayButtonIcon(); // Ensure main play button icon is correct on load
