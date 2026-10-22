# 个人作品集 · React + Vite

在本目录运行 `pnpm install`，然后运行 `pnpm dev`，打开终端显示的本地地址。也可使用 npm 对应命令。

本机依赖已安装。如果本机的 pnpm 包装器触发重复安装，可直接启动：

```powershell
cd D:\gpt\网站
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
```

对应构建命令为 `node node_modules/vite/bin/vite.js build`。本版已通过该命令的生产构建检查。

- `pnpm build`：生成 docs 生产文件，供 main 分支部署。
- `pnpm preview`：本地预览构建结果。
- `src/main.jsx`：五个页面模块、作品信息与个人文案。
- `src/style.css`：视觉与响应式样式，内容版心最大 1700px。
- `public/media`：本地头像、视频与封面。作品源文件保留在原目录。

参考：本目录的参考图.png。采用黑底、暖白、橙红点缀、大字、直角影像卡片及错落网格。首版使用 FRAME 作为临时文字标识，可替换成姓名。个人简介与能力描述为待确认草稿；任职经历、年限、播放量和联系方式未编造，已明确标记待补充。四部作品数量来自实际素材。

视频背景为 vlog 的无声压缩片段，提供暂停按钮；作品点击后使用原视频在弹窗内播放，支持 Esc 关闭。开启系统减少动态效果时，背景不自动播放。

字体通过 Google Fonts 加载 Archivo 与 Noto Sans SC；无外网时使用本地无衬线回退字体。网站无需后端，联系方式补充后可加入真实邮箱链接或微信二维码。

## GitHub Pages

目标仓库：https://github.com/gysergio239-sketch/-

在仓库 Settings → Pages 中选择 Deploy from a branch，分支 main，目录 /docs，点击 Save。Vite 使用相对资源路径以兼容仓库子路径。docs/.nojekyll 关闭 Jekyll 处理。

更新网站后重新执行构建，将源码和 docs 一起提交并推送 main。数字人口播使用 digital-web.mp4 发布压缩副本；原始作品位于作品集目录且不纳入 Git。真人照片来自我的形象.png。
