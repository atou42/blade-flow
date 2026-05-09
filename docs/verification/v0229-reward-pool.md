# v0.2.29 奖励池扩展验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 4 奖励内容池，不声明整个 goal 完成。

## 已落地内容

局内奖励池从 18 个扩到 36 个。奖励类型覆盖遗物、刻印、契约、证据、强化和天赋。路线覆盖追击、闪反、爆发、压制、挑空和全路线。

新增内容包括高手印、悬空点、裂尖枪、百斩冠、连击灯、墓掌等遗物；追击草图、空场教范、闪反教义、破势教义、利刃基础、定式承诺等天赋；天钩契约、灰铳契约、全向誓约、薄刃誓约等高风险奖励。旧遗物文案也改成当前真实生效的数值说明，不再写尚未实现的重复、残影或强化效果。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，以 `?debug=1` 进入 v0.2.29，选择铳刀进入战斗，通过本地调试检查口读取奖励池总数、类型分布、路线分布，并连续预览 24 次三槽奖励。

运行结果如下。

```json
{
  "version": "V0.2.29 奖励池扩展",
  "stats": {
    "total": 36,
    "byKind": {
      "Relic": 12,
      "Inscription": 3,
      "Contract": 7,
      "Evidence": 5,
      "Upgrade": 3,
      "Talent": 6
    },
    "byRoute": {
      "speed": 7,
      "counter": 7,
      "burst": 8,
      "damage": 5,
      "control": 4,
      "any": 5
    }
  },
  "previewCount": 72,
  "kinds": ["Contract", "Evidence", "Inscription", "Relic", "Talent", "Upgrade"],
  "routes": ["any", "burst", "control", "counter", "damage", "speed"],
  "hasNumericTexts": true,
  "hasNewKinds": true,
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v029-reward-pool.png`

## 部署验收

已通过 `npm run publish-games` 发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: 1c874a90-7e44-41b1-95ee-e00b286cbc94
```

线上手机视口验证结果如下。

```json
{
  "version": "V0.2.29 奖励池扩展",
  "equip": "决斗刀鞘",
  "cards": 4,
  "stats": {
    "total": 36,
    "byKind": {
      "Relic": 12,
      "Inscription": 3,
      "Contract": 7,
      "Evidence": 5,
      "Upgrade": 3,
      "Talent": 6
    },
    "byRoute": {
      "speed": 7,
      "counter": 7,
      "burst": 8,
      "damage": 5,
      "control": 4,
      "any": 5
    }
  },
  "previewCount": 72,
  "hasNumericTexts": true,
  "hasNewKinds": true,
  "errors": []
}
```

线上入口数据也已确认更新为 `v0.2.29` 和 `v0.2.29 奖励池扩展`。

线上截图：

- `/tmp/blade-flow-v029-live.png`

## 未完成项

这只补齐了首批奖励池。完整 Alpha 4 仍需要普通敌人、精英、Boss 变体、地图节点和战斗证据资产一起补完。完整 goal 还需要三幕通关、坏档验证、性能记录和完整 Boss sprite 动作表。
