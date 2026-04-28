# PMUI 参考模板

本文档提供可直接复用的代码模板，加速原型生成。

## 目录

1. [index.html 完整模板](#1-indexhtml-完整模板)
2. [app.js 状态管理模板](#2-appjs-状态管理模板)
3. [ui.js 公共组件模板](#3-uijs-公共组件模板)
4. [data.js 数据模型模板](#4-datajs-数据模型模板)
5. [常用页面模板](#5-常用页面模板)

---

## 1. index.html 完整模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>产品原型 v1.0</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
           background: #1a1a2e; display: flex; min-height: 100vh; }

    /* 侧边栏 */
    .sidebar { width: 240px; background: #16213e; color: #fff; padding: 20px 0;
                overflow-y: auto; flex-shrink: 0; }
    .sidebar-header { padding: 0 20px 20px; border-bottom: 1px solid #2a2a4a; }
    .sidebar-header h2 { font-size: 18px; margin-bottom: 4px; }
    .sidebar-header p { font-size: 12px; color: #8888aa; }
    .nav-group { margin: 8px 0; }
    .nav-group-title { padding: 10px 20px; font-size: 13px; cursor: pointer;
                       display: flex; justify-content: space-between; color: #aaa; }
    .nav-group-title:hover { color: #fff; }
    .nav-group-title .arrow { transition: transform 0.2s; }
    .nav-group.collapsed .nav-items { display: none; }
    .nav-group.collapsed .arrow { transform: rotate(-90deg); }
    .nav-items { padding: 0; }
    .nav-item { padding: 8px 20px 8px 36px; font-size: 13px; cursor: pointer;
                color: #8888aa; transition: all 0.2s; }
    .nav-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
    .nav-item.active { color: #4299E1; background: rgba(66,153,225,0.1);
                       border-right: 3px solid #4299E1; }

    /* 设备外壳 */
    .device-container { flex: 1; display: flex; align-items: center;
                        justify-content: center; padding: 20px; }
    .phone-frame { width: 375px; height: 812px; background: #000;
                   border-radius: 40px; padding: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .phone-screen { width: 100%; height: 100%; background: #f5f5f5;
                    border-radius: 30px; overflow: hidden; display: flex;
                    flex-direction: column; position: relative; }

    /* 状态栏 */
    .status-bar { height: 44px; background: #fff; display: flex;
                  align-items: center; justify-content: space-between;
                  padding: 0 20px; font-size: 12px; font-weight: 600; flex-shrink: 0; }

    /* 导航栏 */
    .nav-bar { height: 44px; background: #fff; display: flex; align-items: center;
               padding: 0 16px; border-bottom: 1px solid #eee; flex-shrink: 0; }
    .nav-bar-back { width: 32px; font-size: 20px; cursor: pointer; color: #333; }
    .nav-bar-title { flex: 1; text-align: center; font-size: 16px; font-weight: 600; }
    .nav-bar-right { width: 32px; }

    /* 页面内容 */
    .page-content { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }

    /* TabBar */
    .tab-bar { height: 50px; background: #fff; display: flex; border-top: 1px solid #eee; flex-shrink: 0; }
    .tab-item { flex: 1; display: flex; flex-direction: column; align-items: center;
                justify-content: center; font-size: 10px; color: #999; cursor: pointer; }
    .tab-item.active { color: #2B6CB0; }
    .tab-icon { font-size: 20px; margin-bottom: 2px; }

    /* 通用组件 */
    .card { background: #fff; border-radius: 12px; padding: 16px; margin: 12px; }
    .btn-primary { background: #2B6CB0; color: #fff; border-radius: 8px; padding: 12px;
                   text-align: center; font-weight: 600; cursor: pointer; font-size: 15px; }
    .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
    .tag-green { background: #F0FFF4; color: #38A169; }
    .tag-red { background: #FFF5F5; color: #E53E3E; }
    .tag-blue { background: #EBF8FF; color: #2B6CB0; }
    .empty-state { text-align: center; padding: 40px 20px; }
    .empty-icon { font-size: 48px; margin-bottom: 12px; }
    .empty-text { color: #999; font-size: 14px; }

    /* Toast */
    .toast { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
             background: rgba(0,0,0,0.75); color: #fff; padding: 10px 20px;
             border-radius: 8px; font-size: 14px; z-index: 100; pointer-events: none; }
  </style>
</head>
<body>
  <!-- 侧边栏 - 由 renderSidebar() 动态生成 -->
  <div class="sidebar" id="sidebar"></div>

  <!-- 设备区域 -->
  <div class="device-container">
    <div class="phone-frame">
      <div class="phone-screen" id="phoneScreen"></div>
    </div>
  </div>

  <!-- 脚本加载顺序：数据 → 状态 → 视图 -->
  <script src="data.js"></script>
  <script src="app.js"></script>
  <script src="ui.js"></script>
</body>
</html>
```

---

## 2. app.js 状态管理模板

```javascript
window.AppState = {
  // === 核心导航状态 ===
  currentPage: 'home',
  pageStack: ['home'],
  params: {},

  // === 业务状态 ===
  user: {},
  filters: { category: '全部', grade: '全部', sort: '最新' },
  selectedItems: new Set(),
  currentTab: 0,

  // === 初始化 ===
  init() {
    this.user = { ...window.AppData.currentUser };
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
    this.render();
  },

  // === 渲染入口 ===
  render() {
    document.getElementById('phoneScreen').innerHTML = window.AppUI.render();
    // 更新侧边栏高亮
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === this.currentPage);
    });
  },

  // === 业务方法（按需扩展） ===
  setFilter(key, value) {
    this.filters[key] = value;
    this.render();
  },

  setTab(tabName, value) {
    this[tabName] = value;
    this.render();
  },
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => AppState.init());
```

---

## 3. ui.js 公共组件模板

```javascript
window.AppUI = {
  // 主渲染入口
  render() {
    switch (AppState.currentPage) {
      case 'home': return this.renderHome();
      // ... 其他页面
      default: return '<div class="empty-state"><div class="empty-icon">🚧</div><div class="empty-text">页面开发中</div></div>';
    }
  },

  // === 公共组件 ===
  renderStatusBar(dark = false) {
    const color = dark ? '#fff' : '#333';
    return '<div class="status-bar" style="color:' + color + '"><span>9:41</span><span>··· 📶 🔋</span></div>';
  },

  renderNavBar(title, showBack = false) {
    const back = showBack ? '<div class="nav-bar-back" onclick="AppState.goBack()">‹</div>' : '<div class="nav-bar-back"></div>';
    return '<div class="nav-bar">' + back + '<div class="nav-bar-title">' + title + '</div><div class="nav-bar-right"></div></div>';
  },

  renderTabBar(activeIndex = 0) {
    const tabs = [
      { icon: '🏠', label: '首页', page: 'home' },
      { icon: '📦', label: '资源', page: 'resourceList' },
      { icon: '📋', label: '同步', page: 'sync' },
      { icon: '👤', label: '我的', page: 'mine' },
    ];
    return '<div class="tab-bar">' + tabs.map((t, i) =>
      '<div class="tab-item' + (i === activeIndex ? ' active' : '') + '" onclick="AppState.switchTab(\'' + t.page + '\')"><div class="tab-icon">' + t.icon + '</div><div>' + t.label + '</div></div>'
    ).join('') + '</div>';
  },

  showToast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.getElementById('phoneScreen').appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  // === 侧边栏渲染 ===
  renderSidebar() {
    const groups = [
      { title: '首页模块', pages: [
        { name: '首页', page: 'home' },
        { name: '搜索', page: 'search' },
        { name: '登录', page: 'login' },
      ]},
      // ... 更多模块
    ];
    let html = '<div class="sidebar-header"><h2>📱 产品名称</h2><p>产品原型 v1.0</p></div>';
    groups.forEach((g, i) => {
      html += '<div class="nav-group" id="navGroup' + i + '"><div class="nav-group-title" onclick="document.getElementById(\'navGroup' + i + '\').classList.toggle(\'collapsed\')">' + g.title + ' <span class="arrow">▼</span></div><div class="nav-items">';
      g.pages.forEach(p => {
        html += '<div class="nav-item" data-page="' + p.page + '" onclick="AppState.navigateTo(\'' + p.page + '\')">' + p.name + '</div>';
      });
      html += '</div></div>';
    });
    document.getElementById('sidebar').innerHTML = html;
  },
};

// 初始化侧边栏
window.addEventListener('DOMContentLoaded', () => AppUI.renderSidebar());
```

---

## 4. data.js 数据模型模板

```javascript
window.AppData = {
  // 用户数据
  currentUser: {
    id: 'U001',
    name: '张老师',
    avatar: '',
    isVip: true,
    vipLevel: 3,
    points: 3680,
    signDays: 5,
  },

  // 配置数据
  categories: ['全部', '试卷', '教案', '课件', '字帖', '其他'],
  grades: ['全部', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],

  // 业务数据（使用真实内容）
  resources: [
    { id: 'R001', title: '人教版三年级数学上册期末测试卷（含答案）',
      category: '试卷', grade: '三年级', price: 0, originalPrice: 5,
      downloadCount: 12580, collectCount: 890, format: 'PDF' },
    // ... 更多资源
  ],

  // 订单数据
  orders: [
    { id: 'ORD001', resourceId: 'R001', title: '三年级数学期末测试卷',
      amount: 5.00, status: '已完成', createTime: '2026-04-20 10:30' },
    // ... 更多订单
  ],
};
```

---

## 5. 常用页面模板

### 列表页

```javascript
renderResourceList() {
  const D = window.AppData;
  let filtered = D.resources;
  if (AppState.filters.category !== '全部') {
    filtered = filtered.filter(r => r.category === AppState.filters.category);
  }

  let html = this.renderStatusBar() + this.renderNavBar('资源列表', true);
  // 筛选栏
  html += '<div style="display:flex;padding:12px;gap:8px;overflow-x:auto">';
  D.categories.forEach(c => {
    const active = AppState.filters.category === c;
    html += '<div style="padding:6px 16px;border-radius:20px;font-size:13px;white-space:nowrap;cursor:pointer;background:' + (active ? '#2B6CB0' : '#fff') + ';color:' + (active ? '#fff' : '#666') + '" onclick="AppState.setFilter(\'category\',\'' + c + '\')">' + c + '</div>';
  });
  html += '</div>';
  // 列表
  filtered.forEach(r => {
    html += '<div class="card" style="display:flex;gap:12px;cursor:pointer" onclick="AppState.navigateTo(\'resourceDetail\',{resourceId:\'' + r.id + '\'})"><div style="width:80px;height:80px;border-radius:8px;background:linear-gradient(135deg,#2B6CB0,#4299E1);flex-shrink:0"></div><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + r.title + '</div><div style="margin-top:4px;font-size:12px;color:#999">' + r.grade + ' · ' + r.category + ' · ' + r.format + '</div><div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:16px;font-weight:700;color:' + (r.price > 0 ? '#F56565' : '#48BB78') + '">' + (r.price > 0 ? '¥' + r.price.toFixed(2) : '免费') + '</span><span style="font-size:12px;color:#999">' + r.downloadCount + '次下载</span></div></div></div>';
  });
  return html;
}
```

### 详情页

```javascript
renderResourceDetail() {
  const r = AppData.resources.find(x => x.id === AppState.params.resourceId) || AppData.resources[0];
  const collected = AppState.collectedResources.has(r.id);
  return this.renderStatusBar() + this.renderNavBar('资源详情', true)
    + '<div style="padding:16px"><div style="height:200px;border-radius:12px;background:linear-gradient(135deg,#2B6CB0,#4299E1);display:flex;align-items:center;justify-content:center;font-size:48px">📄</div></div>'
    + '<div class="card"><div style="font-size:16px;font-weight:600">' + r.title + '</div><div style="margin-top:8px;font-size:13px;color:#999">' + r.grade + ' · ' + r.category + ' · ' + r.format + '</div><div style="margin-top:12px;display:flex;gap:16px;font-size:13px;color:#666"><span>📥 ' + r.downloadCount + '次下载</span><span>⭐ ' + r.collectCount + '次收藏</span></div></div>'
    + '<div style="padding:0 16px 16px"><div class="btn-primary" onclick="AppState.simulateDownload(\'' + r.id + '\')">' + (r.price > 0 ? '¥' + r.price.toFixed(2) + ' 立即购买' : '免费下载') + '</div></div>';
}
```

### 表单页

```javascript
renderLogin() {
  return this.renderStatusBar() + this.renderNavBar('登录', true)
    + '<div style="padding:40px 24px"><div style="text-align:center;margin-bottom:40px"><div style="font-size:48px;margin-bottom:12px">📱</div><div style="font-size:20px;font-weight:600">欢迎登录</div></div>'
    + '<div style="margin-bottom:16px"><div style="font-size:14px;color:#666;margin-bottom:8px">手机号</div><div style="border:1px solid #ddd;border-radius:8px;padding:12px;font-size:14px;background:#fff">请输入手机号</div></div>'
    + '<div style="margin-bottom:16px"><div style="font-size:14px;color:#666;margin-bottom:8px">密码</div><div style="border:1px solid #ddd;border-radius:8px;padding:12px;font-size:14px;background:#fff">请输入密码</div></div>'
    + '<div class="btn-primary" style="margin-top:24px" onclick="AppState.showToast(\'登录成功\');AppState.switchTab(\'home\')">登录</div>'
    + '<div style="text-align:center;margin-top:16px;font-size:13px;color:#2B6CB0;cursor:pointer">忘记密码？</div></div>';
}
```
