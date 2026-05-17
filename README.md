# Blade Flow

一款竖屏动作卡牌 Roguelike 原型。

它看起来像卡牌游戏，但目标手感更接近动作游戏。玩家在手机上通过划动卡牌出招，观察 Boss 的读招提示，在后摇、连击、破招、追击和撤身之间做选择。

当前线上版本是 `v0.2.84 Boss 实验战`。

试玩地址：https://games.atou.cc/combo-card-roguelike/versions/a/

内部 Gitea 仓库：https://git.talesofai.com/atou/blade-flow

GitHub 开源仓库：https://github.com/atou42/blade-flow

开源协议：MIT

## 当前玩法

战斗的核心是四个方向。

上划是追身。Boss 露出破绽、后撤、跳空或拉开距离时，上划可以追上去保住连击。

左划是快刀破招。它适合抢快招、截断 Boss 真出手，但伤害不高，主要价值是打断节奏。

右划是重刀。它伤害高，能兑现易伤和破势收益，但后摇大，乱用会被 Boss 抢招。

下划是撤身回手。它更安全，适合躲危险和保命，但会断连击，输出收益低。

这套方向不是简单 QTE。每个 Boss 局面都应该至少有一个高收益选择和一个安全选择，玩家要根据当前手牌、Boss 动作、自己的后摇和连击价值判断怎么出手。

## 游戏状态

当前版本已经有完整的三幕结构、路线选择、武器选择、Boss 战、音效和 BGM、手机安全区处理、调试入口、地图选择测试入口，以及一套持续迭代的设计文档。

最新阶段重点是把方向语义统一起来。卡牌、Boss 提示、反馈日志、后摇代价、音效触发和调试探针已经统一到上追、左破、右重、下退这套规则上。

项目还处在原型期。它已经能玩，也能部署到 `games.atou.cc`，但数值、Boss 动作表现、关卡节奏和长期成长还在继续打磨。

## 项目结构

`index.html` 是游戏入口。

`src/game.js` 是主要游戏逻辑，包含战斗、卡牌、Boss 行为、路线、奖励、音频触发和调试接口。

`styles.css` 是竖屏手机 UI 和战斗视觉样式。

`assets/audio/` 放正式接入游戏的 BGM 和音效。

`assets/art/world-map-v1/` 放正式接入的地图 webp 图。

`assets/generated/` 放生成过程记录和原始素材，便于以后回看、重选和再加工。

`docs/design/` 放玩法、音频、美术、世界观、地图流和阶段设计 spec。

`docs/verification/` 放每个版本的验收记录。

## 重要文档

如果只想理解当前游戏，先看 `docs/design/four-direction-combat-intent-spec.md`、`docs/design/world-map-flow-spec.md`、`docs/design/world-bible.md`。

如果想看最新实现是否验过，先看 `docs/verification/v0282-project-wide-audit.md` 和 `docs/verification/v0281-four-direction-combat-intent.md`。

如果要继续做音频和动作反馈，先看 `docs/design/audio-design-spec.md`、`docs/design/audio-integration-plan.md`、`docs/design/action-recovery-audio-spec.md`。

如果要继续做地图和世界观，先看 `docs/design/world-map-flow-spec.md` 和 `docs/design/world-bible.md`。

## 本地运行

这个项目不需要构建。进入项目目录后起一个静态服务器即可。

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://localhost:4173/
```

Boss 实验战可以直接从主菜单进入，也可以加 `?bossLab=1` 直达。

```text
http://localhost:4173/?bossLab=1
```

内部调试入口可以加 `?debug=1`。

```text
http://localhost:4173/?debug=1
```

## 发布方式

线上站点由 `/Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site` 里的 `games.atou.cc` hub 发布。

正常流程是先把当前项目同步到 hub 的 playable 目录，再更新 hub 的游戏数据，然后跑发布脚本。不要直接手改 hub 里的生成文件。

```bash
npm run publish-games
```

## 当前资产

正式游戏资产已经放在项目里。

地图图在 `assets/art/world-map-v1/`。

BGM 在 `assets/audio/bgm/`。

战斗、Boss 和 UI 音效在 `assets/audio/sfx/`。

原始生成记录和备选素材在 `assets/generated/`。

这些资产已经推到内部 Gitea，方便团队成员查看和复用。

## 版本记录

当前版本是 `v0.2.84 Boss 实验战`。

这一版把 Boss 调试台公开成 Boss 实验战，主菜单可直接进入。新增风暴队长和赤线宿敌实验预设，用来快速测试教学容错、回血护盾、破势爆发和策略压力，并在导出页显示最近实验结果对比。

上一版 `v0.2.83 Boss 调试台` 新增手机竖屏 Boss 调试台，可以直达三幕关键 Boss，修改难度参数和成长包，导入导出配置，保存本地预设，并记录每场调试战结果。

`v0.2.82 走查修复` 完成项目全面走查，修复了界面类音效没有跟随战斗热身一起预解码的问题，并复验了本地、线上、Gitea、手机视口和关键调试探针。

更完整的版本验收记录在 `docs/verification/`。
