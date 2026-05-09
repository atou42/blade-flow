# v0.2.28 六器开局验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 4 首批装备池，不声明整个 goal 完成。

## 已落地内容

首发装备从 3 件扩到 6 件。新增重力战锤、铳刀、决斗刀鞘，和原有风暴太刀、镜扇、处刑者一起出现在开局选择界面。

六件装备都有明确路线、起手数值和 Boss 反制代价。风暴太刀偏追击，镜扇偏闪反，处刑者偏爆发，重力战锤偏挑空控场，铳刀偏压制直伤，决斗刀鞘偏闪反加全路线基础收益。选择装备后会写入当前局奖励数值、Boss 烙印和后续卡牌亲和提示。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，进入 v0.2.28，确认装备选择界面出现 6 件装备，选择重力战锤，确认进入战斗后装备名、手牌、路线和版本号正常。

运行结果如下。

```json
{
  "version": "V0.2.28 六器开局",
  "equipmentCount": 6,
  "equipmentNames": [
    "风暴太刀",
    "镜扇",
    "处刑者",
    "重力战锤",
    "铳刀",
    "决斗刀鞘"
  ],
  "stage": "一幕 上行刀路 战斗 1/8",
  "equip": "重力战锤",
  "cards": 4,
  "route": "◇ 待势",
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v028-six-weapons.png`

## 部署验收

已通过 `npm run publish-games` 发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: 02e4de07-e6d9-471b-811f-df1d06ae4d03
```

线上手机视口验证结果如下。

```json
{
  "version": "V0.2.28 六器开局",
  "equipmentCount": 6,
  "stage": "一幕 上行刀路 战斗 1/8",
  "equip": "铳刀",
  "cards": 4,
  "route": "◇ 待势",
  "errors": []
}
```

线上入口数据也已确认更新为 `v0.2.28` 和 `v0.2.28 六器开局`。

线上截图：

- `/tmp/blade-flow-v028-live.png`

## 未完成项

这只补齐了六件首发装备候选。完整 Alpha 4 仍需要遗物、天赋、契约、普通敌人、精英、Boss 变体、地图节点和战斗证据资产一起补完，并继续做三幕通关、坏档和性能验收。
