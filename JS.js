// ============================
// NAVEGACIÓN POR SECCIONES
// ============================
const navLinks = document.querySelectorAll('.navbar-fixed a[data-section]');
const sections = document.querySelectorAll('.section-item');

// Función para cambiar de sección (disponible globalmente)
window.showSection = function(sectionId) {
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.remove('activa');
    });

    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('activa');
    }

    // Actualizar el link activo en la nav
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });

    // Reiniciar carruseles si existen en esta sección
    setTimeout(() => {
        reinitializeCarousels();
    }, 100);
};

// Event listeners para los links del nav
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// Mostrar la primera sección por defecto
if (navLinks.length > 0) {
    showSection(navLinks[0].dataset.section);
}

// ============================
// CARRUSEL CLIENTES
// ============================
let unifiedIndex = 0;

function mostrarSlide(i) {
    const slides = document.querySelectorAll('.carrusel .slide');
    const title = document.getElementById('interface-title');
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove('activo'));
    slides[i].classList.add('activo');

    // Actualizar título dinámicamente basado en data-type
    if (title && slides[i].dataset.type) {
        title.textContent = slides[i].dataset.type + " Interfaces";
    }
}

function initializeUnifiedCarousel() {
    const carrusel = document.querySelector('.carrusel');
    if (!carrusel) return;

    const slides = carrusel.querySelectorAll('.slide');
    if (!slides.length) return;

    const prev = carrusel.querySelector('.prev');
    const next = carrusel.querySelector('.next');

    mostrarSlide(unifiedIndex);

    if (next) {
        next.onclick = () => {
            unifiedIndex = (unifiedIndex + 1) % slides.length;
            mostrarSlide(unifiedIndex);
        };
    }

    if (prev) {
        prev.onclick = () => {
            unifiedIndex = (unifiedIndex - 1 + slides.length) % slides.length;
            mostrarSlide(unifiedIndex);
        };
    }
}

// Función para reinicializar carruseles
function reinitializeCarousels() {
    initializeUnifiedCarousel();
}

// Inicializar carruseles al cargar
reinitializeCarousels();