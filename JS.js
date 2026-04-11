const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function mostrarSlide(i) {
  slides.forEach(slide => slide.classList.remove('activo'));
  slides[i].classList.add('activo');
}

next.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
});

prev.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  mostrarSlide(index);
});