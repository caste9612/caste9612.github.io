// Behaviour shared by every page: header, mobile menu, typed role line, scroll reveal,
// and pausing the CSS animations of whatever is off screen.
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const header = document.querySelector<HTMLElement>('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menu = header.querySelector<HTMLButtonElement>('.menu-btn');
  const close = () => {
    header.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  };
  menu?.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('open')) {
      close();
      menu?.focus();
    }
  });
}

// The role line is typed out character by character; screen readers get the full text.
const role = document.querySelector<HTMLElement>('.role[data-type]');
if (role && !still.matches) {
  const text = role.textContent ?? '';
  const typed = document.createElement('span');
  typed.className = 'typed';
  typed.setAttribute('aria-hidden', 'true');
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch;
    s.style.setProperty('--i', String(i));
    typed.append(s);
  });
  const sr = document.createElement('span');
  sr.className = 'sr';
  sr.textContent = text;
  role.replaceChildren(sr, typed);
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  reveals.forEach((el) => reveal.observe(el));

  const offscreen = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-off', !e.isIntersecting)),
    { rootMargin: '80px' },
  );
  document.querySelectorAll('[data-animated]').forEach((el) => offscreen.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// a module, not a global script: its names stay private
export {};
