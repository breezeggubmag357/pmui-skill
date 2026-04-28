window.AppUI = {
  // ==================== 主渲染入口 ====================
  render() {
    switch (AppState.currentPage) {
      case 'home': return this.renderHome();
      case 'search': return this.renderSearch();
      case 'category': return this.renderCategory();
      case 'productDetail': return this.renderProductDetail();
      case 'productReviews': return this.renderProductReviews();
      case 'cart': return this.renderCart();
      case 'confirmOrder': return this.renderConfirmOrder();
      case 'payResult': return this.renderPayResult();
      case 'mine': return this.renderMine();
      case 'orderList': return this.renderOrderList();
      case 'orderDetail': return this.renderOrderDetail();
      case 'addressList': return this.renderAddressList();
      case 'addressEdit': return this.renderAddressEdit();
      case 'couponList': return this.renderCouponList();
      case 'favorites': return this.renderFavorites();
      case 'login': return this.renderLogin();
      case 'flashSale': return this.renderFlashSale();
      default: return this.renderStatusBar() + '<div class="empty-state"><div class="empty-icon">🚧</div><div class="empty-text">页面开发中</div></div>';
    }
  },

  // ==================== 公共组件 ====================
  renderStatusBar(dark) {
    var color = dark ? '#fff' : '#333';
    return '<div class="status-bar" style="color:' + color + ';background:' + (dark ? 'transparent;position:absolute;left:0;right:0;width:100%;z-index:10' : '#fff') + '"><span>9:41</span><span style="display:flex;gap:4px;align-items:center">··· 📶 🔋</span></div>';
  },

  renderNavBar(title, showBack, dark) {
    var bg = dark ? 'transparent;position:absolute;z-index:10;color:#fff' : '#fff';
    var back = showBack ? '<div class="nav-bar-back" style="color:' + (dark ? '#fff' : '#333') + '" onclick="AppState.goBack()">&#8249;</div>' : '<div class="nav-bar-back"></div>';
    return '<div class="nav-bar" style="background:' + bg + '"><div class="nav-bar-back" style="width:32px">' + (showBack ? '<span style="font-size:22px;cursor:pointer;color:' + (dark ? '#fff' : '#333') + '" onclick="AppState.goBack()">&#8249;</span>' : '') + '</div><div class="nav-bar-title" style="color:' + (dark ? '#fff' : '#333') + '">' + title + '</div><div class="nav-bar-right"></div></div>';
  },

  renderTabBar(activeIndex) {
    var tabs = [
      { icon: '🏠', label: '首页', page: 'home' },
      { icon: '📂', label: '分类', page: 'category' },
      { icon: '🛒', label: '购物车', page: 'cart' },
      { icon: '👤', label: '我的', page: 'mine' }
    ];
    var badge = AppState.getCartCount();
    return '<div class="tab-bar">' + tabs.map(function(t, i) {
      var active = i === activeIndex;
      var badgeHtml = (t.page === 'cart' && badge > 0) ? '<span class="cart-badge">' + badge + '</span>' : '';
      return '<div class="tab-item' + (active ? ' active' : '') + '" onclick="AppState.switchTab(\'' + t.page + '\')"><div class="tab-icon" style="position:relative">' + t.icon + badgeHtml + '</div><div>' + t.label + '</div></div>';
    }).join('') + '</div>';
  },

  showToast(msg) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.getElementById('phoneScreen').appendChild(el);
    setTimeout(function() { el.remove(); }, 1500);
  },

  // ==================== 首页 ====================
  renderHome() {
    var D = window.AppData;
    var html = this.renderStatusBar(true);
    // 搜索栏
    html += '<div style="padding-top:44px;padding-left:16px;padding-right:16px;padding-bottom:8px;background:#FF6B6B"><div style="background:#fff;border-radius:20px;padding:8px 16px;display:flex;align-items:center;gap:8px;cursor:pointer" onclick="AppState.navigateTo(&#39;search&#39;)"><span style="color:#999">🔍</span><span style="color:#999;font-size:13px">搜索商品</span></div></div>';
    html += '<div class="page-content" style="background:#f5f5f5">';
    // 轮播图
    html += '<div style="padding:12px"><div style="height:150px;border-radius:12px;background:linear-gradient(135deg,' + D.banners[0].color + ',' + D.banners[0].color + 'cc);padding:24px;display:flex;flex-direction:column;justify-content:center;color:#fff"><div style="font-size:22px;font-weight:700">' + D.banners[0].title + '</div><div style="font-size:14px;margin-top:6px;opacity:0.9">' + D.banners[0].subtitle + '</div><div style="margin-top:12px;display:inline-block;background:rgba(255,255,255,0.25);padding:4px 16px;border-radius:14px;font-size:12px">立即抢购 →</div></div></div>';
    // 快捷入口
    html += '<div class="card"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">';
    D.quickLinks.forEach(function(q) {
      html += '<div style="text-align:center;cursor:pointer" onclick="AppState.navigateTo(\'' + q.page + '\')"><div style="font-size:28px;margin-bottom:4px">' + q.icon + '</div><div style="font-size:11px;color:#666">' + q.name + '</div></div>';
    });
    html += '</div></div>';
    // 限时秒杀
    html += '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:16px;font-weight:700">⚡ 限时秒杀</span><span style="background:#FF6B6B;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">02:38:56</span></div><span style="font-size:12px;color:#999;cursor:pointer" onclick="AppState.navigateTo(&#39;flashSale&#39;)">更多 ›</span></div>';
    html += '<div style="display:flex;gap:10px;overflow-x:auto">';
    D.products.slice(0, 4).forEach(function(p) {
      html += '<div style="flex-shrink:0;width:100px;text-align:center;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})"><div style="width:100px;height:100px;border-radius:8px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:40px">' + p.img + '</div><div style="font-size:11px;color:#FF6B6B;font-weight:600;margin-top:6px">¥' + p.price + '</div><div style="font-size:10px;color:#999;text-decoration:line-through">¥' + p.originalPrice + '</div></div>';
    });
    html += '</div></div>';
    // 推荐商品
    html += '<div style="padding:0 12px"><div style="font-size:16px;font-weight:700;margin-bottom:12px">— 为你推荐 —</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    D.products.forEach(function(p) {
      var discount = Math.round(p.price / p.originalPrice * 100);
      html += '<div class="card" style="margin:0;padding:0;overflow:hidden;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})">';
      html += '<div style="height:140px;background:#f8f8f8;display:flex;align-items:center;justify-content:center;font-size:48px;position:relative"><span>' + p.img + '</span>';
      if (discount < 80) html += '<span style="position:absolute;top:8px;left:8px;background:#FF6B6B;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px">' + (10 - Math.floor(discount / 10)) + '折</span>';
      html += '</div>';
      html += '<div style="padding:10px"><div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div>';
      html += '<div style="margin-top:6px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:15px;font-weight:700;color:#FF6B6B">¥' + p.price + '</span><span style="font-size:10px;color:#999">' + p.sales + '人付款</span></div></div></div>';
    });
    html += '</div></div>';
    html += '<div style="height:20px"></div></div>';
    html += this.renderTabBar(0);
    return html;
  },

  // ==================== 搜索页 ====================
  renderSearch() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('搜索', true);
    html += '<div style="padding:12px"><div style="display:flex;gap:8px"><div style="flex:1;border:1px solid #ddd;border-radius:20px;padding:8px 16px;font-size:14px;background:#fff;display:flex;align-items:center;gap:8px"><span>🔍</span><span style="color:#999">搜索商品</span></div><div style="background:#FF6B6B;color:#fff;padding:8px 16px;border-radius:20px;font-size:14px;cursor:pointer">搜索</div></div></div>';
    // 热门搜索
    html += '<div class="card"><div style="font-size:14px;font-weight:600;margin-bottom:10px">热门搜索</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
    ['AirPods', '连衣裙', '零食大礼包', '吸尘器', '跑步鞋', '护眼台灯', '积木', '精华液'].forEach(function(k) {
      html += '<div style="padding:6px 14px;background:#f5f5f5;border-radius:16px;font-size:13px;color:#666;cursor:pointer">' + k + '</div>';
    });
    html += '</div></div>';
    // 搜索历史
    html += '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span style="font-size:14px;font-weight:600">搜索历史</span><span style="font-size:12px;color:#999">🗑️</span></div>';
    ['手机壳', '蓝牙耳机', 'T恤'].forEach(function(k) {
      html += '<div style="padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:13px;color:#666">🔍 ' + k + '</div>';
    });
    html += '</div>';
    return html;
  },

  // ==================== 分类页 ====================
  renderCategory() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('分类');
    html += '<div style="display:flex;flex:1;overflow:hidden">';
    // 左侧分类列表
    html += '<div style="width:80px;background:#f5f5f5;overflow-y:auto;flex-shrink:0">';
    var cats = ['全部'].concat(D.categories.map(function(c) { return c.name; }));
    cats.forEach(function(c) {
      var active = AppState.selectedCategory === c;
      html += '<div style="padding:14px 8px;font-size:13px;text-align:center;cursor:pointer;background:' + (active ? '#fff' : 'transparent') + ';color:' + (active ? '#FF6B6B' : '#666') + ';border-left:' + (active ? '3px solid #FF6B6B' : '3px solid transparent') + '" onclick="AppState.setCategory(\'' + c + '\')">' + c + '</div>';
    });
    html += '</div>';
    // 右侧商品列表
    html += '<div style="flex:1;overflow-y:auto;padding:8px">';
    var filtered = D.products;
    if (AppState.selectedCategory !== '全部') {
      filtered = D.products.filter(function(p) { return p.category === AppState.selectedCategory; });
    }
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
    filtered.forEach(function(p) {
      html += '<div style="background:#fff;border-radius:8px;overflow:hidden;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})">';
      html += '<div style="height:120px;background:#f8f8f8;display:flex;align-items:center;justify-content:center;font-size:40px">' + p.img + '</div>';
      html += '<div style="padding:8px"><div style="font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div>';
      html += '<div style="margin-top:4px;font-size:14px;font-weight:700;color:#FF6B6B">¥' + p.price + '</div></div></div>';
    });
    html += '</div></div></div>';
    html += this.renderTabBar(1);
    return html;
  },

  // ==================== 商品详情页 ====================
  renderProductDetail() {
    var D = window.AppData;
    var p = D.products.find(function(x) { return x.id === AppState.params.productId; }) || D.products[0];
    var isFav = AppState.isFavorite(p.id);
    var html = this.renderStatusBar(true) + '<div class="page-content" style="background:#f5f5f5">';
    // 商品图片
    html += '<div style="height:320px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:80px;position:relative"><span>' + p.img + '</span>';
    html += '<div style="position:absolute;top:56px;right:16px;width:36px;height:36px;background:rgba(0,0,0,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px" onclick="event.stopPropagation();AppState.toggleFavorite(\'' + p.id + '\')">' + (isFav ? '❤️' : '🤍') + '</div></div>';
    // 价格信息
    html += '<div style="background:#fff;padding:16px"><div style="display:flex;align-items:baseline;gap:8px"><span style="font-size:28px;font-weight:700;color:#FF6B6B">¥' + p.price + '</span><span style="font-size:14px;color:#999;text-decoration:line-through">¥' + p.originalPrice + '</span><span style="background:#FFF0F0;color:#FF6B6B;padding:2px 8px;border-radius:4px;font-size:11px">' + Math.round(p.price / p.originalPrice * 100) / 10 + '折</span></div>';
    html += '<div style="margin-top:12px;font-size:15px;font-weight:500;line-height:1.5">' + p.title + '</div>';
    html += '<div style="margin-top:8px;display:flex;gap:6px">' + p.tags.map(function(t) { return '<span class="tag tag-red">' + t + '</span>'; }).join('') + '</div></div>';
    // 规格选择
    html += '<div class="card" style="margin-top:8px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;color:#666">选择规格</span><div style="display:flex;gap:6px">' + p.specs.map(function(s) { return '<span style="padding:4px 12px;border:1px solid #ddd;border-radius:16px;font-size:12px">' + s + '</span>'; }).join('') + '</div></div></div>';
    // 服务保障
    html += '<div class="card" style="margin-top:0"><div style="display:flex;gap:16px;font-size:12px;color:#666"><span>✅ 正品保障</span><span>✅ 7天无理由</span><span>✅ 极速退款</span></div></div>';
    // 评价入口
    html += '<div class="card" style="margin-top:0;cursor:pointer" onclick="AppState.navigateTo(&#39;productReviews&#39;,{productId:\'' + p.id + '\'})"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:600">用户评价 (' + p.reviewCount + ')</span><span style="font-size:12px;color:#999">好评率 98% ›</span></div>';
    var reviews = D.reviews.filter(function(r) { return r.productId === p.id; });
    if (reviews.length > 0) {
      html += '<div style="margin-top:10px;padding-top:10px;border-top:1px solid #f5f5f5"><div style="display:flex;gap:8px;align-items:center"><span style="font-size:13px;font-weight:500">' + reviews[0].user + '</span><span style="color:#FFB800;font-size:12px">' + '★'.repeat(reviews[0].rating) + '</span></div><div style="margin-top:6px;font-size:13px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + reviews[0].content + '</div></div>';
    }
    html += '</div>';
    // 商品详情
    html += '<div class="card" style="margin-top:0"><div style="font-size:14px;font-weight:600;margin-bottom:12px">商品详情</div>';
    html += '<div style="height:200px;background:linear-gradient(135deg,#a8edea,#fed6e3);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#666">商品详情图片区域</div></div>';
    html += '<div style="height:60px"></div></div>';
    // 底部操作栏
    html += '<div style="position:absolute;bottom:0;left:0;right:0;background:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;border-top:1px solid #eee">';
    html += '<div style="display:flex;gap:16px"><div style="text-align:center;cursor:pointer" onclick="AppState.switchTab(&#39;mine&#39;)"><div style="font-size:18px">🏠</div><div style="font-size:10px;color:#999">首页</div></div><div style="text-align:center;cursor:pointer" onclick="AppState.switchTab(&#39;cart&#39;)"><div style="font-size:18px">🛒</div><div style="font-size:10px;color:#999">购物车</div></div></div>';
    html += '<div style="flex:1;display:flex;gap:8px"><div style="flex:1;background:#FFB800;color:#fff;border-radius:20px;padding:10px;text-align:center;font-size:14px;font-weight:600;cursor:pointer" onclick="AppState.showToast(&#39;已加入购物车&#39;)">加入购物车</div>';
    html += '<div style="flex:1;background:#FF6B6B;color:#fff;border-radius:20px;padding:10px;text-align:center;font-size:14px;font-weight:600;cursor:pointer" onclick="AppState.navigateTo(&#39;confirmOrder&#39;,{productId:\'' + p.id + '\'})">立即购买</div></div></div>';
    // 返回按钮覆盖
    html = '<div style="position:absolute;top:48px;left:12px;width:32px;height:32px;background:rgba(0,0,0,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:20" onclick="AppState.goBack()"><span style="color:#fff;font-size:18px">‹</span></div>' + html;
    return html;
  },

  // ==================== 商品评价页 ====================
  renderProductReviews() {
    var D = window.AppData;
    var p = D.products.find(function(x) { return x.id === AppState.params.productId; }) || D.products[0];
    var reviews = D.reviews.filter(function(r) { return r.productId === p.id; });
    var html = this.renderStatusBar() + this.renderNavBar('商品评价', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    // 评价概览
    html += '<div class="card"><div style="text-align:center"><div style="font-size:36px;font-weight:700;color:#FF6B6B">4.9</div><div style="font-size:12px;color:#999;margin-top:4px">综合评分</div></div>';
    html += '<div style="display:flex;justify-content:space-around;margin-top:16px;font-size:12px;color:#666"><span>好评率 98%</span><span>追评 12%</span><span>有图 35%</span></div></div>';
    // 评价列表
    reviews.forEach(function(r) {
      html += '<div class="card" style="margin-top:0"><div style="display:flex;gap:10px;align-items:center"><div style="width:36px;height:36px;border-radius:50%;background:#eee;display:flex;align-items:center;justify-content:center">👤</div><div><div style="font-size:13px;font-weight:500">' + r.user + '</div><div style="color:#FFB800;font-size:11px;margin-top:2px">' + '★'.repeat(r.rating) + '</div></div><span style="margin-left:auto;font-size:11px;color:#999">' + r.time + '</span></div>';
      html += '<div style="margin-top:10px;font-size:13px;color:#333;line-height:1.6">' + r.content + '</div>';
      if (r.images > 0) html += '<div style="margin-top:8px;display:flex;gap:8px">' + Array(r.images).fill('<div style="width:80px;height:80px;border-radius:6px;background:#f0f0f0"></div>').join('') + '</div>';
      html += '<div style="margin-top:8px;text-align:right;font-size:12px;color:#999">👍 ' + r.likes + '</div></div>';
    });
    html += '<div style="height:20px"></div></div>';
    return html;
  },

  // ==================== 购物车页 ====================
  renderCart() {
    var D = window.AppData;
    var S = AppState;
    var html = this.renderStatusBar() + this.renderNavBar('购物车');
    html += '<div class="page-content" style="background:#f5f5f5">';
    if (S.cartItems.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">🛒</div><div class="empty-text">购物车空空如也</div><div style="margin-top:16px"><div class="btn-primary" style="display:inline-block;padding:8px 24px;font-size:13px" onclick="AppState.switchTab(&#39;home&#39;)">去逛逛</div></div></div>';
    } else {
      S.cartItems.forEach(function(ci) {
        var p = D.products.find(function(x) { return x.id === ci.productId; });
        if (!p) return;
        html += '<div class="card" style="display:flex;gap:10px;align-items:center">';
        html += '<div style="width:20px;height:20px;border-radius:50%;border:2px solid ' + (ci.checked ? '#FF6B6B' : '#ddd') + ';display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0" onclick="AppState.toggleCartCheck(\'' + ci.id + '\')">' + (ci.checked ? '<span style="color:#FF6B6B;font-size:12px">✓</span>' : '') + '</div>';
        html += '<div style="width:80px;height:80px;border-radius:8px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})">' + p.img + '</div>';
        html += '<div style="flex:1;min-width:0"><div style="font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div><div style="margin-top:4px;font-size:12px;color:#999">' + ci.spec + '</div>';
        html += '<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:15px;font-weight:700;color:#FF6B6B">¥' + p.price + '</span>';
        html += '<div style="display:flex;align-items:center;gap:8px"><span style="width:24px;height:24px;border:1px solid #ddd;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:#999" onclick="AppState.changeCartQty(\'' + ci.id + '\',-1)">−</span><span style="font-size:14px;min-width:20px;text-align:center">' + ci.quantity + '</span><span style="width:24px;height:24px;border:1px solid #ddd;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:#999" onclick="AppState.changeCartQty(\'' + ci.id + '\',1)">+</span></div></div></div>';
        html += '<div style="cursor:pointer;padding:4px" onclick="AppState.removeCartItem(\'' + ci.id + '\')">🗑️</div></div>';
      });
      // 猜你喜欢
      html += '<div style="padding:16px 12px 8px;font-size:14px;font-weight:600">猜你喜欢</div>';
      html += '<div style="display:flex;gap:10px;overflow-x:auto;padding:0 12px">';
      D.products.slice(4, 8).forEach(function(p) {
        html += '<div style="flex-shrink:0;width:110px;background:#fff;border-radius:8px;overflow:hidden;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})"><div style="height:110px;background:#f8f8f8;display:flex;align-items:center;justify-content:center;font-size:36px">' + p.img + '</div><div style="padding:8px"><div style="font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div><div style="font-size:13px;font-weight:700;color:#FF6B6B;margin-top:4px">¥' + p.price + '</div></div></div>';
      });
      html += '</div>';
    }
    html += '<div style="height:60px"></div></div>';
    // 底部结算栏
    if (S.cartItems.length > 0) {
      var total = S.getCartTotal();
      var checkedCount = S.cartItems.filter(function(c) { return c.checked; }).length;
      html += '<div style="position:absolute;bottom:50px;left:0;right:0;background:#fff;padding:10px 16px;display:flex;align-items:center;border-top:1px solid #eee">';
      html += '<div style="display:flex;align-items:center;gap:6px;cursor:pointer" onclick="AppState.toggleCartCheckAll()"><div style="width:20px;height:20px;border-radius:50%;border:2px solid ' + (S.cartCheckAll ? '#FF6B6B' : '#ddd') + ';display:flex;align-items:center;justify-content:center">' + (S.cartCheckAll ? '<span style="color:#FF6B6B;font-size:12px">✓</span>' : '') + '</div><span style="font-size:13px;color:#666">全选</span></div>';
      html += '<div style="flex:1;text-align:right;margin-right:12px"><span style="font-size:13px;color:#666">合计: </span><span style="font-size:18px;font-weight:700;color:#FF6B6B">¥' + total.toFixed(2) + '</span></div>';
      html += '<div style="background:#FF6B6B;color:#fff;padding:10px 20px;border-radius:20px;font-size:14px;font-weight:600;cursor:pointer" onclick="AppState.navigateTo(&#39;confirmOrder&#39;)">结算(' + checkedCount + ')</div></div>';
    }
    html += this.renderTabBar(2);
    return html;
  },

  // ==================== 确认订单页 ====================
  renderConfirmOrder() {
    var D = window.AppData;
    var addr = D.addresses.find(function(a) { return a.isDefault; }) || D.addresses[0];
    var p = D.products.find(function(x) { return x.id === AppState.params.productId; }) || D.products[0];
    var html = this.renderStatusBar() + this.renderNavBar('确认订单', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    // 收货地址
    html += '<div class="card" style="display:flex;gap:12px;align-items:center;cursor:pointer" onclick="AppState.navigateTo(&#39;addressList&#39;)"><div style="font-size:24px">📍</div><div style="flex:1"><div style="display:flex;gap:8px;font-size:15px;font-weight:600"><span>' + addr.name + '</span><span>' + addr.phone + '</span></div><div style="margin-top:4px;font-size:13px;color:#666">' + addr.province + addr.city + addr.district + addr.detail + '</div></div><span style="color:#999">›</span></div>';
    // 商品信息
    html += '<div class="card"><div style="display:flex;gap:12px"><div style="width:80px;height:80px;border-radius:8px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0">' + p.img + '</div><div style="flex:1"><div style="font-size:13px">' + p.title + '</div><div style="margin-top:4px;font-size:12px;color:#999">' + (p.specs[0] || '') + ' × 1</div></div><div style="font-size:14px;font-weight:600">¥' + p.price + '</div></div></div>';
    // 优惠券
    html += '<div class="card" style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="AppState.navigateTo(&#39;couponList&#39;)"><span style="font-size:14px">优惠券</span><div style="display:flex;align-items:center;gap:4px"><span style="font-size:13px;color:#FF6B6B">-¥50</span><span style="color:#999">›</span></div></div>';
    // 配送方式
    html += '<div class="card" style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px">配送方式</span><span style="font-size:13px;color:#666">快递 免邮</span></div>';
    // 备注
    html += '<div class="card"><div style="font-size:14px;margin-bottom:8px">订单备注</div><div style="border:1px solid #eee;border-radius:8px;padding:10px;font-size:13px;color:#999;background:#fafafa">选填：请先和商家协商一致</div></div>';
    // 金额明细
    html += '<div class="card"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:#666">商品金额</span><span>¥' + p.price.toFixed(2) + '</span></div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:#666">运费</span><span style="color:#48BB78">免运费</span></div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:#666">优惠券</span><span style="color:#FF6B6B">-¥50.00</span></div><div style="border-top:1px solid #eee;padding-top:8px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:600">实付金额</span><span style="font-size:20px;font-weight:700;color:#FF6B6B">¥' + Math.max(0, p.price - 50).toFixed(2) + '</span></div></div>';
    html += '<div style="height:70px"></div></div>';
    // 底部提交栏
    html += '<div style="position:absolute;bottom:0;left:0;right:0;background:#fff;padding:10px 16px;display:flex;align-items:center;justify-content:flex-end;border-top:1px solid #eee;gap:12px"><span style="font-size:14px">实付: <span style="font-size:18px;font-weight:700;color:#FF6B6B">¥' + Math.max(0, p.price - 50).toFixed(2) + '</span></span><div style="background:#FF6B6B;color:#fff;padding:10px 28px;border-radius:20px;font-size:15px;font-weight:600;cursor:pointer" onclick="AppState.navigateTo(&#39;payResult&#39;)">提交订单</div></div>';
    return html;
  },

  // ==================== 支付结果页 ====================
  renderPayResult() {
    var html = this.renderStatusBar() + '<div class="page-content" style="background:#f5f5f5">';
    html += '<div style="text-align:center;padding:40px 20px"><div style="width:64px;height:64px;border-radius:50%;background:#48BB78;display:flex;align-items:center;justify-content:center;margin:0 auto"><span style="color:#fff;font-size:32px">✓</span></div>';
    html += '<div style="font-size:18px;font-weight:600;margin-top:16px">支付成功</div>';
    html += '<div style="font-size:14px;color:#999;margin-top:8px">订单将在24小时内发货</div></div>';
    html += '<div class="card"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:#999">订单编号</span><span>ORD20260428001</span></div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span style="color:#999">支付方式</span><span>微信支付</span></div><div style="display:flex;justify-content:space-between;font-size:13px"><span style="color:#999">支付金额</span><span style="font-weight:600">¥749.00</span></div></div>';
    html += '<div style="padding:16px;display:flex;gap:12px"><div style="flex:1;border:1px solid #FF6B6B;color:#FF6B6B;border-radius:20px;padding:10px;text-align:center;font-size:14px;cursor:pointer" onclick="AppState.navigateTo(&#39;orderList&#39;)">查看订单</div><div style="flex:1;background:#FF6B6B;color:#fff;border-radius:20px;padding:10px;text-align:center;font-size:14px;cursor:pointer" onclick="AppState.switchTab(&#39;home&#39;)">返回首页</div></div>';
    html += '</div>';
    return html;
  },

  // ==================== 个人中心 ====================
  renderMine() {
    var D = window.AppData;
    var U = AppState.user;
    var html = this.renderStatusBar(true);
    // 用户信息区
    html += '<div style="background:linear-gradient(135deg,#FF6B6B,#ee5a24);padding-top:44px;padding-left:16px;padding-right:16px;padding-bottom:30px;color:#fff"><div style="display:flex;align-items:center;gap:12px"><div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:28px">👤</div><div><div style="font-size:18px;font-weight:600">' + U.name + '</div><div style="font-size:12px;margin-top:4px;opacity:0.8">' + (U.isVip ? '🪙 VIP' + U.vipLevel + '会员' : '普通用户') + '</div></div></div>';
    // 资产
    html += '<div style="display:flex;margin-top:20px;background:rgba(255,255,255,0.15);border-radius:12px;padding:14px 0"><div style="flex:1;text-align:center;cursor:pointer" onclick="AppState.showToast(&#39;余额功能开发中&#39;)"><div style="font-size:18px;font-weight:700">¥' + U.balance.toFixed(0) + '</div><div style="font-size:11px;margin-top:2px;opacity:0.8">余额</div></div><div style="width:1px;background:rgba(255,255,255,0.2)"></div><div style="flex:1;text-align:center;cursor:pointer" onclick="AppState.showToast(&#39;积分功能开发中&#39;)"><div style="font-size:18px;font-weight:700">' + U.points + '</div><div style="font-size:11px;margin-top:2px;opacity:0.8">积分</div></div><div style="width:1px;background:rgba(255,255,255,0.2)"></div><div style="flex:1;text-align:center;cursor:pointer" onclick="AppState.navigateTo(&#39;couponList&#39;)"><div style="font-size:18px;font-weight:700">' + U.couponCount + '</div><div style="font-size:11px;margin-top:2px;opacity:0.8">优惠券</div></div></div></div>';
    html += '<div class="page-content" style="background:#f5f5f5;margin-top:-12px;border-radius:12px 12px 0 0;position:relative">';
    // 订单入口
    html += '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="font-size:15px;font-weight:600">我的订单</span><span style="font-size:12px;color:#999;cursor:pointer" onclick="AppState.navigateTo(&#39;orderList&#39;)">全部订单 ›</span></div>';
    html += '<div style="display:flex;justify-content:space-around">';
    [{ icon: '💳', label: '待付款', tab: '待付款' }, { icon: '📦', label: '待发货', tab: '待发货' }, { icon: '🚚', label: '待收货', tab: '待收货' }, { icon: '⭐', label: '待评价', tab: '待评价' }, { icon: '🔄', label: '退换货', tab: '退换货' }].forEach(function(o) {
      html += '<div style="text-align:center;cursor:pointer" onclick="AppState.orderTab=\'' + o.tab + '\';AppState.navigateTo(&#39;orderList&#39;)"><div style="font-size:24px;margin-bottom:4px">' + o.icon + '</div><div style="font-size:11px;color:#666">' + o.label + '</div></div>';
    });
    html += '</div></div>';
    // 功能列表
    var menuItems = [
      [{ icon: '📍', label: '收货地址', page: 'addressList' }, { icon: '❤️', label: '我的收藏', page: 'favorites' }],
      [{ icon: '🎫', label: '优惠券', page: 'couponList' }, { icon: '🪙', label: '积分商城', page: 'home' }],
      [{ icon: '📞', label: '客服中心', page: 'home' }, { icon: '⚙️', label: '设置', page: 'home' }]
    ];
    menuItems.forEach(function(row) {
      html += '<div class="card" style="margin-top:0">';
      row.forEach(function(item) {
        html += '<div style="display:flex;align-items:center;gap:10px;padding:12px 0;cursor:pointer" onclick="AppState.navigateTo(\'' + item.page + '\')"><span style="font-size:20px">' + item.icon + '</span><span style="flex:1;font-size:14px">' + item.label + '</span><span style="color:#999;font-size:12px">›</span></div>';
      });
      html += '</div>';
    });
    html += '<div style="height:20px"></div></div>';
    html += this.renderTabBar(3);
    return html;
  },

  // ==================== 订单列表 ====================
  renderOrderList() {
    var D = window.AppData;
    var tab = AppState.orderTab || '全部';
    var tabs = ['全部', '待付款', '待发货', '待收货', '已完成'];
    var html = this.renderStatusBar() + this.renderNavBar('我的订单', true);
    // Tab栏
    html += '<div style="display:flex;background:#fff;border-bottom:1px solid #eee">';
    tabs.forEach(function(t) {
      var active = tab === t;
      html += '<div style="flex:1;text-align:center;padding:12px 0;font-size:13px;cursor:pointer;color:' + (active ? '#FF6B6B' : '#666') + ';border-bottom:2px solid ' + (active ? '#FF6B6B' : 'transparent') + '" onclick="AppState.setOrderTab(\'' + t + '\')">' + t + '</div>';
    });
    html += '</div>';
    html += '<div class="page-content" style="background:#f5f5f5">';
    var filtered = tab === '全部' ? D.orders : D.orders.filter(function(o) { return o.statusText === tab; });
    if (filtered.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">暂无相关订单</div></div>';
    } else {
      filtered.forEach(function(order) {
        html += '<div class="card" style="cursor:pointer" onclick="AppState.navigateTo(&#39;orderDetail&#39;,{orderId:\'' + order.id + '\'})">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span style="font-size:12px;color:#999">订单号: ' + order.id + '</span><span class="tag ' + (order.status === '已完成' ? 'tag-green' : order.status === '已取消' ? 'tag-red' : 'tag-blue') + '">' + order.statusText + '</span></div>';
        order.items.forEach(function(item) {
          var p = D.products.find(function(x) { return x.id === item.productId; }) || {};
          html += '<div style="display:flex;gap:10px;align-items:center"><div style="width:56px;height:56px;border-radius:6px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">' + (p.img || '📦') + '</div><div style="flex:1;min-width:0"><div style="font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (p.title || '商品') + '</div><div style="font-size:12px;color:#999;margin-top:2px">' + item.spec + ' × ' + item.quantity + '</div></div><div style="font-size:13px;font-weight:600">¥' + item.price + '</div></div>';
        });
        html += '<div style="margin-top:10px;padding-top:10px;border-top:1px solid #f5f5f5;display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;color:#999">' + order.createTime + '</span><span style="font-size:14px;font-weight:600">共' + order.items.reduce(function(s, i) { return s + i.quantity; }, 0) + '件 合计: <span style="color:#FF6B6B">¥' + order.totalAmount.toFixed(2) + '</span></span></div></div>';
      });
    }
    html += '<div style="height:20px"></div></div>';
    return html;
  },

  // ==================== 订单详情 ====================
  renderOrderDetail() {
    var D = window.AppData;
    var order = D.orders.find(function(o) { return o.id === AppState.params.orderId; }) || D.orders[0];
    var addr = D.addresses.find(function(a) { return a.id === order.addressId; }) || D.addresses[0];
    var html = this.renderStatusBar() + this.renderNavBar('订单详情', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    // 状态
    html += '<div style="background:linear-gradient(135deg,#FF6B6B,#ee5a24);padding:20px 16px;color:#fff"><div style="font-size:18px;font-weight:600">' + order.statusText + '</div><div style="font-size:12px;margin-top:4px;opacity:0.8">' + (order.status === '待收货' ? '商品正在配送中，请耐心等待' : order.status === '已完成' ? '感谢您的购买，欢迎再次光临' : '订单已取消') + '</div></div>';
    // 收货地址
    html += '<div class="card"><div style="display:flex;gap:10px"><div style="font-size:20px">📍</div><div><div style="font-size:14px;font-weight:600">' + addr.name + ' ' + addr.phone + '</div><div style="font-size:13px;color:#666;margin-top:4px">' + addr.province + addr.city + addr.district + addr.detail + '</div></div></div></div>';
    // 商品信息
    html += '<div class="card"><div style="font-size:14px;font-weight:600;margin-bottom:12px">商品信息</div>';
    order.items.forEach(function(item) {
      var p = D.products.find(function(x) { return x.id === item.productId; }) || {};
      html += '<div style="display:flex;gap:10px;align-items:center;padding:8px 0"><div style="width:60px;height:60px;border-radius:6px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">' + (p.img || '📦') + '</div><div style="flex:1"><div style="font-size:13px">' + (p.title || '商品') + '</div><div style="font-size:12px;color:#999;margin-top:2px">' + item.spec + ' × ' + item.quantity + '</div></div><div style="font-size:13px;font-weight:600">¥' + item.price + '</div></div>';
    });
    html += '</div>';
    // 金额明细
    html += '<div class="card"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span style="color:#666">商品金额</span><span>¥' + order.totalAmount.toFixed(2) + '</span></div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span style="color:#666">运费</span><span>' + (order.freight > 0 ? '¥' + order.freight.toFixed(2) : '免运费') + '</span></div><div style="border-top:1px solid #eee;padding-top:8px;display:flex;justify-content:space-between;font-size:14px;font-weight:600"><span>实付金额</span><span style="color:#FF6B6B">¥' + (order.totalAmount + order.freight).toFixed(2) + '</span></div></div>';
    // 订单信息
    html += '<div class="card"><div style="font-size:14px;font-weight:600;margin-bottom:10px">订单信息</div><div style="font-size:12px;color:#999;line-height:2"><div>订单编号: ' + order.id + '</div><div>下单时间: ' + order.createTime + '</div></div></div>';
    html += '<div style="height:20px"></div></div>';
    // 底部操作
    if (order.status === '待收货') {
      html += '<div style="position:absolute;bottom:0;left:0;right:0;background:#fff;padding:10px 16px;display:flex;justify-content:flex-end;gap:10px;border-top:1px solid #eee"><div style="border:1px solid #FF6B6B;color:#FF6B6B;border-radius:20px;padding:8px 20px;font-size:13px;cursor:pointer" onclick="AppState.showToast(&#39;已确认收货&#39;)">确认收货</div></div>';
    }
    return html;
  },

  // ==================== 收货地址列表 ====================
  renderAddressList() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('收货地址', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    D.addresses.forEach(function(a) {
      html += '<div class="card"><div style="display:flex;gap:10px"><div style="font-size:20px">📍</div><div style="flex:1"><div style="display:flex;gap:8px;align-items:center"><span style="font-size:15px;font-weight:600">' + a.name + '</span><span style="font-size:13px;color:#666">' + a.phone + '</span>';
      if (a.isDefault) html += '<span class="tag tag-red" style="font-size:10px">默认</span>';
      html += '</div><div style="font-size:13px;color:#666;margin-top:6px">' + a.province + a.city + a.district + ' ' + a.detail + '</div></div></div>';
      html += '<div style="display:flex;justify-content:flex-end;gap:16px;margin-top:10px;padding-top:10px;border-top:1px solid #f5f5f5"><span style="font-size:12px;color:#999;cursor:pointer" onclick="AppState.navigateTo(&#39;addressEdit&#39;,{addressId:\'' + a.id + '\'})">编辑</span><span style="font-size:12px;color:#999;cursor:pointer">删除</span></div></div>';
    });
    html += '<div style="padding:16px"><div class="btn-primary" onclick="AppState.navigateTo(&#39;addressEdit&#39;)">+ 新增收货地址</div></div>';
    html += '</div>';
    return html;
  },

  // ==================== 地址编辑页 ====================
  renderAddressEdit() {
    var html = this.renderStatusBar() + this.renderNavBar('编辑地址', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    html += '<div class="card"><div style="margin-bottom:14px"><div style="font-size:13px;color:#999;margin-bottom:6px">收货人</div><div style="border:1px solid #eee;border-radius:8px;padding:12px;font-size:14px;background:#fafafa">小明</div></div>';
    html += '<div style="margin-bottom:14px"><div style="font-size:13px;color:#999;margin-bottom:6px">手机号码</div><div style="border:1px solid #eee;border-radius:8px;padding:12px;font-size:14px;background:#fafafa">138****6789</div></div>';
    html += '<div style="margin-bottom:14px"><div style="font-size:13px;color:#999;margin-bottom:6px">所在地区</div><div style="border:1px solid #eee;border-radius:8px;padding:12px;font-size:14px;background:#fafafa;display:flex;justify-content:space-between">广东省 深圳市 南山区 <span style="color:#999">›</span></div></div>';
    html += '<div style="margin-bottom:14px"><div style="font-size:13px;color:#999;margin-bottom:6px">详细地址</div><div style="border:1px solid #eee;border-radius:8px;padding:12px;font-size:14px;background:#fafafa;height:60px">科技园南路88号</div></div>';
    html += '<div style="display:flex;align-items:center;gap:8px"><div style="width:18px;height:18px;border-radius:50%;border:2px solid #FF6B6B;display:flex;align-items:center;justify-content:center"><span style="color:#FF6B6B;font-size:10px">✓</span></div><span style="font-size:13px">设为默认地址</span></div></div>';
    html += '<div style="padding:16px"><div class="btn-primary" onclick="AppState.showToast(&#39;地址保存成功&#39;);AppState.goBack()">保存地址</div></div>';
    html += '</div>';
    return html;
  },

  // ==================== 优惠券列表 ====================
  renderCouponList() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('优惠券', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    // Tab
    html += '<div style="display:flex;background:#fff;border-bottom:1px solid #eee"><div style="flex:1;text-align:center;padding:12px;font-size:13px;color:#FF6B6B;border-bottom:2px solid #FF6B6B">可使用</div><div style="flex:1;text-align:center;padding:12px;font-size:13px;color:#999">已使用</div><div style="flex:1;text-align:center;padding:12px;font-size:13px;color:#999">已过期</div></div>';
    D.coupons.forEach(function(c) {
      var used = c.used;
      html += '<div class="card" style="display:flex;overflow:hidden;opacity:' + (used ? '0.5' : '1') + '">';
      html += '<div style="width:90px;background:' + (used ? '#ccc' : '#FF6B6B') + ';display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;flex-shrink:0"><div style="font-size:11px">' + (c.type === '免邮' ? '免邮' : '¥') + '</div><div style="font-size:24px;font-weight:700">' + (c.type === '免邮' ? 'FREE' : c.value) + (c.type === '折扣' ? '折' : '') + '</div>' + (c.threshold > 0 && c.type !== '折扣' ? '<div style="font-size:10px">满' + c.threshold + '可用</div>' : '') + '</div>';
      html += '<div style="flex:1;padding:12px"><div style="font-size:14px;font-weight:600">' + c.title + '</div><div style="font-size:12px;color:#999;margin-top:4px">' + c.desc + '</div><div style="font-size:11px;color:#999;margin-top:6px">' + c.startTime + ' ~ ' + c.endTime + '</div></div>';
      if (!used) html += '<div style="display:flex;align-items:center;padding-right:12px"><div style="background:#fff;color:#FF6B6B;border:1px solid #FF6B6B;border-radius:16px;padding:4px 12px;font-size:12px;cursor:pointer" onclick="AppState.showToast(&#39;已选择优惠券&#39;)">使用</div></div>';
      html += '</div>';
    });
    html += '<div style="height:20px"></div></div>';
    return html;
  },

  // ==================== 收藏列表 ====================
  renderFavorites() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('我的收藏', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    if (D.favorites.length === 0) {
      html += '<div class="empty-state"><div class="empty-icon">❤️</div><div class="empty-text">暂无收藏</div></div>';
    } else {
      D.favorites.forEach(function(pid) {
        var p = D.products.find(function(x) { return x.id === pid; });
        if (!p) return;
        html += '<div class="card" style="display:flex;gap:12px;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})"><div style="width:80px;height:80px;border-radius:8px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0">' + p.img + '</div><div style="flex:1;min-width:0"><div style="font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div><div style="margin-top:4px;font-size:12px;color:#999">' + p.sales + '人付款</div><div style="margin-top:8px;font-size:15px;font-weight:700;color:#FF6B6B">¥' + p.price + ' <span style="font-size:12px;color:#999;text-decoration:line-through;font-weight:400">¥' + p.originalPrice + '</span></div></div></div>';
      });
    }
    html += '<div style="height:20px"></div></div>';
    return html;
  },

  // ==================== 登录页 ====================
  renderLogin() {
    var html = this.renderStatusBar() + '<div class="page-content" style="background:#fff">';
    html += '<div style="padding:60px 24px 40px;text-align:center"><div style="font-size:56px;margin-bottom:16px">🛍️</div><div style="font-size:22px;font-weight:700">欢迎登录</div><div style="font-size:13px;color:#999;margin-top:8px">登录后享受更多优惠</div></div>';
    html += '<div style="padding:0 24px"><div style="margin-bottom:16px"><div style="border:1px solid #eee;border-radius:12px;padding:14px 16px;font-size:14px;display:flex;align-items:center;gap:8px;background:#fafafa"><span style="color:#999">📱</span><span style="color:#ccc">请输入手机号</span></div></div>';
    html += '<div style="margin-bottom:16px"><div style="display:flex;gap:8px"><div style="flex:1;border:1px solid #eee;border-radius:12px;padding:14px 16px;font-size:14px;display:flex;align-items:center;gap:8px;background:#fafafa"><span style="color:#999">🔒</span><span style="color:#ccc">请输入验证码</span></div><div style="background:#FFF0F0;color:#FF6B6B;border-radius:12px;padding:14px 16px;font-size:13px;white-space:nowrap;cursor:pointer">获取验证码</div></div></div>';
    html += '<div style="margin-top:24px"><div class="btn-primary" style="background:#FF6B6B;border-radius:12px" onclick="AppState.showToast(&#39;登录成功&#39;);AppState.switchTab(&#39;home&#39;)">登录</div></div>';
    html += '<div style="text-align:center;margin-top:16px;font-size:12px;color:#999">登录即代表同意 <span style="color:#FF6B6B">《用户协议》</span> 和 <span style="color:#FF6B6B">《隐私政策》</span></div></div>';
    // 第三方登录
    html += '<div style="position:absolute;bottom:60px;left:0;right:0;text-align:center"><div style="font-size:12px;color:#999;margin-bottom:16px">其他登录方式</div><div style="display:flex;justify-content:center;gap:24px"><div style="width:44px;height:44px;border-radius:50%;background:#07C160;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer">💬</div><div style="width:44px;height:44px;border-radius:50%;background:#1296DB;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer">🐧</div></div></div>';
    html += '</div>';
    return html;
  },

  // ==================== 限时秒杀页 ====================
  renderFlashSale() {
    var D = window.AppData;
    var html = this.renderStatusBar() + this.renderNavBar('限时秒杀', true);
    html += '<div class="page-content" style="background:#f5f5f5">';
    // 倒计时
    html += '<div style="background:linear-gradient(135deg,#FF6B6B,#ee5a24);padding:16px;color:#fff;text-align:center"><div style="font-size:16px;font-weight:600">⚡ 限时秒杀</div><div style="margin-top:8px;display:flex;justify-content:center;gap:6px;align-items:center"><span style="font-size:13px">距结束</span><span style="background:rgba(0,0,0,0.3);padding:4px 8px;border-radius:4px;font-size:16px;font-weight:700">02</span><span style="font-weight:700">:</span><span style="background:rgba(0,0,0,0.3);padding:4px 8px;border-radius:4px;font-size:16px;font-weight:700">38</span><span style="font-weight:700">:</span><span style="background:rgba(0,0,0,0.3);padding:4px 8px;border-radius:4px;font-size:16px;font-weight:700">56</span></div></div>';
    // 秒杀商品
    D.products.forEach(function(p) {
      var discount = Math.round(p.price / p.originalPrice * 100);
      html += '<div class="card" style="display:flex;gap:12px;cursor:pointer" onclick="AppState.navigateTo(&#39;productDetail&#39;,{productId:\'' + p.id + '\'})"><div style="width:90px;height:90px;border-radius:8px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:36px;flex-shrink:0;position:relative">' + p.img + '<span style="position:absolute;bottom:0;left:0;right:0;background:#FF6B6B;color:#fff;font-size:10px;text-align:center;padding:2px 0;border-radius:0 0 8px 8px">' + (10 - Math.floor(discount / 10)) + '折</span></div><div style="flex:1;min-width:0"><div style="font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.title + '</div><div style="margin-top:8px;display:flex;align-items:baseline;gap:6px"><span style="font-size:18px;font-weight:700;color:#FF6B6B">¥' + p.price + '</span><span style="font-size:12px;color:#999;text-decoration:line-through">¥' + p.originalPrice + '</span></div><div style="margin-top:8px;background:#FFF0F0;border-radius:12px;height:20px;position:relative;overflow:hidden"><div style="background:linear-gradient(90deg,#FF6B6B,#FF8E8E);height:100%;border-radius:12px;width:' + (30 + Math.random() * 60) + '%"></div><span style="position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:10px;color:#FF6B6B">已抢' + Math.floor(Math.random() * 80 + 20) + '%</span></div></div></div>';
    });
    html += '<div style="height:20px"></div></div>';
    return html;
  },

  // ==================== 侧边栏渲染 ====================
  renderSidebar() {
    var groups = [
      { title: '首页模块', pages: [
        { name: '首页', page: 'home' },
        { name: '搜索', page: 'search' },
        { name: '分类', page: 'category' },
        { name: '限时秒杀', page: 'flashSale' }
      ]},
      { title: '商品模块', pages: [
        { name: '商品详情', page: 'productDetail', params: { productId: 'P001' } },
        { name: '商品评价', page: 'productReviews', params: { productId: 'P001' } }
      ]},
      { title: '购物模块', pages: [
        { name: '购物车', page: 'cart' },
        { name: '确认订单', page: 'confirmOrder', params: { productId: 'P001' } },
        { name: '支付结果', page: 'payResult' }
      ]},
      { title: '订单模块', pages: [
        { name: '订单列表', page: 'orderList' },
        { name: '订单详情', page: 'orderDetail', params: { orderId: 'ORD20260425001' } }
      ]},
      { title: '用户模块', pages: [
        { name: '个人中心', page: 'mine' },
        { name: '收货地址', page: 'addressList' },
        { name: '地址编辑', page: 'addressEdit' },
        { name: '优惠券', page: 'couponList' },
        { name: '我的收藏', page: 'favorites' },
        { name: '登录', page: 'login' }
      ]}
    ];
    var html = '<div class="sidebar-header"><h2>🛍️ 电商小程序</h2><p>产品原型 v1.0</p></div>';
    groups.forEach(function(g, i) {
      html += '<div class="nav-group" id="navGroup' + i + '"><div class="nav-group-title" onclick="document.getElementById(\'navGroup' + i + '\').classList.toggle(\'collapsed\')">' + g.title + ' <span class="arrow">▼</span></div><div class="nav-items">';
      g.pages.forEach(function(p) {
        var paramsStr = p.params ? ',{' + Object.keys(p.params).map(function(k) { return k + ':\'' + p.params[k] + '\''; }).join(',') + '}' : '';
        html += '<div class="nav-item" data-page="' + p.page + '" onclick="AppState.navigateTo(\'' + p.page + '\'' + paramsStr + ')">' + p.name + '</div>';
      });
      html += '</div></div>';
    });
    document.getElementById('sidebar').innerHTML = html;
  }
};

// 初始化侧边栏
window.addEventListener('DOMContentLoaded', function() { AppUI.renderSidebar(); });
