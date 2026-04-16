// ============================
// CARRUSEL CLIENTES
// ============================
const carruselClientes = document.querySelector('.carrusel:not(.admin-carrusel)');
const slides = carruselClientes.querySelectorAll('.slide');
const prev = carruselClientes.querySelector('.prev');
const next = carruselClientes.querySelector('.next');

let index = 0;

function mostrarSlide(i) {
  slides.forEach(slide => slide.classList.remove('activo'));
  slides[i].classList.add('activo');
}

// Mostrar el primero al cargar
mostrarSlide(index);

next.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
});

prev.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  mostrarSlide(index);
});


// ============================
// CARRUSEL ADMIN
// ============================
const carruselAdmin = document.querySelector('.admin-carrusel');
const slidesAdmin = carruselAdmin.querySelectorAll('.slide');
const nextAdmin = carruselAdmin.querySelector('.next-admin');
const prevAdmin = carruselAdmin.querySelector('.prev-admin');

let indexAdmin = 0;

function mostrarSlideAdmin(i) {
  slidesAdmin.forEach(slide => slide.classList.remove('activo-admin'));
  slidesAdmin[i].classList.add('activo-admin');
}

// Mostrar el primero al cargar
mostrarSlideAdmin(indexAdmin);

nextAdmin.addEventListener('click', () => {
  indexAdmin = (indexAdmin + 1) % slidesAdmin.length;
  mostrarSlideAdmin(indexAdmin);
});

prevAdmin.addEventListener('click', () => {
  indexAdmin = (indexAdmin - 1 + slidesAdmin.length) % slidesAdmin.length;
  mostrarSlideAdmin(indexAdmin);
});