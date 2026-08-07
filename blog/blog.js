import { POSTS } from './posts.js';

const POSTS_PER_PAGE = 6; // Dokładnie 4 wpisy na stronę

export function renderBlog(currentLang = 'pl') {
  const gridContainer = document.getElementById('blog-grid');
  const paginationContainer = document.getElementById('pagination');
  const sidebarContainer = document.getElementById('sidebar-latest');

  if (!gridContainer) return;

  // 1. Pobieramy numer strony z URL (?page=1, ?page=2)
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('page')) || 1;

  const totalPages = Math.ceil(POSTS.length / POSTS_PER_PAGE);
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  // 2. Wycinamy max 4 wpisy dla wybranej strony
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // 3. Renderujemy kafelki na stronie głównej bloga
  gridContainer.innerHTML = currentPosts.map(post => `
    <article class="bg-black/60 border border-[#81f5fb]/30 rounded-2xl overflow-hidden backdrop-blur-md hover:border-[#81f5fb]/60 transition duration-300 flex flex-col shadow-xl group">
      <a href="/blog/${post.slug}/" class="block overflow-hidden relative h-48 bg-gray-900">
        <img src="${post.image}" alt="${post.title[currentLang] || post.title.pl}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100" />
      </a>
      <div class="p-6 flex flex-col flex-grow">
        <span class="text-xs font-mono text-[#81f5fb] mb-2 block">${post.date}</span>
        <h2 class="text-xl font-bold text-white mb-3 group-hover:text-[#81f5fb] transition">
          <a href="/blog/${post.slug}/">${post.title[currentLang] || post.title.pl}</a>
        </h2>
        <p class="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
          ${post.excerpt[currentLang] || post.excerpt.pl}
        </p>
        <div>
          <a href="/blog/${post.slug}/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#81f5fb]/40 bg-[#81f5fb]/10 text-[#81f5fb] font-mono text-sm hover:bg-[#81f5fb] hover:text-black transition-all">
            <span data-i18n="blog_read_more">Przeczytaj więcej</span> <span class="text-base">›</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // 4. Renderujemy automatyczne numery stron na dole
  if (totalPages > 1 && paginationContainer) {
    let paginationHTML = '';

    if (currentPage > 1) {
      paginationHTML += `<a href="/blog/?page=${currentPage - 1}" class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#81f5fb]/20 bg-black/40 text-gray-400 hover:text-[#81f5fb] hover:border-[#81f5fb]/50 transition">«</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHTML += `<span class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#81f5fb] bg-[#81f5fb]/20 text-[#81f5fb] font-bold">${i}</span>`;
      } else {
        paginationHTML += `<a href="/blog/?page=${i}" class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#81f5fb]/20 bg-black/40 text-gray-400 hover:text-[#81f5fb] hover:border-[#81f5fb]/50 transition">${i}</a>`;
      }
    }

    if (currentPage < totalPages) {
      paginationHTML += `<a href="/blog/?page=${currentPage + 1}" class="w-10 h-10 flex items-center justify-center rounded-lg border border-[#81f5fb]/20 bg-black/40 text-gray-400 hover:text-[#81f5fb] hover:border-[#81f5fb]/50 transition">»</a>`;
    }

    paginationContainer.innerHTML = paginationHTML;
  } else if (paginationContainer) {
    paginationContainer.innerHTML = '';
  }

  // 5. Renderujemy lewy panel "Najnowsze wpisy" (3 najbardziej aktualne)
  if (sidebarContainer) {
    sidebarContainer.innerHTML = POSTS.slice(0, 3).map(post => `
      <li>
        <a href="/blog/${post.slug}/" class="group block">
          <span class="text-xs text-gray-400 block mb-1">${post.date}</span>
          <h3 class="text-sm font-medium text-gray-200 group-hover:text-[#81f5fb] transition line-clamp-2">
            ${post.title[currentLang] || post.title.pl}
          </h3>
        </a>
      </li>
    `).join('<hr class="border-white/10 my-3" />');
  }
}