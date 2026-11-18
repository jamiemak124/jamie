const menu = document.querySelector('.menu');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (!menu?.open) return;
  const clickedMenuLink = event.target.closest('.menu nav a');
  if (clickedMenuLink || !menu.contains(event.target)) menu.open = false;
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const galleries = document.querySelectorAll('.gallery');
if (galleries.length && typeof HTMLDialogElement !== 'undefined') {
  const lightbox = document.createElement('dialog');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-label', 'Project photographs');
  lightbox.innerHTML = '<img alt=""><div class="lightbox-controls"><button type="button" aria-label="Previous photograph">←</button><button type="button">Close</button><button type="button" aria-label="Next photograph">→</button></div>';
  document.body.append(lightbox);
  const image = lightbox.querySelector('img');
  const [previous, close, next] = lightbox.querySelectorAll('button');
  let collection = [];
  let position = 0;

  function show(index) {
    position = (index + collection.length) % collection.length;
    const link = collection[position];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    previous.hidden = next.hidden = collection.length < 2;
  }

  for (const gallery of galleries) {
    gallery.addEventListener('click', event => {
      const link = event.target.closest('a[data-gallery]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      collection = [...gallery.querySelectorAll('a[data-gallery]')];
      show(collection.indexOf(link));
      lightbox.showModal();
      close.focus();
    });
  }
  previous.addEventListener('click', () => show(position - 1));
  next.addEventListener('click', () => show(position + 1));
  close.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(position - 1);
    if (event.key === 'ArrowRight') show(position + 1);
  });
}

const form = document.querySelector('#contact-form');
if (form) {
  const method = form.elements.preferred_contact;
  const phone = form.elements.phone;
  function syncPhoneRequirement() {
    phone.required = method.value === 'Phone call' || method.value === 'WhatsApp';
  }
  method.addEventListener('change', syncPhoneRequirement);
  syncPhoneRequirement();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = form.querySelector('[role="status"]');
    const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));
    status.textContent = 'Sending your enquiry…';
    button.disabled = true;
    try {
      const url = new URL(form.action);
      url.pathname = '/ajax' + url.pathname;
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(18000)
      });
      const result = await response.json();
      if (!response.ok || ![true, 'true'].includes(result.success) || /activat|confirm your email/i.test(result.message || '')) {
        throw new Error('Form delivery could not be confirmed');
      }
      status.textContent = 'Thanks for submitting. We’ll get back to you soon!';
      form.reset();
      syncPhoneRequirement();
    } catch {
      status.textContent = 'We couldn’t send the enquiry. Please try again or email info@decor-republic.com.';
    } finally {
      button.disabled = false;
    }
  });
}
