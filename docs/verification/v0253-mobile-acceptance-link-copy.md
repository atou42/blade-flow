# v0.2.53 真机长测链接复制验收

v0.2.52 已经拦住历史无效记录导出，但最后仍缺真实手机 60 秒 JSON。v0.2.53 不改战斗，只降低回收真实手机记录的摩擦：武器选择页和真机长测面板都可以复制 `mobileQa=1` 直达链接，方便把验收入口发到真实手机。

## 已落地内容

- 武器选择页新增 `复制真机链接`。
- 真机长测面板新增 `复制真机链接`。
- 复制内容是当前版本路径加 `?mobileQa=1`。
- 有效记录导出版本推进到 `v0.2.53`。
- 旧记录复查、保存门槛、保存并分享仍保留。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

Playwright 手机视口覆盖：

```text
PASS equipment-copy-link
PASS panel-copy-link
PASS valid-share-v0253
```

本地截图：`output/playwright/v0253-local-link-copy.png`。

## 线上验收

Cloudflare Version ID：`445af0bb-bdaa-4569-8d80-126328e90607`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。公开运行目录只保留 `assets`、`index.html`、`src`、`styles.css`，公开 `tools` 路径返回 404。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=053-curl-live' | rg -n 'v0\.2\.53|真机传送'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=053-curl-live' | rg -n 'combo-card-roguelike|v0\.2\.53|真机传送'
curl -L -s -o /tmp/blade-tools-check-v053.txt -w '%{http_code}\n' 'https://games.atou.cc/combo-card-roguelike/versions/a/tools/validate-mobile-acceptance.mjs?v=053-clean'
```

结果：PASS。正式入口返回 `v0.2.53 真机传送`，Hub 返回 `score: v0.2.53` 和版本标题 `v0.2.53 真机传送`，公开 tools 路径返回 404。

线上 Playwright 手机视口覆盖：

```text
PASS live-equipment-copy-link
PASS live-panel-copy-link
PASS live-valid-share-v0253
```

线上截图：`output/playwright/v0253-live-link-copy.png`。

## 剩余风险

复制链接只能降低真实手机回传阻力，不能替代真实手机长测。完整 goal 仍需要一条真实手机跑满 60 秒后发回的 JSON。
