# v0.2.47 剩余 Spec 完成审计

审计对象：`docs/roadmap/remaining-spec-high-standard-goal.md`

审计结论：不能标记 complete。线上版本已经推进到 `v0.2.47 记录导出`，绝大部分系统已有实现、版本记录和线上验收，但还缺一条来自真实手机浏览器的 60 秒长测导出记录。浏览器自动探针、桌面移动视口和 Playwright 不能替代真实手机发热与手感证据。

## 目标重述

这个 goal 要把 Blade Flow 交付为一个手机竖屏优先、三幕可通关、局内构筑成立、局外成长可信、Boss 可通过动作读招的肉鸽动作卡牌 alpha。

完成标准不是“功能看起来都有”，而是线上正式入口必须可玩、可保存、可继续、可删除存档；玩家能连续完成三局并感到三种打法不同；玩家不读长文字也能看懂卡牌、Boss、路线、奖励和局外成长；性能上要能在手机竖屏连续游玩，不乱闪、不明显卡顿、不发热到影响体验。

## Prompt 到 Artifact 检查表

| 要求 | 证据 | 状态 |
| --- | --- | --- |
| 上行刀路地图、未来两层选择、稳定/危险/锻造/侦察/事件/精英/Boss 节点 | `docs/verification/v0219-blade-path-roguelike.md`、`docs/verification/v0226-construction-anchor.md`、`docs/verification/v0241-route-atlas-branches.md` | 已验收 |
| 高危路线要有风险和构筑机会 | `docs/verification/v0241-route-atlas-branches.md` 记录赤线猎场、镜廊赌局、黑鼓刑场进入局内选路并影响敌人、奖励、证据和 Boss 烙印 | 已验收 |
| 奖励三槽、刃心定锚、表现/构筑/修正奖励 | `docs/verification/v0226-construction-anchor.md`、`docs/verification/v0229-reward-pool.md` | 已验收 |
| 三条路线核心卡、桥接卡、普通卡权重不同 | `docs/design/archetype-card-affinity-spec.md`、`docs/verification/v0237-school-recipes.md`、`docs/verification/v0239-three-archetype-normal-clear.md` | 已验收 |
| 四向出牌语言稳定，收益依赖当前状态而不是无脑同方向 | `docs/design/archetype-card-affinity-spec.md`、`docs/verification/v0237-school-recipes.md`、`docs/verification/v0239-three-archetype-normal-clear.md` | 已验收 |
| 补牌冷却、短未来队列、真实牌库、刀势提招 | `docs/verification/v026-draw-cooldown-adversarial.md`、`docs/verification/v0226-construction-anchor.md`、`docs/verification/v0232-low-power-performance.md` | 已验收 |
| Boss 动作读招、快慢刀、假抬手、后撤横切、地裂抓取、攻击、死亡 | `docs/verification/v0227-boss-action-reads.md`、`docs/verification/v0240-boss-action-atlas.md`、`docs/verification/v0243-boss-frame-sequence.md` | 已验收 |
| Boss 升级不残留旧图，最后一刀先动画再结算 | `docs/verification/v0217-boss-switch-finisher.md`、`docs/verification/v0240-boss-action-atlas.md` | 已验收 |
| 逐 Boss 真实多帧 sprite sheet | `docs/verification/v0244-storm-boss-sprite-sheet.md`、`docs/verification/v0245-boss-sprite-sheet-coverage.md` | 已验收 |
| 局外成长保存材料、证据、配方、训练、图谱、名刀记忆 | `docs/verification/v0224-forge-profile.md`、`docs/verification/v0233-meta-atlas-profile.md`、`docs/verification/v0234-training-lessons.md`、`docs/verification/v0235-daily-blade-path.md`、`docs/verification/v0237-school-recipes.md` | 已验收 |
| 调试 profile 与真实 profile 分仓，不污染 | `docs/verification/v0233-meta-atlas-profile.md`、`docs/verification/v0236-bad-data-matrix.md` | 已验收 |
| 坏 run 槽、坏 profile、坏引用 fail-close | `docs/verification/v0230-bad-save-locking.md`、`docs/verification/v0236-bad-data-matrix.md` | 已验收 |
| 六件首发装备 | `docs/verification/v0228-six-starting-weapons.md` | 已验收 |
| 首批遗物、天赋、契约、证据、强化奖励池 | `docs/verification/v0229-reward-pool.md`、`docs/verification/v0238-daily-contracts.md` | 已验收 |
| 三幕普通敌人、精英、Boss、地图节点 | `docs/verification/v0231-three-act-roster.md`、`docs/verification/v0231-three-act-clear-record.md` | 已验收 |
| 效果说明数字化，稀有度/类型/路线外观可读 | `docs/verification/v0220-numeric-readability.md`、`docs/verification/v0221-rarity-stamps.md`、`docs/verification/v0222-type-card-faces.md` | 已验收 |
| 调试器覆盖补牌、未来队列、提招、Boss 时间、难度、性能档位 | `docs/verification/v024-tuner-pressure-adversarial.md`、`docs/verification/v0232-low-power-performance.md`、`docs/verification/v0242-mobile-long-run-probe.md` | 已验收 |
| 390x844 手机视口三幕流程 | `docs/verification/v0231-three-act-clear-record.md` | 已验收 |
| 标准预设三流派连续三幕通关 | `docs/verification/v0239-three-archetype-normal-clear.md` | 已验收 |
| 低功耗模式和长测探针 | `docs/verification/v0232-low-power-performance.md`、`docs/verification/v0242-mobile-long-run-probe.md`、`docs/verification/v0245-boss-sprite-sheet-coverage.md`、`docs/verification/v0246-mobile-acceptance-panel.md` | 已验收 |
| 真机长测入口和本地保存 | `docs/verification/v0246-mobile-acceptance-panel.md` | 已验收 |
| 真机长测记录可导出发回 | `docs/verification/v0247-mobile-acceptance-export.md` | 已验收 |
| 真实手机 60 秒发热和手感记录 | 尚未收到真实手机导出的 JSON。`v0247` 只证明导出链路可用。 | 缺失 |
| 每次交付更新版本号、版本记录和 Games Hub | `README.md`、`index.html`、`src/game.js`、`data/games-source.json`、线上 curl 返回 `v0.2.47 记录导出` | 已验收 |
| 部署走标准流程，正式入口可打开 | `docs/verification/v0247-mobile-acceptance-export.md` 记录 Cloudflare Version ID `9ad49c0d-b12b-493b-b6d3-b9ceb1faf3ec` | 已验收 |

## 实际检查过的状态

线上正式入口 `https://games.atou.cc/combo-card-roguelike/versions/a/?v=audit047` 返回 `v0.2.47 记录导出`。

Games Hub `https://games.atou.cc/data/games-hub.json?v=audit047` 返回 `score: v0.2.47`，版本标题为 `v0.2.47 记录导出`。

`README.md` 已列出 `docs/verification/v0247-mobile-acceptance-export.md`。

`docs/roadmap/remaining-spec-high-standard-goal.md` 的进度记录已推进到 v0.2.47，并明确写明仍缺真实手机浏览器 60 秒长测导出记录。

## 不能完成的原因

缺口不是代码或线上入口，而是物理设备证据。当前 agent 没有真实手机温度、手持触感、手机浏览器后台策略和设备发热状态。用 Playwright 移动视口、桌面 Chrome 或浏览器 Performance API 只能证明链路和残留节点，不能证明手机握持发热和实际手感。

## 完成前最后一步

用真实手机打开 `https://games.atou.cc/combo-card-roguelike/versions/a/`，进入“真机长测”，跑完 60 秒，保存发热和手感，点击“复制最新记录”，把导出的 JSON 贴回本项目验收记录。拿到这条 JSON 后，需要把它写入 `docs/verification/v0247-mobile-acceptance-export.md` 或新增最终验收文档，再重跑最终审计。只有那时才能考虑 `update_goal(status="complete")`。
