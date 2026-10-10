// Screenshot gallery of the project pages: tabs with arrow keys, and an automatic slideshow
// that stops as soon as the visitor picks a screenshot.
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('.gallery[data-tabs]').forEach((gallery) => {
  const tabs = [...gallery.querySelectorAll<HTMLButtonElement>('.shot-btn')];
  const images = [...gallery.querySelectorAll<HTMLImageElement>('.screen img')];
  let current = 0;
  let timer = 0;

  const show = (i: number, focus = false) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((tab, k) => {
      const on = k === current;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      images[k]?.classList.toggle('on', on);
    });
    if (focus) tabs[current].focus();
  };

  const stopAuto = () => {
    window.clearInterval(timer);
    timer = 0;
    gallery.classList.remove('auto');
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      stopAuto();
      show(i);
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      stopAuto();
      show(current + (e.key === 'ArrowRight' ? 1 : -1), true);
    });
  });

  if (still.matches) {
    gallery.classList.remove('auto');
  } else {
    timer = window.setInterval(() => show(current + 1), 6000);
  }
});

// a module, not a global script: its names stay private
export {};
