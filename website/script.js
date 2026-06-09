/* ===== BabyBear · interactions ===== */

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Subtle scroll reveal
const toReveal = document.querySelectorAll('.statement, .block, .gallery, .enroll');
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
