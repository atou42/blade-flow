# v0.2.24 配方工坊验收

日期：2026-05-08

## 覆盖范围

本轮把 `archetype-card-affinity-spec.md` 和 `meta-progression-spec.md` 的第一批可玩切片落进线上版本：

- 本地长期成长分为正式档和调试档，保存在浏览器 localStorage。
- 战斗胜利会按房间和连击表现发放锻刃墨。
- 追身截退、真读招架、碎甲处决会作为配方证据进入长期档。
- 配方工坊可消耗锻刃墨和证据解锁三条首版配方。
- 手牌会标出当前武器/路线眼里更值得关注的划向，关键窗口会高亮。
- 解锁后的配方会进入战后奖励池和锻造节点。

## 验收记录

Check: 源码语法

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
退出码 0
```

Result: PASS

Check: 手机竖屏本地冒烟

Command run:

```bash
node playwright-smoke-inline
```

Output observed:

```json
{
  "title": "V0.2.24 配方工坊",
  "profileHas": true,
  "modeHasDebug": true,
  "arrowCount": 16,
  "routeMatchCount": 4,
  "handHasAffinity": true,
  "combatLog": "贯穿飞刃: 错读，被 Boss 看穿。",
  "errors": []
}
```

Result: PASS

Check: 配方解锁扣材料并写入长期档

Command run:

```bash
node playwright-profile-unlock-inline
```

Output observed:

```json
{
  "firstDisabledBefore": false,
  "textAfterHasOwned": true,
  "stored": {
    "bladeInk": 1,
    "evidence": {
      "backstepIntercept": 0
    },
    "recipes": {
      "chase-intercept": true
    }
  }
}
```

Result: PASS

Check: Games 入口数据和页面不变量

Command run:

```bash
npm run check-games
npm run prepare-games
npm run check-games-ui
```

Output observed:

```text
Validated 13 games in data/games-source.json
Generated 13 playable game pages for https://games.atou.cc
Validated back-home invariant for 13 game pages
```

Result: PASS

Check: 公开目录版本冒烟

Command run:

```bash
python3 -m http.server 8899 --bind 127.0.0.1
node playwright-public-smoke-inline
```

Output observed:

```json
{
  "title": "V0.2.24 配方工坊",
  "profileVisible": true,
  "hotOrMatch": 4,
  "errors": []
}
```

Result: PASS

## 判定

VERDICT: PASS
