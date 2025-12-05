// Featured slider with drag, snapping and manual visible slides

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector('[data-slider="featured"]');
  if (!slider) return;

  const track  = slider.querySelector('[data-slider-track]') || slider;
  const slides = Array.from(track.querySelectorAll('[data-slider-slide]'));
  if (slides.length === 0) return;

  const parent  = slider.parentElement || document;
  const prevBtn = parent.querySelector('[data-slider-prev]');
  const nextBtn = parent.querySelector('[data-slider-next]');

  // Kan settes manuelt på slider: data-slides-visible="4"
  const visibleAttr = parseInt(slider.getAttribute("data-slides-visible"), 10);
  let SLIDES_VISIBLE = isNaN(visibleAttr) ? null : visibleAttr;

  let currentIndex = 0;
  let step = 0; // px vi flytter per "klikk"

  function updateStep() {
    const trackWidth = track.getBoundingClientRect().width;

    // Finn faktisk avstand mellom første og andre slide (inkl. gap/margin)
    if (slides.length > 1) {
      step = slides[1].offsetLeft - slides[0].offsetLeft;
    } else {
      step = trackWidth;
    }

    if (step <= 0) {
      // fallback hvis noe rart skjer
      step = slides[0].getBoundingClientRect().width;
    }

    // Hvis du ikke har satt data-slides-visible selv, beregner vi det
    if (SLIDES_VISIBLE == null) {
      SLIDES_VISIBLE = Math.max(1, Math.floor(trackWidth / step));
    }

    // sørg for at vi ikke går forbi siste kort
    currentIndex = Math.min(
      currentIndex,
      Math.max(slides.length - SLIDES_VISIBLE, 0)
    );

    goToSlide(currentIndex, false);
  }

  function clamp(index) {
    const maxIndex = Math.max(slides.length - SLIDES_VISIBLE, 0);
    if (index < 0) return 0;
    if (index > maxIndex) return maxIndex;
    return index;
  }

  function goToSlide(index, animate = true) {
    currentIndex = clamp(index);

    track.style.transition = animate ? "transform 0.3s ease" : "none";

    const offset = -currentIndex * step;
    track.style.transform = `translateX(${offset}px)`;

    slides.forEach((s, i) => {
      s.classList.toggle(
        "is-active",
        i >= currentIndex && i < currentIndex + SLIDES_VISIBLE
      );
    });
  }

  // Init
  updateStep();
  window.addEventListener("load", updateStep);
  window.addEventListener("resize", updateStep);

  // Piler
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    });
  }

  // Drag / swipe
  let isDown = false;
  let startX = 0;
  let startIndex = 0;

  track.addEventListener("mousedown", function (e) {
    isDown = true;
    startX = e.clientX;
    startIndex = currentIndex;
    track.style.transition = "none";
    e.preventDefault();
  });

  document.addEventListener("mouseup", function (e) {
    if (!isDown) return;
    isDown = false;
    const delta = e.clientX - startX;
    const moved = Math.round(-delta / step);
    goToSlide(startIndex + moved, true);
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    const delta = e.clientX - startX;
    const offset = -(startIndex * step) + delta;
    track.style.transform = `translateX(${offset}px)`;
  });

  track.addEventListener("touchstart", function (e) {
    const t = e.touches[0];
    isDown = true;
    startX = t.clientX;
    startIndex = currentIndex;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", function (e) {
    if (!isDown) return;
    const t = e.touches[0];
    const delta = t.clientX - startX;
    const offset = -(startIndex * step) + delta;
    track.style.transform = `translateX(${offset}px)`;
  });

  track.addEventListener("touchend", function (e) {
    if (!isDown) return;
    isDown = false;
    const t = e.changedTouches[0];
    const delta = t.clientX - startX;
    const moved = Math.round(-delta / step);
    goToSlide(startIndex + moved, true);
  });
});
