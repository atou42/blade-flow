# v0.2.33 局外图谱验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 长期成长：长期 profile 不再只显示材料和三个配方，开始保存并展示武器学派、训练课、上行图谱和名刀记忆。

## 已落地内容

真实 profile 新增 `weaponSchools`、`routeAtlas`、`training`、`badges` 和 `namedBlades`。默认只开放三把首发武器的起势节点和一幕基础线，不给永久攻击、防御、血量或补牌冷却。

解锁配方会同步打开对应武器学派节点、训练课、高危图谱和评价章。例如追身截退谱会打开风暴太刀截退谱、后撤横切训练和追击猎杀线。

Boss 通关会推进上行图谱。一幕 Boss 后开放二幕基础线，并记录当前武器的一幕名刀记忆；二幕 Boss 后开放三幕基础线。

调试 profile 仍然独立分仓，并新增全解锁、证据注入和当前局复测。全解锁只写调试 profile，不污染真实 profile。

## 本地 profile 面板验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

初始真实 profile：

```json
{
  "mode": "real",
  "locked": false,
  "bladeInk": 0,
  "recipes": {},
  "weaponSchools": {
    "storm-katana": { "first": true },
    "mirror-fan": { "first": true },
    "executioner": { "first": true }
  },
  "routeAtlas": { "act1": true },
  "training": {},
  "badges": {},
  "namedBlades": {}
}
```

真实 profile 面板检查结果：

```json
{
  "hasSchools": 3,
  "hasAtlas": 6,
  "hasTraining": 3,
  "debugButtons": 0
}
```

调试 profile 全解锁后：

```json
{
  "mode": "debug",
  "bladeInk": 24,
  "evidence": {
    "backstepIntercept": 3,
    "trueRead": 3,
    "shatterExecute": 3
  },
  "recipes": {
    "chase-intercept": true,
    "guard-mirror": true,
    "breaker-shatter": true
  },
  "ownedSchools": 9,
  "ownedAtlas": 6,
  "ownedTraining": 3,
  "hasDebugTools": true
}
```

切回真实 profile 后仍保持初始状态，证明调试全解锁没有污染真实档。

截图证据：

- `/tmp/blade-flow-v033-profile-local.png`

## 配方解锁验收

用真实 profile 预置 `锻刃墨 6` 和 `追身截退证据 1`，打开工坊并解锁追身截退谱。

解锁前：

```json
{
  "disabled": false,
  "bladeInk": 6,
  "evidence": {
    "backstepIntercept": 1
  },
  "recipes": {},
  "routeAtlas": {
    "act1": true
  },
  "training": {}
}
```

解锁后：

```json
{
  "bladeInk": 2,
  "evidence": {
    "backstepIntercept": 0
  },
  "recipes": {
    "chase-intercept": true
  },
  "weaponSchools": {
    "storm-katana": {
      "first": true,
      "chase-intercept": true,
      "training-chase": true
    }
  },
  "routeAtlas": {
    "act1": true,
    "danger-backstep": true
  },
  "training": {
    "training-chase": true
  },
  "badges": {
    "chase-intercept": true
  }
}
```

截图证据：

- `/tmp/blade-flow-v033-recipe-unlock-local.png`

## Boss 推进验收

使用低压调参直接进入一幕 Boss 节点，击败风暴队长后出现一幕结算。

结算文案确认新解锁：

```text
锻刃墨 +4，新开 二幕基础线、风暴太刀·一幕记忆。
```

profile 写入结果：

```json
{
  "bladeInk": 4,
  "routeAtlas": {
    "act1": true,
    "act2": true
  },
  "namedBlades": {
    "storm-katana-a1": true
  }
}
```

截图证据：

- `/tmp/blade-flow-v033-boss-progress-local.png`

## 调试复测验收

调试 profile 下点击“当前局复测”会把当前局写入第 5 个本地槽，且 snapshot 标记为调试 profile。

```json
{
  "slot5HasSnapshot": true,
  "slot5Mode": "debug",
  "slot5Phase": "gear",
  "debugVisible": true
}
```

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
Current Version ID: f72185c5-a586-45eb-99d1-8d606514d26b
```

线上入口数据确认如下。

```json
{
  "score": "v0.2.33",
  "title": "v0.2.33 局外图谱",
  "playUrl": "https://games.atou.cc/combo-card-roguelike/versions/a/"
}
```

线上 profile 面板确认如下。

```json
{
  "version": "v0.2.33 局外图谱",
  "hasSchools": 3,
  "hasAtlas": 6,
  "hasTraining": 3,
  "debugButtons": 0,
  "routeAtlas": {
    "act1": true
  },
  "errors": []
}
```

线上调试 profile 全解锁确认如下。

```json
{
  "mode": "debug",
  "bladeInk": 24,
  "recipes": {
    "chase-intercept": true,
    "guard-mirror": true,
    "breaker-shatter": true
  },
  "ownedSchools": 9,
  "ownedAtlas": 6,
  "ownedTraining": 3
}
```

线上截图证据：

- `/tmp/blade-flow-v033-live-profile.png`

## 结论

`VERDICT: PASS`

v0.2.33 已经把长期成长从材料和配方扩到武器学派、训练课、上行图谱和名刀记忆，线上正式入口也已更新。它仍不是完整 Alpha 3，后续还需要更多学派节点、更多高危路线、训练关卡实战模式、每日刀路和更完整的坏档矩阵。
