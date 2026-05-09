# v0.2.61 关卡 BGM 分化验收

本轮重做第二幕和第三幕关卡 BGM，让三幕普通战斗的听感差异更明显。

## 变更内容

- 一幕保留：`assets/audio/bgm/blade-flow-act1-dry-blade-loop.mp3`，约 63.55 秒。
- 二幕替换：`assets/audio/bgm/blade-flow-act2-red-thread-hunt-loop.mp3`，约 84.60 秒。
- 三幕替换：`assets/audio/bgm/blade-flow-act3-shattered-mirror-duel-loop.mp3`，约 81.04 秒。

二幕改成红线追猎，三幕改成碎镜终局决斗。Boss 专属 BGM 保持 v0.2.60 的三条 Boss 曲。

## 本地验证

2026-05-09，本地 `http://127.0.0.1:8098/?debug=1&v=0261-local-act-bgm` 通过。

- `node --check src/game.js` 通过。
- 三幕关卡 BGM 时长均超过 60 秒：一幕 63.52 秒，二幕 84.60 秒，三幕 81.04 秒。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转到三幕普通战：
  - 一幕播放 `act1`，文件 `blade-flow-act1-dry-blade-loop.mp3`。
  - 二幕播放 `act2`，文件 `blade-flow-act2-red-thread-hunt-loop.mp3`。
  - 三幕播放 `act3`，文件 `blade-flow-act3-shattered-mirror-duel-loop.mp3`。
- 截图：`output/playwright/v0261-local-act-bgm.png`。

## 线上验证

2026-05-09，线上 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0261-live-act-bgm` 通过。

- Cloudflare Version ID：`37d1f7ae-c679-4823-bfd8-d220bf442d72`。
- 页面可见 `v0.2.61 关卡 BGM 分化`。
- 游戏库数据可见 `v0.2.61`，并记录二幕 84.60 秒、三幕 81.04 秒。
- 二幕和三幕新 MP3 线上请求均返回 `200` 和 `audio/mpeg`。
- Playwright 竖屏 `393x852` 进入游戏后，调试跳转到三幕普通战：
  - 一幕播放 `act1`，文件 `blade-flow-act1-dry-blade-loop.mp3`。
  - 二幕播放 `act2`，文件 `blade-flow-act2-red-thread-hunt-loop.mp3`。
  - 三幕播放 `act3`，文件 `blade-flow-act3-shattered-mirror-duel-loop.mp3`。
- 截图：`output/playwright/v0261-live-act-bgm.png`。
