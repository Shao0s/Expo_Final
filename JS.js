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
let index = 0;

function mostrarSlide(i) {
    const slides = document.querySelectorAll('.carrusel:not(.admin-carrusel) .slide');
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('activo'));
    slides[i].classList.add('activo');
}

function initializeClientCarousel() {
    const carruselClientes = document.querySelector('.carrusel:not(.admin-carrusel)');
    if (!carruselClientes) return;

    const slides = carruselClientes.querySelectorAll('.slide');
    if (!slides.length) return;

    const prev = carruselClientes.querySelector('.prev');
    const next = carruselClientes.querySelector('.next');

    mostrarSlide(index);

    if (next) {
        next.onclick = () => {
            index = (index + 1) % slides.length;
            mostrarSlide(index);
        };
    }

    if (prev) {
        prev.onclick = () => {
            index = (index - 1 + slides.length) % slides.length;
            mostrarSlide(index);
        };
    }
}

// ============================
// CARRUSEL ADMIN
// ============================
let indexAdmin = 0;

function mostrarSlideAdmin(i) {
    const slidesAdmin = document.querySelectorAll('.admin-carrusel .slide');
    if (!slidesAdmin.length) return;
    slidesAdmin.forEach(slide => slide.classList.remove('activo-admin'));
    slidesAdmin[i].classList.add('activo-admin');
}

function initializeAdminCarousel() {
    const carruselAdmin = document.querySelector('.admin-carrusel');
    if (!carruselAdmin) return;

    const slidesAdmin = carruselAdmin.querySelectorAll('.slide');
    if (!slidesAdmin.length) return;

    const nextAdmin = carruselAdmin.querySelector('.next-admin');
    const prevAdmin = carruselAdmin.querySelector('.prev-admin');

    mostrarSlideAdmin(indexAdmin);

    if (nextAdmin) {
        nextAdmin.onclick = () => {
            indexAdmin = (indexAdmin + 1) % slidesAdmin.length;
            mostrarSlideAdmin(indexAdmin);
        };
    }

    if (prevAdmin) {
        prevAdmin.onclick = () => {
            indexAdmin = (indexAdmin - 1 + slidesAdmin.length) % slidesAdmin.length;
            mostrarSlideAdmin(indexAdmin);
        };
    }
}

// Función para reinicializar carruseles
function reinitializeCarousels() {
    initializeClientCarousel();
    initializeAdminCarousel();
}

// Inicializar carruseles al cargar
reinitializeCarousels();