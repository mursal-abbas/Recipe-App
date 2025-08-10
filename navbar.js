const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  navLinks.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  navLinks.classList.add('hidden');
  overlay.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('#nav-links li');
  navItems.forEach(item => {
    item.classList.remove('active-link');
    const anchor = item.querySelector('a');
    if (anchor.getAttribute('href') === currentPage) {
      item.classList.add('active-link');
    }
  });
});