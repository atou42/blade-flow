# v0.2.43 Boss 动作帧序验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 2 Boss 动作读招缺口。目标是把 v0.2.40 的“动作状态切图”升级成可验证的“动作帧序播放”，为后续替换成 image2 生成的逐 Boss sprite sheet 做主逻辑准备。

## 已落地内容

Boss 动作新增时间轴帧序：

- 快刀、慢刀、假抬手、后撤横切、地裂抓取都有独立帧序。
- 攻击、受击、死亡也进入帧序播放。
- 调试状态会暴露 `action`、`frame`、`frameIndex`、`frameCount` 和 `timeline`。
- 死亡会先播放受击/死亡帧，再进入结算；死亡前会清掉攻击、蓄势和受击残留 class。

当前帧序复用现有真实动作图作为帧源。它是播放系统和验收系统的落地，不是最终逐 Boss 多帧 sprite sheet。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/?debug=1&v=043-timeline-local-2`。

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

假抬手帧序验收：

```json
{
  "version": "v0.2.43 动作帧序",
  "feint1": {
    "action": "feint",
    "frame": "idle",
    "frameIndex": 1,
    "frameCount": 4,
    "timeline": "feint:blade"
  },
  "feint2": {
    "action": "feint",
    "frame": "charge",
    "frameIndex": 2,
    "frameCount": 4,
    "timeline": "feint:blade"
  },
  "feint4": {
    "action": "feint",
    "frame": "idle",
    "frameIndex": 3,
    "frameCount": 4,
    "timeline": "feint:blade"
  }
}
```

攻击帧序验收：

```json
{
  "attackA": {
    "action": "attack",
    "frame": "charge",
    "frameIndex": 1,
    "frameCount": 2,
    "src": "./assets/art/stage-layout-v1/boss-charge.webp"
  },
  "attackB": {
    "action": "attack",
    "frame": "attack",
    "frameIndex": 2,
    "frameCount": 2,
    "src": "./assets/art/stage-layout-v1/boss-attack.webp"
  }
}
```

死亡帧序验收：

```json
{
  "death0": {
    "action": "death",
    "frame": "damaged",
    "frameIndex": 1,
    "frameCount": 2,
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp",
    "classes": "fighter enemy is-move-heavy"
  },
  "death2": {
    "action": "death",
    "frame": "death",
    "frameIndex": 2,
    "frameCount": 2,
    "overlay": "风格结算"
  }
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T14-02-43-626Z.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=043-timeline-live`。

Cloudflare 部署版本 ID：`1630ab97-e092-40b1-ab97-7481600e5c41`。

线上帧序验收结果：

```json
{
  "version": "v0.2.43 动作帧序",
  "feint": [
    { "frame": "idle", "frameIndex": 1, "frameCount": 4 },
    { "frame": "charge", "frameIndex": 2, "frameCount": 4 },
    { "frame": "idle", "frameIndex": 3, "frameCount": 4 },
    { "frame": "charge", "frameIndex": 4, "frameCount": 4 }
  ],
  "attack": [
    { "frame": "charge", "frameIndex": 1, "frameCount": 2 },
    { "frame": "attack", "frameIndex": 2, "frameCount": 2 }
  ],
  "death": [
    { "frame": "damaged", "frameIndex": 1, "frameCount": 2, "overlay": "" },
    { "frame": "death", "frameIndex": 2, "frameCount": 2, "overlay": "风格结算" }
  ]
}
```

线上死亡帧序确认死亡前已清掉攻击残留，`death0.classes` 为 `fighter enemy is-move-heavy`，结算出现时为 `fighter enemy is-move-heavy is-death`。

截图证据：

- `.playwright-cli/page-2026-05-08T14-06-03-568Z.png`

## 剩余风险

这次是播放系统升级，不是最终资产验收。完整 goal 仍需要 image2 生成逐 Boss 多帧 sprite sheet，并通过接触表、逐帧回放和移动端性能复测。
