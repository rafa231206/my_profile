// Mode Selection Functionality
function selectMode(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('toggleIcon').className = 'fas fa-sun';
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('toggleIcon').className = 'fas fa-moon';
  }

  // // Save preference to localStorage
  // localStorage.setItem('themePreference', mode);

  // Hide mode selection and show profile card
  document.getElementById('modeSelection').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('profileCard').style.display = 'block';
  }, 500);
}

// New Theme Toggle Function
function toggleTheme() {
  const body = document.body;
  const toggleIcon = document.getElementById('toggleIcon');
  
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    toggleIcon.className = 'fas fa-moon';
    localStorage.setItem('themePreference', 'light');
  } else {
    body.classList.add('dark-mode');
    toggleIcon.className = 'fas fa-sun';
    localStorage.setItem('themePreference', 'dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Reset tampilan mode seleksi
  const modeSelection = document.getElementById('modeSelection');
  const profileCard = document.getElementById('profileCard');
  
  modeSelection.style.opacity = '1';
  modeSelection.style.display = 'flex';
  profileCard.style.display = 'none'; // Sembunyikan profil sampai mode dipilih
});

// Audio Player Functionality
const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const socialLinks = document.getElementById("socialLinks");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "❚❚";
  } else {
    audio.pause();
    playButton.textContent = "▶";
  }
}

audio.onerror = () => {
  console.error("Error: Audio tidak ditemukan atau tidak dapat diputar.");
};

function toggleSocial() {
  socialLinks.style.display = (socialLinks.style.display === 'flex') ? 'none' : 'flex';
}
