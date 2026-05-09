# v0.2.45 Boss Sprite Sheet 覆盖验收

本次交付补齐 `remaining-spec-high-standard-goal.md` 里 Alpha 2 的逐 Boss 真生成动作资产缺口。v0.2.44 只覆盖风暴队长，本版本继续用 image2 生成赤线宿敌、镜侍/无相刀影、盾系 Boss 三套 4x2 动作 sheet，并接入线上战斗。

## 已落地内容

新增生成原图：

- `output/image2/boss-sprite-v1/redline-rival-sprite-sheet-v1_001.png`
- `output/image2/boss-sprite-v1/redline-rival-sprite-sheet-v1_response.json`
- `output/image2/boss-sprite-v1/mirror-blade-sprite-sheet-v1_001.png`
- `output/image2/boss-sprite-v1/mirror-blade-sprite-sheet-v1_response.json`
- `output/image2/boss-sprite-v1/shield-guard-sprite-sheet-v1_001.png`
- `output/image2/boss-sprite-v1/shield-guard-sprite-sheet-v1_response.json`

新增接入资源：

- `assets/art/boss-sprites-v1/redline-rival/`
- `assets/art/boss-sprites-v1/mirror-blade/`
- `assets/art/boss-sprites-v1/shield-guard/`

每套资源都包含 `sheet.png`、`sheet.webp`、`idle.webp`、`fast.webp`、`heavy.webp`、`feint.webp`、`backstep.webp`、`ground-grab.webp`、`attack.webp`、`death.webp`。每帧尺寸为 `512x576`，原 sheet 尺寸为 `2048x1152`。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

资源尺寸检查：

```text
redline-rival 8 frames: 512x576
mirror-blade 8 frames: 512x576
shield-guard 8 frames: 512x576
```

本地动作接入检查覆盖 `storm`、`redline`、`mirror`、`shield` 四种 Boss form。每个 form 都验证 idle、fast、heavy、feint、ground-grab、attack、death，并确认 `src` 指向对应 `assets/art/boss-sprites-v1/<slug>/` 目录。

本地截图证据：

- `.playwright-cli/page-2026-05-08T14-38-54-489Z.png`

## 线上验收

部署地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=045-boss-sprites-live`。

Cloudflare Current Version ID：`438b1caa-d537-4ff5-a37f-63fbe216a433`。

发布前曾发现试玩目录误带项目文档和本地验收截图；已清理并重新发布。线上确认 `https://games.atou.cc/combo-card-roguelike/versions/a/docs/verification/v0245-boss-sprite-sheet-coverage.md?v=045-clean` 返回 `HTTP/2 404`，正式入口保留 `v0.2.45 四型帧图`。

线上资源检查：

```text
redline-rival/fast.webp HTTP/2 200 content-type: image/webp
mirror-blade/fast.webp HTTP/2 200 content-type: image/webp
shield-guard/fast.webp HTTP/2 200 content-type: image/webp
```

线上动作接入检查覆盖四种 Boss form 和七种动作。每个动作都返回 `ok: true`，表示当前 `src` 指向对应 Boss 自己的 sprite 目录：

```json
{
  "version": "v0.2.45 四型帧图",
  "storm": "storm-captain fast/heavy/feint/backstep/ground-grab/attack/death OK",
  "redline": "redline-rival fast/heavy/feint/backstep/ground-grab/attack/death OK",
  "mirror": "mirror-blade fast/heavy/feint/backstep/ground-grab/attack/death OK",
  "shield": "shield-guard fast/heavy/feint/backstep/ground-grab/attack/death OK"
}
```

线上截图证据：

- `.playwright-cli/page-2026-05-08T14-45-33-094Z.png`

新增 sprite 后线上省电档 20 秒探针：

```json
{
  "duration": 21095,
  "actions": 16,
  "overlays": 4,
  "longTasks": 2,
  "longTaskDuration": 144,
  "domNodes": 158,
  "heapUsed": 3114174,
  "slashNodes": 0,
  "impactNodes": 0,
  "comboNodes": 0,
  "label": "save"
}
```

结果：没有长期残留的 slash、impact、combo 节点。该结果只能证明浏览器探针没有明显残留，不能替代真实手机温度和手感记录。

## 剩余风险

真实 Boss sprite 覆盖已经补到当前线上使用的风暴、赤线、镜系、盾系四类形态。完整 goal 仍剩真实手机温度/手感记录，以及后续如果新增 Boss 形态时继续按同规格生成动作 sheet。
