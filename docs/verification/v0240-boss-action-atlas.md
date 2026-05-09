# v0.2.40 Boss 动作图谱验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 2 Boss 动作读招缺口。目标不是完成全 Boss 多帧 sprite sheet，而是先把线上战斗从“静态 Boss 形态图 + CSS 变形”推进到“战斗关键状态切真实动作图”。

## 已落地内容

Boss 待机继续使用当前敌人形态图，例如风暴队长、赤线宿敌、无相刀影等，保证不同 Boss 不会失去身份。

Boss 读招会切到 `boss-charge.webp`，再用动作类型 class、红核、武器线和读招字区分快刀、慢刀、假抬手、后撤横切和地裂抓取。

Boss 攻击会切到 `boss-attack.webp`。玩家受击和 Boss 命中反馈仍保留已有水墨 VFX。

Boss 受击会切到 `boss-damaged.webp`。最后一刀击杀后，死亡动作锁到结算弹窗出现，不再被 idle 图提前覆盖。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

动作状态切换结果：

```json
{
  "idle": {
    "version": "v0.2.40 动作图谱",
    "action": "idle",
    "src": "./assets/art/boss-forms-v1/storm-captain.webp"
  },
  "read-backstep": {
    "action": "backstep",
    "src": "./assets/art/stage-layout-v1/boss-charge.webp",
    "read": "退"
  },
  "attack": {
    "action": "attack",
    "src": "./assets/art/stage-layout-v1/boss-attack.webp"
  },
  "damaged": {
    "action": "damaged",
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp"
  },
  "death": {
    "action": "death",
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp"
  },
  "afterDeath": {
    "action": "death",
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp"
  }
}
```

五种读招都会切到蓄势动作图，并且不会残留死亡 class：

```json
{
  "fast": { "action": "fast", "read": "快", "hasDeath": false },
  "heavy": { "action": "heavy", "read": "重", "hasDeath": false },
  "feint": { "action": "feint", "read": "伪", "hasDeath": false },
  "backstep": { "action": "backstep", "read": "退", "hasDeath": false },
  "ground-grab": { "action": "ground-grab", "read": "裂", "hasDeath": false }
}
```

截图证据：

- `/tmp/blade-flow-v040-boss-actions-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=040-boss-actions-live-3`。

Cloudflare 部署版本 ID：`b86af1ec-0ffc-4ada-8b76-d2256c4e50f8`。

线上入口和 hub 已确认返回 `v0.2.40 动作图谱`。

动作状态切换结果：

```json
{
  "version": "v0.2.40 动作图谱",
  "idle": {
    "action": "idle",
    "src": "./assets/art/boss-forms-v1/blade-guard.webp"
  },
  "read-backstep": {
    "action": "backstep",
    "src": "./assets/art/stage-layout-v1/boss-charge.webp"
  },
  "attack": {
    "action": "attack",
    "src": "./assets/art/stage-layout-v1/boss-attack.webp"
  },
  "damaged": {
    "action": "damaged",
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp"
  },
  "afterDeath": {
    "action": "death",
    "src": "./assets/art/stage-layout-v1/boss-damaged.webp",
    "overlay": "风格结算"
  }
}
```

五种读招矩阵已在线上复测，读招后不会残留死亡、受击或结算弹窗：

```json
{
  "fast": { "action": "fast", "src": "./assets/art/stage-layout-v1/boss-charge.webp", "overlay": "" },
  "heavy": { "action": "heavy", "src": "./assets/art/stage-layout-v1/boss-charge.webp", "overlay": "" },
  "feint": { "action": "feint", "src": "./assets/art/stage-layout-v1/boss-charge.webp", "overlay": "" },
  "backstep": { "action": "backstep", "src": "./assets/art/stage-layout-v1/boss-charge.webp", "overlay": "" },
  "ground-grab": { "action": "ground-grab", "src": "./assets/art/stage-layout-v1/boss-charge.webp", "overlay": "" }
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T13-28-28-672Z.png`

## 剩余风险

这次是动作图谱切换，不是完整逐 Boss 多帧 sprite sheet。后续还需要为核心 Boss 做真实多帧动作行、播放节奏和真机性能长测。
