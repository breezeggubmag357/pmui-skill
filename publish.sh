#!/bin/bash

# PMUI Skill - GitHub 发布脚本
# 使用方法: bash publish.sh

echo "=========================================="
echo "  PMUI Skill - GitHub 发布助手"
echo "=========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "pmui.skill" ]; then
    echo "❌ 错误: 请在 pmui-github 目录下运行此脚本"
    exit 1
fi

# 提示用户输入 GitHub 用户名
read -p "请输入你的 GitHub 用户名: " USERNAME

if [ -z "$USERNAME" ]; then
    echo "❌ 错误: 用户名不能为空"
    exit 1
fi

# 仓库名称
REPO_NAME="pmui-skill"
REMOTE_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo ""
echo "📋 配置信息:"
echo "   用户名: ${USERNAME}"
echo "   仓库名: ${REPO_NAME}"
echo "   仓库地址: ${REMOTE_URL}"
echo ""

# 确认
read -p "确认以上信息是否正确? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "❌ 已取消"
    exit 0
fi

echo ""
echo "🚀 开始发布流程..."
echo ""

# 初始化 Git
echo "1️⃣  初始化 Git 仓库..."
git init

# 添加所有文件
echo "2️⃣  添加文件..."
git add .

# 提交
echo "3️⃣  提交更改..."
git commit -m "Initial release: PMUI v1.0.0

- 支持 iOS/Android/iPad/Desktop 四大平台
- 完整的平台设计规范文档
- 代码模板和使用示例"

# 设置主分支
echo "4️⃣  设置主分支..."
git branch -M main

# 添加远程仓库
echo "5️⃣  添加远程仓库..."
git remote add origin "${REMOTE_URL}"

# 推送
echo "6️⃣  推送到 GitHub..."
echo "   如果出现认证错误，请使用:"
echo "   git remote set-url origin git@github.com:${USERNAME}/${REPO_NAME}.git"
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 发布成功！"
    echo ""
    echo "🎉 下一步操作:"
    echo "   1. 访问: ${REMOTE_URL}"
    echo "   2. 在 GitHub 上创建 Release (v1.0.0)"
    echo "   3. 上传 pmui.skill 文件到 Release"
    echo "   4. 配置仓库描述和标签"
    echo ""
    echo "📖 详细指南请查看: GITHUB_PUBLISH_GUIDE.md"
else
    echo ""
    echo "❌ 推送失败"
    echo "   请检查:"
    echo "   1. GitHub 用户名是否正确"
    echo "   2. 是否已在 GitHub 上创建仓库"
    echo "   3. Git 认证配置是否正确"
    echo ""
    echo "   如果使用 HTTPS 认证失败，尝试使用 SSH:"
    echo "   git remote set-url origin git@github.com:${USERNAME}/${REPO_NAME}.git"
    echo "   git push -u origin main"
fi

echo ""
echo "=========================================="
