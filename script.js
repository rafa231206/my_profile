function selectMode(mode) {
  const profileImg = document.querySelector('.profile-img');
  const modeSelection = document.getElementById('modeSelection');
  const profileCard = document.getElementById('profileCard');

  modeSelection.style.transition = 'opacity 0.5s ease';
  modeSelection.style.opacity = '0';

  setTimeout(() => {
    modeSelection.style.display = 'none';
    document.body.classList.toggle('dark-mode', mode === 'dark');
    profileCard.style.display = 'block';
    document.getElementById('toggleIcon').className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    profileImg.src = mode === 'dark'
      ? 'img/506986091_3639265676377448_6505629332826042357_n.jpg'
      : 'img/quality_restoration_20250330050655089.jpg';
  }, 500);
}

function toggleTheme() {
  const body = document.body;
  const toggleIcon = document.getElementById('toggleIcon');
  const profileImg = document.querySelector('.profile-img');

  const isDark = body.classList.toggle('dark-mode');
  toggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('themePreference', isDark ? 'dark' : 'light');
  profileImg.src = isDark
    ? 'img/506986091_3639265676377448_6505629332826042357_n.jpg'
    : 'img/quality_restoration_20250330050655089.jpg';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modeSelection').style.opacity = '1';
  document.getElementById('modeSelection').style.display = 'flex';
  document.getElementById('profileCard').style.display = 'none';
});

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");

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
  const socialLinks = document.getElementById("socialLinks");
  socialLinks.style.display = socialLinks.style.display === 'flex' ? 'none' : 'flex';
}

function toggleUsernameInfo() {
  const usernameInfo = document.getElementById('usernameInfo');
  usernameInfo.style.display = usernameInfo.style.display === 'block' ? 'none' : 'block';
}
