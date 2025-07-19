// Fungsi memilih mode tema (masih bisa dipanggil jika diperlukan)
function selectMode(mode) {
  const profileImg = document.querySelector('.profile-img');
  const profileCard = document.getElementById('profileCard');

  // modeSelection is not defined in this context, assuming it's from an earlier version or another part of the code
  // If modeSelection is meant to be profileCard, adjust accordingly.
  // For now, commenting out the lines that use modeSelection to prevent errors.
  // modeSelection.style.transition = 'opacity 0.5s ease';
  // modeSelection.style.opacity = '0';

  setTimeout(() => {
    // modeSelection.style.display = 'none'; // See comment above
    document.body.classList.toggle('dark-mode', mode === 'dark');
    profileCard.style.display = 'block';
    document.getElementById('toggleIcon').className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    profileImg.src = mode === 'dark'
      ? 'img/506986091_3639265676377448_6505629332826042357_n.jpg'
      : 'img/quality_restoration_20250330050655089.jpg';
  }, 500);
}

// Fungsi toggle tema saat tombol diklik
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

// Saat halaman dimuat, langsung tampilkan profil dan cek preferensi tema
document.addEventListener('DOMContentLoaded', () => {
  const profileCard = document.getElementById('profileCard'); // Get profileCard here
  profileCard.style.display = 'block';
  
  // Tambahkan animasi fade-in
  profileCard.classList.add('fade-in');

  const savedTheme = localStorage.getItem('themePreference');
  const toggleIcon = document.getElementById('toggleIcon');
  const profileImg = document.querySelector('.profile-img');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleIcon.className = 'fas fa-sun';
    profileImg.src = 'img/506986091_3639265676377448_6505629332826042357_n.jpg';
  } else {
    document.body.classList.remove('dark-mode');
    toggleIcon.className = 'fas fa-moon';
    profileImg.src = 'img/quality_restoration_20250330050655089.jpg';
  }

  // Ensure play button icon is correct on load
  playButton.innerHTML = '<i class="fas fa-play"></i>';
});

// Pemutar Audio
const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

audio.onerror = () => {
  console.error("Error: Audio tidak ditemukan atau tidak dapat diputar.");
};
    // Tambahkan event listener untuk memperbarui tombol saat audio berakhir
    audio.addEventListener('ended', () => {
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    });

    // Inisialisasi ikon tombol saat halaman dimuat (already handled in DOMContentLoaded above)
    // document.addEventListener('DOMContentLoaded', () => {
    //   playButton.innerHTML = '<i class="fas fa-play"></i>';
    // });
    
// Toggle tampilan sosial media
function toggleSocial() {
  const socialLinks = document.getElementById("socialLinks");
  socialLinks.classList.toggle("show");
}

// Toggle info username
function toggleUsernameInfo() {
  const usernameInfo = document.getElementById('usernameInfo');
  usernameInfo.classList.toggle("show");
}
    // Toggle tampilan form kontak
    function toggleContactForm() {
      const contactForm = document.getElementById('contactForm');
      contactForm.classList.toggle("show");
    }
        // Daftarkan Service Worker untuk PWA
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
              .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
              })
              .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
              });
          });
        }
