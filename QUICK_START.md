# 快速发布参考

## 🚀 三步发布

### 1. 创建 GitHub 仓库

访问 https://github.com/new 创建名为 `pmui-skill` 的仓库

### 2. 执行发布脚本

```bash
cd /workspace/projects/pmui-github
bash publish.sh
```

按提示输入你的 GitHub 用户名即可。

### 3. 创建 Release

访问你的 GitHub 仓库，创建 `v1.0.0` Release 并上传 `pmui.skill` 文件。

---

## 📝 手动发布命令

如果不使用脚本，手动执行：

```bash
cd /workspace/projects/pmui-github

git init
git add .
git commit -m "Initial release: PMUI v1.0.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pmui-skill.git
git push -u origin main
```

**替换 `YOUR_USERNAME` 为你的 GitHub 用户名**

---

## 🔑 Git 认证问题

如果推送时遇到认证错误，使用 SSH 替代 HTTPS：

```bash
git remote set-url origin git@github.com:YOUR_USERNAME/pmui-skill.git
git push -u origin main
```

---

## 📦 Release 说明

创建 Release 时的内容：

```
## 🎉 首次发布

PMUI 交互式产品原型生成器初始版本发布！

## ✨ 新特性
- 支持 iOS/iPhone、Android、iPad、Desktop 四大平台
- 完整的平台设计规范文档（基于 Apple HIG、Material Design）
- 四文件分离架构，易于维护
- 包含完整代码模板和使用示例

## 📦 下载
- pmui.skill - 直接下载使用

## 📖 文档
- 使用指南
- 代码模板
- 平台规范
```

---

## 📚 完整指南

详细发布步骤请查看 [GITHUB_PUBLISH_GUIDE.md](GITHUB_PUBLISH_GUIDE.md)
