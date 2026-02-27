// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Active navigation link on scroll
const sections = [...document.querySelectorAll('main section[id]')];
const updateActiveLink = () => {
  let current = 'home';

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Fade-in animation on scroll using Intersection Observer
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

faders.forEach((el) => observer.observe(el));

// Basic contact form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    let isValid = true;

    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    if (!message.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      isValid = false;
    } else if (message.value.trim().length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      isValid = false;
    } else {
      messageError.textContent = '';
    }

    if (!isValid) {
      formStatus.textContent = 'Please fix the errors above and try again.';
      return;
    }

    formStatus.textContent = 'Thanks! Your message has been validated successfully.';
    contactForm.reset();
  });
}
