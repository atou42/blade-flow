# v0.2.54 真机自动设备校验验收

v0.2.53 已经能复制真机长测链接，但最终 JSON 仍主要靠手填设备名判断是否真实手机。v0.2.54 会把浏览器 UA、触控点、视口和屏幕信息写进记录；页面分享和最终校验器都会拒绝缺少自动设备信息或桌面伪装的 v0.2.54 记录。

## 已落地内容

- 真机记录新增 `client` 字段，包含 `userAgent`、`platform`、`maxTouchPoints`、`pixelRatio`、`viewport` 和 `screen`。
- v0.2.54 记录分享前会检查 `client` 是否像真实手机浏览器。
- 保存新记录时自动写入当前浏览器设备信息。
- 最终校验器从 v0.2.54 开始要求 `client` 存在，并拒绝桌面 UA、无触控和非手机竖屏视口。
- 有效记录导出版本推进到 `v0.2.54`。

## 本地验收

语法检查：

```bash
node --check src/game.js
node --check tools/validate-mobile-acceptance.mjs
```

结果：PASS。

Playwright 手机视口覆盖：

```text
PASS missing-client-blocked
PASS desktop-client-blocked
PASS valid-client-share
PASS save-writes-client
```

本地截图：`output/playwright/v0254-local-client-validation.png`。

校验器覆盖：

```text
PASS v0.2.54 iPhone UA + touch + 390x844 viewport
FAIL desktop Mac UA with 0 touch points
```

其中失败项是预期结果，输出为 `client.userAgent 不像真实手机浏览器。`

## 线上验收

Cloudflare Version ID：`5deff7e3-920a-4262-af96-54b074a3f7b8`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。公开运行目录只保留 `assets`、`index.html`、`src`、`styles.css`，公开 `tools` 路径返回 404。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=054-curl-live' | rg -n 'v0\.2\.54|设备校验'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=054-curl-live' | rg -n 'combo-card-roguelike|v0\.2\.54|设备校验'
curl -L -s -o /tmp/blade-tools-check-v054.txt -w '%{http_code}\n' 'https://games.atou.cc/combo-card-roguelike/versions/a/tools/validate-mobile-acceptance.mjs?v=054-clean'
```

结果：PASS。正式入口返回 `v0.2.54 设备校验`，Hub 返回 `score: v0.2.54` 和版本标题 `v0.2.54 设备校验`，公开 tools 路径返回 404。

线上 Playwright 手机视口覆盖：

```text
PASS live-missing-client-blocked
PASS live-desktop-client-blocked
PASS live-valid-client-share
```

线上截图：`output/playwright/v0254-live-client-validation.png`。

## 剩余风险

自动设备校验能拦住明显桌面伪造，但不能替代真实手机长测。完整 goal 仍需要一条真实手机跑满 60 秒后发回的 JSON。
