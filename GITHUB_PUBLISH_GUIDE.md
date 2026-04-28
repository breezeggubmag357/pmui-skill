# GitHub 发布指南

本指南帮助你将 pmui-skill 发布到 GitHub。

## 前置准备

1. **GitHub 账号**: 确保你有 GitHub 账号
2. **Git 安装**: 确保本地已安装 Git
3. **仓库准备**: 在 GitHub 上创建新仓库

## 步骤一：创建 GitHub 仓库

1. 登录 GitHub，点击右上角 `+` 按钮
2. 选择 `New repository`
3. 填写仓库信息：
   - Repository name: `pmui-skill`
   - Description: `交互式产品原型生成器 - 专业的原型设计工具`
   - Public/Private: 根据需要选择
   - Initialize with README: ❌ 不要勾选（我们已经有 README.md）
4. 点击 `Create repository`

## 步骤二：初始化 Git 并推送

在终端中执行以下命令：

```bash
# 进入项目目录
cd /workspace/projects/pmui-github

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial release: PMUI v1.0.0

- 支持 iOS/Android/iPad/Desktop 四大平台
- 完整的平台设计规范文档
- 代码模板和使用示例"

# 设置主分支为 main
git branch -M main

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/pmui-skill.git

# 推送到 GitHub
git push -u origin main
```

**重要**: 将 `your-username` 替换为你的 GitHub 用户名

## 步骤三：配置 GitHub 仓库

### 1. 设置仓库描述和标签

进入仓库页面，点击 `Settings` → `General`，设置：
- Description: `交互式产品原型生成器 - 专业的原型设计工具`
- Topics: `prototype`, `ui-design`, `product-management`, `coze`, `skill`, `interactive-prototype`

### 2. 设置仓库图标（可选）

上传一个项目 Logo 作为仓库图标。

### 3. 启用 Issues 和 Wiki

在 `Settings` → `Features` 中：
- ✅ Issues: 启用（用于反馈和建议）
- ✅ Wiki: 可选（用于扩展文档）
- ❌ Projects: 可选（用于项目管理）

### 4. 设置分支保护（推荐）

在 `Settings` → `Branches` 中：
- Add rule: `main`
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging

## 步骤四：创建 Release

### 1. 创建第一个 Release

1. 进入仓库页面，点击右侧 `Releases` → `Create a new release`
2. 填写信息：
   - Tag version: `v1.0.0`
   - Release title: `PMUI v1.0.0 - 初始版本`
   - Description:
     ```
     ## 🎉 首次发布

     PMUI 交互式产品原型生成器初始版本发布！

     ## ✨ 新特性
     - 支持 iOS/iPhone、Android、iPad、Desktop 四大平台
     - 完整的平台设计规范文档（基于 Apple HIG、Material Design）
     - 四文件分离架构，易于维护
     - 包含完整代码模板和使用示例

     ## 📦 下载
     - [pmui.skill](../../releases/download/v1.0.0/pmui.skill) - 直接下载使用

     ## 📖 文档
     - [使用指南](../../blob/main/docs/SKILL.md)
     - [代码模板](../../blob/main/docs/templates.md)
     - [平台规范](../../blob/main/docs/platform-specs.md)
     ```
3. 点击 `Publish release`

### 2. 上传 Assets

在 Release 页面，点击 `Attach binary`，上传 `pmui.skill` 文件。

## 步骤五：优化仓库展示

### 1. 添加截图或演示视频

在 `README.md` 的截影部分添加：

```markdown
## 📸 截影

![Preview](docs/screenshot.png)
```

### 2. 创建 ISSUE 模板（可选）

在 `.github/ISSUE_TEMPLATE/` 下创建模板文件：

**bug_report.md**:
```markdown
---
name: Bug report
about: 报告一个问题
title: '[Bug] '
labels: bug
assignees: ''
---

## 问题描述
简要描述遇到的问题

## 复现步骤
1. 步骤一
2. 步骤二
3. 步骤三

## 期望行为
描述期望的正确行为

## 实际行为
描述实际发生的错误行为

## 环境信息
- 平台: [iOS/Android/iPad/Desktop]
- 版本: [版本号]

## 附加信息
截图、日志或其他相关信息
```

**feature_request.md**:
```markdown
---
name: Feature request
about: 建议新功能
title: '[Feature] '
labels: enhancement
assignees: ''
---

## 功能描述
描述你希望添加的功能

## 使用场景
描述这个功能的使用场景和价值

## 期望效果
描述期望的功能效果

## 其他信息
相关参考或其他建议
```

### 3. 创建 PULL_REQUEST_TEMPLATE.md（可选）

在根目录创建：

```markdown
## PR 类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档改进
- [ ] 性能优化
- [ ] 代码重构

## 变更描述
简要描述本次 PR 的变更内容

## 相关 Issue
Closes #(issue number)

## 测试
描述如何测试这些变更

## 截图
如果适用，添加截图或 GIF

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加/更新文档
- [ ] 已测试所有变更
- [ ] 无控制台错误或警告
```

## 步骤六：推广项目

### 1. 添加到个人简介

在 GitHub 个人简介中添加项目链接。

### 2. 分享到社区

- 在 Coze 社区分享
- 在产品经理/设计师社区分享
- 在技术博客撰写文章介绍

### 3. 添加 Stars 徽章

在 README.md 中添加：

```markdown
![GitHub Stars](https://img.shields.io/github/stars/your-username/pmui-skill?style=social)
![GitHub Forks](https://img.shields.io/github/forks/your-username/pmui-skill?style=social)
```

## 步骤七：维护项目

### 定期更新

- 修复 Bug 和问题
- 添加新功能
- 更新文档
- 创建新的 Release

### 监控 Issues

定期检查并回复 Issues，及时处理反馈。

### 版本管理

遵循语义化版本号 (Semantic Versioning)：
- `MAJOR.MINOR.PATCH`
  - MAJOR: 不兼容的 API 变更
  - MINOR: 向下兼容的功能性新增
  - PATCH: 向下兼容的问题修正

## 常见问题

### Q: 如何更新 README.md？

A: 修改文件后提交：

```bash
git add README.md
git commit -m "Update README"
git push origin main
```

### Q: 如何创建新版本？

A: 参考步骤四，创建新的 Tag 和 Release。

### Q: 如何邀请协作者？

A: 在 `Settings` → `Collaborators` 中添加协作者。

### Q: 如何删除仓库？

A: 在 `Settings` → `Danger Zone` → `Delete this repository`，注意此操作不可逆。

## 参考资源

- [GitHub 官方文档](https://docs.github.com/)
- [Git 官方文档](https://git-scm.com/doc)
- [语义化版本号](https://semver.org/)
- [如何写好 README](https://www.makeareadme.com/)

---

祝你发布顺利！🎉
