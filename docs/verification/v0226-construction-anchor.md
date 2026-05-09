# v0.2.26 构筑定锚验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 1 最小闭环，不声明整个 goal 完成。

## 已落地内容

战斗后奖励从随机三选一改为三槽结构：表现、构筑、修正。表现槽回应上一战路线和读招表现，构筑槽偏向当前定锚或装备路线，修正槽补弱路线、证据或休整。

第一次选择明确路线奖励会建立本局刃心定锚。定锚会显示在顶部进度条，并影响后续奖励权重、手牌亲和点灯和卡牌方向收益。

补牌条加入短未来预览。满手或等待补牌时，会显示后续两张牌的路线图标和牌名。

战后进入下一节点前加入刀路选择。当前最小版本提供稳定路线和高危路线。路线选择会写入当前幕当前节点，改变下一战或下一节点类型、Boss 压力、路线烙印、奖励池倾向和地图节点外观。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，注入低难度测试参数，进入 v0.2.26，选择风暴太刀，右划击败第一战，确认风格结算出现，确认三槽奖励文字为“表现槽 / 构筑槽 / 修正槽”，选择第一个奖励后确认刃心定锚出现，再进入“选择刀路”，选择高危路线后确认下一节点变为侦察，地图出现高危节点标记。

运行结果如下。

```json
{
  "version": "v0.2.26 构筑定锚",
  "drawText": "满手 · 后续 ◆重劈 / ◆重劈",
  "cardCount": 4,
  "hasReward": 1,
  "rewardSlots": ["表现槽", "构筑槽", "修正槽"],
  "hasPath": 1,
  "stage": "一幕 上行刀路 侦察 2/8",
  "stack": "锚 ➤ · 1 证物",
  "mapDanger": 1,
  "anchorAffinities": 1,
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v026-reward.png`
- `/tmp/blade-flow-v026-path.png`
- `/tmp/blade-flow-v026-after-path.png`
- `/tmp/blade-flow-v026-public-local.png`
- `/tmp/blade-flow-v026-live.png`

## 部署验收

已通过 `npm run publish-games` 发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: 6606a680-7c24-46aa-b57b-d81f1e803374
```

线上手机视口验证结果如下。

```json
{
  "version": "v0.2.26 构筑定锚",
  "drawText": "满手 · 后续 ◆重劈 / ◆重劈",
  "cards": 4,
  "errors": []
}
```

## 未完成项

Alpha 1 还不是完整大目标。当前只完成了最小可玩闭环。完整卡牌矩阵、真实牌库删换冻结、完整三幕分支图、Boss sprite 动作读招、六件装备、长期成长树、坏档单槽锁定和完整移动性能预算仍需继续推进。
