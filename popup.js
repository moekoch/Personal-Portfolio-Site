/* popup.js — Contact Modal */

const modal    = document.getElementById('contactModal');
const openBtn  = document.getElementById('openModal');
const closeBtn = document.querySelector('.close-btn');

if (openBtn) {
  openBtn.onclick = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };
}

if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Handle modal form submit
const modalSubmit = document.querySelector('.modal-content .btn-primary');
if (modalSubmit) {
  modalSubmit.addEventListener('click', () => {
    const inputs = modal.querySelectorAll('input, textarea');
    const allFilled = [...inputs].every(i => i.value.trim() !== '');
    if (!allFilled) {
      inputs.forEach(i => {
        if (!i.value.trim()) i.style.borderColor = '#c0392b';
      });
      return;
    }
    modalSubmit.textContent = '✓ Sent!';
    modalSubmit.style.background = '#4CAF50';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      modalSubmit.textContent = 'Send Message';
      modalSubmit.style.background = '';
      inputs.forEach(i => i.value = '');
    }, 2000);
  });
}
