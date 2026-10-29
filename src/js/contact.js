// Turns the contact form into a prefilled mailto: link.
// Nothing is sent through the website; the visitor's mail client does the sending.
const form = document.getElementById('contact-form');
const error = document.getElementById('cf-error');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !message) {
      error.classList.remove('hidden');
      (name ? form.elements.message : form.elements.name).focus();
      return;
    }
    error.classList.add('hidden');

    const lines = [message, '', `Name: ${name}`];
    if (phone) lines.push(`Telefon: ${phone}`);

    const subject = 'Anfrage über die Website';
    const body = lines.join('\r\n');
    window.location.href =
      `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
