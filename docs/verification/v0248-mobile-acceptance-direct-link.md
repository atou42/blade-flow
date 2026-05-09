# v0.2.48 真机长测直达链接验收

v0.2.47 已能导出真机长测记录，但用户仍需要从武器选择页手动找到入口。v0.2.48 增加 `mobileQa=1` 参数，让真实手机可以直接打开长测面板，减少最后一条真机记录的回收阻力。

## 已落地内容

- `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1` 会直接打开真机长测面板。
- 直达面板保留 60 秒长测、保存发热/手感、复制最新记录和 textarea fallback。
- 普通入口不带参数时仍显示武器选择页，不强迫所有玩家进入验收面板。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

本地服务：

```bash
python3 -m http.server 8897 --bind 127.0.0.1
```

结果：PASS。`http://127.0.0.1:8897/?debug=1&mobileQa=1&v=048-direct-local` 返回 200。

本地功能验收覆盖：

- `?mobileQa=1` 打开后直接显示 `真机长测` 面板。
- 页面版本显示 `v0.2.48 真机直达`。
- 不带 `mobileQa=1` 时仍显示 `选择武器`。

Playwright 手机视口结果：

```json
{
  "checks": [
    {
      "name": "local-direct-mobileQa",
      "version": "v0.2.48 真机直达",
      "hasRunButton": true,
      "bodyHasDirectCopy": true,
      "bodyHasWeaponTitle": true,
      "pageErrors": []
    },
    {
      "name": "local-normal-no-param",
      "version": "v0.2.48 真机直达",
      "hasRunButton": false,
      "bodyHasDirectCopy": false,
      "bodyHasWeaponTitle": true,
      "pageErrors": []
    }
  ]
}
```

截图：`output/playwright/v0248-local-direct.png`、`output/playwright/v0248-local-normal.png`。

## 线上验收

Cloudflare Version ID：`fb21a431-1eeb-4c8c-a0e4-4bed6f0d1955`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。上传了 `index.html`、`src/game.js`、`reports/combo-card-roguelike.md` 和 `data/games-hub.json`。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=048-curl-live' | rg -n 'v0\.2\.48|真机直达|mobileQa'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=048-curl-live'
```

结果：PASS。正式入口返回 `v0.2.48 真机直达`，Hub 返回 `score: v0.2.48` 和版本标题 `v0.2.48 真机直达`。

Playwright 手机视口结果：

```json
{
  "checks": [
    {
      "name": "live-direct-mobileQa",
      "version": "v0.2.48 真机直达",
      "hasRunButton": true,
      "bodyHasDirectCopy": true,
      "bodyHasWeaponTitle": true,
      "pageErrors": []
    },
    {
      "name": "live-normal-no-param",
      "version": "v0.2.48 真机直达",
      "hasRunButton": false,
      "bodyHasDirectCopy": false,
      "bodyHasWeaponTitle": true,
      "pageErrors": []
    }
  ]
}
```

截图：`output/playwright/v0248-live-direct.png`、`output/playwright/v0248-live-normal.png`。

## 剩余风险

这个版本只减少真实手机测试入口摩擦，不替代真实手机 60 秒长测记录。完整 goal 仍需要真实手机导出的 JSON。
