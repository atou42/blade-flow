# v0.2.52 真机旧记录导出拦截验收

v0.2.51 已经能在保存前拦住短测、空设备和模拟设备，但用户浏览器里可能还留着早期无效记录。v0.2.52 把复查也放到分享和复制之前，旧的短测、模拟设备、缺探针或残留异常记录不能再被导出。

## 已落地内容

- 分享最新记录前会复查最近记录版本、保存时间、设备、发热、手感、探针时长、出招数和特效残留。
- 复制最新记录前使用同一套复查逻辑。
- 旧的 12 秒短测记录不能分享。
- 旧的 `local mobile viewport` 模拟设备记录不能分享，也不能打开复制文本框。
- 有效记录仍能分享，导出的版本为 `v0.2.52`。
- 普通入口不带 `mobileQa=1` 时仍是正常武器选择流程。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

Playwright 手机视口覆盖：

```text
PASS short-stale-share
PASS fake-device-share
PASS fake-device-copy
PASS valid-record-share
PASS normal-entry
```

本地截图：`output/playwright/v0252-local-stale-record-gates.png`。

## 线上验收

Cloudflare Version ID：`43820725-193d-45ea-9292-bfe343667406`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。公开运行目录只保留 `assets`、`index.html`、`src`、`styles.css`，公开 `tools` 路径返回 404。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=052-curl-live' | rg -n 'v0\.2\.52|旧档拦截'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=052-curl-live' | rg -n 'combo-card-roguelike|v0\.2\.52|旧档拦截'
curl -L -s -o /tmp/blade-tools-check-v052.txt -w '%{http_code}\n' 'https://games.atou.cc/combo-card-roguelike/versions/a/tools/validate-mobile-acceptance.mjs?v=052-clean'
```

结果：PASS。正式入口返回 `v0.2.52 旧档拦截`，Hub 返回 `score: v0.2.52` 和版本标题 `v0.2.52 旧档拦截`，公开 tools 路径返回 404。

线上 Playwright 手机视口覆盖：

```text
PASS live-short-stale-share
PASS live-fake-device-copy
PASS live-valid-record-share
PASS live-normal-entry
```

线上截图：`output/playwright/v0252-live-stale-record-gates.png`。

## 剩余风险

旧记录导出门能避免把历史无效 JSON 误发回来，但仍不能替代真实手机长测。完整 goal 仍需要一条真实手机跑满 60 秒后发回的 JSON。
