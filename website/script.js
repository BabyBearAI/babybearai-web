/* ===== BabyBear · interactions ===== */

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Nav: transparent over hero, solid once scrolled
const nav = document.getElementById('nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Parallax — translate background layers slower than scroll (desktop only)
const layers = [...document.querySelectorAll('[data-parallax]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canParallax = layers.length && !reduceMotion && window.matchMedia('(min-width: 880px)').matches;
if (canParallax) {
  let ticking = false;
  const render = () => {
    const vh = window.innerHeight;
    for (const el of layers) {
      const sec = el.parentElement;
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue; // skip off-screen
      const fromCenter = (r.top + r.height / 2) - vh / 2;
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      el.style.transform = `translate3d(0, ${(-fromCenter * speed).toFixed(1)}px, 0)`;
    }
    ticking = false;
  };
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
  render();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue, { passive: true });
}

// Subtle scroll reveal
const toReveal = document.querySelectorAll('.statement, .block, .stats, .banner-inner, .gallery, .enroll');
toReveal.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
toReveal.forEach(el => io.observe(el));

// Enrollment form — static site, so we compose a pre-filled email to the camp.
const form = document.getElementById('enrollForm');
const note = document.getElementById('formNote');
form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = new FormData(form);
  const parent = (f.get('parent') || '').toString().trim();
  const email = (f.get('email') || '').toString().trim();

  if (!parent || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = '请填写姓名和有效邮箱 · Please add your name and a valid email.';
    note.className = 'form-note err';
    return;
  }

  const lines = [
    '您好 BabyBear 小熊夏令营！我想为孩子报名。',
    '',
    `家长 Parent: ${parent}`,
    `邮箱 Email: ${email}`,
    `孩子 Child: ${f.get('child') || '-'}`,
    `意向主题周 Weeks: ${f.get('weeks') || '-'}`,
    `留言 Message: ${f.get('message') || '-'}`,
  ];
  const subject = encodeURIComponent(`BabyBear 报名意向 / Enrollment — ${parent}`);
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:hello@babybearai.com?subject=${subject}&body=${body}`;

  note.textContent = '正在为你打开邮件 · Opening your email app — 也欢迎直接来信 hello@babybearai.com';
  note.className = 'form-note ok';
  form.reset();
});
