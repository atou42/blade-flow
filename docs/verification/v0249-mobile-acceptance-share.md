# v0.2.49 真机长测记录分享验收

v0.2.48 已支持 `mobileQa=1` 直达真机长测面板，但真实手机记录仍需要玩家复制后再找地方发送。v0.2.49 新增 `分享最新记录`，优先调用手机系统分享面板；如果浏览器不支持系统分享，会自动回到复制记录和 textarea fallback。

## 已落地内容

- 真机长测面板新增 `分享最新记录`。
- 有记录时，支持 `navigator.share({ title, text })` 直接分享结构化 JSON。
- 没有记录时，明确提示 `还没有可分享的长测记录`。
- 不支持系统分享时，自动触发原有 `复制最新记录`。
- 长测记录保存版本推进到 `v0.2.49`。
- 分享、复制、保存、关闭按钮做了更强的文字可读性处理。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

本地 Playwright 手机视口覆盖：

```json
{
  "results": [
    {
      "name": "empty-share",
      "version": "v0.2.49 分享记录",
      "hasShareButton": true,
      "status": "还没有可分享的长测记录。"
    },
    {
      "name": "fallback-to-copy",
      "version": "v0.2.49 分享记录",
      "textareaVisible": true,
      "textareaHasKind": true,
      "status": "最新长测记录已复制，可以直接发到 Discord。"
    },
    {
      "name": "native-share",
      "version": "v0.2.49 分享记录",
      "sharedTitle": "Blade Flow mobile acceptance",
      "sharedHasKind": true,
      "sharedVersion": "v0.2.49",
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。"
    }
  ]
}
```

按钮可读性复测：

```json
{
  "version": "v0.2.49 分享记录",
  "buttons": ["跑 60 秒", "保存记录", "分享最新记录", "复制最新记录", "关闭"],
  "shareStatus": "已打开系统分享面板。发送这条记录即可完成真机证据。",
  "sharedVersion": "v0.2.49"
}
```

截图：`output/playwright/v0249-local-share-readable.png`。

## 线上验收

Cloudflare Version ID：`3899d6db-5431-4386-9871-d4fef0039f6b`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。上传了 `index.html`、`styles.css`、`src/game.js`、`reports/combo-card-roguelike.md` 和 `data/games-hub.json`。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=049-curl-live' | rg -n 'v0\.2\.49|分享记录|分享最新记录|mobileQa'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=049-curl-live'
```

结果：PASS。正式入口返回 `v0.2.49 分享记录`，Hub 返回 `score: v0.2.49` 和版本标题 `v0.2.49 分享记录`。

线上 Playwright 手机视口覆盖：

```json
{
  "results": [
    {
      "name": "live-native-share",
      "version": "v0.2.49 分享记录",
      "hasRunButton": true,
      "buttons": ["跑 60 秒", "保存记录", "分享最新记录", "复制最新记录", "关闭"],
      "sharedTitle": "Blade Flow mobile acceptance",
      "sharedVersion": "v0.2.49",
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。",
      "pageErrors": []
    },
    {
      "name": "live-normal-no-param",
      "version": "v0.2.49 分享记录",
      "hasRunButton": false,
      "bodyHasWeaponTitle": true
    }
  ]
}
```

截图：`output/playwright/v0249-live-share.png`。

## 剩余风险

系统分享只能降低回传阻力，不能替代真实手机长测本身。完整 goal 仍需要一条真实手机跑完 60 秒后分享或复制出来的 JSON。
