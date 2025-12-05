
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector('[data-filter-wrapper="leverandor"]');
  if (!wrapper) return;

  const buttons = wrapper.querySelectorAll('[data-filter-btn]');
  const allBtn  = wrapper.querySelector('[data-filter-all]');
  const cards   = Array.from(wrapper.querySelectorAll('[data-filter-card]'));
  const PAGE_SIZE = parseInt(wrapper.getAttribute("data-page-size"), 10) || 24;

  let activeFilters = new Set();
  let loadedCount   = PAGE_SIZE;

  // --- 1. Cache kategorier per kort ---
  cards.forEach(card => {
    const cats = Array.from(card.querySelectorAll('[data-filter-category]'))
      .map(el => el.textContent.trim().toLowerCase())
      .filter(Boolean);

    card.dataset.categories = cats.join("|");
  });

  // --- 2. Match-funksjon ---
  function matchesFilters(card) {
    if (activeFilters.size === 0) return true; // ingen filtre → alt vises
    const cats = (card.dataset.categories || "").split("|");
    return cats.some(cat => activeFilters.has(cat));
  }

  // --- 3. Oppdater knappestiler ---
  function updateButtonStyles() {
    buttons.forEach(btn => {
      if (btn === allBtn) {
        btn.classList.toggle("is-active", activeFilters.size === 0);
      } else {
        const label = btn.textContent.trim().toLowerCase();
        btn.classList.toggle("is-active", activeFilters.has(label));
      }
    });
  }

  // --- 4. Vis kort basert på scroll-progress ---
  function applyFilterAndRender() {
    const visibleCards = cards.filter(card => matchesFilters(card));

    // skjul alle først
    cards.forEach(card => card.classList.add("is-hidden"));

    // vis kun "loadedCount" av matchende kort
    visibleCards.slice(0, loadedCount).forEach(card => {
      card.classList.remove("is-hidden");
    });
  }

  // --- 5. Klikk på kategori-knapper ---
  buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (btn === allBtn) {
        activeFilters.clear(); // reset alt
      } else {
        const label = btn.textContent.trim().toLowerCase();
        if (activeFilters.has(label)) {
          activeFilters.delete(label);
        } else {
          activeFilters.add(label);
        }
      }

      // reset "paginering" ved nytt filter
      loadedCount = PAGE_SIZE;

      updateButtonStyles();
      applyFilterAndRender();
    });
  });

  // --- 6. Infinite scroll ---
  function isNearBottom() {
    const scrollTop      = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const fullHeight     = document.documentElement.scrollHeight || document.body.scrollHeight;

    return scrollTop + viewportHeight >= fullHeight - 200;
  }

  window.addEventListener("scroll", function () {
    if (!isNearBottom()) return;

    loadedCount += PAGE_SIZE;
    applyFilterAndRender();
  });

  // --- 7. Initial load ---
  updateButtonStyles();
  applyFilterAndRender();
});
