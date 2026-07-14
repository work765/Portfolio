// Anthony Zettner — Portfolio interactions
// No build step, no dependencies — deploys as-is.

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Work category filtering
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.work-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('show', match);
    });
  });
});

// ---------- Lightbox ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxSlate = document.getElementById('lightboxSlate');
const lightboxCat = document.getElementById('lightboxCat');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function visibleWorkCards() {
  // Only cards currently shown (respects active category filter) and not placeholders
  return Array.from(document.querySelectorAll('.work-card.show:not(.placeholder)'));
}

function openLightbox(card) {
  const items = visibleWorkCards();
  currentIndex = items.indexOf(card);
  if (currentIndex === -1) return;
  showLightboxItem();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem() {
  const items = visibleWorkCards();
  if (!items.length) return;
  if (currentIndex < 0) currentIndex = items.length - 1;
  if (currentIndex >= items.length) currentIndex = 0;

  const card = items[currentIndex];
  const img = card.querySelector('img');
  const slate = card.querySelector('.slate');
  const cat = card.querySelector('.cat');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightboxSlate.textContent = slate ? slate.textContent : '';
  lightboxCat.textContent = cat ? cat.textContent : '';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

cards.forEach(card => {
  if (card.classList.contains('placeholder')) return;
  card.addEventListener('click', () => openLightbox(card));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => { currentIndex--; showLightboxItem(); });
lightboxNext.addEventListener('click', () => { currentIndex++; showLightboxItem(); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex--; showLightboxItem(); }
  if (e.key === 'ArrowRight') { currentIndex++; showLightboxItem(); }
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
