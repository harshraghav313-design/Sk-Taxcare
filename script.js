// SK TaxCare - frontend interactions
// IMPORTANT: This is a frontend-only starter. Enquiries and status checks need a secure backend.
// Do not store real customer enquiries, passwords or private data in browser localStorage.

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Service cards preselect the relevant category in the enquiry form.
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const serviceSelect = document.querySelector('#enquiryForm select[name="service"]');
      if (serviceSelect) serviceSelect.value = link.dataset.service;
    });
  });

  // Frontend validation only. No data is transmitted or saved at this stage.
  const enquiryForm = document.getElementById('enquiryForm');
  const formMessage = document.getElementById('formMessage');
  enquiryForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    formMessage.className = 'form-message';
    formMessage.textContent = 'The website design is ready, but secure enquiry submission is not connected yet. Backend and database setup is required before accepting real customer enquiries.';
  });

  const trackForm = document.getElementById('trackForm');
  const trackMessage = document.getElementById('trackMessage');
  trackForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!trackForm.reportValidity()) return;
    trackMessage.className = 'form-message';
    trackMessage.textContent = 'Status tracking is not connected yet. It will work after the secure database and backend are configured.';
  });
});
