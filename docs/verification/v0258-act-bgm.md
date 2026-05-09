# v0.2.58 关卡 BGM 验收

本轮把关卡内 BGM 从单一主菜单音乐扩展为三幕关卡音乐。

## 变更内容

- 一幕：`assets/audio/bgm/blade-flow-act1-dry-blade-loop.mp3`，约 63.55 秒。
- 二幕：`assets/audio/bgm/blade-flow-act2-red-string-loop.mp3`，约 76.92 秒。
- 三幕：`assets/audio/bgm/blade-flow-act3-mirror-duel-loop.mp3`，约 63.74 秒。
- 主菜单 BGM 保留：`assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3`。

游戏音乐开关现在控制主菜单和三幕关卡 BGM。首次点击或滑动后解锁音频。主菜单播放菜单曲；进入正式战斗、每日或训练后按当前幕播放对应关卡曲；进入下一幕后自动切到下一幕。

## 本地验证

- `node --check src/game.js`：通过。
- `node --check tools/validate-mobile-acceptance.mjs`：通过。
- `afinfo`：一幕 63.55 秒，二幕 76.92 秒，三幕 63.74 秒，三条关卡 BGM 都超过 60 秒。
- Playwright 本地浏览器验收：通过。`http://127.0.0.1:8097/?debug=1&v=0258-local-act-bgm` 首次点击后主菜单 BGM 播放；选择风暴太刀进入战斗后切到一幕 BGM；调试跳到二幕后切到二幕 BGM；调试跳到三幕后切到三幕 BGM；关闭音乐后当前 BGM 暂停并写入本地静音状态。
- 截图：`output/playwright/v0258-local-act-bgm.png`

## 线上验证

Cloudflare 部署版本：`1776156a-f6af-4fee-9b1d-5069763514d9`

- `https://games.atou.cc/combo-card-roguelike/versions/a/?v=0258-live-curl`：页面显示 `v0.2.58 关卡 BGM`。
- `https://games.atou.cc/data/games-hub.json?v=0258-live-score`：站点索引显示 `score: v0.2.58` 和 `v0.2.58 关卡 BGM`。
- 三条线上关卡 BGM 文件均返回 HTTP 200，`content-type: audio/mpeg`。
- Playwright 线上浏览器验收：通过。`https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0258-live-act-bgm` 首次点击后主菜单 BGM 播放；选择风暴太刀进入战斗后切到一幕 BGM；调试跳到二幕后切到二幕 BGM；调试跳到三幕后切到三幕 BGM；关闭音乐后当前 BGM 暂停并写入本地静音状态。
- 线上浏览器读取到的关卡 BGM 时长：一幕 63.52 秒，二幕 76.88 秒，三幕 63.72 秒。
- 截图：`output/playwright/v0258-live-act-bgm.png`
