# v0.2.57 主菜单 BGM 验收

本轮把 Suno 生成的 37 秒候选曲接为主菜单 BGM。

## 变更内容

- 音频文件：`assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3`
- 来源文件：`output/suno/d1bc4730/Blade Flow - Ink Blade Combat Sketch.mp3`
- Suno ID：`d1bc4730-0111-4e9d-a8b0-313f19d363fc`
- 时长：约 37.08 秒
- 大小：约 851KB

主菜单和局外入口会播放这条 BGM。浏览器需要首次点击或滑动后解锁音频。进入正式战斗、每日或训练后，主菜单 BGM 会自动暂停。HUD 新增音乐按钮，可以开启或关闭主菜单 BGM，设置保存在本地浏览器。

## 本地验证

- `node --check src/game.js`：通过。
- `node --check tools/validate-mobile-acceptance.mjs`：通过。
- `afinfo assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3`：MP3，双声道，48000 Hz，约 37.08 秒，约 851KB。
- Playwright 本地浏览器验收：通过。`http://127.0.0.1:8097/?debug=1&v=0257-local-audio-2` 首次点击菜单音乐入口后，BGM 从暂停变为播放；进入战斗后自动暂停；重置回菜单后恢复播放；再次点击菜单音乐入口后关闭并写入本地静音状态。
- 截图：`output/playwright/v0257-local-main-menu-bgm.png`

## 线上验证

Cloudflare 部署版本：`af2788a9-7b51-4e3a-9b8e-8332251eaaf3`

- `https://games.atou.cc/combo-card-roguelike/versions/a/?v=0257-live-curl`：页面显示 `v0.2.57 主菜单 BGM`。
- `https://games.atou.cc/data/games-hub.json?v=0257-live-score`：站点索引显示 `score: v0.2.57` 和 `v0.2.57 主菜单 BGM`。
- `https://games.atou.cc/combo-card-roguelike/versions/a/src/game.js?v=0257-live-js`：线上脚本包含主菜单 BGM 文件和菜单音乐入口。
- `https://games.atou.cc/combo-card-roguelike/versions/a/assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3?v=0257-live-curl`：HTTP 200，`content-type: audio/mpeg`。
- Playwright 线上浏览器验收：通过。`https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0257-live-cli` 首次点击菜单音乐入口后，BGM 从暂停变为播放；进入战斗后自动暂停；重置回菜单后恢复播放；再次点击菜单音乐入口后关闭并写入本地静音状态。
- 截图：`output/playwright/v0257-live-main-menu-bgm.png`
