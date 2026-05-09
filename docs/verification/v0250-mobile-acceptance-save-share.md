# v0.2.50 真机记录保存即分享验收

v0.2.49 已有 `分享最新记录`，但玩家跑完长测后仍可能只保存、不分享。v0.2.50 把保存按钮改成 `保存并分享`：保存记录后立即调用系统分享；如果浏览器不支持分享，就回到复制记录或 textarea fallback。

## 已落地内容

- 真机长测面板的保存按钮改为 `保存并分享`。
- 保存后写入 `v0.2.50` 结构化记录。
- 保存成功后立即尝试 `navigator.share`。
- 分享成功时不展开 JSON 文本，避免面板变乱。
- 不支持分享或复制失败时仍保留原有复制和手动全选文本兜底。
- 普通入口不带 `mobileQa=1` 时仍回到武器选择页。

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
      "name": "save-share-local",
      "version": "v0.2.50 保存即分享",
      "saveButtonText": "保存并分享",
      "sharedTitle": "Blade Flow mobile acceptance",
      "sharedVersion": "v0.2.50",
      "sharedDevice": "local mobile viewport",
      "records": 1,
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。",
      "pageErrors": []
    },
    {
      "name": "save-fallback-local",
      "version": "v0.2.50 保存即分享",
      "textareaVisible": true,
      "textareaVersion": "v0.2.50",
      "status": "最新长测记录已复制，可以直接发到 Discord。"
    },
    {
      "name": "normal-local",
      "version": "v0.2.50 保存即分享",
      "hasRunButton": false,
      "bodyHasWeaponTitle": true
    }
  ]
}
```

分享成功后的面板洁净度复测：

```json
{
  "version": "v0.2.50 保存即分享",
  "sharedVersion": "v0.2.50",
  "textareaHidden": true,
  "status": "已打开系统分享面板。发送这条记录即可完成真机证据。"
}
```

截图：`output/playwright/v0250-local-save-share-clean.png`。

## 线上验收

Cloudflare Version ID：`5b6530c3-ca5d-46cd-81e4-63c3a3d658fe`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。上传了 `index.html`、`src/game.js`、`reports/combo-card-roguelike.md` 和 `data/games-hub.json`。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=050-curl-live' | rg -n 'v0\.2\.50|保存即分享|保存并分享|mobileQa'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=050-curl-live'
```

结果：PASS。正式入口返回 `v0.2.50 保存即分享`，Hub 返回 `score: v0.2.50` 和版本标题 `v0.2.50 保存即分享`。

线上 Playwright 手机视口覆盖：

```json
{
  "results": [
    {
      "name": "live-save-share",
      "version": "v0.2.50 保存即分享",
      "saveButtonText": "保存并分享",
      "sharedTitle": "Blade Flow mobile acceptance",
      "sharedVersion": "v0.2.50",
      "sharedDevice": "live mobile viewport",
      "textareaHidden": true,
      "records": 1,
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。",
      "pageErrors": []
    },
    {
      "name": "live-normal-no-param",
      "version": "v0.2.50 保存即分享",
      "hasRunButton": false,
      "bodyHasWeaponTitle": true
    }
  ]
}
```

截图：`output/playwright/v0250-live-save-share.png`。

## 剩余风险

保存即分享仍不能替代真实手机长测。完整 goal 仍需要一条真实手机跑完 60 秒后发回的 JSON。
