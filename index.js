// Вибір кольору
// Вибір кольору
const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay'); // Елемент для відображення кольору
let selectedColor = '#FFFFFF'; // Початковий колір
colorPicker.addEventListener('change', (event) => {
    selectedColor = event.target.value;
    colorDisplay.style.backgroundColor = selectedColor; // Оновлення блоку з вибраним кольором
});

// Функція для переходу в повноекранний режим
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

// Перехід у режим повного екрану
const fullscreenBtn = document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click', () => {
    openFullscreen(colorDisplay); // Відкриваємо контейнер з кольором на весь екран
});

// Вихід з повного екрану за допомогою клавіші Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Завантаження зображення
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageWidthInput = document.getElementById('imageWidth');
const imageHeightInput = document.getElementById('imageHeight');

downloadBtn.addEventListener('click', () => {
    const width = parseInt(imageWidthInput.value) || 800; // Default width if not specified
    const height = parseInt(imageHeightInput.value) || 600; // Default height if not specified

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'color_image.png';
    link.href = image;
    link.click();
});
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        if (targetElement) {
            const position = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});
let lastScrollTop = 0; // Зберігає позицію останньої прокрутки

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Прокрутка вниз
        document.querySelector('.navbar').classList.add('navbar-hidden');
    } else {
        // Прокрутка вгору
        document.querySelector('.navbar').classList.remove('navbar-hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Оновлюємо позицію останньої прокрутки
}, false);
// Ensure this code is linked in your HTML or included in a <script> tag
emailjs.init("ptm7U6Uga1DoTxg09"); // Replace with your actual user ID from EmailJS

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_dn1y1q6', 'template_x9kggbo', form)
      .then(function() {
        console.log('SUCCESS!');
        alert('Ваше повідомлення було відправлене!');
      }, function(error) {
        console.log('FAILED...', error);
        alert('Виникла помилка при відправленні: ' + JSON.stringify(error));
      });
  });
});
