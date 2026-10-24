let currentIndex = 0;
let totalSlides = document.querySelectorAll('.slide-container').length;
let autoSlideInterval;

const slides = document.querySelectorAll('.slide-container');

// Функция для отображения слайда
function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');

    const prevIndex = (index - 1 + totalSlides) % totalSlides;
    const prevImgSrc = slides[prevIndex].querySelector('img')?.src || '';
    
    const activeBg = slides[index].querySelector('.blurred-bg');
    if (activeBg) {
        activeBg.style.backgroundImage = `url(${prevImgSrc})`;
    }
}

// Функция автоматической смены слайда
function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Сброс таймера автоматической смены слайдов
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000); // интервал 5 секунд
}

// Инициализация слайдера
showSlide(currentIndex);
resetAutoSlide();

// Обнаружение свайпа для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

const sliderElement = document.querySelector('.slider');

sliderElement.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderElement.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        currentIndex = (currentIndex + 1) % totalSlides;
    } else if (touchEndX > touchStartX) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    showSlide(currentIndex);
    resetAutoSlide();
}
