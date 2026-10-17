(function () {
  // Пути к трём изображениям сертификатов. Поправьте под свои файлы.
  const slides = [
    { src: 'img/certificate_1.jpg', alt: 'Диплом специалиста 1' },
    { src: 'img/certificate_2.jpg', alt: 'Диплом специалиста 2' },
    { src: 'img/certificate_3.jpg', alt: 'Диплом специалиста 3' },
  ];

  const AUTOPLAY_MS = 3000; // 0 — выключить автопрокрутку

  const certificate = document.querySelector('.achievements_certificate');
  const leftArrow   = document.querySelector('.slide_left--img');
  const rightArrow  = document.querySelector('.slide_right--img');
  const leftBlock   = leftArrow.closest('.block_slide');
  const rightBlock  = rightArrow.closest('.block_slide');
  const dots        = [...document.querySelectorAll('.pagination')];

  let index = 0;      // текущий слайд, от 0 до slides.length - 1
  let timer = null;

  // Отрисовать состояние: картинку, стрелки и точки — под текущий index
  function render() {
    const slide = slides[index];
    certificate.src = slide.src;
    certificate.alt = slide.alt;

    const hasPrev = index > 0;
    const hasNext = index < slides.length - 1;

    // Стрелка активна (кликабельна), только если есть куда листать
    leftBlock.classList.toggle('block_slide--active', hasPrev);
    leftArrow.classList.toggle('slide_img--active', hasPrev);

    rightBlock.classList.toggle('block_slide--active', hasNext);
    rightArrow.classList.toggle('slide_img--active', hasNext);

    // Точка пагинации подсвечивается у текущего слайда
    dots.forEach((dot, i) => dot.classList.toggle('pagination_active', i === index));
  }

  // Переключение по стрелкам и точкам: упирается в 0 и в последний слайд
  function goTo(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    render();
  }

  // Переключение автопрокруткой: зацикливается, после последнего — снова первый
  function goToLoop(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  leftBlock.addEventListener('click', () => {
    if (index === 0) return; // на первом слайде стрелка неактивна
    goTo(index - 1);
    restartAutoplay();
  });

  rightBlock.addEventListener('click', () => {
    if (index === slides.length - 1) return; // на последнем стрелка неактивна
    goTo(index + 1);
    restartAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === index) return;
      goTo(i);
      restartAutoplay();
    });
  });

  function startAutoplay() {
    if (!AUTOPLAY_MS) return;
    stopAutoplay();
    timer = setInterval(() => goToLoop(index + 1), AUTOPLAY_MS);
  }
  function stopAutoplay() {
    clearInterval(timer);
  }
  function restartAutoplay() {
    startAutoplay(); // клик по стрелке/точке сбрасывает таймер, чтобы не листало сразу следом
  }

  // Пауза при наведении на весь блок слайдера (картинка + стрелки + точки)
  const sliderBlock = document.querySelector('.achievements_slider');
  sliderBlock.addEventListener('mouseenter', stopAutoplay);
  sliderBlock.addEventListener('mouseleave', startAutoplay);

  render();
  startAutoplay();
})();
