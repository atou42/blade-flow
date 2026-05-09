# v0.2.36 坏档矩阵验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的坏数据 fail-close 要求。v0.2.30 已覆盖坏 JSON、坏武器、坏卡牌、坏奖励和坏路线待选项；v0.2.36 补齐长期 profile 解锁引用和新增每日刀路相关的坏档矩阵。

## 已落地内容

长期 profile 现在会校验未知配方、未知训练课、未知上行图谱节点、未知武器学派、未知学派节点、未知每日主题和非数组领取记录。坏 profile 会锁对应正式或调试 profile，不会用空 profile 伪装正常。

run 槽现在会校验每日主题、已选刀路对象、当前路线、奖励倾向和刃心定锚路线。坏 run 只锁对应槽，其他槽仍可读取、保存和删除。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

profile 矩阵验收：

```json
{
  "badRecipe": {
    "mode": "real",
    "locked": true,
    "error": "正式档长期成长损坏：配方引用不存在的条目 missing-recipe"
  },
  "debugClean": {
    "mode": "debug",
    "locked": false,
    "bladeInk": 0
  },
  "badDaily": {
    "mode": "debug",
    "locked": true,
    "error": "调试档长期成长损坏：每日记录引用不存在的主题 missing-daily"
  }
}
```

run 槽矩阵验收：

```json
[
  {
    "index": 0,
    "locked": false,
    "reason": "",
    "hasSave": true
  },
  {
    "index": 1,
    "locked": true,
    "reason": "槽 2 已锁定：引用不存在的每日主题 missing-daily",
    "hasSave": false
  },
  {
    "index": 2,
    "locked": true,
    "reason": "槽 3 已锁定：已选刀路引用不存在的条目 missing-path",
    "hasSave": false
  },
  {
    "index": 3,
    "locked": true,
    "reason": "槽 4 已锁定：刃心定锚路线引用不存在的路线 missing-route",
    "hasSave": false
  },
  {
    "index": 4,
    "locked": false,
    "reason": "",
    "hasSave": false
  }
]
```

验收结论：新增坏档矩阵全部按 fail-close 处理。坏 profile 锁对应 profile，坏 run 只锁对应槽，没有用默认值伪装正常状态。

截图证据：

- `/tmp/blade-flow-v036-bad-matrix-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/`，部署版本为 `d8c2d312-703d-4892-8c3a-10fe9fad1503`。

线上 hub 数据已显示 `score: "v0.2.36"`，版本卡标题为 `v0.2.36 坏档矩阵`。

手机视口 `390x844` 线上复测结果：

```json
{
  "visual": {
    "version": "v0.2.36 坏档矩阵"
  },
  "profileChecks": {
    "badRecipe": {
      "mode": "real",
      "locked": true,
      "error": "正式档长期成长损坏：配方引用不存在的条目 missing-recipe"
    },
    "debugClean": {
      "mode": "debug",
      "locked": false,
      "bladeInk": 0
    },
    "badDaily": {
      "mode": "debug",
      "locked": true,
      "error": "调试档长期成长损坏：每日记录引用不存在的主题 missing-daily"
    }
  },
  "saveChecks": [
    {
      "index": 0,
      "locked": false,
      "reason": "",
      "hasSave": true
    },
    {
      "index": 1,
      "locked": true,
      "reason": "槽 2 已锁定：引用不存在的每日主题 missing-daily",
      "hasSave": false
    },
    {
      "index": 2,
      "locked": true,
      "reason": "槽 3 已锁定：已选刀路引用不存在的条目 missing-path",
      "hasSave": false
    },
    {
      "index": 3,
      "locked": true,
      "reason": "槽 4 已锁定：刃心定锚路线引用不存在的路线 missing-route",
      "hasSave": false
    },
    {
      "index": 4,
      "locked": false,
      "reason": "",
      "hasSave": false
    }
  ],
  "errors": []
}
```

验收结论：线上正式入口的 profile 与 run 槽坏档矩阵均通过，hub 入口说明已更新。

截图证据：

- `/tmp/blade-flow-v036-bad-matrix-live.png`

## 剩余风险

这次只补坏档矩阵，不代表完整 Alpha 3 结束。后续仍需要更多学派节点、每日特殊契约池、三流派普通难度连续通关、真实 Boss sprite 动作和真机级性能长测。
