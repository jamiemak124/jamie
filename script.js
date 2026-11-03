const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open navigation');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Project enquiry — ${data.get('inquiry')}`);
  const body = encodeURIComponent(`Name: ${data.get('firstName')} ${data.get('lastName')}\nEmail: ${data.get('email')}\n\nProject details:\n${data.get('message')}`);
  window.location.href = `mailto:info@decor-republic.com?subject=${subject}&body=${body}`;
});
