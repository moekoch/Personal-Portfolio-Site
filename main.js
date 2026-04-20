/* main.js — Morgan Koch Portfolio */

// ===== DARK MODE =====
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

// Apply saved theme immediately
if (localStorage.getItem('theme') === 'dark') body.classList.add('dark');

function updateIcon() {
  if (!themeToggle) return;
  themeToggle.innerHTML = body.classList.contains('dark')
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}
updateIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateIcon();
  });
}

// ===== HEADER SCROLL SHADOW =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.fade-up, .fade-in');
if (reveals.length) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => revealObserver.observe(el));
}

// ===== ACTIVE NAV LINK =====
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('header nav a, #mobileNav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ===== PROJECT FILTER (projects.html only) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-lg');

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          card.style.display = show ? '' : 'none';
          if (show) setTimeout(() => { card.style.opacity = '1'; }, 20);
        }, 150);
      });
    });
  });
}

// ===== CONTACT FORM FEEDBACK =====
const contactForms = document.querySelectorAll('form.contact-form-el');
contactForms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
});
