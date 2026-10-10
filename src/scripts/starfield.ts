// Starfield drawn on the canvas of every element with [data-starfield]: three layers of stars
// that twinkle and drift, a shooting star now and then, and (with data-parallax) a slight shift
// that follows the pointer together with the orbital system of the home page.
// It only runs while its section is on screen and the page is visible.
const still = window.matchMedia('(prefers-reduced-motion: reduce)');

const layers = [
  { density: 1 / 5200, rMin: 0.35, rMax: 0.9, aMin: 0.25, aMax: 0.6, depth: 8, drift: 0.0045 },
  { density: 1 / 12000, rMin: 0.7, rMax: 1.25, aMin: 0.45, aMax: 0.85, depth: 18, drift: 0.009 },
  { density: 1 / 38000, rMin: 1.1, rMax: 1.85, aMin: 0.7, aMax: 1, depth: 34, drift: 0.016 },
];
const tints = ['238,241,255', '238,241,255', '238,241,255', '168,198,255', '204,184,255'];

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  ph: number;
  sp: number;
  li: number;
  c: string;
}

interface Shot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t0: number;
}

function starfield(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>('canvas.starfield');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  let w = 0;
  let h = 0;
  let stars: Star[] = [];
  let raf = 0;
  let inView = false;
  let px = 0;
  let py = 0;
  let ex = 0;
  let ey = 0;
  let shot: Shot | null = null;
  let nextShot = performance.now() + 3500;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas!.clientWidth;
    h = canvas!.clientHeight;
    if (!w || !h) return;
    canvas!.width = Math.round(w * dpr);
    canvas!.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = [];
    layers.forEach((layer, li) => {
      const n = Math.round(w * h * layer.density);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer.rMin + Math.random() * (layer.rMax - layer.rMin),
          a: layer.aMin + Math.random() * (layer.aMax - layer.aMin),
          ph: Math.random() * 6.283,
          sp: 0.4 + Math.random() * 1.4,
          li,
          c: tints[(Math.random() * tints.length) | 0],
        });
      }
    });
    draw(performance.now());
  }

  function draw(t: number) {
    const c = ctx!;
    c.clearRect(0, 0, w, h);
    const calm = still.matches;
    ex += (px - ex) * 0.06;
    ey += (py - ey) * 0.06;
    for (const s of stars) {
      const layer = layers[s.li];
      let x = s.x - ex * layer.depth + (calm ? 0 : t * layer.drift * 0.05);
      let y = s.y - ey * layer.depth;
      x = ((x % w) + w) % w;
      y = ((y % h) + h) % h;
      const twinkle = calm ? 1 : 0.7 + 0.3 * Math.sin(t * 0.0012 * s.sp + s.ph);
      c.fillStyle = `rgb(${s.c})`;
      c.globalAlpha = s.a * twinkle;
      c.beginPath();
      c.arc(x, y, s.r, 0, 6.283);
      c.fill();
      if (s.r > 1.45) {
        c.globalAlpha = s.a * twinkle * 0.16;
        c.beginPath();
        c.arc(x, y, s.r * 3.4, 0, 6.283);
        c.fill();
      }
    }
    if (!calm) {
      if (!shot && t > nextShot) {
        shot = { x: w * (0.25 + Math.random() * 0.65), y: h * Math.random() * 0.35, vx: -(0.5 + Math.random() * 0.3), vy: 0.2 + Math.random() * 0.12, t0: t };
      }
      if (shot) {
        const age = t - shot.t0;
        const k = age / 1100;
        const hx = shot.x + shot.vx * age;
        const hy = shot.y + shot.vy * age;
        const tx = hx - shot.vx * 150;
        const ty = hy - shot.vy * 150;
        const g = c.createLinearGradient(hx, hy, tx, ty);
        g.addColorStop(0, `rgba(238,241,255,${(Math.max(0, 1 - k) * 0.85).toFixed(3)})`);
        g.addColorStop(1, 'rgba(238,241,255,0)');
        c.globalAlpha = 1;
        c.strokeStyle = g;
        c.lineWidth = 1.1;
        c.beginPath();
        c.moveTo(hx, hy);
        c.lineTo(tx, ty);
        c.stroke();
        if (k >= 1) {
          shot = null;
          nextShot = t + 6000 + Math.random() * 8000;
        }
      }
    }
    c.globalAlpha = 1;
  }

  const frame = (t: number) => {
    draw(t);
    raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (!raf && !still.matches && !document.hidden && inView) raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) start();
    else stop();
  }).observe(host);
  still.addEventListener('change', () => {
    stop();
    draw(performance.now());
    start();
  });
  new ResizeObserver(resize).observe(canvas);

  if (host.hasAttribute('data-parallax')) {
    const system = host.querySelector<HTMLElement>('.system');
    host.addEventListener('pointermove', (e) => {
      if (still.matches || e.pointerType === 'touch') return;
      const r = host.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      system?.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
      system?.style.setProperty('--rx', `${(py * -5).toFixed(2)}deg`);
    });
    host.addEventListener('pointerleave', () => {
      px = py = 0;
      system?.style.setProperty('--ry', '0deg');
      system?.style.setProperty('--rx', '0deg');
    });
  }
}

document.querySelectorAll<HTMLElement>('[data-starfield]').forEach(starfield);

// a module, not a global script: its names stay private
export {};
