/* Общая логика: создание карточек, навигация, утилиты */

// Форматирование цены
function formatPrice(price) {
  return price.toLocaleString("ru-RU") + " ₽";
}

// Создание HTML-карточки товара
function createProductCard(product, compact = false) {
  const card = document.createElement("div");
  card.className = "product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group";
  card.setAttribute("data-category", product.category);

  card.innerHTML = `
    <a href="product.html?id=${product.id}" class="block overflow-hidden aspect-[3/4] relative">
      <img src="${product.image}" alt="${product.name}"
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           loading="lazy"
           onerror="this.src='https://via.placeholder.com/400x500/e5e7eb/9ca3af?text=Фото'">
      <span class="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2.5 py-1 rounded-full text-gray-600 backdrop-blur-sm">
        ${CATEGORY_NAMES[product.category] || product.category}
      </span>
    </a>
    <div class="p-4">
      <a href="product.html?id=${product.id}" class="block">
        <h3 class="font-semibold text-gray-900 text-lg mb-1 hover:text-emerald-700 transition-colors">${product.name}</h3>
      </a>
      ${!compact ? `<p class="text-gray-500 text-sm mb-3 line-clamp-2">${product.description.split('.')[0]}.</p>` : ''}
      <div class="flex items-center justify-between mt-2">
        <span class="text-xl font-bold text-gray-900">${formatPrice(product.price)}</span>
        <button onclick="addToCartFromCatalog(${product.id})"
                class="add-to-cart-btn bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-lg transition-colors"
                title="В корзину">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  return card;
}

// Добавление в корзину из каталога (размер по умолчанию M)
function addToCartFromCatalog(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (product) {
    Cart.addItem(product, "M");
  }
}

// Мобильное меню
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
}

// Определить текущую страницу для подсветки в навигации
function highlightCurrentPage() {
  const path = window.location.pathname;
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (path.endsWith(href) || (path.endsWith("/") && href === "index.html")) {
      link.classList.add("text-emerald-700", "font-semibold");
    }
  });
}

// Общая инициализация
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  highlightCurrentPage();
});
