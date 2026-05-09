# v0.2.59 调配器可读性验收

本轮修复调配器弹窗里文字几乎看不见的问题。

## 变更内容

- 调配器预设按钮加深墨底和文字描边。
- 调配器滑杆卡片加深墨底。
- 滑杆标签、数值和提示文字保留浅色，但增加暗描边和更高对比。

## 本地验证

- Playwright 本地浏览器验收：通过。`http://127.0.0.1:8097/?debug=1&v=tuner-text-fix-local` 打开调配器后，预设按钮、分组标题、滑杆标签、数值和底部按钮均可读。
- 截图：`output/playwright/v0259-local-tuner-readability.png`

## 线上验证

Cloudflare 部署版本：`f94c879f-7ae2-4f7a-a582-452b33ee75d6`

- `https://games.atou.cc/combo-card-roguelike/versions/a/?v=0259-live-curl`：页面显示 `v0.2.59 调配器可读`。
- `https://games.atou.cc/data/games-hub.json?v=0259-live-score`：站点索引显示 `score: v0.2.59` 和 `v0.2.59 调配器可读`。
- 线上 CSS 已包含调配器深墨底样式。
- Playwright 线上浏览器验收：通过。`https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0259-live-tuner` 打开调配器后，预设按钮、分组标题、滑杆标签、数值和底部按钮均可读。
- 截图：`output/playwright/v0259-live-tuner-readability.png`
