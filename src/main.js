import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { pl } from './lang/pl.js';
import { en } from './lang/en.js';
import { de } from './lang/de.js';

export const translations = { pl, en, de };
// Ustaw język i ukryj body przed tłumaczeniem
const earlyLang = localStorage.getItem('language') || (navigator.language.startsWith('de') ? 'de' : navigator.language.startsWith('en') ? 'en' : 'pl');
document.documentElement.setAttribute('lang', earlyLang);
document.documentElement.classList.add(`lang-${earlyLang}`);
document.body.style.visibility = 'hidden';



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


  const intro = document.getElementById('intro')
  const mainContent = document.getElementById('main-content')
  const logostart = document.querySelector('.logo-intro')
  let alreadyHidden = false

  if (logostart && logostart.complete) {
    startLogoAnimation()
  } else if (logostart) {
    logostart.addEventListener('load', startLogoAnimation)
  }

  function startLogoAnimation() {
    logostart.style.visibility = 'visible'
    logostart.classList.add('fade-in-anim')
  }

  function hideIntro() {
    if (alreadyHidden) return
    alreadyHidden = true

    logostart?.classList.add('fade-out')

    logostart?.addEventListener(
      'animationend',
      () => {
        intro?.style.setProperty('display', 'none')
        mainContent?.style.setProperty('display', 'block')

        setTimeout(() => {
          mainContent?.classList.add('visible')
          AOS.init({ duration: 1000, once: true })
        }, 50)
      },
      { once: true }
    )
  }

  const hasSeenIntro = sessionStorage.getItem('introSeen') === 'true'

if (intro && !hasSeenIntro) {
  setTimeout(() => {
    hideIntro()
    sessionStorage.setItem('introSeen', 'true')
  }, 3000)

  window.addEventListener('wheel', () => {
    hideIntro()
    sessionStorage.setItem('introSeen', 'true')
  }, { once: true })

  window.addEventListener('touchstart', () => {
    hideIntro()
    sessionStorage.setItem('introSeen', 'true')
  }, { once: true })

} else {
  intro?.style.setProperty('display', 'none')
  mainContent?.style.setProperty('display', 'block')
  setTimeout(() => {
    mainContent?.classList.add('visible')
    AOS.init({ duration: 1000, once: true })
  }, 50)
}

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

  window.addEventListener('resize', updateNavbarBySize)
  window.addEventListener('scroll', updateNavbarBySize)

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

// Slider logic
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentIndex = 0;
let timer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('opacity-100', i === index);
    dot.classList.toggle('opacity-50', i !== index);
  });
  currentIndex = index;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function startSlider() {
  timer = setInterval(nextSlide, 3000);
}

function stopSlider() {
  clearInterval(timer);
}

document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0 && dots.length > 0) {
    showSlide(currentIndex);
    startSlider();

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopSlider();
        showSlide(+dot.dataset.index);
        startSlider();
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem('language') || getBrowserLanguage();
  applyTranslations(currentLang);
  updatePartnerLinks(currentLang);
  document.body.style.visibility = "visible";
});


lucide.createIcons();


// Cosmos background
const canvas = document.getElementById('cosmos');
if (canvas) {
  const ctx = canvas.getContext('2d');

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

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const numStars = isMobile ? 50 : 100;
  const tailLength = 75;
  const stars = [];
  let mouseX = 0.5, mouseY = 0.5;

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.z = Math.random() * window.innerWidth;
      this.speed = Math.random() * 0.27 + 0.03;
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
        let ratio = tailLength / dist;
        prevXAdj = sx - dx * ratio;
        prevYAdj = sy - dy * ratio;
      }

      const alpha = 0.2 * (1 - this.z / window.innerWidth);
      const fillAlpha = 0.5;

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

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach(star => {
      star.x += (mouseX - 0.5) * 0.5;
      star.y += (mouseY - 0.5) * 0.5;
      star.update();
      star.draw();
    });
    requestAnimationFrame(animate);
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

