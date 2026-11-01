/* ═══════════════════════════════════════════════════════
   HIGH VIEW RESORT — JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Navbar scroll effect ────────────────────────────
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ── Mobile navigation toggle ────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll for anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Scroll-reveal animations ────────────────────────
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to elements we want to animate
  const animateSelectors = [
    '.about-text',
    '.about-images',
    '.room-card',
    '.amenity-card',
    '.gallery-item',
    '.testimonial-card',
    '.contact-card',
    '.booking-wrapper',
    '.section-title',
    '.section-label'
  ];

  animateSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  });

  // ── Active nav link highlighting ────────────────────
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Booking form handling ───────────────────────────
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    // Update checkout min when checkin changes
    checkinInput.addEventListener('change', () => {
      const checkinDate = new Date(checkinInput.value);
      checkinDate.setDate(checkinDate.getDate() + 1);
      const minCheckout = checkinDate.toISOString().split('T')[0];
      checkoutInput.setAttribute('min', minCheckout);

      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = minCheckout;
      }
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      // Simple validation feedback
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = '✓ Request Sent!';
      submitBtn.style.background = '#2d6a5a';
      submitBtn.style.borderColor = '#2d6a5a';
      submitBtn.style.color = '#fff';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        bookingForm.reset();
      }, 3000);

      console.log('Booking request:', data);
    });
  }

  // ── Newsletter form handling ────────────────────────
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = '✓ Subscribed!';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        emailInput.value = '';
      }, 3000);
    });
  }

  // ── Parallax effect on hero (subtle) ────────────────
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
      }
    }, { passive: true });
  }
});
