# v0.2.60 Boss 专属 BGM 验收

本轮为三幕 Boss 接入专属 BGM。

## 变更内容

- 风暴队长：`assets/audio/bgm/blade-flow-boss-storm-captain.mp3`，约 105.98 秒。
- 赤线宿敌：`assets/audio/bgm/blade-flow-boss-redline-rival.mp3`，约 63.31 秒。
- 无相刀影：`assets/audio/bgm/blade-flow-boss-no-form-shadow.mp3`，约 123.86 秒。

普通战继续播放当前幕关卡 BGM。进入 Boss 战后，音乐按 Boss 形象切到专属曲。

## 本地验证

2026-05-09，本地 `http://127.0.0.1:8097/?debug=1&v=0260-local-boss-bgm` 通过。

- `node --check src/game.js` 通过。
- 三个 Boss MP3 本地请求均返回 `200` 和 `audio/mpeg`。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转到三幕 Boss：
  - 一幕 Boss 播放 `bossStorm`，显示 `风暴队长`，时长 105.96 秒。
  - 二幕 Boss 播放 `bossRedline`，显示 `赤线宿敌`，时长 63.28 秒。
  - 三幕 Boss 播放 `bossNoForm`，显示 `无相刀影`，时长 123.84 秒。
- 每次切换时，当前 Boss 曲为播放状态，其他 Boss 曲为暂停状态。
- 截图：`output/playwright/v0260-local-boss-bgm.png`。

## 线上验证

2026-05-09，线上 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0260-live-boss-bgm` 通过。

- Cloudflare Version ID：`782eb3fc-3cda-4208-ba7f-5c961616ad7d`。
- 页面可见 `v0.2.60 Boss 专属 BGM`。
- 游戏库数据可见 `v0.2.60`，并记录三条 Boss 曲时长。
- 三个 Boss MP3 线上请求均返回 `200` 和 `audio/mpeg`。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转到三幕 Boss：
  - 一幕 Boss 播放 `bossStorm`，显示 `风暴队长`，时长 105.96 秒。
  - 二幕 Boss 播放 `bossRedline`，显示 `赤线宿敌`，时长 63.28 秒。
  - 三幕 Boss 播放 `bossNoForm`，显示 `无相刀影`，时长 123.84 秒。
- 每次切换时，当前 Boss 曲为播放状态，其他 Boss 曲为暂停状态。
- 截图：`output/playwright/v0260-live-boss-bgm.png`。
