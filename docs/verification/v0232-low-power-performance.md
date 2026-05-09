# v0.2.32 省电档位验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 5 移动端质量：调配器加入性能档位，并把未来补牌队列和提招深度放进可调参数。

## 已落地内容

调配器新增三个设计师可调参数：未来队列、提招深度、特效档位。噩梦和地狱预设默认使用省电档位。

省电档位会切到 `data-performance="save"`，降低战斗主循环唤醒频率，出牌时不再克隆整张卡牌作为飞牌残影，Boss 命中改用轻量 CSS 斩击，不再生成四张大型 `impact-vfx` 图片。连击大字仍保留，但降低弹出频率，避免连续出牌时反复堆叠。

## 本地功能验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

调配器检查结果如下。

```json
{
  "title": "调配器",
  "hasPerformance": true,
  "hasPreview": true,
  "hasPromote": true,
  "performanceValue": "1档",
  "previewValue": "2张",
  "promoteValue": "6张",
  "presetLabels": ["简单", "标准", "紧张", "困难", "噩梦", "地狱"]
}
```

省电档出牌检查结果如下。

```json
{
  "version": "v0.2.32 省电档位",
  "profile": 0,
  "label": "save",
  "drawPreviewCount": 1,
  "promoteLookahead": 3,
  "gamePerf": "save",
  "hasLowClass": true,
  "ghostNodes": 0,
  "directionBursts": 0,
  "impactVfx": 0,
  "impactNodes": 0,
  "comboNodes": 0,
  "errors": []
}
```

截图证据：

- `/tmp/blade-flow-v032-tuner-local.png`
- `/tmp/blade-flow-v032-low-power-local.png`

## 本地性能对比

同一套 8 秒自动战斗脚本分别跑标准档和省电档。两次都没有控制台错误，也没有残留 slash、impact、combo、card ghost 或方向爆字节点。

```json
{
  "standard": {
    "profile": 1,
    "actions": 26,
    "rafCount": 145,
    "taskDuration": 0.7707,
    "scriptDuration": 0.14,
    "layoutDuration": 0.1711,
    "recalcStyleDuration": 0.1302,
    "residualFx": 0,
    "errors": []
  },
  "save": {
    "profile": 0,
    "actions": 21,
    "rafCount": 89,
    "taskDuration": 0.372,
    "scriptDuration": 0.0562,
    "layoutDuration": 0.0838,
    "recalcStyleDuration": 0.0628,
    "residualFx": 0,
    "errors": []
  },
  "rafReduction": 38.6
}
```

截图证据：

- `/tmp/blade-flow-v032-perf-profile-1.png`
- `/tmp/blade-flow-v032-perf-profile-0.png`

## 部署验收

已通过标准流程发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布命令已执行：

```bash
npm run check-games
npm run prepare-games
npm run publish-games
```

发布结果：

```text
Current Version ID: da6b0dfc-7726-41fe-a2d8-912f6d65230a
```

线上入口数据确认如下。

```json
{
  "score": "v0.2.32",
  "title": "v0.2.32 省电档位",
  "playUrl": "https://games.atou.cc/combo-card-roguelike/versions/a/"
}
```

线上调配器确认如下。

```json
{
  "version": "v0.2.32 省电档位",
  "title": "调配器",
  "hasPerformance": true,
  "hasPreview": true,
  "hasPromote": true,
  "performanceValue": "1档",
  "errors": []
}
```

线上省电档出牌确认如下。

```json
{
  "version": "v0.2.32 省电档位",
  "profile": 0,
  "label": "save",
  "drawPreviewCount": 1,
  "promoteLookahead": 3,
  "gamePerf": "save",
  "hasLowClass": true,
  "residualFx": 0,
  "impactVfx": 0,
  "errors": []
}
```

线上截图证据：

- `/tmp/blade-flow-v032-live-tuner.png`
- `/tmp/blade-flow-v032-live-low-power.png`

## 结论

`VERDICT: PASS`

省电档位已经成为可调系统，并且在浏览器指标上确实降低循环和脚本压力。线上正式入口已更新到 v0.2.32。这个版本仍不能替代真机温度测试；后续完整 Alpha 5 还需要长时间移动端自动游玩、普通难度三局打法验收和真实动作资产后的性能复测。
