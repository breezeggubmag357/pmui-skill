# 平台设计规范

本文档详细定义不同平台和设备的页面各区域内容展示规范，基于 Apple Human Interface Guidelines、Google Material Design、微信小程序设计规范等行业标准制定。

## 目录

1. [iOS/iPhone 平台规范](#1-iosiphone-平台规范)
2. [Android 平台规范](#2-android-平台规范)
3. [iPad 平板规范](#3-ipad-平板规范)
4. [Desktop/Web 平台规范](#4-desktopweb-平台规范)
5. [通用设计原则](#5-通用设计原则)
6. [反面案例](#6-反面案例)

---

## 1. iOS/iPhone 平台规范

### 1.1 状态栏 (Status Bar)

**高度**: 44pt (包含刘海区域)

**内容规范**:
- **时间**: 24小时制，格式 `09:41`，字重 600
- **信号**: 左侧显示，4-5格，图标大小 18x22pt
- **电池**: 右侧显示，显示百分比，图标大小 25x11pt
- **刘海**: iPhone X 及以上机型有刘海，状态栏内容需避开

**实现要求**:
```css
.status-bar {
  height: 44px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 12px;
  font-weight: 600;
}
```

### 1.2 导航栏 (Navigation Bar)

**高度**: 44pt

**内容规范**:
- **标题**: 居中，字重 600，字号 17pt，最多显示 2 行（约 24 字符）
- **返回按钮**: 左侧，蓝色 `#007AFF`，图标 `<` 或文字"返回"
- **右侧操作按钮**: 最多 2 个，蓝色 `#007AFF`，文字或图标

**交互规范**:
- 点击返回: 带滑动动画返回上一页
- 点击操作: 执行相应功能，完成后可选返回

**实现示例**:
```html
<div class="nav-bar">
  <div class="nav-bar-back" onclick="AppState.goBack()">
    &lt; 返回
  </div>
  <div class="nav-bar-title">订单详情</div>
  <div class="nav-bar-right" onclick="shareOrder()">分享</div>
</div>
```

### 1.3 安全区 (Safe Area)

**顶部安全区**: 刘凹以下 44pt，内容需避让

**底部安全区**: Home Indicator 以上 34pt

**实现要求**:
```css
.page-content {
  padding-bottom: 34px; /* 底部安全区 */
}
.tab-bar {
  padding-bottom: 34px; /* Home Indicator 避让 */
}
```

### 1.4 列表/卡片 (List/Card)

**卡片规范**:
- **圆角**: 8-12pt
- **间距**: 左右 16pt，上下 8pt
- **背景**: 白色 `#FFFFFF`
- **阴影**: 无阴影或极浅阴影 `box-shadow: 0 1px 3px rgba(0,0,0,0.05)`

**列表项规范**:
- **高度**: 最小 44pt (可点击区域)
- **分隔线**: 1pt，颜色 `#F2F2F7`
- **点击反馈**: 背景色变为 `#F2F2F7`

**实现示例**:
```css
.card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 16px;
}
.list-item {
  height: 44px;
  border-bottom: 1px solid #F2F2F7;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.list-item:active {
  background: #F2F2F7;
}
```

### 1.5 TabBar (底部标签栏)

**高度**: 50pt + 34pt (安全区)

**内容规范**:
- **图标大小**: 24x24pt
- **文字大小**: 10pt
- **选中颜色**: 蓝色 `#007AFF`
- **未选中颜色**: 灰色 `#8E8E93`
- **标签数量**: 3-5 个

**实现示例**:
```css
.tab-bar {
  height: 50px;
  background: #fff;
  display: flex;
  border-top: 1px solid #E5E5EA;
  padding-bottom: 34px;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8E8E93;
}
.tab-item.active {
  color: #007AFF;
}
```

---

## 2. Android 平台规范

### 2.1 状态栏 (Status Bar)

**高度**: 24dp (不含导航栏)

**内容规范**:
- **时间**: 12小时制或24小时制，格式 `9:41 AM` 或 `09:41`
- **信号**: 左侧，4-5格
- **电池**: 右侧，显示图标和百分比
- **通知图标**: 可选，显示应用通知数量

**实现要求**:
```css
.status-bar {
  height: 24px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
}
```

### 2.2 导航栏 (Toolbar/App Bar)

**高度**: 56dp

**内容规范**:
- **标题**: 左对齐或居中，字号 20dp，字重 500
- **返回按钮**: 左侧，汉堡菜单或返回图标，24x24dp
- **右侧操作按钮**: 最多 3 个，图标按钮 24x24dp

**Material Design 特性**:
- **阴影**: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)`
- **波纹效果**: 点击时显示水波纹扩散
- **颜色**: 主题色或白色

**实现示例**:
```css
.app-bar {
  height: 56px;
  background: #2196F3;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.app-bar-title {
  font-size: 20px;
  font-weight: 500;
  margin-left: 16px;
}
```

### 2.3 底部导航栏 (Bottom Navigation)

**高度**: 56dp

**内容规范**:
- **图标大小**: 24x24dp
- **文字大小**: 12dp
- **选中颜色**: 主题色
- **未选中颜色**: 灰色 `#9E9E9E`
- **标签数量**: 3-5 个

**Material Design 特性**:
- **波纹效果**: 点击时显示水波纹
- **图标 + 文字**: 垂直排列，居中对齐

**实现示例**:
```css
.bottom-nav {
  height: 56px;
  background: #fff;
  display: flex;
  border-top: 1px solid #E0E0E0;
  elevation: 8;
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
}
.nav-item.active {
  color: #2196F3;
}
```

### 2.4 列表项 (List Item)

**高度**: 56dp 或 72dp

**内容规范**:
- **左侧图标**: 40x40dp (可选)
- **标题**: 字号 16dp，字重 500
- **副标题**: 字号 14dp，颜色 `#757575`
- **右侧操作**: 图标或文字

**Material Design 特性**:
- **Ripple 效果**: 点击时显示水波纹扩散
- **分割线**: 1dp，颜色 `#E0E0E0`

**实现示例**:
```css
.list-item {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #E0E0E0;
}
.list-item:active {
  background: rgba(33, 150, 243, 0.08);
}
```

---

## 3. iPad 平板规范

### 3.1 布局特点

**屏幕尺寸**: 768x1024pt (Portrait)

**布局模式**:
- **单栏布局**: iPhone 模式，内容居中
- **分栏布局**: 左侧导航列表，右侧详情视图
- **网格布局**: 2-3 列，充分利用宽度

**间距规范**:
- **基础间距**: 16pt (比 iPhone 大 4pt)
- **卡片间距**: 16pt
- **左右边距**: 24pt

### 3.2 导航栏

**高度**: 50pt

**内容规范**:
- **标题**: 字号 17-20pt，字重 600
- **操作按钮**: 可放置更多操作（3-4 个）
- **返回按钮**: 文字"返回"或图标

**实现示例**:
```css
.nav-bar {
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #E5E5EA;
}
.nav-bar-title {
  font-size: 18px;
  font-weight: 600;
}
```

### 3.3 分栏布局 (Split View)

**左侧导航列表**: 宽度 320pt，固定
**右侧详情视图**: 剩余空间

**适用场景**:
- 邮件应用 (邮件列表 + 邮件详情)
- 文件管理 (文件列表 + 文件预览)
- 设置应用 (设置项 + 设置详情)

**实现示例**:
```css
.split-view {
  display: flex;
  height: 100%;
}
.split-sidebar {
  width: 320px;
  background: #F2F2F7;
  border-right: 1px solid #E5E5EA;
}
.split-detail {
  flex: 1;
  background: #fff;
}
```

### 3.4 网格布局

**列数**: 2-3 列
**列宽**: (总宽度 - 间距) / 列数
**间距**: 16pt

**适用场景**:
- 图片库
- 商品列表
- 应用图标

**实现示例**:
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}
.grid-item {
  background: #fff;
  border-radius: 12px;
  aspect-ratio: 1;
}
```

### 3.5 TabBar (横屏模式)

**高度**: 49pt

**差异**:
- **图标大小**: 28x28pt (比 iPhone 大 4pt)
- **文字大小**: 11pt
- **位置**: 左侧边栏模式更常见

---

## 4. Desktop/Web 平台规范

### 4.1 导航规范

**顶部导航栏**:
- **高度**: 56-64px
- **内容**: Logo + 导航菜单 + 用户操作

**面包屑 (Breadcrumbs)**:
- **位置**: 内容区域顶部
- **格式**: 首页 > 分类 > 页面
- **颜色**: 灰色 `#9E9E9E`，当前页黑色

**侧边栏导航** (管理后台):
- **宽度**: 200-240px
- **折叠宽度**: 64px
- **内容**: 图标 + 文字

**实现示例**:
```css
.top-nav {
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.breadcrumbs {
  padding: 16px 24px;
  font-size: 14px;
  color: #9E9E9E;
}
.breadcrumbs span:last-child {
  color: #333;
}
```

### 4.2 内容布局

**最大宽度限制**: 1200px 或 1440px
**居中对齐**: 大屏幕下内容居中
**左右边距**: 24px

**实现示例**:
```css
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### 4.3 表单规范

**布局**:
- **标签位置**: 左对齐或顶部对齐
- **标签宽度**: 120-150px (左对齐模式)
- **输入框宽度**: 100% 或固定宽度 300-400px

**输入框规范**:
- **高度**: 40px
- **圆角**: 4px
- **边框**: 1px solid `#E0E0E0`
- **聚焦边框**: 主题色 2px

**按钮规范**:
- **主按钮**: 主题色背景，白色文字，高度 40px
- **次按钮**: 白色背景，主题色边框，高度 40px
- **间距**: 按钮 8px 间距

**实现示例**:
```css
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.form-label {
  width: 120px;
  font-size: 14px;
  color: #333;
}
.form-input {
  flex: 1;
  height: 40px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 0 12px;
  max-width: 400px;
}
.form-input:focus {
  outline: none;
  border-color: #2196F3;
  border-width: 2px;
}
```

### 4.4 卡片与列表

**卡片规范**:
- **圆角**: 8px
- **阴影**: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- **间距**: 16px
- **内边距**: 20-24px

**列表规范**:
- **高度**: 48-56px
- **悬停效果**: 背景色变为 `#F5F5F5`
- **分隔线**: 1px，颜色 `#E0E0E0`

**实现示例**:
```css
.card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.list-item {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #E0E0E0;
}
.list-item:hover {
  background: #F5F5F5;
}
```

### 4.5 响应式设计

**断点**:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

**适配策略**:
- **Mobile**: 单列布局，隐藏侧边栏
- **Tablet**: 2 列布局，调整间距
- **Desktop**: 完整布局，最大宽度限制

**实现示例**:
```css
@media (max-width: 768px) {
  .sidebar { display: none; }
  .content-wrapper { padding: 0 16px; }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .grid-container { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid-container { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 5. 通用设计原则

### 5.1 文字层级

| 级别 | 字号 | 字重 | 颜色 | 用途 |
|------|------|------|------|------|
| H1 | 24-28pt | 600-700 | #333 | 页面主标题 |
| H2 | 20-22pt | 600 | #333 | 模块标题 |
| H3 | 16-18pt | 600 | #333 | 子标题 |
| Body | 14-16pt | 400-500 | #333 | 正文 |
| Caption | 12pt | 400 | #999 | 辅助文字 |

**实现示例**:
```css
h1 { font-size: 28px; font-weight: 700; color: #333; }
h2 { font-size: 22px; font-weight: 600; color: #333; }
h3 { font-size: 18px; font-weight: 600; color: #333; }
.body-text { font-size: 16px; font-weight: 400; color: #333; }
.caption-text { font-size: 12px; font-weight: 400; color: #999; }
```

### 5.2 颜色规范

**主色 (Primary)**: 应用主题色，如 `#2196F3` (蓝)、`#E91E63` (粉)
**辅助色 (Secondary)**: 强调色，如 `#FF9800` (橙)、`#4CAF50` (绿)
**中性色 (Neutral)**:
- 黑色 `#333333`
- 深灰 `#666666`
- 中灰 `#999999`
- 浅灰 `#CCCCCC`
- 背景灰 `#F5F5F5`

**功能色**:
- 成功 `#4CAF50`
- 警告 `#FF9800`
- 错误 `#F44336`
- 信息 `#2196F3`

**实现示例**:
```css
:root {
  --primary: #2196F3;
  --secondary: #FF9800;
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --text-primary: #333;
  --text-secondary: #666;
  --text-tertiary: #999;
  --bg-gray: #F5F5F5;
}
```

### 5.3 间距规范

**基准单位**: 4px

**常用间距**:
- **4px (0.25x)**: 紧密间距，图标与文字
- **8px (0.5x)**: 小间距，相关元素
- **12px (0.75x)**: 中间距，卡片内部
- **16px (1x)**: 标准间距，默认值
- **24px (1.5x)**: 大间距，模块间
- **32px (2x)**: 超大间距，章节间

**实现示例**:
```css
.spacing-4 { margin: 4px; }
.spacing-8 { margin: 8px; }
.spacing-16 { margin: 16px; }
.spacing-24 { margin: 24px; }
.spacing-32 { margin: 32px; }
```

### 5.4 交互反馈

**点击态 (Active)**:
- **背景**: 变浅色或透明度降低
- **缩放**: 可选 0.95 倍缩放
- **持续时间**: 150-200ms

**加载态 (Loading)**:
- **Spinner**: 圆形旋转动画
- **Skelecton**: 骨架屏占位
- **位置**: 内容区域中心

**空状态 (Empty)**:
- **图标**: 48-64px，灰色
- **文字**: "暂无数据"
- **操作**: 可选引导操作

**错误态 (Error)**:
- **图标**: 48-64px，红色
- **文字**: 错误原因
- **操作**: 重试按钮

**实现示例**:
```css
.btn:active {
  background: rgba(0,0,0,0.05);
  transform: scale(0.95);
  transition: all 0.15s;
}
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #E0E0E0;
  border-top-color: #2196F3;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
```

---

## 6. 反面案例

### 6.1 状态栏错误

❌ **错误**: 状态栏内容混乱，时间格式不统一
```
9:41 AM  📶 75%
```

✅ **正确**: 统一格式，清晰的图标
```
09:41  [📶📶📶📶]  75%
```

### 6.2 导航栏错误

❌ **错误**: 标题过长，显示不全
```
[<] 这是一个非常非常长的订单详情页面标题  [分享]
```

✅ **正确**: 标题精简，最多 24 字符
```
[<] 订单详情  [分享]
```

### 6.3 列表项错误

❌ **错误**: 点击区域过小，难以操作
```
[12pt 图标] 标题文字 (点击区域仅 12pt 高)
```

✅ **正确**: 点击区域至少 44pt
```
[  12pt 图标  ]  标题文字  (点击区域 44pt 高)
```

### 6.4 颜色错误

❌ **错误**: 颜色过多，缺乏层次
```
主按钮: #FF0000
次按钮: #00FF00
背景: #0000FF
```

✅ **正确**: 颜色统一，有层次
```
主按钮: #2196F3 (主色)
次按钮: #90CAF9 (主色浅色)
背景: #F5F5F5 (中性灰)
```

### 6.5 间距错误

❌ **错误**: 间距不统一，视觉混乱
```
左边距: 12px
右边距: 16px
上边距: 20px
下边距: 8px
```

✅ **正确**: 间距统一，使用标准值
```
边距: 16px (统一)
```

### 6.6 交互反馈错误

❌ **错误**: 点击无反馈，用户困惑
```
[按钮] (点击无任何变化)
```

✅ **正确**: 点击有明确反馈
```
[按钮] (点击背景变浅，缩放 0.95)
```

---

## 参考资料

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Google Material Design](https://material.io/design)
- [微信小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)
- [Ant Design 设计规范](https://ant.design/docs/spec/introduce)
