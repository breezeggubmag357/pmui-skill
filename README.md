# PMUI - 交互式产品原型生成器

生成专业级交互式产品原型的 Skill，采用「左侧导航 + 右侧设备模型」的经典原型工具交互模式，让产品经理和开发者能快速浏览、验证产品页面流程和交互逻辑。

![PMUI](https://img.shields.io/badge/PMUI-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特性

- 🎨 **多平台支持**: iOS/iPhone、Android、iPad、Desktop/Web 四大平台
- 📱 **真实设备模拟**: iPhone、Android、iPad、Desktop 设备外壳
- 🎯 **专业设计规范**: 基于 Apple HIG、Google Material Design 等行业标准
- 🔧 **完整交互逻辑**: 页面导航、参数传递、状态管理
- 📚 **详细模板文档**: 包含完整代码模板和设计规范
- 🚀 **快速生成**: 四文件分离架构，易于维护和扩展

## 📸 截影

*(建议添加产品截图或演示视频)*

## 📦 安装

### 方法一：直接下载

1. 下载最新版本的 `pmui.skill` 文件
2. 在 Coze 平台导入该 Skill 文件
3. 即可开始使用

### 方法二：克隆仓库

```bash
git clone https://github.com/breezeggubmag357/pmui-skill.git
cd pmui-skill
```

## 🚀 使用

### 快速开始

1. **理解需求**: 确认产品类型、核心页面、业务数据、设备类型
2. **规划页面结构**: 按业务模块分组列出所有页面
3. **生成代码**: 按 data.js → app.js → ui.js → index.html 顺序生成
4. **验证修复**: 语法检查、启动预览、浏览器验证

### 示例

创建一个电商产品原型：

```bash
# 启动预览服务器
bash scripts/serve.sh 9000
```

然后访问 <http://localhost:9000> 查看原型。

## 📖 文档

详细文档请参考：

- [SKILL 使用指南](docs/SKILL.md) - 完整的使用说明和工作流程
- [代码模板](docs/templates.md) - index.html、app.js、ui.js、data.js 模板
- [平台设计规范](docs/platform-specs.md) - iOS/Android/iPad/Desktop 详细规范

### 平台规范

- [iOS/iPhone 平台规范](docs/platform-specs.md#1-iosiphone-平台规范) - 状态栏、导航栏、安全区、TabBar
- [Android 平台规范](docs/platform-specs.md#2-android-平台规范) - Material Design、波纹效果、底部导航
- [iPad 平板规范](docs/platform-specs.md#3-ipad-平板规范) - 分栏布局、网格布局
- [Desktop/Web 平台规范](docs/platform-specs.md#4-desktopweb-平台规范) - 响应式、表单、导航

## 🏗️ 架构

采用**四文件分离架构**，职责清晰：

```
prototype/
├── data.js      # 数据层：所有业务数据模型
├── app.js       # 状态层：全局状态管理、导航栈
├── ui.js        # 视图层：所有页面的渲染函数
└── index.html   # 入口层：设备外壳、侧边栏、CSS样式
```

## 🎯 适用场景

- ✅ 产品经理创建产品原型
- ✅ 开发者验证交互逻辑
- ✅ 团队演示产品流程
- ✅ 快速生成可点击的 demo
- ✅ Vibe Coding 流程中的原型产出

## 🛠️ 技术栈

- 纯 HTML/CSS/JavaScript
- 无需构建工具
- 支持本地预览服务器

## 🤝 贡献

欢迎贡献代码、提出建议或报告问题！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 变更日志

### v1.0.0 (2025-04-27)

- 🎉 初始版本发布
- ✅ 支持 iOS/Android/iPad/Desktop 四大平台
- ✅ 完整的平台设计规范文档
- ✅ 代码模板和使用示例

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Google Material Design](https://material.io/design)
- [微信小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)
- [Ant Design](https://ant.design/)

## 📮 联系方式

- 项目主页: [https://github.com/breezeggubmag357/pmui-skill](https://github.com/your-username/pmui-skill)
- 问题反馈: [Issues](https://github.com/your-username/pmui-skill/issues)

***

⭐ 如果这个项目对你有帮助，请给个 Star！
