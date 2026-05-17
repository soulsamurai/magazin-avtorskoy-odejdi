/* Логика корзины — работа с localStorage */

const Cart = {
  // Ключ хранилища
  STORAGE_KEY: "atelier_cart",

  // Получить содержимое корзины
  getItems() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Сохранить корзину
  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateCounter();
  },

  // Добавить товар (если такой id+size есть — увеличить количество)
  addItem(product, size = "M", qty = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id && i.size === size);

    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        quantity: qty,
        image: product.image
      });
    }

    this.saveItems(items);
    this.showNotification(product.name);
  },

  // Удалить позицию по индексу
  removeItem(index) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveItems(items);
  },

  // Изменить количество
  updateQuantity(index, newQty) {
    const items = this.getItems();
    if (newQty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = newQty;
    }
    this.saveItems(items);
  },

  // Очистить корзину
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCounter();
  },

  // Общее количество товаров
  getTotalCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  // Общая сумма
  getTotalPrice() {
    return this.getItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // Обновить счётчик в шапке
  updateCounter() {
    const counters = document.querySelectorAll(".cart-counter");
    const count = this.getTotalCount();
    counters.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  },

  // Уведомление при добавлении
  showNotification(name) {
    // Удалить предыдущее уведомление
    const old = document.getElementById("cart-notification");
    if (old) old.remove();

    const notif = document.createElement("div");
    notif.id = "cart-notification";
    notif.className = "fixed top-20 right-4 bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-xl z-[9999] transition-all duration-300 transform translate-x-0 flex items-center gap-2";
    notif.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span>${name} добавлен в корзину</span>
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.style.opacity = "0";
      notif.style.transform = "translateX(100px)";
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  }
};

// Инициализация счётчика при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  Cart.updateCounter();
});
