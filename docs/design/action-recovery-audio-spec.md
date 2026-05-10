# Action Recovery Audio Spec

日期：2026-05-10

本文定义下一阶段动作后摇、Boss 读招矩阵和左划三结果所需的声音需求。它不替代 `audio-design-spec.md`，只补充当前阶段新增的判断型音效。

目标是让玩家不用看日志，也能听出自己刚刚是稳手、妙手、空手还是破绽。声音要帮助玩家快速学会：左划不是免费保险，而是高收益、高承诺的读招动作。

## 阶段目标

下一阶段战斗会从不限速出牌改为动作后摇。每次出牌后会有短收招。不同方向、不同结果会改变收招长度。正确读招可以取消一部分后摇，错误读招会留下更长空档。

声音必须支持这个新规则。玩家听到短、利落、回弹的声音，应知道动作接上了。玩家听到空、拖、闷的声音，应知道刚才亏了，下一拍可能被 Boss 抢。

本阶段声音重点不是增加华丽度，而是建立动作语义。

## 声音原则

后摇不能每次都用明显提示音，否则会像节拍器或 UI 冷却。普通出牌只保留已有方向音和武器签名音。只有成功取消、空挥、错读、被看穿、Boss 真招确认这些影响判断的状态需要新增声音。

左划要被拆开。普通左划是侧退，声音短、轻、向后抽。完美左划是闪反，声音清脆、强、带反震。错左划是空闪，声音虚、拖、没有落点。

Boss 假抬手和真出手必须可听地区分。假抬手可以诱人，但不能和真攻击完全一样。真招确认要有第二个更实的瞬态，让玩家学会等确认点。

声音尾巴必须短。移动端快速连招下，长尾会把下一个判断糊掉。关键读招音建议 180ms 到 420ms，破势和死亡可以更长。

## 新增音效清单

当前状态：本阶段 15 个正式 SFX 已生成并放入正式目录。所有文件时长都在 180ms 到 420ms 范围内。原始 A/B 变体保留在 `assets/generated/audio/v0.2/` 下。

玩家动作正式文件在 `assets/audio/sfx/combat/`：

| 运行时 key | 文件 | 时长 | 语义 |
| --- | --- | ---: | --- |
| `playerLeftSidestep` | `sfx-player-left-sidestep-01.mp3` | 200ms | 普通左划侧退 |
| `playerLeftPerfectCounter` | `sfx-player-left-perfect-counter-02.mp3` | 300ms | 读中真攻击的完美闪反 |
| `playerLeftWhiff` | `sfx-player-left-whiff-01.mp3` | 350ms | 空闪/被假抬手骗 |
| `playerRecoveryCancel` | `sfx-player-recovery-cancel-01.mp3` | 200ms | 正确读招取消后摇 |
| `playerRecoveryDrag` | `sfx-player-recovery-drag-01.mp3` | 400ms | 长后摇开始 |
| `playerHeavyWhiff` | `sfx-player-heavy-whiff-01.mp3` | 380ms | 重击空挥 |

Boss 读招正式文件在 `assets/audio/sfx/boss/`：

| 运行时 key | 文件 | 时长 | 语义 |
| --- | --- | ---: | --- |
| `bossTrueConfirm` | `sfx-boss-true-confirm-01.mp3` | 220ms | 真攻击确认点 |
| `bossFeintFakeTell` | `sfx-boss-feint-fake-tell-01.mp3` | 300ms | 假抬手诱导 |
| `bossFeintTrueTell` | `sfx-boss-feint-true-tell-01.mp3` | 220ms | 假抬手后真攻击 |
| `bossBackstepOpen` | `sfx-boss-backstep-open-01.mp3` | 350ms | 后撤露出追击窗口 |
| `bossGroundGrabSuction` | `sfx-boss-ground-grab-suction-01.mp3` | 380ms | 地裂抓取启动 |
| `bossAdaptRead` | `sfx-boss-adapt-read-01.mp3` | 250ms | Boss 看穿重复方向 |
| `bossPunishStart` | `sfx-boss-punish-start-01.mp3` | 300ms | 长后摇期间 Boss 抢招 |

教学 UI 正式文件在 `assets/audio/sfx/ui/`：

| 运行时 key | 文件 | 时长 | 语义 |
| --- | --- | ---: | --- |
| `uiReadCorrect` | `sfx-ui-read-correct-01.mp3` | 200ms | 训练读招正确 |
| `uiReadWrong` | `sfx-ui-read-wrong-01.mp3` | 220ms | 训练读招错误 |

### 玩家动作结果

`playerLeftSidestep`

用途：普通左划侧退，没有读中 Boss 真攻击。

听感：短促后撤、衣料和纸面擦步、轻微反向风声。不要有金属格挡。

触发：左划成功出牌但未进入完美读招，也不是破绽。

语义：保命或换位，但不打断 Boss。

`playerLeftPerfectCounter`

用途：读中真攻击的左划，打断 Boss。

听感：先有极短抽空，再有清脆格挡、碎镜或刀背反震，最后一声短回弹。

触发：左划或 counter 路线动作在真攻击确认窗口命中。

语义：强打断、保连、缩短后摇。

备注：现有 `playerPerfectCounter` 可以作为基础素材；如果不够清楚，需要新生成更强调反震的版本。

`playerLeftWhiff`

用途：提前左划、被假抬手骗、Boss 没有真攻击时空闪。

听感：风声落空、纸面轻散、没有命中瞬态，尾巴略拖。

触发：左划进入破绽结果，或 Boss 当前为假抬手预备段但未进入真确认。

语义：后摇变长、Boss 压力上升。

`playerRecoveryCancel`

用途：正确读招后取消后摇，动作重新变快。

听感：短扣合、刀归线、清亮小瞬态。

触发：妙手、完美闪反、正确破势、追击截住后撤等成功动作把后摇缩短时。

语义：你打顺了，可以接下一张。

`playerRecoveryDrag`

用途：长后摇开始，告诉玩家刚才动作重或亏。

听感：闷、拖、低音量的收刀/拖步，不要像失败弹窗。

触发：空左划、下划空挥、重招被看穿、错读假抬手。

语义：现在不能马上补救。

`playerHeavyWhiff`

用途：下划重击空挥或无破势处决。

听感：重刃擦空、落地前泄力、低频短闷但没有命中。

触发：下划没有打中破势、地裂抓取中贪下划、Execute 未满足处决窗口。

语义：重招承诺失败，后摇重。

### Boss 读招与反制

`bossTrueConfirm`

用途：Boss 真攻击确认点。

听感：短、实、硬，比预备声更靠前。可以是红核点亮、刀口压近或低频短脉冲。

触发：快刀、慢刀、假抬手转真招、后撤横切、地裂抓取进入确认窗口。

语义：现在才是正确反应点。

`bossFeintFakeTell`

用途：假抬手第一次诱导。

听感：危险声起到一半突然收断，留很短空白。

触发：假抬手预备段开始。

语义：别急着左划。

`bossFeintTrueTell`

用途：假抬手后的真攻击。

听感：比 `bossTrueConfirm` 更尖一点，像第二次红核真的咬住。

触发：假抬手进入真确认窗口。

语义：现在左划才成立。

`bossBackstepOpen`

用途：Boss 后撤露出追击窗口。

听感：退步擦地、横向风声拉开，末尾有一个可追的空拍。

触发：后撤横切进入收招或空挥窗口。

语义：右划追击现在有收益。

`bossGroundGrabSuction`

用途：地裂抓取启动。

听感：低频向下吸、纸面裂缝、短促塌陷。

触发：地裂抓取预备段。

语义：不要站着贪重击。

`bossAdaptRead`

用途：Boss 看穿重复方向。

听感：短红核锁定、低音量刺点，不像受击。

触发：玩家连续重复同方向达到反制阈值，Boss 下一招进入对应反制。

语义：打法被读了，要换节奏。

`bossPunishStart`

用途：玩家长后摇期间 Boss 抢招。

听感：短促压进、低鼓半拍、刀口逼近。

触发：玩家处于破绽后摇，Boss 压力越过抢招阈值。

语义：刚才的空招正在被惩罚。

### 教学与 UI

`uiReadCorrect`

用途：训练或早期教学中确认读招正确。

听感：很短的墨印或木拍，不要像奖励音。

触发：训练课读中目标招式，或第一幕第一次成功完成某类读招。

语义：这就是正确答案。

`uiReadWrong`

用途：训练或早期教学中提示读错。

听感：短断拍、纸面折断，不要刺耳。

触发：训练课提前左划、错误下划、撞上反制。

语义：这次不是正确窗口。

## 触发矩阵

快刀的正确答案是左划或格挡。读中时触发 `bossTrueConfirm`、`playerLeftPerfectCounter` 和 `playerRecoveryCancel`。提前左划只触发普通侧退，不打断 Boss。

慢刀的正确答案优先是下划破势或上划拖延。左划可以保命，但不应完整打断。成功破势触发现有破势音，再叠 `playerRecoveryCancel`。普通左划只触发 `playerLeftSidestep`。

假抬手先触发 `bossFeintFakeTell`。如果玩家此时左划，触发 `playerLeftWhiff` 和 `playerRecoveryDrag`。进入真确认后触发 `bossFeintTrueTell`，此时左划才触发 `playerLeftPerfectCounter`。

后撤横切先惩罚过早右划。Boss 空挥或收招时触发 `bossBackstepOpen`。此时右划命中触发追击武器音和 `playerRecoveryCancel`。

地裂抓取触发 `bossGroundGrabSuction`。下划空挥或未破势处决触发 `playerHeavyWhiff`。上划离地或正确破势后再下划，才能触发成功取消。

重复同方向会触发 `bossAdaptRead`。这个声音只在反制真正形成时播放，不在每次重复出牌时播放。

## 文件与原始变体

正式接入时使用上方已生成文件。原始生成文件保留在 `assets/generated/audio/v0.2/action-recovery-raw/`、`assets/generated/audio/v0.2/boss-read-raw/`、`assets/generated/audio/v0.2/ui-read-raw/`。

## 生成提示方向

整体提示词应延续现有声音风格：dry ink paper, short blade transient, restrained low drum, no cinematic trailer, no orchestral swell, mobile game readable SFX, 180 to 420 ms.

左划成功提示词应强调 clean parry, mirror shard, blade back rebound, short negative space before impact。

左划空挥提示词应强调 empty sidestep, missed air cut, paper scatter, no hit transient, slightly longer recovery tail。

Boss 假抬手提示词应强调 aborted danger cue, half-started blade windup, sudden silence, deceptive but not identical to attack。

Boss 真确认提示词应强调 red core pulse, close blade threat, hard short transient, clear reaction cue。

后摇取消提示词应强调 snap back into stance, sheath click, fast readiness, tiny bright transient。

重招空挥提示词应强调 heavy blade misses, weight drags through air, dull groundless thud, no impact reward。

## 混音规则

Boss 真确认音优先级高于玩家普通动作音，但低于玩家完美闪反兑现音。

空挥和后摇拖音音量要低于成功音，但材质要更脏、更拖。失败不能吵，只要让玩家感觉亏。

`playerRecoveryCancel` 不能太亮。它是节奏恢复提示，不是奖励结算。

`bossAdaptRead` 不能频繁。它一局内可以多次出现，但同一场战斗同一反制至少间隔 2 秒。

所有新增 SFX 必须进入 Web Audio 预解码清单。手势路径不能首次加载或首次解码任何新增音效。

低功耗模式保留 `playerLeftPerfectCounter`、`playerLeftWhiff`、`bossTrueConfirm`、`bossFeintFakeTell`、`bossFeintTrueTell`、`bossAdaptRead`。跳过普通侧退、恢复取消、恢复拖尾和教学 UI 音。

## 验收标准

盲听验收：不看屏幕，只听 20 秒训练战，测试者应能分出普通左划、成功闪反、空左划、假抬手、真确认、重招空挥。

动作验收：同一个 Boss 假抬手，第一次红核左划必须播放空左划反馈，第二次真确认左划必须播放完美闪反反馈。

节奏验收：连续点击轻招不会出现明显 UI 冷却音；只有错误、取消、真确认这类关键状态发声。

性能验收：新增音效接入后，右滑、左划、下划压测期间 `resourceCount=0`、`longTasks=0`、`lastError=""`。新增文件必须在开战前预解码。

疲劳验收：手机外放连续打 3 分钟，失败音不能刺耳，恢复取消音不能像奖励提示，Boss 读招音不能被 BGM 或武器音盖住。

## 不做范围

本阶段不新增 BGM，不做完整动态音乐层，不把音频迁到 R2，不做每张牌独立音色，也不为每个普通后摇播放 UI 倒计时音。

本阶段也不把左划改成弱动作。左划仍然是高收益动作，但收益只在读对时成立。声音要强化这条规则。
