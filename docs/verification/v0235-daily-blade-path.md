# v0.2.35 每日刀路验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 长期成长缺口：每日刀路从文档设想进入可玩版本。它不是主线三幕，也不是训练课，而是固定种子、固定主题、固定武器倾向的短局。

## 已落地内容

首页和局外成长面板新增每日刀路入口。每日会按当天种子选择追击、闪反或破势主题，并固定推荐武器、路线定锚和 Boss 烙印。

每日刀路为 4 节点短局：入门战、日课锻炉、试炼精英和每日 Boss。中途可以拿奖励构筑，但不会写入长期材料。通关后只记录每日成绩和完成章，不发锻刃墨、证据或永久战斗数值。

真实 profile 新增 `dailyRecords`，按每日种子保存最好成绩、最高连击、读招和破势次数。调试和正式 profile 仍分仓。

本地 run save 现在能保存 `dailyRun`。如果存档引用不存在的每日主题，会按坏槽锁定，不用默认主题伪装正常。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

验收时当天种子为 `D260508`，抽到主题为 `闪反日课`。

进入每日前：

```json
{
  "version": "v0.2.35 每日刀路",
  "dailyButton": "日D260508 闪反日课 固定镜扇，左划读招收益更高；Boss 会混入假抬手。 今日未通关。"
}
```

进入每日后：

```json
{
  "stage": "每日刀路 战斗 1/4",
  "equipment": "镜扇",
  "enemy": "闪反日课 入门",
  "reward": "锚 ↺ · 1 证物"
}
```

通关后：

```json
{
  "overlayTitle": "每日斩路完成",
  "overlay": "每日斩路完成 闪反日课 D260508 完成。得分 88，最高 4 连，读招 2，破势 0。每日只记录成绩和完成章，不发永久战斗数值。",
  "profile": {
    "bladeInk": 0,
    "evidence": {
      "backstepIntercept": 0,
      "trueRead": 0,
      "shatterExecute": 0
    },
    "dailyRecords": {
      "D260508": {
        "seed": "D260508",
        "themeId": "daily-counter",
        "label": "闪反日课",
        "score": 88,
        "maxCombo": 4,
        "reads": 2,
        "breaks": 0
      }
    },
    "badges": {
      "daily-D260508": true
    }
  }
}
```

验收结论：每日入口、固定种子主题、短局流程、每日成绩记录和不发长期材料都通过。

坏每日主题存档验收：

```json
[
  { "locked": false, "reason": "" },
  { "locked": true, "reason": "槽 2 已锁定：引用不存在的每日主题 missing-daily" },
  { "locked": false, "reason": "" },
  { "locked": false, "reason": "" },
  { "locked": false, "reason": "" }
]
```

验收结论：每日模式的存档引用坏主题时只锁当前槽，不会用默认每日主题继续运行。

截图证据：

- `/tmp/blade-flow-v035-daily-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/`，部署版本为 `3febbad7-9cc5-48be-937a-16a6d9bc9952`。

线上 hub 数据已显示 `score: "v0.2.35"`，版本卡标题为 `v0.2.35 每日刀路`。

手机视口 `390x844` 线上复测结果：

```json
{
  "before": {
    "version": "v0.2.35 每日刀路",
    "dailyButton": "日D260508 闪反日课 固定镜扇，左划读招收益更高；Boss 会混入假抬手。 今日未通关。"
  },
  "started": {
    "stage": "每日刀路 战斗 1/4",
    "equipment": "镜扇",
    "enemy": "闪反日课 入门",
    "reward": "锚 ↺ · 1 证物"
  },
  "after": {
    "overlayTitle": "每日斩路完成",
    "overlay": "每日斩路完成 闪反日课 D260508 完成。得分 88，最高 4 连，读招 2，破势 0。每日只记录成绩和完成章，不发永久战斗数值。",
    "profile": {
      "bladeInk": 0,
      "dailyRecords": {
        "D260508": {
          "themeId": "daily-counter",
          "score": 88,
          "maxCombo": 4,
          "reads": 2,
          "breaks": 0
        }
      },
      "badges": {
        "daily-D260508": true
      }
    }
  },
  "errors": []
}
```

验收结论：线上正式入口可进入每日短局，通关后只写每日成绩和完成章，hub 入口说明也已更新。

截图证据：

- `/tmp/blade-flow-v035-daily-live.png`

## 剩余风险

每日刀路现在只有本地最好成绩，没有排行榜、连续日课奖励、每日特殊契约池和真机长时间性能记录。它补齐的是局外长期目标的第一层，不代表 Alpha 3 全部完成。
