import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { pl } from './lang/pl.js';
import { en } from './lang/en.js';
import { de } from './lang/de.js';

export const translations = { pl, en, de };
// Ustaw język i ukryj body przed tłumaczeniem
const earlyLang = localStorage.getItem('language') || (navigator.language.startsWith('de') ? 'de' : navigator.language.startsWith('en') ? 'en' : 'pl');
document.documentElement.setAttribute('lang', earlyLang);
document.documentElement.classList.add(`lang-${earlyLang}`);
// document.body.style.visibility = 'hidden';



async function loadPartial(id, url) {
  const container = document.getElementById(id);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    const html = await res.text();
    container.innerHTML = html;

    const currentLang = localStorage.getItem('language') || getBrowserLanguage();
    applyTranslations(currentLang);
  } catch (err) {
    console.error('Error loading partial:', err);
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('header-container', './partials/header.html')
  await loadPartial('footer-container', './partials/footer.html')
  setupLanguageSwitcher()

  requestAnimationFrame(() => {
    setupNavbarLogic?.()
    setupMobileMenuCloseOnClick?.()
    setActiveNavItem?.()
  })
})


function setupNavbarLogic() {
  const logo = document.getElementById('logo')
  const header = document.getElementById('header')
  const nav = document.getElementById('nav-full')
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')

  function updateNavbarBySize() {
    const screenWidth = window.innerWidth
    const scrollY = window.scrollY

    if (screenWidth < 768) {
        nav?.classList.add('hidden')
        hamburger?.classList.remove('hidden')
    } else {
      // Duży ekran
      if (scrollY > 50) {
        logo?.classList.add('h-10')
        logo?.classList.remove('h-22')
        header?.classList.add('h-16')
        header?.classList.remove('h-20')
        nav?.classList.add('hidden')
        hamburger?.classList.remove('hidden')
      } else {
        logo?.classList.add('h-22')
        logo?.classList.remove('h-10')
        header?.classList.add('h-20')
        header?.classList.remove('h-16')

        nav?.classList.remove('hidden')
        hamburger?.classList.add('hidden')
        mobileMenu?.classList.add('hidden')
      }
    }
  }

  let rafId = null;
  function scheduleUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateNavbarBySize();
      rafId = null;
    });
  }

  window.addEventListener('resize', scheduleUpdate, { passive: true })
  window.addEventListener('scroll', scheduleUpdate, { passive: true })

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }

  updateNavbarBySize()
}


function setupMobileMenuCloseOnClick() {
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')

  document.addEventListener('click', (e) => {
    const target = e.target
    if (
      mobileMenu &&
      hamburger &&
      !mobileMenu.classList.contains('hidden') &&
      !mobileMenu.contains(target) &&
      !hamburger.contains(target)
    ) {
      mobileMenu.classList.add('hidden')
    }
  })
}

// NOWA FUNKCJA: Podświetlanie aktywnej strony w menu
function setActiveNavItem() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-link')
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    
    // Sprawdzamy czy aktualny path pasuje do linku
    if (href === currentPath || 
        (currentPath === '/' && href === './index.html') ||
        (currentPath === './index.html' && href === './index.html') ||
        (currentPath.endsWith(href.substring(1)))) {
      
      link.classList.add('active')
      
      // Specjalne traktowanie dla domku (SVG)
      const svg = link.querySelector('svg')
      if (svg) {
        svg.classList.add('text-white')
      }
    } else {
      link.classList.remove('active')
      
      // Usuwamy podświetlenie z SVG
      const svg = link.querySelector('svg')
      if (svg) {
        svg.classList.remove('text-white')
      }
    }
  })
}

// Accessible slider logic: updates ARIA states and supports keyboard
const slides = document.querySelectorAll('.slider-slide');
const tabs = document.querySelectorAll('.slider-dot');
let currentIndex = 0;
let timer;

function updateAriaStates(index) {
  slides.forEach((slide, i) => {
    const hidden = i === index ? 'false' : 'true';
    slide.style.opacity = i === index ? '1' : '0';
    slide.setAttribute('aria-hidden', hidden);
  });

  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.setAttribute('tabindex', selected ? '0' : '-1');
    tab.classList.toggle('opacity-100', selected);
    tab.classList.toggle('opacity-50', !selected);
  });
  currentIndex = index;
}

function showSlide(index) {
  if (!slides.length) return;
  const idx = ((index % slides.length) + slides.length) % slides.length;
  updateAriaStates(idx);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function startSlider() {
  stopSlider();
  timer = setInterval(nextSlide, 3000);
}

function stopSlider() {
  if (timer) clearInterval(timer);
}


document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0 && tabs.length > 0) {
    // initialize attributes
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.dataset.index = tab.dataset.index ?? i;
      tab.addEventListener('click', () => {
        stopSlider();
        showSlide(Number(tab.dataset.index));
        startSlider();
      });
    });

    slides.forEach((slide, i) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
      slide.setAttribute('aria-labelledby', `tab-${i}`);
      slide.id = slide.id || `slide-${i}`;
    });

    // Ensure tabs have ids and link to panels
    tabs.forEach((tab, i) => {
      tab.id = tab.id || `tab-${i}`;
      tab.setAttribute('aria-controls', `slide-${i}`);
    });

    showSlide(currentIndex);
    startSlider();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.display = 'block';
    mainContent.classList.add('visible');
  }

  const currentLang = localStorage.getItem('language') || getBrowserLanguage();
  applyTranslations(currentLang);
  updatePartnerLinks(currentLang);
  // document.body.style.visibility = "visible";
  AOS.init({ duration: 1000, once: true });

  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
});


// Cosmos background with reduced intensity on mobile
const canvas = document.getElementById('cosmos');
if (canvas) {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const numStars = isMobile ? 24 : 90;
    const tailLength = isMobile ? 24 : 60;
    const motionFactor = isMobile ? 0.04 : 0.3;
    const baseAlpha = isMobile ? 0.45 : 0.22;
    const fillAlpha = isMobile ? 0.8 : 0.55;
    const stars = [];
    let mouseX = 0.5;
    let mouseY = 0.5;

    function setCanvasSize() {
      const dpi = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpi, dpi);
    }

    setCanvasSize();

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.z = Math.random() * window.innerWidth;
        this.speed = (isMobile ? 0.11 : 0.27) + Math.random() * (isMobile ? 0.04 : 0.03);
        this.prevX = this.x;
        this.prevY = this.y;
        this.hue = 0;
        this.colorShift = Math.random() < 0.1;
      }
      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.reset();
          return;
        }
        const sx = (this.x / this.z) * window.innerWidth;
        const sy = (this.y / this.z) * window.innerHeight;
        this.prevX = sx;
        this.prevY = sy;
        if (this.colorShift && Math.random() < 0.01) {
          this.hue = (this.hue + 60) % 360;
        }
        if (sx < 0 || sx > window.innerWidth || sy < 0 || sy > window.innerHeight) {
          this.reset();
        }
      }
      draw() {
        const sx = (this.x / this.z) * window.innerWidth;
        const sy = (this.y / this.z) * window.innerHeight;
        const radius = (1 - this.z / window.innerWidth) * 2;

        let dx = sx - this.prevX;
        let dy = sy - this.prevY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let prevXAdj = this.prevX;
        let prevYAdj = this.prevY;

        if (dist > tailLength) {
          const ratio = tailLength / dist;
          prevXAdj = sx - dx * ratio;
          prevYAdj = sy - dy * ratio;
        }

        const alpha = baseAlpha * (1 - this.z / window.innerWidth);
        const strokeColor = this.colorShift ? `hsla(${this.hue}, 80%, 80%, ${alpha})` : `rgba(255,255,255,${alpha})`;
        const fillColor = this.colorShift ? `hsla(${this.hue}, 80%, 80%, ${fillAlpha})` : `rgba(255,255,255,${fillAlpha})`;

        ctx.beginPath();
        ctx.moveTo(prevXAdj, prevYAdj);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = radius;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
    }

    function createStars() {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    }

    createStars();

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, isMobile ? '#03060a' : '#06090d');
      gradient.addColorStop(0.6, isMobile ? '#07101b' : '#0b1016');
      gradient.addColorStop(1, isMobile ? '#02040a' : '#04060a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const glow = ctx.createRadialGradient(
        window.innerWidth * 0.5,
        window.innerHeight * 0.2,
        0,
        window.innerWidth * 0.5,
        window.innerHeight * 0.2,
        window.innerWidth * 0.45
      );
      glow.addColorStop(0, isMobile ? 'rgba(129, 245, 251, 0.15)' : 'rgba(129, 245, 251, 0.08)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function animate() {
      drawBackground();
      stars.forEach(star => {
        star.x += (mouseX - 0.5) * motionFactor;
        star.y += (mouseY - 0.5) * motionFactor;
        star.update();
        star.draw();
      });
      if (!prefersReducedMotion) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });

    window.addEventListener('deviceorientation', e => {
      if (e.gamma != null && e.beta != null) {
        mouseX = (e.gamma + 90) / 180;
        mouseY = (e.beta + 90) / 180;
      }
    });

    window.addEventListener('resize', () => {
      setCanvasSize();
      createStars();
    });
  }
}



function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('en')) return 'en';
  return 'pl';
}

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  applyTranslations(lang);
  updatePartnerLinks(lang);
}


function setupLanguageSwitcher() {
  const savedLang = localStorage.getItem('language') || getBrowserLanguage();
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
}

const partnerLinks = {
  pl: {
    zf: "https://www.zf.com/poland/pl/home/home.html",
    audi: "https://www.audi.pl/pl/",
    valeo: "https://www.valeo.com/pl/polska/",
    stellantis: "https://www.stellantis.com/en",
    vw: "https://www.volkswagen.pl/pl.html"
  },
  en: {
    zf: "https://www.zf.com/poland/en/home/home.html",
    audi: "https://www.audi.com/en.html",
    valeo: "https://www.valeo.com/en/",
    stellantis: "https://www.stellantis.com/en",
    vw: "https://www.vw.com"
  },
  de: {
    zf: "https://www.zf.com/poland/en/home/home.html",
    audi: "https://www.audi.de/de/",
    valeo: "https://www.valeo.com/de/",
    stellantis: "https://www.stellantis.com/en",
    vw: "https://www.volkswagen.de"
  }
};

function updatePartnerLinks(lang) {
  document.querySelectorAll('[data-lang-link]').forEach(el => {
    const key = el.getAttribute('data-lang-link');
    if (partnerLinks[lang] && partnerLinks[lang][key]) {
      el.href = partnerLinks[lang][key];
    }
  });
}

