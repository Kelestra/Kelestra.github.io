// Cambia al siguiente/previo slide
function changeSlide(slideshowId, step) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return; // Valida que el slideshow exista

    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length === 0) return; // Valida que haya slides

    // Encuentra el índice del slide activo
    let activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    // Quita la clase activa del slide actual
    slides[activeIndex].classList.remove('active');

    // Calcula el índice del siguiente slide
    activeIndex = (activeIndex + step + slides.length) % slides.length;

    // Añade la clase activa al nuevo slide
    slides[activeIndex].classList.add('active');
}

// Inicializa un slideshow
function initializeSlideshow(slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length === 0) return; // Si no hay slides, no hace nada

    // Asegura que solo el primer slide sea visible
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });
}

// Inicializa todos los slideshows en la página
document.querySelectorAll('.slideshow-container').forEach(initializeSlideshow);

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    // Lista de pistas
    const playlist = [
        "audio/Halo 2 Soundtrack - Peril.mp3",
        "audio/Música De Fondo Para Videos Y Presentaciones Corporativas I Deeper por e-soundtrax.mp3",
        "audio/Relaxing Jazz Music.mp3", // Agrega más pistas si lo deseas
    ];

    let currentTrackIndex = 0;

    // Función para cargar y reproducir la pista actual
    function playCurrentTrack() {
        music.src = playlist[currentTrackIndex];
        music.play().catch((error) => {
            console.error("Error al reproducir música:", error);
        });
        musicToggle.textContent = "Silenciar Música 🔇";
    }

    // Cambiar a la pista anterior
    prevButton.addEventListener("click", () => {
        currentTrackIndex =
            (currentTrackIndex - 1 + playlist.length) % playlist.length; // Retrocede y reinicia si es necesario
        playCurrentTrack();
    });

    // Cambiar a la pista siguiente
    nextButton.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Avanza y reinicia si es necesario
        playCurrentTrack();
    });

    // Control del botón de reproducción/pausa
    musicToggle.addEventListener("click", () => {
        if (music.paused) {
            playCurrentTrack();
        } else {
            music.pause();
            musicToggle.textContent = "Activar Música 🎵";
        }
    });

    // Cambiar automáticamente a la siguiente pista al terminar la actual
    music.addEventListener("ended", () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        playCurrentTrack();
    });

    // Estado inicial
    playCurrentTrack();
});

