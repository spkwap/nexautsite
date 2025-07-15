import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

async function loadPartial(id, url) {
  const container = document.getElementById(id)
  if (container) {
    const res = await fetch(url)
    const html = await res.text()
    container.innerHTML = html
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('header-container', '/partials/header.html')
  await loadPartial('footer-container', '/partials/footer.html')

  requestAnimationFrame(() => {
    setupNavbarLogic()
    setupMobileMenuCloseOnClick()
    setActiveNavItem()
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

  if (intro) {
    setTimeout(() => hideIntro(), 3000)
    window.addEventListener('wheel', hideIntro, { once: true })
    window.addEventListener('touchstart', hideIntro, { once: true })
  } else {
    mainContent?.style.setProperty('display', 'block')
    setTimeout(() => {
      mainContent?.classList.add('visible')
      AOS.init({ duration: 1000, once: true })
    }, 50)
  }
})

function setupNavbarLogic() {
  const logo = document.getElementById('logo')
  const nav = document.getElementById('nav-full')
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY

    if (scrollY > 50) {
      logo?.classList.add('h-10')
      logo?.classList.remove('h-20')
      nav?.classList.add('hidden')
      hamburger?.classList.remove('hidden')
    } else {
      logo?.classList.add('h-20')
      logo?.classList.remove('h-10')
      nav?.classList.remove('hidden')
      hamburger?.classList.add('hidden')
      mobileMenu?.classList.add('hidden')
    }
  })

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }
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
        (currentPath === '/' && href === '/index.html') ||
        (currentPath === '/index.html' && href === '/index.html') ||
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
  document.body.style.visibility = "visible";
});

lucide.createIcons();
