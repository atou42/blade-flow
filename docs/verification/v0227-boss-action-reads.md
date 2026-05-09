# v0.2.27 Boss 动作读招验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 2 第一层，不声明整个 goal 完成。

## 已落地内容

Boss 招式不再只靠意图条区分。快刀、慢刀、假抬手、后撤横切、地裂抓取都加入了不同的身体偏移、红核位置、武器线方向、危险字印和地面提示。

快刀是短红核和贴身斜刀，提示玩家用左划或格挡应对。慢刀是高举大刀和金色红核，提示玩家可以抢破势。假抬手会出现偏移和虚影，提示玩家不要急交防守。后撤横切会把 Boss 身体后撤并拉出水平横刀，提示玩家等空挥后追。地裂抓取会压低 Boss、把刀线插向地面并显示地裂，提示玩家先破势再下划兑现。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，进入 v0.2.27，选择风暴太刀，通过调试入口依次强制快刀、慢刀、假抬手、后撤横切、地裂抓取，记录 Boss 视觉类名、危险字印、意图文本和武器线几何值，并为每个动作截图。

运行结果如下。

```json
{
  "version": "v0.2.27 动作读招",
  "results": [
    { "key": "fast", "read": "快", "intent": "快刀抬手", "className": "fighter enemy is-move-fast is-read-danger" },
    { "key": "heavy", "read": "重", "intent": "慢刀蓄势", "className": "fighter enemy is-move-heavy is-read-danger" },
    { "key": "feint", "read": "伪", "intent": "假抬手", "className": "fighter enemy is-move-feint is-read-danger" },
    { "key": "backstep", "read": "退", "intent": "后撤横切", "className": "fighter enemy is-move-backstep is-read-danger" },
    { "key": "ground-grab", "read": "裂", "intent": "地裂抓取", "className": "fighter enemy is-move-ground-grab is-read-danger" }
  ],
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v027-fast.png`
- `/tmp/blade-flow-v027-heavy.png`
- `/tmp/blade-flow-v027-feint.png`
- `/tmp/blade-flow-v027-backstep.png`
- `/tmp/blade-flow-v027-ground-grab.png`
- `/tmp/blade-flow-v027-live.png`

## 部署验收

已通过 `npm run publish-games` 发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: 1d6dc1bd-da9b-4cec-aa11-e5a0e73e25f2
```

线上手机视口验证结果如下。

```json
{
  "version": "v0.2.27 动作读招",
  "read": "裂",
  "intent": "地裂抓取",
  "className": "fighter enemy is-move-ground-grab is-read-danger",
  "cards": 4,
  "errors": []
}
```

## 未完成项

这仍然不是完整 Boss sprite 动作表。当前是基于现有 Boss 形象叠加身体、武器、红核和 VFX 的动作读招切片。后续仍需 image2 或 sprite 资产生成真正的动作行，包括 idle、快刀、慢刀、假抬手、后撤横切、地裂抓取、攻击命中、破势、死亡，并做连续播放和性能验收。
