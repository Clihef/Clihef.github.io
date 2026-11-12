# 个人主页维护说明

网站地址：https://clihef.github.io/

GitHub 仓库：https://github.com/Clihef/Clihef.github.io

## 修改已有笔记（推荐）

1. 登录 GitHub，打开仓库里的 `notes/rl-first-three.md`。
2. 点击铅笔图标（Edit this file），直接修改文字；也可以用本地编辑好的 Markdown 全文替换。
3. 点击 **Commit changes**，提交到 `main` 分支。
4. 等待 GitHub Pages 部署完成后刷新网站。通常几分钟，官方说明最长可能需要约 10 分钟。

**保持文件名和路径 `notes/rl-first-three.md` 不变，就不需要修改网页代码。** 文章标题和左侧目录跟随 Markdown 内容自动更新。如果笔记范围已不再是前三章，还要同步修改首页卡片、`note.html` 的浏览器标题、简介和顶部范围文字。

## 用本地文件整体替换

在 GitHub 中进入 `notes` 文件夹，选择 **Add file → Upload files**，上传已经改名为 `rl-first-three.md` 的新文件，提交到 `main`。也可以在网页编辑器中全选旧内容，粘贴新版全文，再提交。

## 继续写第四章

最简单的方法是在同一文件末尾追加第四章。Markdown 的一级、二级标题会自动进入目录。若希望分成独立文章，可以再增加新的 `.md` 文件和阅读入口；届时可以让 Codex 帮你扩展，目前先维护一篇完整笔记。

## Markdown 与公式

- 标题：`# 第一章`、`## 1. 基本概念`、`### 1.1 细节`。
- 行内公式：`$V^\pi(s)$` 或 `\(V^\pi(s)\)`。
- 独立公式：`$$ ... $$` 或 `\[ ... \]`。
- 表格、列表、粗体、代码块均支持。
- 图片可放在 `notes/images/`，在当前笔记中写 `![图片说明](notes/images/example.png)`；图片地址相对于阅读页 `note.html`，不是 Markdown 文件。
- 笔记文字没有经过学术校审，网站保留其初稿性质。

## 修改个人信息和页面

- `index.html`：首页介绍、笔记入口、关于与项目展示。
- `note.html`：阅读页外壳及编辑、下载链接。
- `style.css`：配色和布局。
- `reader.js`：Markdown、公式保护和目录生成。
- `vendor/`：随网站提供的第三方库，无需日常修改。

## 本地预览

在此文件所在目录打开终端，运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

浏览器访问 http://127.0.0.1:8000 ，按 Ctrl+C 停止。首页可以直接双击打开；笔记阅读页需要 HTTP 服务，直接双击会被浏览器的文件读取限制阻止。

## 发布配置与检查

仓库 **Settings → Pages → Build and deployment** 设置：

- Source：Deploy from a branch
- Branch：main
- Folder：/ (root)

`.nojekyll` 表示直接发布网页文件，无需安装构建工具。部署进度见仓库 Actions。提交后如果内容未更新，先检查部署是否成功，再强制刷新浏览器。

网站及仓库面向公众，不要提交密码、API 密钥或其他不打算公开的资料。历史版本可在文件的 History 中查看、恢复。

## 第三方库

本项目随附 Marked 15.0.12（MIT）、DOMPurify 3.2.6（Apache-2.0 / MPL-2.0）、MathJax 3.2.2（Apache-2.0）。许可证见 vendor 目录。首次发布使用固定版本；后续升级应重新检查 Markdown 与公式显示。
