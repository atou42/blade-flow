# v0.2.62 Boss 血量压迫验收

本轮提高关底 Boss 默认血量，让 Boss 战更耐打、更有压力。

## 变更内容

- Boss 默认血量倍率提高到 `1.38x`。
- 普通战和精英战不套用这个倍率。
- 标准三幕 Boss 血量变为：
  - 一幕风暴队长：469。
  - 二幕赤线宿敌：843。
  - 三幕无相刀影：1438。

## 本地验证

2026-05-09，本地 `http://127.0.0.1:8099/?debug=1&v=0262-local-boss-hp` 通过。

- `node --check src/game.js` 通过。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转三幕 Boss：
  - 一幕风暴队长房间 HP 469，血条显示 469。
  - 二幕赤线宿敌房间 HP 843，血条显示 843。
  - 三幕无相刀影房间 HP 1438，血条显示 1438。
- 普通战和精英战未被 Boss 倍率影响：一幕刀信使仍为 145，一幕镜侍仍为 240。
- 截图：`output/playwright/v0262-local-boss-hp.png`。

## 线上验证

2026-05-09，线上 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0262-live-boss-hp` 通过。

- Cloudflare Version ID：`6368e140-52cf-4df9-af24-04be04a20132`。
- 页面可见 `v0.2.62 Boss 血量压迫`。
- 游戏库数据可见 `v0.2.62`。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转三幕 Boss：
  - 一幕风暴队长房间 HP 469，血条显示 469。
  - 二幕赤线宿敌房间 HP 843，血条显示 843。
  - 三幕无相刀影房间 HP 1438，血条显示 1438。
- 普通战和精英战未被 Boss 倍率影响：一幕刀信使仍为 145，一幕镜侍仍为 240。
- 截图：`output/playwright/v0262-live-boss-hp.png`。
