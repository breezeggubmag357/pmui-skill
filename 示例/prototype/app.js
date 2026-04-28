window.AppState = {
  // === 核心导航状态 ===
  currentPage: 'home',
  pageStack: ['home'],
  params: {},

  // === 业务状态 ===
  user: {},
  currentTab: 0,
  searchKeyword: '',
  selectedCategory: '全部',
  cartItems: [],
  cartCheckAll: true,
  orderTab: '全部',
  addressTab: '全部',

  // === 初始化 ===
  init() {
    this.user = { ...window.AppData.currentUser };
    this.cartItems = window.AppData.cartItems.map(ci => ({ ...ci }));
    this.render();
  },

  // === 导航方法 ===
  navigateTo(page, params) {
    this.params = params || {};
    this.currentPage = page;
    this.pageStack.push(page);
    this.render();
  },

  goBack() {
    if (this.pageStack.length > 1) {
      this.pageStack.pop();
      this.currentPage = this.pageStack[this.pageStack.length - 1];
      this.render();
    }
  },

  switchTab(tab) {
    this.currentPage = tab;
    this.pageStack = [tab];
    this.params = {};
    this.currentTab = ['home', 'category', 'cart', 'mine'].indexOf(tab);
    this.render();
  },

  // === 渲染入口 ===
  render() {
    document.getElementById('phoneScreen').innerHTML = window.AppUI.render();
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === this.currentPage);
    });
  },

  // === 搜索 ===
  setSearch(keyword) {
    this.searchKeyword = keyword;
    this.render();
  },

  // === 分类筛选 ===
  setCategory(cat) {
    this.selectedCategory = cat;
    this.render();
  },

  // === 购物车操作 ===
  toggleCartCheck(id) {
    const item = this.cartItems.find(c => c.id === id);
    if (item) item.checked = !item.checked;
    this.cartCheckAll = this.cartItems.every(c => c.checked);
    this.render();
  },

  toggleCartCheckAll() {
    this.cartCheckAll = !this.cartCheckAll;
    this.cartItems.forEach(c => c.checked = this.cartCheckAll);
    this.render();
  },

  changeCartQty(id, delta) {
    const item = this.cartItems.find(c => c.id === id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      this.render();
    }
  },

  removeCartItem(id) {
    this.cartItems = this.cartItems.filter(c => c.id !== id);
    this.render();
  },

  getCartTotal() {
    const D = window.AppData;
    return this.cartItems.filter(c => c.checked).reduce((sum, ci) => {
      const p = D.products.find(x => x.id === ci.productId);
      return sum + (p ? p.price * ci.quantity : 0);
    }, 0);
  },

  getCartCount() {
    return this.cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  },

  // === 收藏操作 ===
  toggleFavorite(productId) {
    const idx = window.AppData.favorites.indexOf(productId);
    if (idx >= 0) {
      window.AppData.favorites.splice(idx, 1);
      window.AppUI.showToast('已取消收藏');
    } else {
      window.AppData.favorites.push(productId);
      window.AppUI.showToast('已收藏');
    }
    this.render();
  },

  isFavorite(productId) {
    return window.AppData.favorites.includes(productId);
  },

  // === 订单Tab ===
  setOrderTab(tab) {
    this.orderTab = tab;
    this.render();
  },

  // === 地址Tab ===
  setAddressTab(tab) {
    this.addressTab = tab;
    this.render();
  },

  // === Toast ===
  showToast(msg) {
    window.AppUI.showToast(msg);
  }
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => AppState.init());
