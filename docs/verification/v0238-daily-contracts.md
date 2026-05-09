# v0.2.38 日课契约验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 每日特殊契约池缺口。每日刀路不再只有固定主题和普通奖励，而是在短局内给出主题专属的高风险契约选择。

## 已落地内容

新增 4 个每日契约：追击日课的红线催阵、闪反日课的镜债、破势日课的裂鼓处刑，以及所有日课共用的薄冰誓。

每日锻炉会按当天主题给出主题契约、薄冰誓、对应路线刻印和修复专注。每日普通奖励池也会纳入当天契约，并按当前定锚路线提高权重。

每日契约只影响当前局的路线值、Boss 烙印和出手提前。每日通关仍只记录成绩和完成章，不发永久战斗数值。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

版本和奖励池统计：

```json
{
  "version": "v0.2.38 日课契约",
  "stats": {
    "total": 40,
    "dailyContracts": 4,
    "byKind": {
      "Relic": 12,
      "Inscription": 3,
      "Contract": 11,
      "Evidence": 5,
      "Upgrade": 3,
      "Talent": 6
    }
  }
}
```

三种每日主题的契约池：

```json
{
  "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow"],
  "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow"],
  "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow"]
}
```

三种每日锻炉选择：

```json
{
  "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow", "right-inscription", "repair-focus"],
  "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow", "left-inscription", "repair-focus"],
  "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow", "down-inscription", "repair-focus"]
}
```

契约应用结果：

```json
{
  "daily-speed": {
    "rewardMods": { "speed": 6 },
    "bossMark": "backstep",
    "oathPressure": 130,
    "rewardNames": ["每日:daily-speed", "日课·红线催阵"]
  },
  "daily-counter": {
    "rewardMods": { "counter": 6 },
    "bossMark": "feint",
    "oathPressure": 120,
    "rewardNames": ["每日:daily-counter", "日课·镜债"]
  },
  "daily-burst": {
    "rewardMods": { "burst": 6 },
    "bossMark": "ground-grab",
    "oathPressure": 145,
    "rewardNames": ["每日:daily-burst", "日课·裂鼓处刑"]
  }
}
```

普通每日奖励池采样 28 次后，三种主题都能抽到对应每日契约和薄冰誓：

```json
{
  "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow"],
  "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow"],
  "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow"]
}
```

截图证据：

- `/tmp/blade-flow-v038-daily-contracts-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=038-daily-live`。

Cloudflare 部署版本：

```text
632de87d-8273-471c-93a2-858d11b9de73
```

线上 Games Hub 已返回 `score: v0.2.38` 和版本标题 `v0.2.38 日课契约`。

线上 Playwright 手机视口验收结果与本地一致：

```json
{
  "version": "v0.2.38 日课契约",
  "stats": {
    "total": 40,
    "dailyContracts": 4
  },
  "contractLists": {
    "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow"],
    "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow"],
    "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow"]
  },
  "forgeChoices": {
    "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow", "right-inscription", "repair-focus"],
    "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow", "left-inscription", "repair-focus"],
    "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow", "down-inscription", "repair-focus"]
  },
  "rewardSamples": {
    "daily-speed": ["daily-redline-countdown", "daily-thin-ice-vow"],
    "daily-counter": ["daily-mirror-debt", "daily-thin-ice-vow"],
    "daily-burst": ["daily-drum-execution", "daily-thin-ice-vow"]
  }
}
```

截图证据：

- `/tmp/blade-flow-v038-daily-contracts-live.png`

## 剩余风险

这次补的是每日短局的特殊契约池。后续仍需要更多长期分支、普通难度三流派连续通关、真实 Boss sprite 动作和真机级性能长测。
