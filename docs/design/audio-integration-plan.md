# Audio Integration Plan

日期：2026-05-09

本文定义 Blade Flow 的音频接入方式。`audio-design-spec.md` 负责声音风格和素材标准，本文负责运行时怎么加载、什么时候播放、怎么验收。

## 当前接入状态

v0.2.64 已接入 35 个正式 SFX 和 7 条当前 BGM。正式文件放在：

- `assets/audio/bgm/`
- `assets/audio/sfx/combat/`
- `assets/audio/sfx/boss/`
- `assets/audio/sfx/ui/`

原始生成文件和第二变体保留在：

- `assets/generated/audio/v0.1/combat-raw/`
- `assets/generated/audio/v0.1/boss-raw/`
- `assets/generated/audio/v0.1/bgm-layers-raw/`
- `assets/generated/audio/v0.1/ui-raw/`

运行时美术已经外置到 R2，但音频仍随项目包发布。后续如果音频体积继续增长，再单独迁到 R2，不和当前 WebP 迁移混在一起。

## 加载策略

BGM 在启动时创建 `Audio` 对象。主菜单曲 `preload=auto`，其他曲 `preload=metadata`，避免首屏被音频拖慢。

SFX 不在首屏预加载。第一次触发某个 SFX 时创建对应 `Audio` 对象，之后复用同一个对象。高频动作音每次播放前会重置 `currentTime`，避免连续出牌时排队堆积。

所有声音都必须等玩家第一次点击、滑动或点静音按钮后解锁。未解锁前不播放 SFX，只允许 BGM 进入待播放状态。

静音开关控制 BGM 和 SFX。关闭时立刻停掉 BGM 和已加载 SFX，并阻止后续 SFX 触发。静音按钮自己的提示音允许用 `force` 播放一次，但不能留下错误状态。

## 运行时分层

### BGM

当前接入：

- 主菜单：`blade-flow-menu-ink-blade-sketch.mp3`
- 一幕普通战：`blade-flow-act1-dry-blade-loop.mp3`
- 二幕普通战：`blade-flow-act2-red-thread-hunt-loop.mp3`
- 三幕普通战：`blade-flow-act3-shattered-mirror-duel-loop.mp3`
- 风暴队长 Boss：`blade-flow-boss-storm-captain.mp3`
- 赤线宿敌 Boss：`blade-flow-boss-redline-rival.mp3`
- 无相刀影 Boss：`blade-flow-boss-no-form-shadow.mp3`

已生成但暂不接入：

- 5 个路线层
- Boss 威胁层
- 刀路奖励循环
- 结算斩字
- 2 条旧关卡 BGM 备选

这些先作为素材储备。后续做动态音乐时再接，不在 v0.2.64 里强行叠层。

### 玩家动作 SFX

稳定输入层：

- 卡牌按下：`playerCardPress`
- 卡牌离手：`playerCardRelease`
- 点击：`playerTap`
- 上划：`playerFlickUp`
- 右划：`playerFlickRight`
- 左划：`playerFlickLeft`
- 下划：`playerFlickDown`

关键战斗层：

- 完美闪反：`playerPerfectCounter`
- 会心/妙手：`playerCritical`
- 玩家破势：`playerStanceBreak`
- 连击断裂：`playerComboBreak`

动作层要先稳定可读，再考虑漂亮。方向音必须比武器签名更基础，避免玩家只听到武器、不知道自己出了什么方向。

### 兵器签名 SFX

武器签名叠在动作音之上，只在对应武器的核心动作上出现。

- 风暴太刀：右划追击触发 `weaponStormKatana`
- 镜扇：左划闪反触发 `weaponMirrorFan`
- 处刑者：下划爆发触发 `weaponExecutioner`
- 重力战锤：上划或下划触发 `weaponGravityHammer`
- 铳刀：点击或压制路线触发 `weaponGunblade`
- 决斗刀鞘：左划、格挡、影步触发 `weaponDuelScabbard`

签名音不能每张牌都响。它只负责让武器有身份，不能压过方向和 Boss 读招。

### Boss SFX

读招层：

- 快刀：`bossFastTell`
- 慢刀：`bossSlowTell`
- 假抬手：`bossFeintTell`
- 后撤横切：`bossRetreatTell`
- 地裂抓取：`bossGroundGrabTell`

状态层：

- Boss 命中玩家：`bossHitPlayer`
- Boss 受击：`bossTakeHit`
- Boss 被挡：`bossBlocked`
- Boss 闪避/脱身：`bossEvade`
- Boss 破势：`bossStanceBreak`
- Boss 死亡：`bossDeath`

Boss 读招音只在新的读招 timeline 开始时触发，不在每一帧重复播放。假抬手必须保留明显的收断感，不能听起来像真攻击。

### UI SFX

当前接入：

- 开始战斗：`uiBattleStart`
- 奖励选择：`uiRewardSelect`
- 稳定路线：`uiRouteStable`
- 高危路线：`uiRouteDanger`
- 图谱分支：`uiRouteMapBranch`
- Boss 预演：`uiBossPreview`
- 静音切换：`uiMuteToggle`

UI 音只做确认和风险提示，不做长尾装饰。路线音要能辅助玩家区分稳定、图谱、高危。

## 低功耗策略

低功耗模式下跳过高频装饰音，只保留：

- BGM
- Boss 读招
- 出牌主确认
- 完美闪反、破势、死亡
- 奖励、路线、静音等关键 UI

当前标记为装饰音的包括卡牌按下、Boss 普通受击、Boss 闪避等。后续新增 SFX 时，如果它只是质感，不影响判断，默认归入装饰音。

## 调试与验收

调试入口：

```js
window.__bladeFlowDebug.audioState()
```

该方法返回：

- 当前 BGM 状态
- 每个 SFX 是否已加载
- 最近 16 个 SFX 触发事件
- 最近音频错误

必须保留这个调试能力，方便线上检查某个操作到底有没有触发音效。

每次新增或替换音效后，至少跑：

```bash
node --check src/game.js
find assets/audio -type f -name '*.mp3' | sort
ffprobe -v error ... each assets/audio/*.mp3
```

浏览器验收至少覆盖：

- 右划风暴太刀，确认动作音、武器音、Boss 受击音触发
- 五种 Boss 读招，确认各自只触发一次
- 静音后强制 Boss 读招，确认不会加载新 SFX
- 5 秒有声自动战斗，确认 `longTasks=0`，`lastError=""`

当前 v0.2.64 验收记录见：

- `docs/verification/v0264-sfx-integration.md`

## 后续扩展顺序

第一优先级是听感微调，不是继续堆文件。先用真实手机听三局：追击、闪反、破势。只要疲劳或刺耳，就先调音量和触发频率。

第二优先级是接入路线层和 Boss 威胁层。路线层必须跟随主路线变化，Boss 抬手时要让出频段，不要盖住读招。

第三优先级是把音量拆成 BGM 和 SFX 两个滑杆。当前只有统一静音，够首版，但后续移动端需要独立调节。

第四优先级才是音频外置到 R2。触发和体验稳定前，不急着迁移音频资产。
