// DOM Elements
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const authModal = document.getElementById('authModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSubmitBtn = document.getElementById('modalSubmitBtn');

// Open Mobile Menu
if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });
}

// Close mobile menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    // Active state
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Modal Helpers
function openModal(mode = 'signup') {
  if (!authModal) return;
  if (mode === 'login') {
    modalTitle.textContent = 'Welcome Back to Chatter';
    modalDesc.textContent = 'Enter your credentials to continue reading and writing.';
    modalSubmitBtn.textContent = 'Log In';
  } else {
    modalTitle.textContent = 'Join Chatter Today';
    modalDesc.textContent = 'Create an account to unleash the power of your words.';
    modalSubmitBtn.textContent = 'Sign Up';
  }
  authModal.classList.add('active');
  authModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!authModal) return;
  authModal.classList.remove('active');
  authModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Modal Event Listeners
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authModal && authModal.classList.contains('active')) {
    closeModal();
  }
});

// Connect buttons to modal
const loginButtons = ['loginBtn', 'mobileLoginBtn'];
loginButtons.forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('login');
    });
  }
});

const signupButtons = ['signupBtn', 'mobileSignupBtn'];
signupButtons.forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('signup');
    });
  }
});

// All other CTA buttons
document.querySelectorAll('a[href="#signup"]').forEach((btn) => {
  if (!btn.id) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('signup');
    });
  }
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
