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

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelector('#contact-form')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('[role="status"]');
  const submit = form.querySelector('button[type="submit"]');
  const values = Object.fromEntries(new FormData(form).entries());

  status.textContent = 'Sending your enquiry…';
  submit.disabled = true;

  try {
    const response = await fetch('https://formsubmit.co/ajax/info@decor-republic.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const result = await response.json();

    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error(result.message || 'The enquiry could not be sent.');
    }

    form.reset();
    status.textContent = 'Thanks — your enquiry has been sent. The studio will reply using your preferred contact method.';
  } catch (error) {
    status.textContent = 'We couldn’t send your enquiry just now. Please try again or email info@decor-republic.com.';
  } finally {
    submit.disabled = false;
  }
});

