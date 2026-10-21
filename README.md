# 洄游 access 风格静态网站

参考 https://www.huiyoux.com/ 制作的企业服务展示页。使用纯 HTML、CSS 和 JavaScript，无需安装依赖或构建。

## 打开方式

直接双击 `index.html` 即可在浏览器中使用，图片与脚本均使用本地相对路径。

如需 HTTP 预览，安装 Node.js 后，在项目目录执行：

```bash
node scripts/preview.cjs
```

打开 http://127.0.0.1:4173 ，按 Ctrl+C 停止服务。

## 页面功能

- 三屏手动轮播，支持左右按钮、指示点及方向键。
- 移动端折叠菜单和页内导航。
- 四种行业方案切换，支持方向键、Home 和 End。
- 登录、注册与咨询弹窗，包含浏览器表单校验。
- 三篇示例文章阅读弹窗。
- 弹窗支持关闭按钮、点击遮罩和 Escape。

所有表单均为本地演示，不创建账号，不连接真实支付、咨询或开户系统，不发送或保存输入。

## 文件说明

- `index.html`：页面结构。
- `styles.css`：桌面与移动端样式。
- `app.js`：页面交互。
- `assets/`：本地图片。
- `scripts/preview.cjs`：仅监听本机的预览服务。

## GitHub Pages

在仓库 Settings → Pages 中选择 Deploy from a branch，分支选择 `dev`，目录选择 `/(root)`。
启用成功后的默认地址为 https://sunjun-666.github.io/test-demo/ 。是否可启用取决于仓库可见性和账号套餐。

## 素材来源

品牌标识、轮播背景和业务示意图来自参考网站的公开展示素材，权利归原权利人所有。
本项目为静态仿制演示，非洄游官方网站。服务文案和文章为演示内容，未复现真实业务系统或资质声明。
