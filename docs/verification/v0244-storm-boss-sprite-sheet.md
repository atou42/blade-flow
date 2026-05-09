# v0.2.44 风暴队长 Sprite Sheet 验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 2 Boss 动作资产缺口。目标是先完成一个真实生成、可切帧、可接入、可验收的 Boss sprite sheet，而不是继续只用单图状态图。

## 已落地内容

使用 image2 生成风暴队长 4x2 动作 sheet，参考了线上已有风暴队长形态图、蓄势图、攻击图和受击图。

生成原图：

- `output/image2/boss-sprite-v1/storm-captain-sprite-sheet-v1_001.png`
- `output/image2/boss-sprite-v1/storm-captain-sprite-sheet-v1_response.json`

接入资源：

- `assets/art/boss-sprites-v1/storm-captain/sheet.webp`
- `assets/art/boss-sprites-v1/storm-captain/idle.webp`
- `assets/art/boss-sprites-v1/storm-captain/fast.webp`
- `assets/art/boss-sprites-v1/storm-captain/heavy.webp`
- `assets/art/boss-sprites-v1/storm-captain/feint.webp`
- `assets/art/boss-sprites-v1/storm-captain/backstep.webp`
- `assets/art/boss-sprites-v1/storm-captain/ground-grab.webp`
- `assets/art/boss-sprites-v1/storm-captain/attack.webp`
- `assets/art/boss-sprites-v1/storm-captain/death.webp`

每帧尺寸为 `512x576`。原 sheet 尺寸为 `2048x1152`。

风暴队长形态现在会优先使用这套真生成帧。其他 Boss 继续使用 v0.2.43 的动作帧序 fallback。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/?debug=1&v=044-storm-sprite-local`。

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

资源尺寸检查：

```text
attack.webp 512x576
backstep.webp 512x576
death.webp 512x576
fast.webp 512x576
feint.webp 512x576
ground-grab.webp 512x576
heavy.webp 512x576
idle.webp 512x576
sheet.webp 2048x1152
```

本地动作接入检查：

```json
{
  "version": "v0.2.44 风暴帧图",
  "fast": {
    "timeline": "fast:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/fast.webp"
  },
  "heavy": {
    "timeline": "heavy:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/heavy.webp"
  },
  "feint": {
    "timeline": "feint:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/feint.webp"
  },
  "ground": {
    "timeline": "ground-grab:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/ground-grab.webp"
  },
  "attack": {
    "timeline": "attack:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/attack.webp"
  },
  "death": {
    "timeline": "death:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/death.webp"
  }
}
```

死亡后结算检查：

```json
{
  "action": "death",
  "frame": "death",
  "timeline": "death:storm",
  "src": "./assets/art/boss-sprites-v1/storm-captain/death.webp",
  "overlay": "一幕 斩路完成"
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T14-14-22-762Z.png`

## 线上验收

部署地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=044-storm-sprite-live`。

Cloudflare Current Version ID：`ccb3da82-b351-42ac-bce7-6e1ec85daf71`。

发布脚本上传了风暴队长 sheet 和 8 张切帧，线上资源检查 `fast.webp` 返回 `HTTP/2 200` 且 `content-type: image/webp`。

线上动作接入检查：

```json
{
  "version": "v0.2.44 风暴帧图",
  "fast": {
    "timeline": "fast:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/fast.webp"
  },
  "heavy": {
    "timeline": "heavy:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/heavy.webp"
  },
  "feint": {
    "timeline": "feint:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/feint.webp"
  },
  "ground": {
    "timeline": "ground-grab:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/ground-grab.webp"
  },
  "attack": {
    "timeline": "attack:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/attack.webp"
  },
  "death": {
    "timeline": "death:storm",
    "src": "./assets/art/boss-sprites-v1/storm-captain/death.webp"
  }
}
```

死亡后结算检查：

```json
{
  "action": "death",
  "frame": "death",
  "timeline": "death:storm",
  "src": "./assets/art/boss-sprites-v1/storm-captain/death.webp",
  "overlay": "一幕 斩路完成"
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T14-20-59-795Z.png`

## 剩余风险

这次只完成风暴队长一套真实生成 sprite sheet。完整 goal 仍需要赤线宿敌、镜侍/无相刀影、盾系 Boss 的同规格动作 sheet，并且需要真实手机温度和手感长测。
