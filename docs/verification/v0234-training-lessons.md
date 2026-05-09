# v0.2.34 训练实战验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 训练课。训练课不再只是局外 profile 里的静态解锁项，而是能从局外入口进入的短实战。

## 已落地内容

解锁后的训练课会显示为可点击入口。玩家可以直接从 profile 进入训练，不需要重新开普通局。

每门训练课都会固定武器、路线锚点和 Boss 动作。后撤横切训练固定风暴太刀和右划追击，真招闪反训练固定镜扇和假抬手，裂盾处决训练固定处刑者和地裂抓取。

训练课使用独立结算。胜利只写入训练完成章，不发锻刃墨、证据、普通奖励或战斗材料。

训练失败会留在训练结算，不会伪装成普通战斗胜利。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

预置真实 profile 已解锁 `training-chase`，锻刃墨为 `2`。

进入训练前：

```json
{
  "version": "v0.2.34 训练实战",
  "trainingButtons": ["training-chase"],
  "bladeInk": 2,
  "training": {
    "training-chase": true
  },
  "badges": {
    "chase-intercept": true
  }
}
```

点击后撤横切训练后：

```json
{
  "stage": "训练课 训练",
  "enemy": "后撤横切训练",
  "intent": "后撤横切",
  "mark": "后撤横切训练: 练右划追身截住 Boss 后撤。"
}
```

完成训练后：

```json
{
  "overlayTitle": "训练完成",
  "bladeInk": 2,
  "evidence": {
    "backstepIntercept": 0,
    "trueRead": 0,
    "shatterExecute": 0
  },
  "badges": {
    "chase-intercept": true,
    "clear-training-chase": true
  }
}
```

验收结论：训练入口、固定 Boss 动作、独立结算和不发普通材料都通过。

截图证据：

- `/tmp/blade-flow-v034-training-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/`，部署版本为 `07760490-28dc-48e9-97a1-934c0bbed07f`。

线上 hub 数据已显示 `score: "v0.2.34"`，版本卡标题为 `v0.2.34 训练实战`。

手机视口 `390x844` 线上复测结果：

```json
{
  "before": {
    "version": "v0.2.34 训练实战",
    "versionChoice": "练当前 v0.2.34 版本记录 这版把训练课做成固定 Boss 动作短实战。"
  },
  "buttons": ["training-chase"],
  "started": {
    "stage": "训练课 训练",
    "enemy": "后撤横切训练"
  },
  "after": {
    "overlayTitle": "训练完成",
    "overlay": "训练完成 后撤横切训练 已完成。最高 4 连，读招 0，破势 0，后撤横切训练完成章。训练不发锻刃墨。",
    "enemyHp": 0,
    "bladeInk": 2,
    "badges": {
      "chase-intercept": true,
      "clear-training-chase": true
    }
  },
  "errors": []
}
```

验收结论：线上版本可从局外成长入口进入训练课，训练课能完成并写入训练章，锻刃墨和证据保持不变。

截图证据：

- `/tmp/blade-flow-v034-live-training.png`

## 剩余风险

这个版本只把三门训练变成短实战，还没有完成更细的训练评分、逐帧动作 sprite、每日训练路线或所有坏档矩阵。
