# test-demo

用于测试 Git、GitHub 协作和分支操作的演示仓库。

当前包含参考 [洄游首页](https://huiyoux.com/home) 制作的静态首页，以及本地测试文件 `test.txt`。

## 开始使用

```bash
git clone git@github.com:SunJun-666/test-demo.git
cd test-demo
git switch dev
```

日常开发使用 `dev` 分支。

## 首页预览

直接用浏览器打开 `index.html`，无需安装依赖。也可使用 Node.js 启动本地预览：

```bash
node scripts/preview.cjs
```

浏览器访问 http://127.0.0.1:4173 ，按 Ctrl+C 停止服务。

页面包含三屏轮播、行业方案切换、文章阅读和咨询演示弹窗，适配桌面与手机。登录、注册和咨询仅在本地演示，不发送或保存输入。

GitHub Pages 使用 `dev` 分支根目录发布，访问地址为 https://sunjun-666.github.io/test-demo/ 。

## 文件与素材

- `index.html`：首页结构。
- `styles.css`：布局与响应式样式。
- `app.js`：页面交互。
- `assets/`：本地图片。
- `scripts/preview.cjs`：本机预览服务。

本项目非官方网站。品牌和参考图片归原权利人所有；数据条用于还原参考站展示，服务介绍与文章为演示内容。
