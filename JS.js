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

const colorToggle = document.getElementById('color-toggle');
const colorPanel = document.getElementById('color-panel');
const colorClose = document.getElementById('color-close');
const colorPicker = document.getElementById('color-picker');
const satSlider = document.getElementById('sat-slider');
const lumSlider = document.getElementById('lum-slider');
const satValue = document.getElementById('sat-value');
const lumValue = document.getElementById('lum-value');

function hexToRgb(hex) {
    const normalized = hex.replace('#', '');
    const full = normalized.length === 3 ? normalized.split('').map(c => c + c).join('') : normalized;
    const int = parseInt(full, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));
        switch (max) {
            case r: h = ((g - b) / delta + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / delta + 2); break;
            case b: h = ((r - g) / delta + 4); break;
        }
        h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function updateColorSettings() {
    if (!colorPicker || !satSlider || !lumSlider) return;
    const [h] = rgbToHsl(...hexToRgb(colorPicker.value));
    const s = Number(satSlider.value);
    const l = Number(lumSlider.value);
    const glowLight = Math.min(l + 35, 95);
    const bubbleMid = Math.min(l + 18, 90);
    const shadowLight = Math.max(l - 38, 15);
    const glowLightStrong = Math.min(l + 45, 95);

    satValue.textContent = `${s}%`;
    lumValue.textContent = `${l}%`;

    document.documentElement.style.setProperty('--glow-1', `hsla(${h}, ${s}%, ${glowLight}%, 0.18)`);
    document.documentElement.style.setProperty('--glow-2', `hsla(${h}, ${s}%, ${Math.min(l + 20, 95)}%, 0.12)`);
    document.documentElement.style.setProperty('--glow-3', `hsla(${h}, ${s}%, ${Math.min(l + 10, 95)}%, 0.05)`);
    document.documentElement.style.setProperty('--bubble-light', `hsla(${h}, ${s}%, ${Math.min(l + 45, 95)}%, 0.95)`);
    document.documentElement.style.setProperty('--bubble-mid', `hsla(${h}, ${s}%, ${bubbleMid}%, 0.44)`);
    document.documentElement.style.setProperty('--bubble-shadow', `hsla(${h}, ${s}%, ${shadowLight}%, 0.18)`);
    document.documentElement.style.setProperty('--bubble-glow', `hsla(${h}, ${s}%, ${glowLightStrong}%, 0.2)`);

    // Mejoramos la visibilidad del cambio en el fondo
    const bgS = Math.min(s, 25); // Mantener saturación baja en el fondo para legibilidad
    const bgL = Math.max(l - 35, 4); // Ajustamos el brillo del fondo basado en el slider
    
    document.documentElement.style.setProperty('--bg-start', `hsla(${h}, ${bgS}%, ${bgL + 6}%, 1)`);
    document.documentElement.style.setProperty('--bg-mid', `hsla(${h}, ${bgS}%, ${bgL + 3}%, 1)`);
    document.documentElement.style.setProperty('--bg-end', `hsla(${h}, ${bgS}%, ${bgL}%, 1)`);
}

function openColorPanel() {
    if (!colorPanel || !colorToggle) return;
    colorPanel.removeAttribute('hidden');
    colorToggle.setAttribute('aria-expanded', 'true');
}

function closeColorPanel() {
    if (!colorPanel || !colorToggle) return;
    colorPanel.setAttribute('hidden', '');
    colorToggle.setAttribute('aria-expanded', 'false');
}

if (colorToggle && colorPanel) {
    colorToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = colorPanel.hidden;
        if (shouldOpen) {
            openColorPanel();
        } else {
            closeColorPanel();
        }
    });
}

if (colorClose) {
    colorClose.addEventListener('click', (event) => {
        event.stopPropagation();
        closeColorPanel();
    });
}

document.addEventListener('click', (event) => {
    if (!colorPanel || colorPanel.hidden) return;
    const target = event.target;
    if (target instanceof Node && colorPanel.contains(target)) return;
    if (colorToggle && colorToggle.contains(target)) return;
    closeColorPanel();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeColorPanel();
    }
});

if (colorPicker) {
    colorPicker.addEventListener('input', updateColorSettings);
}

if (satSlider) {
    satSlider.addEventListener('input', updateColorSettings);
}

if (lumSlider) {
    lumSlider.addEventListener('input', updateColorSettings);
}

updateColorSettings();

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
// NAVEGACIÓN CON TECLADO
// ============================

document.addEventListener("keydown", (e) => {
    const activeLink = document.querySelector(".navbar-fixed a.active");
    if (!activeLink) return;

    const linksArray = Array.from(navLinks);
    let currentIndex = linksArray.indexOf(activeLink);

    // Flecha derecha o abajo → ↓
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();

        let nextIndex = (currentIndex + 1) % linksArray.length;
        const nextSection = linksArray[nextIndex].dataset.section;

        showSection(nextSection);
    }

    // Flecha izquierda o arriba ← ↑
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();

        let prevIndex = (currentIndex - 1 + linksArray.length) % linksArray.length;
        const prevSection = linksArray[prevIndex].dataset.section;

        showSection(prevSection);
    }
});

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