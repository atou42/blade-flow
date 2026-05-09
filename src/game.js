const cards = [
  makeCard("quick-slash", "快斩", "damage", "快速斩击", {
    up: ["上挑快斩", "control"],
    right: ["追身快斩", "speed"],
    left: ["退步快斩", "counter"],
    down: ["压身快斩", "burst"],
  }),
  makeCard("thrust", "突刺", "damage", "直线突刺", {
    up: ["挑刺", "control"],
    right: ["冲刺突刺", "speed"],
    left: ["退步突刺", "counter"],
    down: ["深刺", "burst"],
  }),
  makeCard("launcher", "挑斩", "control", "上挑斩", {
    up: ["高挑空", "control"],
    right: ["空中追击", "speed"],
    left: ["重整步", "counter"],
    down: ["坠击准备", "burst"],
  }),
  makeCard("chase-cut", "追身斩", "speed", "前压斩", {
    up: ["升空追击", "control"],
    right: ["二段追击", "speed"],
    left: ["错身斩", "counter"],
    down: ["压进斩", "burst"],
  }),
  makeCard("spin-cut", "旋斩", "damage", "圆弧斩", {
    up: ["升旋斩", "control"],
    right: ["前旋斩", "speed"],
    left: ["闪身旋斩", "counter"],
    down: ["压地旋斩", "burst"],
  }),
  makeCard("shadow-step", "影步", "counter", "短闪避", {
    up: ["穿身上步", "control"],
    right: ["追击步", "speed"],
    left: ["后撤步", "counter"],
    down: ["低身滑步", "counter"],
  }),
  makeCard("guard", "格挡", "counter", "短格挡", {
    up: ["格挡挑破", "control"],
    right: ["格挡前压", "speed"],
    left: ["招架后撤", "counter"],
    down: ["重反击", "burst"],
  }),
  makeCard("breaker", "破甲", "burst", "破防击", {
    up: ["破甲上挑", "control"],
    right: ["破甲冲击", "speed"],
    left: ["佯破", "counter"],
    down: ["粉碎击", "burst"],
  }),
  makeCard("flying-blade", "飞刃", "speed", "远距斩", {
    up: ["升飞刃", "control"],
    right: ["贯穿飞刃", "speed"],
    left: ["回旋飞刃", "counter"],
    down: ["落刃", "burst"],
  }),
  makeCard("heavy-cleave", "重劈", "burst", "重击", {
    up: ["重挑", "control"],
    right: ["肩撞重劈", "speed"],
    left: ["护身后撤", "counter"],
    down: ["下劈", "burst"],
  }),
  makeCard("execute", "处决", "burst", "终结技", {
    up: ["空中处决", "control"],
    right: ["追身处决", "speed"],
    left: ["反击处决", "counter"],
    down: ["爆发处决", "burst"],
  }),
  makeCard("overdrive", "超载", "speed", "路线爆发", {
    up: ["挑空超载", "control"],
    right: ["追击超载", "speed"],
    left: ["闪反超载", "counter"],
    down: ["爆发超载", "burst"],
  }),
];

const visualAssetBase = "https://pub-de6823af3a394765b91428a3cb3ee2d7.r2.dev/blade-flow/v0.2.62";
const uiPath = `${visualAssetBase}/assets/art/ui-guohua-v2/`;
const routeStamps = {
  neutral: `${uiPath}card-common.webp`,
  speed: `${uiPath}stamp-speed.webp`,
  control: `${uiPath}stamp-control.webp`,
  counter: `${uiPath}stamp-counter.webp`,
  burst: `${uiPath}stamp-burst.webp`,
  damage: `${uiPath}stamp-damage.webp`,
};

const gradeMeta = {
  common: { label: "凡", pips: 1, color: "#d8cbb4", asset: `${uiPath}card-common.webp` },
  rare: { label: "青", pips: 2, color: "#4bbda8", asset: `${uiPath}card-rare.webp` },
  epic: { label: "赤", pips: 3, color: "#d83b24", asset: `${uiPath}card-epic.webp` },
  legendary: { label: "金", pips: 4, color: "#d79f2b", asset: `${uiPath}card-legendary.webp` },
};

const rarityMeta = {
  Common: { id: "common", label: "普通", short: "凡", pips: 1, color: "#d8cbb4" },
  Uncommon: { id: "uncommon", label: "稀有", short: "青", pips: 2, color: "#4bbda8" },
  Rare: { id: "rare", label: "史诗", short: "赤", pips: 3, color: "#d83b24" },
};

const kindMeta = {
  Relic: { id: "relic", label: "遗物", short: "器", color: "#d79f2b" },
  Upgrade: { id: "upgrade", label: "强化", short: "斩", color: "#d83b24" },
  Inscription: { id: "inscription", label: "刻印", short: "刻", color: "#4bbda8" },
  Contract: { id: "contract", label: "契约", short: "裂", color: "#d83b24" },
  Evidence: { id: "evidence", label: "证据", short: "证", color: "#d8cbb4" },
  Rest: { id: "rest", label: "休整", short: "息", color: "#a6d93a" },
  Talent: { id: "talent", label: "天赋", short: "悟", color: "#9f72c8" },
  Training: { id: "training", label: "训练", short: "练", color: "#4bbda8" },
  Oath: { id: "oath", label: "誓约", short: "誓", color: "#d83b24" },
};

const cardGradeMap = {
  "quick-slash": "common",
  thrust: "common",
  launcher: "rare",
  "chase-cut": "rare",
  guard: "rare",
  "shadow-step": "rare",
  "spin-cut": "epic",
  breaker: "epic",
  "flying-blade": "epic",
  "heavy-cleave": "epic",
  execute: "legendary",
  overdrive: "legendary",
};

const routeMeta = {
  neutral: { label: "待势", short: "待", icon: "◇", hint: "点击或滑动卡牌", color: "#f2ead9", shape: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)", stamp: routeStamps.neutral },
  speed: { label: "疾 · 追击", short: "追", icon: "➤", hint: "右划横切追身", color: "#a6d93a", shape: "polygon(0 18%, 70% 18%, 100% 50%, 70% 82%, 0 82%)", stamp: routeStamps.speed },
  control: { label: "空 · 挑空", short: "空", icon: "↟", hint: "上划冲向 Boss 并挑起", color: "#4bbda8", shape: "polygon(50% 0, 86% 46%, 64% 46%, 64% 100%, 36% 100%, 36% 46%, 14% 46%)", stamp: routeStamps.control },
  counter: { label: "逆 · 闪反", short: "返", icon: "↺", hint: "左划侧退反击", color: "#9f72c8", shape: "circle(45% at 50% 50%)", stamp: routeStamps.counter },
  burst: { label: "杀 · 爆发", short: "爆", icon: "◆", hint: "下划蓄势重斩", color: "#d79f2b", shape: "polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)", stamp: routeStamps.burst },
  damage: { label: "斩 · 压制", short: "斩", icon: "✦", hint: "连续出招压低血线", color: "#d83b24", shape: "polygon(44% 0, 70% 0, 56% 42%, 96% 42%, 40% 100%, 52% 58%, 6% 58%)", stamp: routeStamps.damage },
};

const artPath = `${visualAssetBase}/assets/art/stage-layout-v1/`;
const bossFormPath = `${visualAssetBase}/assets/art/boss-forms-v1/`;
const bossSpritePath = `${visualAssetBase}/assets/art/boss-sprites-v1/`;
const artAssets = {
  playerIdle: `${artPath}player-idle.webp`,
  playerLunge: `${artPath}player-lunge.webp`,
  playerHit: `${artPath}player-hit.webp`,
  bossIdle: `${artPath}boss-idle.webp`,
  bossCharge: `${artPath}boss-charge.webp`,
  bossAttack: `${artPath}boss-attack.webp`,
  bossDamaged: `${artPath}boss-damaged.webp`,
  vfxWarningHalo: `${artPath}vfx-warning-halo.webp`,
  vfxTargetBeam: `${artPath}vfx-target-beam.webp`,
  vfxDownStrike: `${artPath}vfx-down-strike.webp`,
  vfxHitBurst: `${artPath}vfx-hit-burst.webp`,
};

const bossForms = {
  blade: `${bossFormPath}blade-guard.webp`,
  shield: `${bossFormPath}shield-guard.webp`,
  mirror: `${bossFormPath}mirror-fist.webp`,
  storm: `${bossFormPath}storm-captain.webp`,
  redline: `${bossFormPath}redline-rival.webp`,
};

const bossActionSprites = {
  fast: artAssets.bossCharge,
  heavy: artAssets.bossCharge,
  feint: artAssets.bossCharge,
  backstep: artAssets.bossCharge,
  "ground-grab": artAssets.bossCharge,
  attack: artAssets.bossAttack,
  damaged: artAssets.bossDamaged,
  death: artAssets.bossDamaged,
};

function makeBossFrameSet(slug) {
  const path = `${bossSpritePath}${slug}/`;
  return {
    idle: `${path}idle.webp`,
    fast: `${path}fast.webp`,
    heavy: `${path}heavy.webp`,
    feint: `${path}feint.webp`,
    backstep: `${path}backstep.webp`,
    "ground-grab": `${path}ground-grab.webp`,
    attack: `${path}attack.webp`,
    damaged: `${path}death.webp`,
    death: `${path}death.webp`,
  };
}

const bossFrameSets = {
  storm: makeBossFrameSet("storm-captain"),
  redline: makeBossFrameSet("redline-rival"),
  mirror: makeBossFrameSet("mirror-blade"),
  shield: makeBossFrameSet("shield-guard"),
};

const bossActionTimelines = {
  fast: [
    ["idle", 90],
    ["charge", 170],
    ["attack", 120],
    ["charge", 140],
  ],
  heavy: [
    ["idle", 130],
    ["charge", 320],
    ["attack", 150],
  ],
  feint: [
    ["idle", 90],
    ["charge", 150],
    ["idle", 120],
    ["charge", 210],
  ],
  backstep: [
    ["idle", 80],
    ["charge", 170],
    ["attack", 160],
  ],
  "ground-grab": [
    ["idle", 110],
    ["charge", 260],
    ["attack", 180],
  ],
  attack: [
    ["charge", 90],
    ["attack", 260],
  ],
  damaged: [
    ["attack", 60],
    ["damaged", 260],
  ],
  death: [
    ["damaged", 300],
    ["death", 420],
  ],
};

const versionHistory = [
  {
    id: "v0.2.63",
    title: "R2 图片外置",
    date: "2026-05-09",
    icon: "图",
    color: "#4bbda8",
    points: ["运行时美术改走 Cloudflare R2 公网 WebP", "生成图转 WebP 后归档到 R2", "GitHub 仓库不再背本地图片大包"],
  },
  {
    id: "v0.2.62",
    title: "Boss 血量压迫",
    date: "2026-05-09",
    icon: "压",
    color: "#d83b24",
    points: ["关底 Boss 默认血量提高 38%", "三幕 Boss 都更耐打", "普通战和精英战血量不变"],
  },
  {
    id: "v0.2.61",
    title: "关卡 BGM 分化",
    date: "2026-05-09",
    icon: "战",
    color: "#f0c45a",
    points: ["二幕改成红线追猎循环", "三幕改成碎镜终局决斗", "二、三幕关卡曲听感明显拉开"],
  },
  {
    id: "v0.2.60",
    title: "Boss 专属 BGM",
    date: "2026-05-09",
    icon: "首",
    color: "#d83b24",
    points: ["风暴队长、赤线宿敌、无相刀影各有专属 BGM", "Boss 曲全部超过 60 秒", "进入 Boss 战自动切到对应主题"],
  },
  {
    id: "v0.2.59",
    title: "调配器可读",
    date: "2026-05-09",
    icon: "调",
    color: "#f2ead9",
    points: ["调配器按钮文字恢复高对比", "滑杆标签和数值不再压进浅纸底", "保留三幕关卡 BGM"],
  },
  {
    id: "v0.2.58",
    title: "关卡 BGM",
    date: "2026-05-09",
    icon: "战",
    color: "#d83b24",
    points: ["三幕各接一条战斗 BGM", "一幕干刃、二幕红线、三幕镜决斗递进", "进下一幕自动切换音乐"],
  },
  {
    id: "v0.2.57",
    title: "主菜单 BGM",
    date: "2026-05-09",
    icon: "音",
    color: "#a6d93a",
    points: ["接入 Suno 37 秒主菜单音乐", "首个点击后解锁播放", "进战斗自动停主菜单 BGM"],
  },
  {
    id: "v0.2.56",
    title: "路线辨识",
    date: "2026-05-09",
    icon: "路",
    color: "#f0c45a",
    points: ["刀路选择区分稳路、图谱和高危", "路线标签加入风险色和短提示", "效果数字不再拉成长色条"],
  },
  {
    id: "v0.2.55",
    title: "手机修边",
    date: "2026-05-09",
    icon: "边",
    color: "#b8e6d8",
    points: ["Boss 动作帧去掉棋盘格底", "短视口手机不再截断手牌", "保留降级后的移动端验收记录"],
  },
  {
    id: "v0.2.54",
    title: "设备校验",
    date: "2026-05-09",
    icon: "验",
    color: "#d7e6a8",
    points: ["真机记录会带自动设备信息", "桌面伪装成手机会被拦住", "最终 JSON 证据更可信"],
  },
  {
    id: "v0.2.53",
    title: "真机传送",
    date: "2026-05-09",
    icon: "链",
    color: "#e6d4a8",
    points: ["入口可复制真机长测链接", "方便把验收地址直接发到手机", "继续等待真实手机 60 秒 JSON"],
  },
  {
    id: "v0.2.52",
    title: "旧档拦截",
    date: "2026-05-09",
    icon: "拦",
    color: "#d4e6b8",
    points: ["分享前会复查最近记录", "旧的短测或模拟记录不能导出", "避免误发历史无效 JSON"],
  },
  {
    id: "v0.2.51",
    title: "保存门槛",
    date: "2026-05-09",
    icon: "槛",
    color: "#b8e6d8",
    points: ["不足 60 秒不能保存", "设备为空或像模拟器不能保存", "减少无效真机记录回传"],
  },
  {
    id: "v0.2.50",
    title: "保存即分享",
    date: "2026-05-09",
    icon: "发",
    color: "#8fd9ca",
    points: ["保存真机记录后自动打开分享", "分享失败时仍可复制或手选文本", "减少跑完长测后忘记回传"],
  },
  {
    id: "v0.2.49",
    title: "分享记录",
    date: "2026-05-08",
    icon: "享",
    color: "#64c7b4",
    points: ["真机长测记录支持原生分享", "无分享权限时自动回到复制记录", "进一步减少手机回传阻力"],
  },
  {
    id: "v0.2.48",
    title: "真机直达",
    date: "2026-05-08",
    icon: "达",
    color: "#d79f2b",
    points: ["支持 mobileQa=1 直达真机长测面板", "验收链接可直接发到手机打开", "减少真实手机记录回收路径"],
  },
  {
    id: "v0.2.47",
    title: "记录导出",
    date: "2026-05-08",
    icon: "录",
    color: "#a6d93a",
    points: ["真机长测记录支持复制", "复制失败时显示可手动选中的记录文本", "调试接口可导出最新真机验收记录"],
  },
  {
    id: "v0.2.46",
    title: "真机长测",
    date: "2026-05-08",
    icon: "测",
    color: "#4bbda8",
    points: ["新增手机长测入口", "可在真机保存发热和手感记录", "长测记录写入本地浏览器，和自动探针数据合并"],
  },
  {
    id: "v0.2.45",
    title: "四型帧图",
    date: "2026-05-08",
    icon: "像",
    color: "#9f72c8",
    points: ["image2 补齐赤线、镜系、盾系三套 8 帧 Boss sheet", "四类 Boss 读招、攻击和死亡都有独立形象", "Boss 升级时不再回退到通用动作图"],
  },
  {
    id: "v0.2.44",
    title: "风暴帧图",
    date: "2026-05-08",
    icon: "画",
    color: "#d83b24",
    points: ["image2 生成风暴队长 8 帧动作 sheet", "风暴队长读招和攻击优先使用真生成帧", "保留 sheet、切帧和线上验收记录"],
  },
  {
    id: "v0.2.43",
    title: "动作帧序",
    date: "2026-05-08",
    icon: "帧",
    color: "#d79f2b",
    points: ["Boss 动作从单图切换升级为帧序播放", "快刀、慢刀、假抬手、后撤、地裂有不同时间轴", "调试验收可读取当前动作帧和帧数"],
  },
  {
    id: "v0.2.42",
    title: "长测探针",
    date: "2026-05-08",
    icon: "测",
    color: "#7fdac8",
    points: ["新增调试长测探针", "可连续自动出牌和处理结算选路", "记录残留节点、长任务、内存和性能档位"],
  },
  {
    id: "v0.2.41",
    title: "长期分支",
    date: "2026-05-08",
    icon: "岔",
    color: "#4bbda8",
    points: ["上行图谱解锁会改变局内选路", "三条证据线开放专属高危分支", "分支会影响敌人、Boss 烙印、奖励和证据"],
  },
  {
    id: "v0.2.40",
    title: "动作图谱",
    date: "2026-05-08",
    icon: "动",
    color: "#d79f2b",
    points: ["Boss 读招、攻击、受击、死亡会切真实动作图", "保留各 Boss 形态的待机识别", "新增动作图谱验收，检查状态切换和无残留"],
  },
  {
    id: "v0.2.39",
    title: "三流派连测",
    date: "2026-05-08",
    icon: "验",
    color: "#4bbda8",
    points: ["标准难度补三流派连续通关验收", "追击流续压时不再被后撤烙印过度惩罚", "高速、闪反、破势三局会留下不同路线证据"],
  },
  {
    id: "v0.2.38",
    title: "日课契约",
    date: "2026-05-08",
    icon: "契",
    color: "#d83b24",
    points: ["每日刀路新增主题专属契约池", "日课锻炉会给当天路线的高风险选择", "每日契约只影响本局，不发永久战斗数值"],
  },
  {
    id: "v0.2.37",
    title: "学派扩展",
    date: "2026-05-08",
    icon: "谱",
    color: "#4bbda8",
    points: ["三把首发武器各扩到 3 个可解锁刀谱", "新增桥接谱和高阶谱进入工坊与锻造池", "新谱也会按 Boss 窗口点亮并给会心反馈"],
  },
  {
    id: "v0.2.36",
    title: "坏档矩阵",
    date: "2026-05-08",
    icon: "锁",
    color: "#d83b24",
    points: ["长期 profile 会校验未知配方、训练、图谱和每日主题", "run 槽会校验每日主题和已选刀路", "坏数据只锁对应槽或 profile，不用默认值伪装正常"],
  },
  {
    id: "v0.2.35",
    title: "每日刀路",
    date: "2026-05-08",
    icon: "日",
    color: "#d79f2b",
    points: ["局外成长加入每日短局入口", "每日按固定种子给武器、路线和 Boss 烙印主题", "通关只记录每日成绩和完成章，不发永久战斗数值"],
  },
  {
    id: "v0.2.34",
    title: "训练实战",
    date: "2026-05-08",
    icon: "练",
    color: "#4bbda8",
    points: ["训练课从局外入口变成短实战", "训练会固定 Boss 动作，专门练后撤、假抬手和地裂", "训练完成只给训练章，不刷锻刃墨和普通材料"],
  },
  {
    id: "v0.2.33",
    title: "局外图谱",
    date: "2026-05-08",
    icon: "谱",
    color: "#9f72c8",
    points: ["长期成长加入武器学派、训练课和上行图谱", "解锁配方会打开对应训练与学派节点", "调试成长加入一键全解锁、证据注入和当前局复测"],
  },
  {
    id: "v0.2.32",
    title: "省电档位",
    date: "2026-05-08",
    icon: "省",
    color: "#4bbda8",
    points: ["调配器加入性能档位，省电档减少高成本特效", "省电档把战斗主循环降到低频唤醒", "未来补牌队列和提招深度进入可调参数"],
  },
  {
    id: "v0.2.31",
    title: "三幕敌群",
    date: "2026-05-08",
    icon: "敌",
    color: "#d79f2b",
    points: ["二幕、三幕不再复用一幕敌人名字", "普通战、精英、Boss 按幕拥有不同路线和教学目标", "上行刀路地图会显示当前幕自己的敌群节点"],
  },
  {
    id: "v0.2.30",
    title: "坏档锁定",
    date: "2026-05-08",
    icon: "锁",
    color: "#d83b24",
    points: ["单个 run 槽坏了只锁当前槽", "保存其他槽时保留坏槽原始数据", "长期成长坏档会锁定对应 profile，不再默认重建"],
  },
  {
    id: "v0.2.29",
    title: "奖励池扩展",
    date: "2026-05-08",
    icon: "奖",
    color: "#4bbda8",
    points: ["首批遗物、天赋、契约扩到 36 个奖励", "挑空、压制、全路线不再只靠装备开局出现", "奖励卡继续用路线、类型、稀有度和数值标签表达收益与代价"],
  },
  {
    id: "v0.2.28",
    title: "六器开局",
    date: "2026-05-08",
    icon: "器",
    color: "#9f72c8",
    points: ["首发装备从 3 件扩到 6 件", "重力战锤、铳刀、决斗刀鞘进入武器选择", "每件装备都有独立路线、起手数值和 Boss 反制风险"],
  },
  {
    id: "v0.2.27",
    title: "动作读招",
    date: "2026-05-08",
    icon: "势",
    color: "#d79f2b",
    points: ["Boss 快刀、慢刀、假抬手、后撤横切、地裂抓取有不同身体和武器提示", "红核、刀线、地裂和假影先于进度条表达危险", "战斗验收改为看动作也能判断该左划、右划或下划"],
  },
  {
    id: "v0.2.26",
    title: "构筑定锚",
    date: "2026-05-08",
    icon: "锚",
    color: "#4bbda8",
    points: ["战后奖励分成表现、构筑、修正三槽", "第一次明确路线奖励会立本局刃心定锚", "补牌条显示后续短未来牌，下一段刀路可选稳路或险路"],
  },
  {
    id: "v0.2.25",
    title: "三幕进阶",
    date: "2026-05-08",
    icon: "幕",
    color: "#d83b24",
    points: ["打完 Boss 不再直接结束", "一幕后可进入二幕、三幕", "高幕敌人血量、伤害和抬手压力升级"],
  },
  {
    id: "v0.2.24",
    title: "配方工坊",
    date: "2026-05-08",
    icon: "谱",
    color: "#4bbda8",
    points: ["三条武器配方进入本地长期成长", "手牌会标亮当前流派的高收益划向", "关键读招会转成锻刃材料"],
  },
  {
    id: "v0.2.23",
    title: "本地存档",
    date: "2026-05-08",
    icon: "存",
    color: "#d79f2b",
    points: ["浏览器本地 5 个存档槽", "保存当前局面、手牌、奖励和调配器", "支持读取和删除"],
  },
  {
    id: "v0.2.22",
    title: "类型牌面",
    date: "2026-05-08",
    icon: "类",
    color: "#4bbda8",
    points: ["奖励类型加入独立印章", "遗物、强化、刻印、契约、证据、休整有不同牌面边线", "类型和稀有度分开读"],
  },
  {
    id: "v0.2.21",
    title: "稀有度印章",
    date: "2026-05-08",
    icon: "品",
    color: "#d79f2b",
    points: ["奖励标题旁加入稀有度印章", "普通、稀有、史诗用颜色和点数区分", "说明行只保留类型和具体数值"],
  },
  {
    id: "v0.2.20",
    title: "数值读牌",
    date: "2026-05-08",
    icon: "数",
    color: "#4bbda8",
    points: ["武器、奖励、事件改成具体数值说明", "正面、风险、情报数字分色", "选择时能看见路线值、伤害、冷却和 Boss 代价"],
  },
  {
    id: "v0.2.19",
    title: "上行刀路",
    date: "2026-05-07",
    icon: "路",
    color: "#d79f2b",
    points: ["一幕竖向刀路", "装备契约、遗物契约、战斗证据进入奖励", "Boss 会根据路线烙印变招"],
  },
  {
    id: "v0.2.18",
    title: "性能降温",
    date: "2026-05-07",
    icon: "冷",
    color: "#4bbda8",
    points: ["静态遮罩停止空跑帧", "战斗 UI 只更新变化值", "战斗角色和特效资源改用轻量 WebP"],
  },
  {
    id: "v0.2.17",
    title: "切换收刀",
    date: "2026-05-07",
    icon: "收",
    color: "#d79f2b",
    points: ["Boss 形象切房间时强制刷新", "预载 Boss 形态避免残影", "击杀结算等待最后一刀动画完成"],
  },
  {
    id: "v0.2.16",
    title: "清晰战斗",
    date: "2026-05-07",
    icon: "清",
    color: "#4bbda8",
    points: ["功能文字加深底和描边", "卡牌与弹窗文字重新提对比", "Boss 按敌人和幕数切换形象"],
  },
  {
    id: "v0.2.15",
    title: "国画读牌",
    date: "2026-05-07",
    icon: "章",
    color: "#d79f2b",
    points: ["沿用第五版国画 UI 方向", "卡牌等级改用不同卡底和印记", "路线靠水墨图标、颜色和形状先被读到"],
  },
  {
    id: "v0.2.14",
    title: "image2 UI",
    date: "2026-05-07",
    icon: "印",
    color: "#d83b24",
    points: ["用 image2 生成水墨 UI 材质板", "面板、卡牌、弹窗、按钮接入生产纹理", "视觉统一不再只靠 CSS 颜色"],
  },
  {
    id: "v0.2.13",
    title: "界面统一",
    date: "2026-05-07",
    icon: "纹",
    color: "#d8cbb4",
    points: ["HUD、卡牌、弹窗统一成清洁水墨纸面", "武器选择、调配器、版本记录不再像临时工程面板", "保留路线颜色和连击可读性"],
  },
  {
    id: "v0.2.12",
    title: "美术替换",
    date: "2026-05-07",
    icon: "景",
    color: "#f2ead9",
    points: ["替换临时 SVG/CSS 战斗美术", "接入清洁水墨舞台、玩家和 Boss 状态图", "Boss 进攻、玩家受击改用生产 VFX"],
  },
  {
    id: "v0.2.11",
    title: "水墨刀光",
    date: "2026-05-07",
    icon: "墨",
    color: "#f2ead9",
    points: ["玩家与 Boss 水墨剪影", "刀光加入墨痕飞溅", "战斗第一屏更像日式动作决斗"],
  },
  {
    id: "v0.2.10",
    title: "飞牌方向",
    date: "2026-05-06",
    icon: "➤",
    color: "#4bbda8",
    points: ["卡牌按方向飞出", "方向符号放大", "残影淡出更清楚"],
  },
  {
    id: "v0.2.9",
    title: "连击舞台",
    date: "2026-05-04",
    icon: "S",
    color: "#a6d93a",
    points: ["战斗场拉高", "突进攻击更明显", "连击数和风格等级弹字"],
  },
  {
    id: "v0.2.8",
    title: "受击反馈",
    date: "2026-05-04",
    icon: "!",
    color: "#d83b24",
    points: ["玩家形象缩小", "Boss 形象入场", "攻击和掉血改成视觉反馈"],
  },
  {
    id: "v0.2.7",
    title: "视觉日志",
    date: "2026-05-04",
    icon: "✦",
    color: "#f2ead9",
    points: ["游戏内版本记录", "路线颜色与图标", "构筑选择更像装备牌"],
  },
  {
    id: "v0.2.6",
    title: "补牌冷却",
    date: "2026-05-04",
    icon: "◇",
    color: "#4bbda8",
    points: ["手牌不再无限瞬补", "补牌进度条", "等待也能成为策略"],
  },
  {
    id: "v0.2.5",
    title: "架势债务",
    date: "2026-05-04",
    icon: "↺",
    color: "#9f72c8",
    points: ["重复出牌会透支架势", "低架势伤害下降", "破绽会被 Boss 抓住"],
  },
  {
    id: "v0.2.4",
    title: "调配器",
    date: "2026-05-04",
    icon: "⚙",
    color: "#a6d93a",
    points: ["六档难度", "前端参数调试", "Boss 抢招压力"],
  },
  {
    id: "v0.2.3",
    title: "Boss 压迫",
    date: "2026-05-04",
    icon: "!",
    color: "#d83b24",
    points: ["Boss 会持续进攻", "开局也有压力", "闪反窗口成立"],
  },
  {
    id: "v0.2.2",
    title: "竖屏对峙",
    date: "2026-05-04",
    icon: "↟",
    color: "#d79f2b",
    points: ["Boss 在上，玩家在下", "方向关系更直觉", "手机竖屏优先"],
  },
  {
    id: "v0.2.1",
    title: "连击笔记",
    date: "2026-05-04",
    icon: "?",
    color: "#f2ead9",
    points: ["方向说明", "路线提示", "战斗回顾"],
  },
  {
    id: "v0.2.0",
    title: "三幕肉鸽",
    date: "2026-05-04",
    icon: "◆",
    color: "#d79f2b",
    points: ["三幕房间结构", "武器、奖励、事件", "今日种子"],
  },
];

const equipmentPool = [
  {
    id: "storm-katana",
    name: "风暴太刀",
    sigil: "➤",
    route: "speed",
    pitch: "开局追击值 +2；右划后保连充能 +6。Boss 获得后撤横切烙印 +1。",
    mark: "追击烙印",
    mods: { speed: 2 },
    contract: { route: "speed", bossMark: "backstep" },
  },
  {
    id: "mirror-fan",
    name: "镜扇",
    sigil: "↺",
    route: "counter",
    pitch: "开局闪反值 +2；左划/完美闪反伤害 +10。Boss 获得假抬手烙印 +1。",
    mark: "闪反烙印",
    mods: { counter: 2 },
    contract: { route: "counter", bossMark: "feint" },
  },
  {
    id: "executioner",
    name: "处刑者",
    sigil: "◆",
    route: "burst",
    pitch: "开局爆发值 +3、压制值 +1；下划伤害 +15。Boss 获得地裂抓取烙印 +1。",
    mark: "爆发烙印",
    mods: { burst: 3, damage: 1 },
    contract: { route: "burst", bossMark: "ground-grab" },
  },
  {
    id: "gravity-hammer",
    name: "重力战锤",
    sigil: "↟",
    route: "control",
    pitch: "开局挑空值 +3、爆发值 +1；上划按挑空值拖延 Boss 抬手。Boss 获得地裂抓取烙印 +1。",
    mark: "挑空烙印",
    mods: { control: 3, burst: 1 },
    contract: { route: "control", bossMark: "ground-grab" },
  },
  {
    id: "gunblade",
    name: "铳刀",
    sigil: "✦",
    route: "damage",
    pitch: "开局压制值 +3、追击值 +1；点击基础招伤害 +6。Boss 获得后撤横切烙印 +1。",
    mark: "压制烙印",
    mods: { damage: 3, speed: 1 },
    contract: { route: "damage", bossMark: "backstep" },
  },
  {
    id: "duelist-scabbard",
    name: "决斗刀鞘",
    sigil: "◇",
    route: "counter",
    pitch: "开局闪反值 +2、全路线 +1；四向出招都有基础收益。Boss 获得假抬手烙印 +1。",
    mark: "决斗烙印",
    mods: { counter: 2, any: 1 },
    contract: { route: "counter", bossMark: "feint" },
  },
];

const encounters = [
  { act: 1, type: "fight", nodeIcon: "小", name: "刀信使", hp: 145, speed: 3100, route: "speed", form: "blade", damage: 13, note: "HP 145，伤害 13，基础抬手 3100ms。右划保连充能 +3，左划可完美闪反。" },
  { act: 1, type: "scout", nodeIcon: "眼", name: "风暴斥候", route: "counter", note: "获得侦察 +1。风暴队长快刀红核提前 +1 级。" },
  { act: 1, type: "fight", nodeIcon: "盾", name: "铃盾卒", hp: 175, speed: 3300, route: "burst", form: "shield", damage: 14, note: "HP 175，伤害 14，基础抬手 3300ms。下划破势后破势证据 +1。" },
  { act: 1, type: "forge", nodeIcon: "锻", name: "锻刃炉", route: "any", note: "选择 1 条刻印：路线值 +1，同时给 Boss 烙印 +1。" },
  { act: 1, type: "fight", nodeIcon: "羽", name: "灰羽弓手", hp: 160, speed: 3000, route: "speed", form: "blade", damage: 12, note: "HP 160，伤害 12，基础抬手 3000ms。右划和飞刃保连充能 +3。" },
  { act: 1, type: "elite", nodeIcon: "镜", name: "镜侍", hp: 240, speed: 2500, route: "counter", form: "mirror", damage: 17, note: "HP 240，伤害 17，基础抬手 2500ms。错读假抬手时 Boss 压力 +9。" },
  { act: 1, type: "market", nodeIcon: "裂", name: "黑市契约", route: "any", note: "契约给路线值 +3，同时让 Boss 出手提前 80-100ms。" },
  { act: 1, type: "boss", nodeIcon: "首", name: "风暴队长", hp: 340, speed: 2200, route: "burst", form: "storm", damage: 19, note: "HP 340，伤害 19，基础抬手 2200ms。开战继承全部 Boss 烙印。" },
];

const actEncounterVariants = {
  2: {
    0: { nodeIcon: "追", name: "赤线追兵", hp: 170, speed: 2700, route: "speed", form: "redline", damage: 15, lesson: "追身反制。右划太早会被后撤横切，等 Boss 空挥再追。" },
    1: { type: "scout", nodeIcon: "镜", name: "镜廊侦者", route: "counter", form: "mirror", lesson: "假抬手预告。侦察会让假抬手红核提前露出 +1 级。" },
    2: { nodeIcon: "盾", name: "裂盾徒", hp: 210, speed: 2850, route: "burst", form: "shield", damage: 17, lesson: "破势窗口。盾面亮金裂时下划收益最高，贪追击会涨压力。" },
    3: { type: "forge", nodeIcon: "赤", name: "赤炉刻印", route: "damage", lesson: "装备调校。拿刻印会给路线值 +1，也会喂 Boss 一个反制烙印。" },
    4: { nodeIcon: "弦", name: "灰羽双弦", hp: 185, speed: 2500, route: "damage", form: "blade", damage: 16, lesson: "远程压迫。点击和右划能压低血线，等牌太久会被连续射击。" },
    5: { type: "elite", nodeIcon: "影", name: "镜廊祭司", hp: 285, speed: 2150, route: "counter", form: "mirror", damage: 21, lesson: "真假读招。左划要等真红核，错读假抬手会让 Boss 压力 +9。" },
    6: { type: "market", nodeIcon: "契", name: "红线黑市", route: "any", lesson: "高风险契约。契约给路线值 +3，同时让 Boss 出手提前 80-120ms。" },
    7: { type: "boss", nodeIcon: "宿", name: "赤线宿敌", hp: 430, speed: 1850, route: "counter", form: "redline", damage: 25, lesson: "距离锁定。它会惩罚重复方向，必须混合追击、闪反和破势。" },
  },
  3: {
    0: { nodeIcon: "相", name: "无相刃影", hp: 205, speed: 2350, route: "counter", form: "mirror", damage: 18, lesson: "延迟刀。先等身体前倾，再左划或格挡。" },
    1: { type: "scout", nodeIcon: "眼", name: "黑月观星", route: "any", form: "mirror", lesson: "终局情报。侦察会暴露本幕 Boss 的主烙印和下一次假抬手。" },
    2: { nodeIcon: "钟", name: "墨盾钟卫", hp: 260, speed: 2500, route: "burst", form: "shield", damage: 20, lesson: "霸体压迫。下划打断慢蓄力，空下划会被地裂抓取惩罚。" },
    3: { type: "forge", nodeIcon: "无", name: "无相炉", route: "control", lesson: "挑空调校。锻造会强化上划拖延，同时提高 Boss 反空风险。" },
    4: { nodeIcon: "铳", name: "赤羽铳师", hp: 225, speed: 2200, route: "damage", form: "redline", damage: 19, lesson: "压制换拍。点击能稳定压血，右划只在 Boss 后退后收益最高。" },
    5: { type: "elite", nodeIcon: "鼓", name: "黑鼓力士", hp: 340, speed: 2050, route: "burst", form: "shield", damage: 26, lesson: "慢刀贪刀。慢蓄力期间可抢破势，过早下划会被反震。" },
    6: { type: "market", nodeIcon: "日", name: "黑日契约", route: "any", lesson: "终局赌命。稀有契约会给全路线 +2，但 Boss 出手提前 120ms。" },
    7: { type: "boss", nodeIcon: "终", name: "无相刀影", hp: 560, speed: 1650, route: "speed", form: "mirror", damage: 31, lesson: "混合读招。快刀、慢刀、假抬手和后撤横切会按你的最强路线组合。" },
  },
};

const pathChoiceCatalog = [
  {
    id: "steady",
    label: "稳路",
    icon: "稳",
    route: "any",
    risk: "stable",
    text: "下一战 HP -8%，Boss 伤害 -1；修正奖励权重 +1。",
    hpScale: 0.92,
    damageDelta: -1,
    rewardBias: "correction",
  },
  {
    id: "speed-risk",
    label: "追击险路",
    icon: "追",
    route: "speed",
    risk: "danger",
    text: "下一战 Boss 出手提前 120ms、伤害 +2；追击构筑奖励权重 +2，追身证据掉落 +1。",
    speedDelta: 120,
    damageDelta: 2,
    routeMark: "speed",
    rewardBias: "speed",
    evidence: "backstepIntercept",
  },
  {
    id: "counter-risk",
    label: "闪反险路",
    icon: "返",
    route: "counter",
    risk: "danger",
    text: "下一战 Boss 出手提前 100ms、假抬手权重 +1；闪反构筑奖励权重 +2，真读证据掉落 +1。",
    speedDelta: 100,
    damageDelta: 1,
    routeMark: "counter",
    rewardBias: "counter",
    evidence: "trueRead",
  },
  {
    id: "burst-risk",
    label: "破势险路",
    icon: "爆",
    route: "burst",
    risk: "danger",
    text: "下一战 HP +10%、Boss 伤害 +2；爆发构筑奖励权重 +2，碎甲证据掉落 +1。",
    hpScale: 1.1,
    damageDelta: 2,
    routeMark: "burst",
    rewardBias: "burst",
    evidence: "shatterExecute",
  },
  {
    id: "forge-risk",
    label: "锻刃险路",
    icon: "锻",
    route: "damage",
    risk: "danger",
    text: "下一节点改为锻造，Boss 烙印 +1；刻印和训练奖励权重 +2。",
    forceType: "forge",
    routeMark: "damage",
    rewardBias: "forge",
  },
  {
    id: "scout-risk",
    label: "侦察险路",
    icon: "眼",
    route: "counter",
    risk: "danger",
    text: "下一节点改为侦察，Boss 出手提前 80ms；证据奖励权重 +2。",
    forceType: "scout",
    speedDelta: 80,
    routeMark: "counter",
    rewardBias: "scout",
  },
  {
    id: "redline-hunt-branch",
    label: "赤线猎场",
    icon: "猎",
    route: "speed",
    risk: "danger",
    atlasId: "branch-redline",
    minAct: 2,
    text: "图谱分支。下一战改为精英，Boss 出手提前 150ms、伤害 +3；追身证据 +2，追击奖励权重 +3。",
    forceType: "elite",
    speedDelta: 150,
    damageDelta: 3,
    routeMark: "speed",
    rewardBias: "speed",
    evidence: "backstepIntercept",
    evidenceGain: 2,
    bossMark: "backstep",
  },
  {
    id: "mirror-gauntlet-branch",
    label: "镜廊赌局",
    icon: "赌",
    route: "counter",
    risk: "danger",
    atlasId: "branch-mirror",
    minAct: 2,
    text: "图谱分支。下一战混入假抬手，Boss 出手提前 130ms；真读证据 +2，闪反奖励权重 +3。",
    speedDelta: 130,
    damageDelta: 2,
    routeMark: "counter",
    rewardBias: "counter",
    evidence: "trueRead",
    evidenceGain: 2,
    bossMark: "feint",
  },
  {
    id: "blackdrum-execution-branch",
    label: "黑鼓刑场",
    icon: "刑",
    route: "burst",
    risk: "danger",
    atlasId: "branch-blackdrum",
    minAct: 3,
    text: "图谱分支。下一战 HP +18%、Boss 伤害 +4；碎甲证据 +2，破势奖励权重 +3。",
    hpScale: 1.18,
    damageDelta: 4,
    routeMark: "burst",
    rewardBias: "burst",
    evidence: "shatterExecute",
    evidenceGain: 2,
    bossMark: "ground-grab",
  },
];

const actMax = 3;
const actMeta = {
  1: { label: "一幕", prefix: "", hp: 1, damage: 1, speed: 0, bossName: "风暴队长", bossForm: "storm", bossRoute: "burst", bossMark: null },
  2: { label: "二幕", prefix: "赤线", hp: 1.42, damage: 1.22, speed: 260, bossName: "赤线宿敌", bossForm: "redline", bossRoute: "counter", bossMark: "feint" },
  3: { label: "三幕", prefix: "无相", hp: 1.86, damage: 1.48, speed: 460, bossName: "无相刀影", bossForm: "mirror", bossRoute: "speed", bossMark: "backstep" },
};

const bossDefaultHpScale = 1.38;

const rewards = [
  { id: "redline-scabbard", kind: "Relic", rarity: "Common", name: "红线刀鞘", route: "speed", text: "追击值 +2；补牌冷却按追击值缩短。", mods: { speed: 2 } },
  { id: "comet-sheath", kind: "Relic", rarity: "Uncommon", name: "彗星鞘影", route: "speed", text: "追击值 +3；补牌冷却按追击值缩短。", mods: { speed: 3 } },
  { id: "borrowed-edge", kind: "Relic", rarity: "Uncommon", name: "借刃", route: "counter", text: "闪反值 +2；左划伤害 +10。", mods: { counter: 2 } },
  { id: "mirror-scar", kind: "Relic", rarity: "Rare", name: "镜痕", route: "counter", text: "闪反值 +3；左划伤害 +15。", mods: { counter: 3 } },
  { id: "drop-hammer", kind: "Relic", rarity: "Common", name: "坠锤", route: "burst", text: "爆发值 +2；下划伤害 +10。", mods: { burst: 2 } },
  { id: "execution-drum", kind: "Relic", rarity: "Rare", name: "处刑鼓", route: "burst", text: "爆发值 +3；下划伤害 +15。", mods: { burst: 3 } },
  { id: "right-inscription", kind: "Inscription", rarity: "Common", name: "追击刻印", route: "speed", text: "追击值 +1；Boss 后撤横切烙印 +1。", mods: { speed: 1 }, mark: "backstep" },
  { id: "left-inscription", kind: "Inscription", rarity: "Common", name: "闪反刻印", route: "counter", text: "闪反值 +1；Boss 假抬手烙印 +1。", mods: { counter: 1 }, mark: "feint" },
  { id: "down-inscription", kind: "Inscription", rarity: "Common", name: "处决刻印", route: "burst", text: "爆发值 +1；Boss 地裂抓取烙印 +1。", mods: { burst: 1 }, mark: "ground-grab" },
  { id: "redline-pursuit", kind: "Contract", rarity: "Uncommon", name: "追击契约", route: "speed", text: "追击值 +3，Boss 出手提前 90ms，后撤横切烙印 +1。", mods: { speed: 3 }, mark: "backstep", oathPressure: 90 },
  { id: "mirror-oath", kind: "Contract", rarity: "Uncommon", name: "镜面契约", route: "counter", text: "闪反值 +3，Boss 出手提前 80ms，假抬手烙印 +1。", mods: { counter: 3 }, mark: "feint", oathPressure: 80 },
  { id: "black-drum", kind: "Contract", rarity: "Uncommon", name: "黑鼓契约", route: "burst", text: "爆发值 +3，Boss 出手提前 100ms，地裂抓取烙印 +1。", mods: { burst: 3 }, mark: "ground-grab", oathPressure: 100 },
  { id: "windup-rubbing", kind: "Evidence", rarity: "Common", name: "抬手拓本", route: "counter", text: "Boss 抬手提示提前 +1 级；闪反值 +1。", mods: { counter: 1 }, scout: 1 },
  { id: "broken-armor", kind: "Evidence", rarity: "Uncommon", name: "破势碎甲", route: "burst", text: "破势证据 +1；爆发值 +1。", mods: { burst: 1 }, breakEvidence: 1 },
  { id: "finisher-shard", kind: "Evidence", rarity: "Rare", name: "终结残片", route: "speed", text: "高连击收尾后，奖励路线 +1；追击值 +1。", mods: { speed: 1 }, finisherEvidence: 1 },
  { id: "quick-slash-ex", kind: "Upgrade", rarity: "Common", name: "快斩 EX", route: "damage", text: "点击基础招伤害 +2；压制值 +1。", mods: { damage: 1 } },
  { id: "shadow-step-ex", kind: "Upgrade", rarity: "Uncommon", name: "影步 EX", route: "counter", text: "左划伤害 +5；闪反值 +1。", mods: { counter: 1 } },
  { id: "execute-ex", kind: "Upgrade", rarity: "Rare", name: "处决 EX", route: "burst", text: "下划伤害 +5；爆发值 +1。", mods: { burst: 1 } },
  { id: "high-hand-sigil", kind: "Relic", rarity: "Common", name: "高手印", route: "control", text: "挑空值 +2；上划按挑空值拖延 Boss 抬手。", mods: { control: 2 } },
  { id: "floating-point", kind: "Relic", rarity: "Uncommon", name: "悬空点", route: "control", text: "挑空值 +3；专注 +10。", mods: { control: 3 }, heal: 10 },
  { id: "split-tip-spear", kind: "Relic", rarity: "Common", name: "裂尖枪", route: "damage", text: "压制值 +2；点击基础招伤害 +4。", mods: { damage: 2 } },
  { id: "crown-of-cuts", kind: "Relic", rarity: "Rare", name: "百斩冠", route: "damage", text: "压制值 +3、追击值 +1；点击基础招伤害 +6。", mods: { damage: 3, speed: 1 } },
  { id: "combo-lantern", kind: "Relic", rarity: "Uncommon", name: "连击灯", route: "any", text: "全路线 +2；所有动作伤害 +2。", mods: { any: 2 } },
  { id: "grave-palm", kind: "Relic", rarity: "Rare", name: "墓掌", route: "burst", text: "爆发值 +2、挑空值 +1；下划伤害 +10。", mods: { burst: 2, control: 1 } },
  { id: "speed-draft", kind: "Talent", rarity: "Common", name: "追击草图", route: "speed", text: "追击值 +2；后续奖励偏向追击。", mods: { speed: 2 } },
  { id: "air-marshal", kind: "Talent", rarity: "Common", name: "空场教范", route: "control", text: "挑空值 +2；后续奖励偏向挑空。", mods: { control: 2 } },
  { id: "counter-doctrine", kind: "Talent", rarity: "Common", name: "闪反教义", route: "counter", text: "闪反值 +2；后续奖励偏向闪反。", mods: { counter: 2 } },
  { id: "break-doctrine", kind: "Talent", rarity: "Common", name: "破势教义", route: "burst", text: "爆发值 +2；后续奖励偏向爆发。", mods: { burst: 2 } },
  { id: "sharp-basics", kind: "Talent", rarity: "Uncommon", name: "利刃基础", route: "damage", text: "压制值 +2；后续奖励偏向压制。", mods: { damage: 2 } },
  { id: "form-commitment", kind: "Talent", rarity: "Rare", name: "定式承诺", route: "any", text: "全路线 +2；所有动作伤害 +2。", mods: { any: 2 } },
  { id: "skyhook-oath", kind: "Contract", rarity: "Uncommon", name: "天钩契约", route: "control", text: "挑空值 +3，Boss 出手提前 85ms，地裂抓取烙印 +1。", mods: { control: 3 }, mark: "ground-grab", oathPressure: 85 },
  { id: "ash-gunline", kind: "Contract", rarity: "Uncommon", name: "灰铳契约", route: "damage", text: "压制值 +3，Boss 出手提前 95ms，后撤横切烙印 +1。", mods: { damage: 3 }, mark: "backstep", oathPressure: 95 },
  { id: "full-compass-vow", kind: "Contract", rarity: "Rare", name: "全向誓约", route: "any", text: "全路线 +2，Boss 出手提前 120ms，假抬手烙印 +1。", mods: { any: 2 }, mark: "feint", oathPressure: 120 },
  { id: "thin-blade-vow", kind: "Contract", rarity: "Rare", name: "薄刃誓约", route: "speed", text: "追击值 +2、闪反值 +2，Boss 出手提前 105ms，假抬手烙印 +1。", mods: { speed: 2, counter: 2 }, mark: "feint", oathPressure: 105 },
  { id: "route-scout", kind: "Evidence", rarity: "Common", name: "路线侦察", route: "any", text: "侦察 +1；后续奖励跟随当前路线。", mods: { any: 1 }, scout: 1 },
  { id: "boss-fragment", kind: "Evidence", rarity: "Rare", name: "Boss 残片", route: "any", text: "终结残片 +1、破势证据 +1；全路线 +1。", mods: { any: 1 }, finisherEvidence: 1, breakEvidence: 1 },
];

const eventChoices = [
  { id: "scout-fast", kind: "Evidence", name: "快刀拓本", route: "counter", text: "风暴队长快刀红核提前 +1 级；闪反值 +1。", mods: { counter: 1 }, scout: 1 },
  { id: "forge-chase", kind: "Inscription", name: "追身锻刃", route: "speed", text: "追击值 +1；Boss 后撤横切烙印 +1。", mods: { speed: 1 }, mark: "backstep" },
  { id: "forge-break", kind: "Inscription", name: "破势锻刃", route: "burst", text: "爆发值 +1；Boss 地裂抓取烙印 +1。", mods: { burst: 1 }, mark: "ground-grab" },
  { id: "repair-focus", kind: "Rest", name: "修复专注", route: "any", text: "专注 +30；当前 Boss 烙印保留。", heal: 30 },
];

const profileEvidenceMeta = {
  backstepIntercept: { label: "追身截退", short: "追截", color: routeMeta.speed.color },
  trueRead: { label: "真读招架", short: "真读", color: routeMeta.counter.color },
  shatterExecute: { label: "碎甲处决", short: "碎甲", color: routeMeta.burst.color },
};

const recipeCatalog = [
  {
    id: "chase-intercept",
    name: "追身截退谱",
    route: "speed",
    equipmentId: "storm-katana",
    cardId: "chase-cut",
    direction: "right",
    evidence: "backstepIntercept",
    cost: { bladeInk: 4, backstepIntercept: 1 },
    reward: { speed: 2 },
    text: "追身斩右划命中后撤横切时，追击值 +2，下一张追击牌提前进入手牌。",
  },
  {
    id: "quick-pressure",
    name: "快斩续压谱",
    route: "speed",
    equipmentId: "storm-katana",
    cardId: "quick-slash",
    direction: "right",
    evidence: "backstepIntercept",
    cost: { bladeInk: 3, backstepIntercept: 1 },
    reward: { speed: 1, damage: 1 },
    text: "快斩右划接在追击链后，追击值 +1、压制值 +1，补牌提前 35%。",
  },
  {
    id: "flying-pursuit",
    name: "飞刃追刀谱",
    route: "speed",
    equipmentId: "storm-katana",
    cardId: "flying-blade",
    direction: "right",
    evidence: "backstepIntercept",
    cost: { bladeInk: 5, backstepIntercept: 2 },
    reward: { speed: 2, any: 1 },
    text: "飞刃右划命中后撤或远距窗口时，追击值 +2、全路线 +1，下一张追击牌提前进入手牌。",
  },
  {
    id: "guard-mirror",
    name: "镜反读招谱",
    route: "counter",
    equipmentId: "mirror-fan",
    cardId: "guard",
    direction: "left",
    evidence: "trueRead",
    cost: { bladeInk: 4, trueRead: 1 },
    reward: { counter: 2 },
    text: "格挡左划接住真抬手时，闪反值 +2，专注 +8。",
  },
  {
    id: "shadow-return",
    name: "影步回身谱",
    route: "counter",
    equipmentId: "mirror-fan",
    cardId: "shadow-step",
    direction: "left",
    evidence: "trueRead",
    cost: { bladeInk: 3, trueRead: 1 },
    reward: { counter: 1, speed: 1 },
    text: "影步左划避开真抬手时，闪反值 +1、追击值 +1，专注 +6。",
  },
  {
    id: "spin-afterimage",
    name: "旋身残影谱",
    route: "counter",
    equipmentId: "mirror-fan",
    cardId: "spin-cut",
    direction: "left",
    evidence: "trueRead",
    cost: { bladeInk: 5, trueRead: 2 },
    reward: { counter: 2, damage: 1 },
    text: "旋斩左划等真红核后反打，闪反值 +2、压制值 +1，Boss 压力下降。",
  },
  {
    id: "breaker-shatter",
    name: "碎甲下坠谱",
    route: "burst",
    equipmentId: "executioner",
    cardId: "breaker",
    direction: "down",
    evidence: "shatterExecute",
    cost: { bladeInk: 4, shatterExecute: 1 },
    reward: { burst: 2 },
    text: "破甲下划打断慢刀或地裂时，爆发值 +2，下划伤害 +8。",
  },
  {
    id: "heavy-break",
    name: "重劈裂盾谱",
    route: "burst",
    equipmentId: "executioner",
    cardId: "heavy-cleave",
    direction: "down",
    evidence: "shatterExecute",
    cost: { bladeInk: 3, shatterExecute: 1 },
    reward: { burst: 1, control: 1 },
    text: "重劈下划命中慢刀蓄势时，爆发值 +1、挑空值 +1，下划伤害 +6。",
  },
  {
    id: "execute-fall",
    name: "处决坠落谱",
    route: "burst",
    equipmentId: "executioner",
    cardId: "execute",
    direction: "down",
    evidence: "shatterExecute",
    cost: { bladeInk: 5, shatterExecute: 2 },
    reward: { burst: 2, any: 1 },
    text: "处决下划在破势后兑现，爆发值 +2、全路线 +1，终结残片更容易出现。",
  },
];

const schoolCatalog = [
  {
    equipmentId: "storm-katana",
    name: "风暴太刀",
    route: "speed",
    nodes: [
      { id: "first", label: "起势", text: "追击起手开放", default: true },
      { id: "chase-intercept", label: "截退谱", text: "追身截后撤入池", recipeId: "chase-intercept" },
      { id: "quick-pressure", label: "续压谱", text: "快斩右划入池", recipeId: "quick-pressure" },
      { id: "flying-pursuit", label: "飞刃谱", text: "飞刃右划入池", recipeId: "flying-pursuit" },
      { id: "training-chase", label: "追击训练", text: "后撤横切训练开放", trainingId: "training-chase" },
    ],
  },
  {
    equipmentId: "mirror-fan",
    name: "镜扇",
    route: "counter",
    nodes: [
      { id: "first", label: "起势", text: "闪反起手开放", default: true },
      { id: "guard-mirror", label: "镜返谱", text: "真读招架入池", recipeId: "guard-mirror" },
      { id: "shadow-return", label: "影步谱", text: "影步左划入池", recipeId: "shadow-return" },
      { id: "spin-afterimage", label: "残影谱", text: "旋斩左划入池", recipeId: "spin-afterimage" },
      { id: "training-mirror", label: "闪反训练", text: "快慢真招训练开放", trainingId: "training-mirror" },
    ],
  },
  {
    equipmentId: "executioner",
    name: "处刑者",
    route: "burst",
    nodes: [
      { id: "first", label: "起势", text: "破势起手开放", default: true },
      { id: "breaker-shatter", label: "碎甲谱", text: "破势处决入池", recipeId: "breaker-shatter" },
      { id: "heavy-break", label: "裂盾谱", text: "重劈下划入池", recipeId: "heavy-break" },
      { id: "execute-fall", label: "坠落谱", text: "处决下划入池", recipeId: "execute-fall" },
      { id: "training-shatter", label: "处决训练", text: "慢刀破势训练开放", trainingId: "training-shatter" },
    ],
  },
];

const trainingCatalog = [
  { id: "training-chase", label: "后撤横切训练", route: "speed", equipmentId: "storm-katana", moveKey: "backstep", bossMark: "backstep", evidence: "backstepIntercept", text: "练右划追身截住 Boss 后撤。" },
  { id: "training-mirror", label: "真招闪反训练", route: "counter", equipmentId: "mirror-fan", moveKey: "feint", bossMark: "feint", evidence: "trueRead", text: "练左划等真核亮起后反打。" },
  { id: "training-shatter", label: "裂盾处决训练", route: "burst", equipmentId: "executioner", moveKey: "ground-grab", bossMark: "ground-grab", evidence: "shatterExecute", text: "练下划破慢刀和地裂窗口。" },
];

const atlasCatalog = [
  { id: "act1", label: "一幕基础线", route: "any", text: "风暴队长路线", default: true },
  { id: "act2", label: "二幕基础线", route: "damage", text: "一幕 Boss 后开放" },
  { id: "act3", label: "三幕基础线", route: "burst", text: "二幕 Boss 后开放" },
  { id: "danger-backstep", label: "追击猎杀线", route: "speed", evidence: "backstepIntercept", text: "追身截退证据开放" },
  { id: "danger-true-read", label: "镜廊高危线", route: "counter", evidence: "trueRead", text: "真读招架证据开放" },
  { id: "danger-shatter", label: "盾城精英线", route: "burst", evidence: "shatterExecute", text: "碎甲处决证据开放" },
  { id: "branch-redline", label: "赤线猎场", route: "speed", requires: "danger-backstep", text: "追击猎杀线后开放，局内会出现赤线猎场分支" },
  { id: "branch-mirror", label: "镜廊赌局", route: "counter", requires: "danger-true-read", text: "镜廊高危线后开放，局内会出现镜廊赌局分支" },
  { id: "branch-blackdrum", label: "黑鼓刑场", route: "burst", requires: "danger-shatter", text: "盾城精英线后开放，三幕会出现黑鼓刑场分支" },
];

const dailyThemes = [
  {
    id: "daily-speed",
    label: "追击日课",
    route: "speed",
    equipmentId: "storm-katana",
    bossMark: "backstep",
    routeMods: { speed: 2 },
    text: "固定风暴太刀，右划追身窗口更多；Boss 会更频繁后撤横切。",
  },
  {
    id: "daily-counter",
    label: "闪反日课",
    route: "counter",
    equipmentId: "mirror-fan",
    bossMark: "feint",
    routeMods: { counter: 2 },
    text: "固定镜扇，左划读招收益更高；Boss 会混入假抬手。",
  },
  {
    id: "daily-burst",
    label: "破势日课",
    route: "burst",
    equipmentId: "executioner",
    bossMark: "ground-grab",
    routeMods: { burst: 2 },
    text: "固定处刑者，下划破势和处决更重要；Boss 会用地裂抓取惩罚空下划。",
  },
];

const dailyContractPool = [
  {
    id: "daily-redline-countdown",
    kind: "Contract",
    rarity: "Rare",
    name: "日课·红线催阵",
    route: "speed",
    dailyTheme: "daily-speed",
    text: "追击值 +4，Boss 出手提前 130ms，后撤横切烙印 +1。",
    mods: { speed: 4 },
    mark: "backstep",
    oathPressure: 130,
  },
  {
    id: "daily-mirror-debt",
    kind: "Contract",
    rarity: "Rare",
    name: "日课·镜债",
    route: "counter",
    dailyTheme: "daily-counter",
    text: "闪反值 +4，Boss 出手提前 120ms，假抬手烙印 +1。",
    mods: { counter: 4 },
    mark: "feint",
    oathPressure: 120,
  },
  {
    id: "daily-drum-execution",
    kind: "Contract",
    rarity: "Rare",
    name: "日课·裂鼓处刑",
    route: "burst",
    dailyTheme: "daily-burst",
    text: "爆发值 +4，Boss 出手提前 145ms，地裂抓取烙印 +1。",
    mods: { burst: 4 },
    mark: "ground-grab",
    oathPressure: 145,
  },
  {
    id: "daily-thin-ice-vow",
    kind: "Contract",
    rarity: "Uncommon",
    name: "日课·薄冰誓",
    route: "any",
    dailyTheme: "any",
    text: "全路线 +2，Boss 出手提前 110ms，假抬手烙印 +1。",
    mods: { any: 2 },
    mark: "feint",
    oathPressure: 110,
  },
];

const recipeRewards = recipeCatalog.map((recipe) => ({
  id: `recipe-${recipe.id}`,
  kind: "Training",
  rarity: "Uncommon",
  name: recipe.name,
  route: recipe.route,
  text: recipe.text,
  mods: recipe.reward,
  recipeId: recipe.id,
}));

const anchorMatrix = {
  speed: {
    "chase-cut:right": { name: "追身核心", tier: "core" },
    "quick-slash:right": { name: "快斩桥接", tier: "bridge" },
    "thrust:right": { name: "突刺续压", tier: "bridge" },
    "flying-blade:right": { name: "远距追刀", tier: "bridge" },
  },
  counter: {
    "guard:left": { name: "格挡核心", tier: "core" },
    "shadow-step:left": { name: "影步桥接", tier: "bridge" },
    "spin-cut:left": { name: "旋身反打", tier: "bridge" },
    "quick-slash:left": { name: "退斩稳手", tier: "normal" },
  },
  burst: {
    "breaker:down": { name: "破势核心", tier: "core" },
    "execute:down": { name: "处决兑现", tier: "core" },
    "heavy-cleave:down": { name: "重劈桥接", tier: "bridge" },
    "launcher:up": { name: "挑空起手", tier: "bridge" },
  },
};

const tuningStorageKey = "blade-flow-tuning-v1";
const saveStorageKey = "blade-flow-saves-v1";
const mobileAcceptanceStorageKey = "blade-flow-mobile-acceptance-v1";
const profileStorageKeys = {
  real: "blade-flow-profile-v1",
  debug: "blade-flow-debug-profile-v1",
};
const profileModeStorageKey = "blade-flow-profile-mode-v1";
const saveSlotCount = 5;
const cardById = new Map(cards.map((card) => [card.id, card]));
const equipmentById = new Map(equipmentPool.map((equipment) => [equipment.id, equipment]));
const recipeById = new Map(recipeCatalog.map((recipe) => [recipe.id, recipe]));
const rewardById = new Map([...rewards, ...dailyContractPool, ...eventChoices, ...recipeRewards].map((choice) => [choice.id, choice]));
let lastMobileAcceptanceProbe = null;

const tuningPresets = {
  easy: {
    label: "简单",
    enemyTempo: 0.72,
    bossTempo: 0.82,
    enemyDamage: 0.62,
    enemyHp: 0.78,
    playerFocus: 130,
    actionPressure: 4,
    bossPressure: 3,
    elitePressure: 2,
    pressureLimit: 145,
    pressureDecay: 0.03,
    riposteDamage: 0.42,
    counterRelief: 56,
    controlRelief: 28,
    burstRisk: 3,
    perfectWindow: 1060,
    controlDelay: 130,
    comboWindow: 1350,
    comboDecayDelay: 1450,
    comboDecayRate: 0.028,
    stanceCost: 8,
    burstStanceCost: 4,
    repeatDirectionCost: 6,
    stanceRegen: 0.045,
    lowStanceDamage: 0.65,
    breakPressure: 20,
    varietyRefund: 8,
    counterStanceGain: 22,
    drawCooldown: 680,
    drawRewardScale: 0.12,
    drawPreviewCount: 2,
    promoteLookahead: 6,
    startingHand: 4,
    handLimit: 4,
    performanceProfile: 1,
    playerDamage: 1.18,
    rewardPower: 1.18,
    enrageThreshold: 0.32,
    enrageTempo: 1.16,
  },
  normal: {
    label: "标准",
    enemyTempo: 1,
    bossTempo: 1,
    enemyDamage: 1,
    enemyHp: 1,
    playerFocus: 110,
    actionPressure: 9,
    bossPressure: 7,
    elitePressure: 4,
    pressureLimit: 100,
    pressureDecay: 0.018,
    riposteDamage: 0.72,
    counterRelief: 38,
    controlRelief: 18,
    burstRisk: 8,
    perfectWindow: 760,
    controlDelay: 90,
    comboWindow: 1050,
    comboDecayDelay: 1000,
    comboDecayRate: 0.045,
    stanceCost: 12,
    burstStanceCost: 6,
    repeatDirectionCost: 10,
    stanceRegen: 0.028,
    lowStanceDamage: 0.45,
    breakPressure: 34,
    varietyRefund: 6,
    counterStanceGain: 18,
    drawCooldown: 920,
    drawRewardScale: 0.1,
    drawPreviewCount: 2,
    promoteLookahead: 6,
    startingHand: 4,
    handLimit: 4,
    performanceProfile: 1,
    playerDamage: 1,
    rewardPower: 1,
    enrageThreshold: 0.42,
    enrageTempo: 1.39,
  },
  tense: {
    label: "紧张",
    enemyTempo: 1.22,
    bossTempo: 1.28,
    enemyDamage: 1.1,
    enemyHp: 1.08,
    playerFocus: 92,
    actionPressure: 12,
    bossPressure: 10,
    elitePressure: 6,
    pressureLimit: 88,
    pressureDecay: 0.014,
    riposteDamage: 0.82,
    counterRelief: 34,
    controlRelief: 14,
    burstRisk: 10,
    perfectWindow: 680,
    controlDelay: 78,
    comboWindow: 960,
    comboDecayDelay: 880,
    comboDecayRate: 0.055,
    stanceCost: 14,
    burstStanceCost: 7,
    repeatDirectionCost: 13,
    stanceRegen: 0.023,
    lowStanceDamage: 0.38,
    breakPressure: 42,
    varietyRefund: 5,
    counterStanceGain: 16,
    drawCooldown: 1040,
    drawRewardScale: 0.09,
    drawPreviewCount: 2,
    promoteLookahead: 5,
    startingHand: 4,
    handLimit: 4,
    performanceProfile: 1,
    playerDamage: 0.96,
    rewardPower: 0.96,
    enrageThreshold: 0.46,
    enrageTempo: 1.55,
  },
  hard: {
    label: "困难",
    enemyTempo: 1.45,
    bossTempo: 1.58,
    enemyDamage: 1.32,
    enemyHp: 1.2,
    playerFocus: 82,
    actionPressure: 16,
    bossPressure: 13,
    elitePressure: 8,
    pressureLimit: 76,
    pressureDecay: 0.01,
    riposteDamage: 0.95,
    counterRelief: 28,
    controlRelief: 10,
    burstRisk: 14,
    perfectWindow: 580,
    controlDelay: 62,
    comboWindow: 850,
    comboDecayDelay: 760,
    comboDecayRate: 0.066,
    stanceCost: 17,
    burstStanceCost: 9,
    repeatDirectionCost: 16,
    stanceRegen: 0.018,
    lowStanceDamage: 0.3,
    breakPressure: 52,
    varietyRefund: 4,
    counterStanceGain: 14,
    drawCooldown: 1160,
    drawRewardScale: 0.08,
    drawPreviewCount: 2,
    promoteLookahead: 5,
    startingHand: 3,
    handLimit: 4,
    performanceProfile: 1,
    playerDamage: 0.9,
    rewardPower: 0.9,
    enrageThreshold: 0.5,
    enrageTempo: 1.75,
  },
  nightmare: {
    label: "噩梦",
    enemyTempo: 1.75,
    bossTempo: 1.95,
    enemyDamage: 1.55,
    enemyHp: 1.35,
    playerFocus: 72,
    actionPressure: 21,
    bossPressure: 16,
    elitePressure: 11,
    pressureLimit: 64,
    pressureDecay: 0.006,
    riposteDamage: 1.1,
    counterRelief: 22,
    controlRelief: 7,
    burstRisk: 18,
    perfectWindow: 500,
    controlDelay: 46,
    comboWindow: 760,
    comboDecayDelay: 640,
    comboDecayRate: 0.078,
    stanceCost: 20,
    burstStanceCost: 11,
    repeatDirectionCost: 20,
    stanceRegen: 0.014,
    lowStanceDamage: 0.24,
    breakPressure: 64,
    varietyRefund: 3,
    counterStanceGain: 11,
    drawCooldown: 1280,
    drawRewardScale: 0.07,
    drawPreviewCount: 1,
    promoteLookahead: 4,
    startingHand: 3,
    handLimit: 4,
    performanceProfile: 0,
    playerDamage: 0.84,
    rewardPower: 0.82,
    enrageThreshold: 0.56,
    enrageTempo: 2.05,
  },
  hell: {
    label: "地狱",
    enemyTempo: 2.08,
    bossTempo: 2.35,
    enemyDamage: 1.82,
    enemyHp: 1.58,
    playerFocus: 64,
    actionPressure: 27,
    bossPressure: 21,
    elitePressure: 14,
    pressureLimit: 52,
    pressureDecay: 0.003,
    riposteDamage: 1.22,
    counterRelief: 16,
    controlRelief: 4,
    burstRisk: 24,
    perfectWindow: 420,
    controlDelay: 28,
    comboWindow: 660,
    comboDecayDelay: 540,
    comboDecayRate: 0.092,
    stanceCost: 24,
    burstStanceCost: 14,
    repeatDirectionCost: 24,
    stanceRegen: 0.01,
    lowStanceDamage: 0.18,
    breakPressure: 76,
    varietyRefund: 2,
    counterStanceGain: 8,
    drawCooldown: 1420,
    drawRewardScale: 0.06,
    drawPreviewCount: 1,
    promoteLookahead: 3,
    startingHand: 3,
    handLimit: 3,
    performanceProfile: 0,
    playerDamage: 0.76,
    rewardPower: 0.74,
    enrageThreshold: 0.62,
    enrageTempo: 2.32,
  },
};

const tuningControls = [
  { group: "敌人节奏", key: "enemyTempo", label: "普通敌人速度", min: 0.55, max: 2.4, step: 0.05, suffix: "x" },
  { group: "敌人节奏", key: "bossTempo", label: "Boss 速度", min: 0.65, max: 2.8, step: 0.05, suffix: "x" },
  { group: "敌人节奏", key: "enrageThreshold", label: "怒气血线", min: 0.2, max: 0.75, step: 0.01, suffix: "x" },
  { group: "敌人节奏", key: "enrageTempo", label: "怒气加速", min: 1, max: 2.6, step: 0.05, suffix: "x" },
  { group: "抢招压力", key: "actionPressure", label: "每张牌压力", min: 0, max: 32, step: 1, suffix: "" },
  { group: "抢招压力", key: "bossPressure", label: "Boss 额外压力", min: 0, max: 26, step: 1, suffix: "" },
  { group: "抢招压力", key: "elitePressure", label: "精英额外压力", min: 0, max: 18, step: 1, suffix: "" },
  { group: "抢招压力", key: "pressureLimit", label: "抢招阈值", min: 45, max: 180, step: 1, suffix: "" },
  { group: "抢招压力", key: "pressureDecay", label: "压力自然消退", min: 0, max: 0.08, step: 0.001, suffix: "" },
  { group: "抢招压力", key: "riposteDamage", label: "抢招伤害倍率", min: 0.2, max: 1.35, step: 0.01, suffix: "x" },
  { group: "出招窗口", key: "perfectWindow", label: "完美闪反窗口", min: 360, max: 1300, step: 10, suffix: "ms" },
  { group: "出招窗口", key: "counterRelief", label: "闪反降压", min: 0, max: 80, step: 1, suffix: "" },
  { group: "出招窗口", key: "controlRelief", label: "挑空降压", min: 0, max: 48, step: 1, suffix: "" },
  { group: "出招窗口", key: "controlDelay", label: "挑空拖延", min: 0, max: 220, step: 5, suffix: "ms" },
  { group: "出招窗口", key: "burstRisk", label: "下划风险", min: 0, max: 32, step: 1, suffix: "" },
  { group: "玩家与连击", key: "playerFocus", label: "专注上限", min: 55, max: 180, step: 5, suffix: "" },
  { group: "玩家与连击", key: "playerDamage", label: "玩家伤害", min: 0.55, max: 1.85, step: 0.05, suffix: "x" },
  { group: "玩家与连击", key: "enemyDamage", label: "敌人伤害", min: 0.35, max: 2.5, step: 0.05, suffix: "x" },
  { group: "玩家与连击", key: "enemyHp", label: "敌人血量", min: 0.5, max: 2.4, step: 0.05, suffix: "x" },
  { group: "玩家与连击", key: "rewardPower", label: "奖励强度", min: 0.4, max: 2, step: 0.05, suffix: "x" },
  { group: "玩家与连击", key: "comboWindow", label: "连击接续窗口", min: 600, max: 1500, step: 10, suffix: "ms" },
  { group: "玩家与连击", key: "comboDecayDelay", label: "连击衰减延迟", min: 500, max: 2200, step: 10, suffix: "ms" },
  { group: "玩家与连击", key: "comboDecayRate", label: "连击衰减速度", min: 0.01, max: 0.11, step: 0.001, suffix: "" },
  { group: "架势债务", key: "stanceCost", label: "每牌架势消耗", min: 0, max: 36, step: 1, suffix: "" },
  { group: "架势债务", key: "burstStanceCost", label: "下划额外消耗", min: 0, max: 24, step: 1, suffix: "" },
  { group: "架势债务", key: "repeatDirectionCost", label: "重复方向惩罚", min: 0, max: 32, step: 1, suffix: "" },
  { group: "架势债务", key: "stanceRegen", label: "架势恢复速度", min: 0, max: 0.08, step: 0.001, suffix: "" },
  { group: "架势债务", key: "lowStanceDamage", label: "低架势伤害保底", min: 0.1, max: 0.9, step: 0.01, suffix: "x" },
  { group: "架势债务", key: "breakPressure", label: "破绽压力", min: 0, max: 90, step: 1, suffix: "" },
  { group: "架势债务", key: "varietyRefund", label: "换方向返还", min: 0, max: 18, step: 1, suffix: "" },
  { group: "架势债务", key: "counterStanceGain", label: "闪反回架势", min: 0, max: 36, step: 1, suffix: "" },
  { group: "补牌节奏", key: "drawCooldown", label: "补牌冷却", min: 120, max: 2000, step: 10, suffix: "ms" },
  { group: "补牌节奏", key: "drawRewardScale", label: "奖励缩短补牌", min: 0, max: 0.22, step: 0.01, suffix: "x" },
  { group: "补牌节奏", key: "drawPreviewCount", label: "未来队列", min: 1, max: 2, step: 1, suffix: "张" },
  { group: "补牌节奏", key: "promoteLookahead", label: "提招深度", min: 2, max: 10, step: 1, suffix: "张" },
  { group: "补牌节奏", key: "startingHand", label: "起始手牌", min: 2, max: 4, step: 1, suffix: "" },
  { group: "补牌节奏", key: "handLimit", label: "手牌上限", min: 2, max: 4, step: 1, suffix: "" },
  { group: "性能", key: "performanceProfile", label: "特效档位", min: 0, max: 2, step: 1, suffix: "档" },
];

const initialProfileMode = loadProfileMode();
const initialProfileResult = loadProfileSafely(initialProfileMode);

const state = {
  hand: [],
  drawPile: [],
  combo: 0,
  comboCharge: 0,
  maxCombo: 0,
  route: "neutral",
  routeScores: { speed: 0, control: 0, counter: 0, burst: 0, damage: 0 },
  fightReads: 0,
  fightBreaks: 0,
  enemyHp: 220,
  enemyMaxHp: 220,
  playerHp: 100,
  playerMaxHp: 100,
  intentTime: 3200,
  intentMax: 3200,
  intentName: "观察中",
  lastActionAt: performance.now(),
  hasStarted: false,
  ended: false,
  notebookOpen: false,
  runStarted: false,
  encounterIndex: 0,
  equipment: null,
  rewardMods: { speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 },
  rewardNames: [],
  routeMarks: { speed: 0, counter: 0, burst: 0, control: 0, damage: 0 },
  evidence: { scout: 0, break: 0, finisher: 0 },
  bossMark: null,
  bossMove: null,
  bossPreviewed: false,
  dailySeed: dailySeed(),
  rng: seededRandom(dailySeed()),
  oaths: [],
  oathPressure: 0,
  rewardBias: null,
  lastBreakdown: "还没有结算。",
  pressure: 0,
  stance: 100,
  lastDirection: null,
  drawTimer: 0,
  tuning: loadTuning(),
  currentPreset: loadTuningPreset(),
  tunerOpen: false,
  versionOpen: false,
  saveOpen: false,
  saveError: "",
  saveReturnPhase: null,
  returnToGearAfterVersion: false,
  returnToGearAfterTuner: false,
  pendingRewardIds: null,
  pendingPathChoiceIds: null,
  pathChoices: {},
  anchor: null,
  artLockUntil: 0,
  pendingEndTimer: null,
  runId: null,
  actLevel: 1,
  trainingLesson: null,
  dailyRun: null,
  fightProofs: { backstepIntercept: false, trueRead: false, shatterExecute: false },
  lastMastery: null,
  handAffinityKey: "",
  profileMode: initialProfileMode,
  profile: initialProfileResult.profile,
  profileErrors: {
    real: initialProfileMode === "real" ? initialProfileResult.error : "",
    debug: initialProfileMode === "debug" ? initialProfileResult.error : "",
  },
};

const els = {
  hand: document.getElementById("hand"),
  comboCount: document.getElementById("comboCount"),
  comboBar: document.getElementById("comboBar"),
  stanceValue: document.getElementById("stanceValue"),
  stanceBar: document.getElementById("stanceBar"),
  routePanel: document.getElementById("routePanel"),
  routeName: document.getElementById("routeName"),
  routeHint: document.getElementById("routeHint"),
  enemyHp: document.getElementById("enemyHp"),
  enemyName: document.getElementById("enemyName"),
  enemyHpText: document.getElementById("enemyHpText"),
  playerHp: document.getElementById("playerHp"),
  playerHpText: document.getElementById("playerHpText"),
  intent: document.getElementById("intent"),
  intentName: document.getElementById("intentName"),
  pressureName: document.getElementById("pressureName"),
  pressureBar: document.getElementById("pressureBar"),
  drawBar: document.getElementById("drawBar"),
  drawText: document.getElementById("drawText"),
  combatLog: document.getElementById("combatLog"),
  slashLayer: document.getElementById("slashLayer"),
  impactLayer: document.getElementById("impactLayer"),
  comboLayer: document.getElementById("comboLayer"),
  styleRank: document.getElementById("styleRank"),
  arena: document.getElementById("arena"),
  player: document.getElementById("player"),
  enemy: document.getElementById("enemy"),
  playerArt: document.querySelector(".player-art"),
  bossArt: document.querySelector(".boss-art"),
  playerHealth: document.querySelector(".player-health"),
  enemyHealth: document.querySelector(".enemy-health"),
  musicButton: document.getElementById("musicButton"),
  tunerButton: document.getElementById("tunerButton"),
  saveButton: document.getElementById("saveButton"),
  versionButton: document.getElementById("versionButton"),
  notebookButton: document.getElementById("notebookButton"),
  resetButton: document.getElementById("resetButton"),
  game: document.getElementById("game"),
  runStage: document.getElementById("runStage"),
  equipmentName: document.getElementById("equipmentName"),
  rewardStack: document.getElementById("rewardStack"),
  bladeMap: document.getElementById("bladeMap"),
};

const bgmTracks = {
  menu: { label: "主菜单", file: "./assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3", volume: 0.46 },
  act1: { label: "一幕", file: "./assets/audio/bgm/blade-flow-act1-dry-blade-loop.mp3", volume: 0.38 },
  act2: { label: "二幕", file: "./assets/audio/bgm/blade-flow-act2-red-thread-hunt-loop.mp3", volume: 0.42 },
  act3: { label: "三幕", file: "./assets/audio/bgm/blade-flow-act3-shattered-mirror-duel-loop.mp3", volume: 0.43 },
  bossStorm: { label: "风暴队长", file: "./assets/audio/bgm/blade-flow-boss-storm-captain.mp3", volume: 0.43 },
  bossRedline: { label: "赤线宿敌", file: "./assets/audio/bgm/blade-flow-boss-redline-rival.mp3", volume: 0.44 },
  bossNoForm: { label: "无相刀影", file: "./assets/audio/bgm/blade-flow-boss-no-form-shadow.mp3", volume: 0.45 },
};

Object.values(bgmTracks).forEach((track) => {
  track.audio = new Audio(track.file);
  track.audio.loop = true;
  track.audio.preload = track.label === "主菜单" ? "auto" : "metadata";
  track.audio.volume = track.volume;
});

const audioState = {
  unlocked: false,
  enabled: localStorage.getItem("blade-flow-menu-bgm-muted-v1") !== "1",
  scene: "menu",
  activeKey: "menu",
  lastError: "",
};

function currentBgmKey() {
  if (audioState.scene === "menu") return "menu";
  if (audioState.scene === "battle") {
    const room = currentRoom();
    if (room?.type === "boss") {
      if (room.form === "storm" || room.name === "风暴队长") return "bossStorm";
      if (room.form === "redline" || room.name === "赤线宿敌") return "bossRedline";
      if (room.form === "mirror" || room.name === "无相刀影") return "bossNoForm";
    }
    return `act${clamp(state.actLevel || 1, 1, actMax)}`;
  }
  return null;
}

function activeBgmTrack() {
  const key = currentBgmKey();
  return key ? bgmTracks[key] ?? null : null;
}

function updateMusicButton() {
  if (!els.musicButton) return;
  els.musicButton.textContent = audioState.enabled ? "♪" : "×";
  els.musicButton.setAttribute("aria-label", audioState.enabled ? "关闭游戏音乐" : "开启游戏音乐");
  els.musicButton.classList.toggle("is-muted", !audioState.enabled);
  const playing = Object.values(bgmTracks).some((track) => !track.audio.paused);
  els.musicButton.classList.toggle("is-playing", audioState.enabled && playing);
}

function pauseAllBgm(exceptKey = null) {
  Object.entries(bgmTracks).forEach(([key, track]) => {
    if (key !== exceptKey) track.audio.pause();
  });
  updateMusicButton();
}

async function playCurrentBgm() {
  const key = currentBgmKey();
  const track = key ? bgmTracks[key] : null;
  audioState.activeKey = key ?? "";
  if (!track || !audioState.enabled || document.visibilityState === "hidden") {
    pauseAllBgm();
    return false;
  }
  pauseAllBgm(key);
  if (!audioState.unlocked) {
    updateMusicButton();
    return false;
  }
  try {
    await track.audio.play();
    audioState.lastError = "";
    updateMusicButton();
    return true;
  } catch (error) {
    audioState.lastError = error?.message ?? String(error);
    updateMusicButton();
    return false;
  }
}

function setAudioScene(scene) {
  audioState.scene = scene;
  void playCurrentBgm();
}

function unlockAudio() {
  if (audioState.unlocked) return;
  audioState.unlocked = true;
  void playCurrentBgm();
}

function handleAudioPointerDown(event) {
  if (event.target?.closest?.("#musicButton, [data-toggle-menu-bgm]")) return;
  unlockAudio();
}

function toggleMenuBgm() {
  if (audioState.enabled && !audioState.unlocked) {
    unlockAudio();
    updateMusicButton();
    return;
  }
  audioState.enabled = !audioState.enabled;
  localStorage.setItem("blade-flow-menu-bgm-muted-v1", audioState.enabled ? "0" : "1");
  if (audioState.enabled) {
    unlockAudio();
    void playCurrentBgm();
  } else {
    pauseAllBgm();
  }
  updateMusicButton();
}

els.routeName.innerHTML = "<i></i><span></span>";
els.routeIcon = els.routeName.querySelector("i");
els.routeLabel = els.routeName.querySelector("span");
els.rankLabel = els.styleRank.querySelector("span");
els.rankHits = els.styleRank.querySelector("b");

const renderCache = new WeakMap();
let frameHandle = null;
let lowPowerTimer = null;
let bossTimelineTimer = null;
let bossTimelineToken = 0;

function cachedValue(el, key) {
  return renderCache.get(el)?.[key];
}

function setCachedValue(el, key, value) {
  const cached = renderCache.get(el) ?? {};
  cached[key] = value;
  renderCache.set(el, cached);
}

function setText(el, value) {
  const text = String(value);
  if (cachedValue(el, "text") === text) return;
  el.textContent = text;
  setCachedValue(el, "text", text);
}

function setTransform(el, value) {
  if (cachedValue(el, "transform") === value) return;
  el.style.transform = value;
  setCachedValue(el, "transform", value);
}

function setStyleVar(el, name, value) {
  const key = `style:${name}`;
  if (cachedValue(el, key) === value) return;
  el.style.setProperty(name, value);
  setCachedValue(el, key, value);
}

function setInlineStyle(el, name, value) {
  const key = `inline:${name}`;
  if (cachedValue(el, key) === value) return;
  el.style[name] = value;
  setCachedValue(el, key, value);
}

function scaleX(ratio, min = 0) {
  return `scaleX(${Math.max(min, ratio).toFixed(3)})`;
}

function toggleClass(el, name, active) {
  const key = `class:${name}`;
  if (cachedValue(el, key) === active) return;
  el.classList.toggle(name, active);
  setCachedValue(el, key, active);
}

function performanceProfile() {
  return Math.round(state.tuning.performanceProfile ?? 1);
}

function isLowPowerMode() {
  return performanceProfile() <= 0;
}

function applyPerformanceClass() {
  const profile = performanceProfile();
  const label = profile <= 0 ? "save" : profile >= 2 ? "showcase" : "standard";
  if (cachedValue(els.game, "performance") === label) return;
  els.game.dataset.performance = label;
  document.documentElement.classList.toggle("is-low-power", label === "save");
  setCachedValue(els.game, "performance", label);
}

function restartClass(el, name) {
  el.classList.remove(name);
  setCachedValue(el, `class:${name}`, false);
  window.requestAnimationFrame(() => {
    el.classList.add(name);
    setCachedValue(el, `class:${name}`, true);
  });
}

function makeCard(id, name, route, tap, variants) {
  return { id, name, route, tap, variants };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function defaultTuning() {
  return { ...tuningPresets.normal };
}

function preloadImage(src) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  img.decode?.().catch(() => {});
}

const bossTimelineFrameAssets = [
  artAssets.bossIdle,
  artAssets.bossCharge,
  artAssets.bossAttack,
  artAssets.bossDamaged,
  ...Object.values(bossFrameSets).flatMap((frames) => Object.values(frames)),
];

[...new Set([...Object.values(artAssets), ...Object.values(bossForms), ...Object.values(bossActionSprites), ...bossTimelineFrameAssets])].forEach(preloadImage);

function normalizeTuning(source = {}) {
  const base = defaultTuning();
  const normalized = {};
  for (const control of tuningControls) {
    const value = Number(source[control.key] ?? base[control.key]);
    normalized[control.key] = clamp(Number.isFinite(value) ? value : base[control.key], control.min, control.max);
  }
  return normalized;
}

function loadTuning() {
  try {
    const saved = JSON.parse(localStorage.getItem(tuningStorageKey) ?? "{}");
    return normalizeTuning(saved.values);
  } catch {
    return defaultTuning();
  }
}

function loadTuningPreset() {
  try {
    const saved = JSON.parse(localStorage.getItem(tuningStorageKey) ?? "{}");
    if (saved.preset === "custom") return "custom";
    return tuningPresets[saved.preset] ? saved.preset : "normal";
  } catch {
    return "normal";
  }
}

function saveTuning() {
  localStorage.setItem(
    tuningStorageKey,
    JSON.stringify({
      preset: state.currentPreset,
      values: state.tuning,
    }),
  );
}

function createEmptyProfile() {
  const weaponSchools = Object.fromEntries(
    schoolCatalog.map((school) => [
      school.equipmentId,
      Object.fromEntries(school.nodes.filter((node) => node.default).map((node) => [node.id, true])),
    ]),
  );
  const routeAtlas = Object.fromEntries(atlasCatalog.filter((node) => node.default).map((node) => [node.id, true]));
  return {
    version: 1,
    bladeInk: 0,
    evidence: { backstepIntercept: 0, trueRead: 0, shatterExecute: 0 },
    recipes: {},
    weaponSchools,
    routeAtlas,
    training: {},
    dailyRecords: {},
    badges: {},
    namedBlades: {},
    claimedFightKeys: [],
  };
}

function ensureProfileObject(value, label) {
  if (value == null) return {};
  if (typeof value !== "object" || Array.isArray(value)) throw new Error(`${label}不是对象`);
  return value;
}

function ensureKnownKeys(source, knownIds, label) {
  const object = ensureProfileObject(source, label);
  for (const key of Object.keys(object)) {
    if (!knownIds.has(key)) throw new Error(`${label}引用不存在的条目 ${key}`);
  }
  return object;
}

function validateProfileSource(source = {}) {
  if (!source || typeof source !== "object" || Array.isArray(source)) throw new Error("长期成长不是对象");
  if (source.bladeInk !== undefined && !Number.isFinite(Number(source.bladeInk))) throw new Error("锻刃墨不是数字");
  ensureKnownKeys(source.evidence, new Set(Object.keys(profileEvidenceMeta)), "证据");
  ensureKnownKeys(source.recipes, new Set(recipeCatalog.map((recipe) => recipe.id)), "配方");
  ensureKnownKeys(source.routeAtlas, new Set(atlasCatalog.map((node) => node.id)), "上行图谱");
  ensureKnownKeys(source.training, new Set(trainingCatalog.map((item) => item.id)), "训练课");

  const schools = ensureProfileObject(source.weaponSchools, "武器学派");
  const knownSchools = new Set(schoolCatalog.map((school) => school.equipmentId));
  for (const [equipmentId, nodes] of Object.entries(schools)) {
    if (!knownSchools.has(equipmentId)) throw new Error(`武器学派引用不存在的武器 ${equipmentId}`);
    const school = schoolCatalog.find((item) => item.equipmentId === equipmentId);
    ensureKnownKeys(nodes, new Set(school.nodes.map((node) => node.id)), `${school.name}学派节点`);
  }

  const dailyRecords = ensureProfileObject(source.dailyRecords, "每日记录");
  const knownDailyThemes = new Set(dailyThemes.map((theme) => theme.id));
  for (const [seed, record] of Object.entries(dailyRecords)) {
    if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error(`每日记录 ${seed} 不是对象`);
    if (!knownDailyThemes.has(record.themeId)) throw new Error(`每日记录引用不存在的主题 ${record.themeId}`);
  }

  if (source.claimedFightKeys !== undefined && !Array.isArray(source.claimedFightKeys)) throw new Error("已领取战斗记录不是数组");
}

function normalizeProfile(source = {}) {
  validateProfileSource(source);
  const empty = createEmptyProfile();
  const claimed = Array.isArray(source.claimedFightKeys) ? source.claimedFightKeys : [];
  return {
    ...empty,
    bladeInk: Math.max(0, Number(source.bladeInk ?? 0)),
    evidence: restoreObject(empty.evidence, source.evidence),
    recipes: { ...(source.recipes ?? {}) },
    weaponSchools: restoreObject(empty.weaponSchools, source.weaponSchools),
    routeAtlas: restoreObject(empty.routeAtlas, source.routeAtlas),
    training: restoreObject(empty.training, source.training),
    dailyRecords: restoreObject(empty.dailyRecords, source.dailyRecords),
    badges: restoreObject(empty.badges, source.badges),
    namedBlades: restoreObject(empty.namedBlades, source.namedBlades),
    claimedFightKeys: claimed.filter((key) => typeof key === "string").slice(-160),
  };
}

function loadProfileMode() {
  try {
    const saved = localStorage.getItem(profileModeStorageKey);
    return saved === "debug" ? "debug" : "real";
  } catch {
    return "real";
  }
}

function loadProfile(mode = loadProfileMode()) {
  const key = profileStorageKeys[mode] ?? profileStorageKeys.real;
  try {
    return normalizeProfile(JSON.parse(localStorage.getItem(key) ?? "{}"));
  } catch (error) {
    throw new Error(`${mode === "debug" ? "调试" : "正式"}档长期成长损坏：${error.message}`);
  }
}

function loadProfileSafely(mode = loadProfileMode()) {
  try {
    return { profile: loadProfile(mode), error: "" };
  } catch (error) {
    return { profile: createEmptyProfile(), error: error.message };
  }
}

function profileLocked(mode = state.profileMode) {
  return Boolean(state.profileErrors?.[mode]);
}

function saveProfile() {
  if (profileLocked()) return false;
  const key = profileStorageKeys[state.profileMode] ?? profileStorageKeys.real;
  localStorage.setItem(key, JSON.stringify(normalizeProfile(state.profile)));
  return true;
}

function switchProfileMode(mode) {
  if (!profileStorageKeys[mode]) return;
  state.profileMode = mode;
  localStorage.setItem(profileModeStorageKey, mode);
  const result = loadProfileSafely(mode);
  state.profile = result.profile;
  state.profileErrors[mode] = result.error;
}

function resetProfileMode(mode = state.profileMode) {
  state.profileMode = profileStorageKeys[mode] ? mode : "real";
  state.profileErrors[state.profileMode] = "";
  state.profile = createEmptyProfile();
  saveProfile();
}

function markProfileFlag(collection, key, unlocks, label) {
  if (!key || state.profile[collection]?.[key]) return false;
  state.profile[collection][key] = true;
  unlocks?.push(label);
  return true;
}

function unlockSchoolNode(equipmentId, nodeId, unlocks = []) {
  if (!equipmentId || !nodeId) return false;
  state.profile.weaponSchools[equipmentId] = restoreObject({}, state.profile.weaponSchools[equipmentId]);
  if (state.profile.weaponSchools[equipmentId][nodeId]) return false;
  state.profile.weaponSchools[equipmentId][nodeId] = true;
  const school = schoolCatalog.find((item) => item.equipmentId === equipmentId);
  const node = school?.nodes.find((item) => item.id === nodeId);
  unlocks.push(`${school?.name ?? equipmentId}·${node?.label ?? nodeId}`);
  return true;
}

function unlockAtlasNode(nodeId, unlocks = []) {
  const node = atlasCatalog.find((item) => item.id === nodeId);
  if (!node) return false;
  if (node.requires && !state.profile.routeAtlas?.[node.requires]) return false;
  return markProfileFlag("routeAtlas", node.id, unlocks, node.label);
}

function unlockAtlasChildren(parentId, unlocks = []) {
  atlasCatalog
    .filter((node) => node.requires === parentId)
    .forEach((node) => unlockAtlasNode(node.id, unlocks));
}

function unlockByEvidence(evidenceKey, unlocks = []) {
  const training = trainingCatalog.find((item) => item.evidence === evidenceKey);
  const atlas = atlasCatalog.find((item) => item.evidence === evidenceKey);
  if (training) markProfileFlag("training", training.id, unlocks, training.label);
  if (atlas) {
    unlockAtlasNode(atlas.id, unlocks);
    unlockAtlasChildren(atlas.id, unlocks);
  }
}

function unlockProfileMilestones(room, proofGain = {}) {
  const unlocks = [];
  if (room?.type === "boss") {
    if (state.actLevel >= 1) unlockAtlasNode("act2", unlocks);
    if (state.actLevel >= 2) unlockAtlasNode("act3", unlocks);
    markProfileFlag("namedBlades", `${state.equipment?.id ?? "unknown"}-a${state.actLevel}`, unlocks, `${state.equipment?.name ?? "名刀"}·${actLabel()}记忆`);
  }
  Object.keys(proofGain).forEach((key) => unlockByEvidence(key, unlocks));
  return unlocks;
}

function debugUnlockAllProfile() {
  if (state.profileMode !== "debug" || profileLocked()) return false;
  state.profile.bladeInk = Math.max(state.profile.bladeInk, 24);
  Object.keys(profileEvidenceMeta).forEach((key) => {
    state.profile.evidence[key] = Math.max(state.profile.evidence[key] ?? 0, 3);
  });
  recipeCatalog.forEach((recipe) => {
    state.profile.recipes[recipe.id] = true;
    unlockSchoolNode(recipe.equipmentId, recipe.id, []);
    const training = trainingCatalog.find((item) => item.evidence === recipe.evidence);
    if (training) state.profile.training[training.id] = true;
    const atlas = atlasCatalog.find((item) => item.evidence === recipe.evidence);
    if (atlas) state.profile.routeAtlas[atlas.id] = true;
  });
  atlasCatalog.forEach((node) => {
    state.profile.routeAtlas[node.id] = true;
  });
  schoolCatalog.forEach((school) => {
    state.profile.weaponSchools[school.equipmentId] = restoreObject({}, state.profile.weaponSchools[school.equipmentId]);
    school.nodes.forEach((node) => {
      state.profile.weaponSchools[school.equipmentId][node.id] = true;
    });
  });
  saveProfile();
  return true;
}

function debugAddEvidence(evidenceKey) {
  if (state.profileMode !== "debug" || profileLocked() || !profileEvidenceMeta[evidenceKey]) return false;
  state.profile.evidence[evidenceKey] = (state.profile.evidence[evidenceKey] ?? 0) + 1;
  const unlocks = [];
  unlockByEvidence(evidenceKey, unlocks);
  saveProfile();
  return true;
}

function debugSaveCurrentRunForReplay() {
  if (state.profileMode !== "debug" || profileLocked()) return false;
  const slots = readSaveSlots();
  slots[saveSlotCount - 1] = {
    version: 1,
    snapshot: createSaveSnapshot(),
  };
  writeSaveSlots(slots);
  return true;
}

function hasRecipe(recipeId) {
  if (profileLocked()) return false;
  return Boolean(state.profile.recipes?.[recipeId]);
}

function canUnlockRecipe(recipe) {
  if (profileLocked()) return false;
  const profile = state.profile;
  if (hasRecipe(recipe.id)) return false;
  if ((profile.bladeInk ?? 0) < recipe.cost.bladeInk) return false;
  return Object.entries(recipe.cost).every(([key, value]) => {
    if (key === "bladeInk") return true;
    return (profile.evidence?.[key] ?? 0) >= value;
  });
}

function unlockRecipe(recipeId) {
  if (profileLocked()) return false;
  const recipe = recipeById.get(recipeId);
  if (!recipe || !canUnlockRecipe(recipe)) return false;
  state.profile.bladeInk -= recipe.cost.bladeInk;
  for (const [key, value] of Object.entries(recipe.cost)) {
    if (key !== "bladeInk") state.profile.evidence[key] = Math.max(0, (state.profile.evidence[key] ?? 0) - value);
  }
  state.profile.recipes[recipe.id] = true;
  const unlocks = [];
  unlockSchoolNode(recipe.equipmentId, recipe.id, unlocks);
  const training = trainingCatalog.find((item) => item.evidence === recipe.evidence);
  if (training) {
    markProfileFlag("training", training.id, unlocks, training.label);
    unlockSchoolNode(recipe.equipmentId, training.id, unlocks);
  }
  const atlas = atlasCatalog.find((item) => item.evidence === recipe.evidence);
  if (atlas) markProfileFlag("routeAtlas", atlas.id, unlocks, atlas.label);
  markProfileFlag("badges", recipe.id, unlocks, `${recipe.name}评价章`);
  saveProfile();
  return true;
}

function formatTuningValue(control) {
  const value = state.tuning[control.key];
  const decimals = control.step < 0.01 ? 3 : control.step < 1 ? 2 : 0;
  const fixed = Number(value).toFixed(decimals);
  const text = decimals > 0 ? fixed.replace(/\.?0+$/, "") : fixed;
  return `${text}${control.suffix}`;
}

function routeInfo(route) {
  return routeMeta[route] ?? routeMeta.neutral;
}

function routeLabel(route) {
  return routeInfo(route).label;
}

function routeIcon(route) {
  return routeInfo(route).icon;
}

function directionGlyph(direction) {
  return {
    up: "↟",
    right: "➤",
    left: "↺",
    down: "◆",
    tap: "✦",
  }[direction] ?? "◇";
}

function routeStyle(route) {
  const meta = routeInfo(route);
  return `--route-color:${meta.color};--route-shape:${meta.shape};--route-stamp:url(${meta.stamp})`;
}

function pathChoiceKind(choice) {
  if (choice.atlasId) return { className: "is-path-atlas", label: "图谱分支", short: "图", hint: "改战换奖" };
  if (choice.risk === "danger") return { className: "is-path-danger", label: "高危路线", short: "险", hint: "加压换奖" };
  return { className: "is-path-steady", label: "稳定路线", short: "稳", hint: "减压稳奖" };
}

function cardGradeId(card) {
  return cardGradeMap[card.id] ?? "common";
}

function cardGrade(card) {
  const id = cardGradeMap[card.id] ?? "common";
  return gradeMeta[id] ?? gradeMeta.common;
}

function choiceRouteMarkup(route) {
  const meta = routeInfo(route === "any" ? "neutral" : route);
  const label = route === "any" ? "全路线" : meta.label;
  return `<small class="choice-meta" style="${routeStyle(route === "any" ? "neutral" : route)}"><i>${meta.icon}</i>${label}</small>`;
}

function rarityInfo(rarity) {
  return rarityMeta[rarity] ?? rarityMeta.Common;
}

function choiceRarityClass(rarity) {
  return `is-rarity-${rarityInfo(rarity).id}`;
}

function choiceRarityMarkup(rarity) {
  const meta = rarityInfo(rarity);
  return `<i class="choice-rarity ${choiceRarityClass(rarity)}" style="--rarity-color:${meta.color}"><span>${meta.short}</span><b>${meta.label}</b><em>${"◆".repeat(meta.pips)}</em></i>`;
}

function kindInfo(kind) {
  return kindMeta[kind] ?? { id: "misc", label: displayKind(kind), short: "类", color: "#f2ead9" };
}

function choiceKindClass(kind) {
  return `is-kind-${kindInfo(kind).id}`;
}

function choiceKindStyle(kind) {
  return `--kind-color:${kindInfo(kind).color}`;
}

function choiceKindMarkup(kind) {
  const meta = kindInfo(kind);
  return `<i class="choice-kind ${choiceKindClass(kind)}" style="--kind-color:${meta.color}"><span>${meta.short}</span><b>${meta.label}</b></i>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function numberTone(text, offset) {
  const before = text.slice(Math.max(0, offset - 18), offset);
  if (/Boss|出手|烙印|锁|代价|风险|假抬手|后撤横切|地裂|抢招/.test(before)) return "danger";
  if (/证据|提示|红核|奖励路线|级/.test(before)) return "info";
  return "good";
}

function effectTextMarkup(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/[+-]?\d+(?:\.\d+)?(?:%|ms|级|张|次)?/g, (value, offset) => {
    const tone = numberTone(escaped, offset);
    return `<strong class="effect-num is-${tone}">${value}</strong>`;
  });
}

function formatSigned(value, suffix = "") {
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(1));
  return `${rounded > 0 ? "+" : ""}${rounded}${suffix}`;
}

function drawCooldownDrop(mods = {}) {
  const speed = (mods.speed ?? 0) + (mods.any ?? 0) * 0.7;
  if (speed <= 0) return 0;
  const before = currentDrawCooldown();
  const rewardSpeed = state.rewardMods.speed + state.rewardMods.any * 0.7 + speed;
  const after = Math.max(80, state.tuning.drawCooldown / (1 + rewardSpeed * state.tuning.drawRewardScale));
  return Math.max(0, Math.round(((before - after) / before) * 100));
}

function routeValueText(route, value) {
  return {
    speed: `追击值 ${formatSigned(value)}`,
    control: `挑空值 ${formatSigned(value)}`,
    counter: `闪反值 ${formatSigned(value)}`,
    burst: `爆发值 ${formatSigned(value)}`,
    damage: `压制值 ${formatSigned(value)}`,
    any: `全路线 ${formatSigned(value)}`,
  }[route] ?? `${route} ${formatSigned(value)}`;
}

function choiceEffectChips(choice) {
  const chips = [];
  const mods = choice.mods ?? {};
  for (const [route, value] of Object.entries(mods)) {
    if (!value) continue;
    chips.push({ tone: "good", text: routeValueText(route, value) });
    if (route === "speed") {
      const drop = drawCooldownDrop({ speed: value });
      if (drop > 0) chips.push({ tone: "good", text: `补牌冷却 -${drop}%` });
    }
    if (route === "control") chips.push({ tone: "good", text: `上划拖延 ${formatSigned(value * state.tuning.controlDelay, "ms")}` });
    if (route === "counter") chips.push({ tone: "good", text: `左划伤害 ${formatSigned(value * 5 * state.tuning.rewardPower)}` });
    if (route === "burst") chips.push({ tone: "good", text: `下划伤害 ${formatSigned(value * 5 * state.tuning.rewardPower)}` });
    if (route === "damage") chips.push({ tone: "good", text: `点击伤害 ${formatSigned(value * 2 * state.tuning.rewardPower)}` });
    if (route === "any") chips.push({ tone: "good", text: `全动作伤害 ${formatSigned(value * state.tuning.rewardPower)}` });
  }
  if (choice.heal) chips.push({ tone: "good", text: `专注 ${formatSigned(choice.heal)}` });
  if (choice.scout) chips.push({ tone: "info", text: `侦察 ${formatSigned(choice.scout)}` });
  if (choice.breakEvidence) chips.push({ tone: "info", text: `破势证据 ${formatSigned(choice.breakEvidence)}` });
  if (choice.finisherEvidence) chips.push({ tone: "info", text: `终结残片 ${formatSigned(choice.finisherEvidence)}` });
  if (choice.oathPressure) chips.push({ tone: "danger", text: `Boss 出手提前 ${choice.oathPressure}ms` });
  const bossMark = choice.contract?.bossMark ?? choice.mark;
  if (["backstep", "feint", "ground-grab"].includes(bossMark)) chips.push({ tone: "danger", text: `${bossMarkLabel(bossMark)} +1` });
  return chips
    .map((chip) => `<em class="effect-chip is-${chip.tone}">${effectTextMarkup(chip.text)}</em>`)
    .join("");
}

function choiceEffectMarkup(choice, { showKind = true } = {}) {
  const meta = showKind ? `<i class="effect-type">${escapeHtml(kindInfo(choice.kind).label)}效果</i>` : "";
  const chips = choiceEffectChips(choice);
  const copy = choice.text ?? choice.pitch ?? "";
  return `${meta}<span class="effect-copy">${effectTextMarkup(copy)}</span>${chips ? `<span class="effect-chips">${chips}</span>` : ""}`;
}

function modIcons(mods = {}) {
  return Object.entries(mods)
    .filter(([, value]) => value > 0)
    .map(([route, value]) => {
      const key = route === "any" ? "neutral" : route;
      const meta = routeInfo(key);
      return `<i class="mod-chip" style="${routeStyle(key)}">${meta.icon}<b>${value}</b></i>`;
    })
    .join("");
}

function bossMarkForRoute(route) {
  return {
    speed: "backstep",
    counter: "feint",
    burst: "ground-grab",
  }[route] ?? null;
}

function trainingEncounter(lesson = state.trainingLesson) {
  if (!lesson) return null;
  const equipment = equipmentById.get(lesson.equipmentId);
  return {
    type: "training",
    name: lesson.label,
    route: lesson.route,
    form: "storm",
    hp: 96,
    damage: 8,
    speed: 1500,
    nodeIcon: routeIcon(lesson.route),
    note: `${lesson.text} 推荐 ${equipment?.name ?? "当前武器"}。训练不发局外材料。`,
    lesson: lesson.text,
  };
}

function bossMarkLabel(mark = state.bossMark) {
  return {
    backstep: "后撤横切",
    feint: "假抬手",
    "ground-grab": "地裂抓取",
  }[mark] ?? "基础风暴";
}

function dominantMarkRoute() {
  let best = state.equipment?.route ?? "speed";
  let value = -1;
  for (const [route, score] of Object.entries(state.routeMarks)) {
    if (score > value) {
      best = route;
      value = score;
    }
  }
  return best;
}

function refreshBossMark() {
  if (state.trainingLesson?.bossMark) {
    state.bossMark = state.trainingLesson.bossMark;
    return;
  }
  if (state.dailyRun) {
    state.bossMark = dailyPlanFor(state.dailyRun.seed, state.dailyRun.themeId).theme.bossMark;
    return;
  }
  const pathChoice = currentPathChoice();
  if (pathChoice?.bossMark) {
    state.bossMark = pathChoice.bossMark;
    return;
  }
  const route = dominantMarkRoute();
  state.bossMark = actMeta[state.actLevel]?.bossMark ?? bossMarkForRoute(route) ?? state.equipment?.contract?.bossMark ?? null;
}

function bossMoves(encounter = currentRoom()) {
  const base = [
    { key: "fast", label: "快刀抬手", hint: "短抬手，左划或格挡更稳。", read: "快", damageScale: 0.86, pressure: 1 },
    { key: "heavy", label: "慢刀蓄势", hint: "大幅蓄势，可抢破势。", read: "重", damageScale: 1.12, pressure: 1.16 },
  ];
  if (encounter?.type !== "boss" && encounter?.type !== "elite" && encounter?.type !== "training") return base;
  if (state.bossMark === "backstep") base.push({ key: "backstep", label: "后撤横切", hint: "惩罚无脑右划，等空挥再追。", read: "退", damageScale: 1.05, pressure: 1.22 });
  if (state.bossMark === "feint") base.push({ key: "feint", label: "假抬手", hint: "先假动作，别急着交防守。", read: "伪", damageScale: 0.92, pressure: 1.18 });
  if (state.bossMark === "ground-grab") base.push({ key: "ground-grab", label: "地裂抓取", hint: "惩罚空下划，先破势再处决。", read: "裂", damageScale: 1.24, pressure: 1.26 });
  return base;
}

function chooseBossMove(encounter = currentRoom()) {
  const moves = bossMoves(encounter);
  state.bossMove = state.trainingLesson?.moveKey ? moves.find((move) => move.key === state.trainingLesson.moveKey) : null;
  state.bossMove = state.bossMove ?? moves[Math.floor((state.rng?.() ?? Math.random()) * moves.length)] ?? moves[0];
  state.intentName = state.evidence.scout > 0 ? `${state.bossMove.label} · 已侦察` : state.bossMove.label;
}

function dailyThemeForSeed(seed = dailySeed()) {
  const rng = seededRandom(`${seed}-daily-theme`);
  return dailyThemes[Math.floor(rng() * dailyThemes.length)] ?? dailyThemes[0];
}

function dailyPlanFor(seed = dailySeed(), themeId = null) {
  const theme = dailyThemes.find((item) => item.id === themeId) ?? dailyThemeForSeed(seed);
  const meta = routeInfo(theme.route);
  const bossName =
    theme.route === "speed"
      ? "日课后卷守卫"
      : theme.route === "counter"
        ? "日课镜廊师"
        : "日课裂盾将";
  return {
    seed,
    theme,
    encounters: [
      { type: "fight", nodeIcon: meta.short, name: `${theme.label} 入门`, hp: 130, speed: 2850, route: theme.route, form: theme.route === "counter" ? "mirror" : "blade", damage: 12, note: `${theme.text} 第一战只验路线节奏。` },
      { type: "forge", nodeIcon: "锻", name: "日课锻炉", route: theme.route, note: "固定给路线刻印或修正，帮助把当天主题立成刃心。" },
      { type: "elite", nodeIcon: "试", name: `${theme.label} 试炼`, hp: 215, speed: 2300, route: theme.route, form: theme.route === "burst" ? "shield" : theme.route === "counter" ? "mirror" : "redline", damage: 17, note: "短局高压段。能否保持定锚和连击，决定最终评分。" },
      { type: "boss", nodeIcon: "日", name: bossName, hp: 300, speed: 1950, route: theme.route, form: theme.route === "speed" ? "redline" : theme.route === "counter" ? "mirror" : "shield", damage: 21, note: `每日收尾战。Boss 烙印固定为 ${bossMarkLabel(theme.bossMark)}。` },
    ],
  };
}

function dailyContractChoices(themeId = state.dailyRun?.themeId) {
  if (!themeId) return [];
  return dailyContractPool.filter((choice) => choice.dailyTheme === themeId || choice.dailyTheme === "any");
}

function activeEncounters() {
  if (state.dailyRun) return dailyPlanFor(state.dailyRun.seed, state.dailyRun.themeId).encounters;
  return encounters;
}

function dailySeed() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `D${year}${month}${day}`;
}

function seededRandom(seedText) {
  let seed = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    seed ^= seedText.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function resetGame() {
  setAudioScene("menu");
  state.rng = seededRandom(state.dailySeed);
  state.runStarted = false;
  state.encounterIndex = 0;
  state.actLevel = 1;
  state.equipment = null;
  state.playerMaxHp = state.tuning.playerFocus;
  state.playerHp = state.playerMaxHp;
  state.rewardMods = { speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 };
  state.rewardNames = [];
  state.routeMarks = { speed: 0, counter: 0, burst: 0, control: 0, damage: 0 };
  state.evidence = { scout: 0, break: 0, finisher: 0 };
  state.bossMark = null;
  state.bossMove = null;
  state.bossPreviewed = false;
  state.oaths = [];
  state.oathPressure = 0;
  state.rewardBias = null;
  state.notebookOpen = false;
  state.tunerOpen = false;
  state.versionOpen = false;
  state.saveOpen = false;
  state.saveError = "";
  state.saveReturnPhase = null;
  state.returnToGearAfterVersion = false;
  state.returnToGearAfterTuner = false;
  state.pendingRewardIds = null;
  state.pendingPathChoiceIds = null;
  state.pathChoices = {};
  state.anchor = null;
  state.lastBreakdown = "还没有结算。";
  state.pressure = 0;
  state.stance = 100;
  state.lastDirection = null;
  state.drawTimer = 0;
  state.runId = null;
  state.dailyRun = null;
  state.trainingLesson = null;
  resetFightProofs();
  startEncounter(encounters[0]);
  showEquipmentOverlay();
}

function startRun(equipment) {
  setAudioScene("battle");
  state.trainingLesson = null;
  state.dailyRun = null;
  state.runStarted = true;
  state.encounterIndex = 0;
  state.actLevel = 1;
  state.equipment = equipment;
  state.rewardMods = { speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 };
  state.rewardNames = [];
  state.routeMarks = { speed: 0, counter: 0, burst: 0, control: 0, damage: 0 };
  state.evidence = { scout: 0, break: 0, finisher: 0 };
  state.bossMark = equipment.contract?.bossMark ?? null;
  state.bossMove = null;
  state.bossPreviewed = false;
  state.oaths = [];
  state.oathPressure = 0;
  state.rewardBias = null;
  state.playerMaxHp = state.tuning.playerFocus;
  state.playerHp = state.playerMaxHp;
  state.pressure = 0;
  state.stance = 100;
  state.lastDirection = null;
  state.drawTimer = 0;
  state.lastBreakdown = "还没有结算。";
  state.pendingRewardIds = null;
  state.pendingPathChoiceIds = null;
  state.pathChoices = {};
  state.anchor = null;
  state.runId = newRunId();
  resetFightProofs();
  for (const [route, value] of Object.entries(equipment.mods)) {
    state.rewardMods[route] += value;
    if (route !== "any") state.routeMarks[route] += value;
  }
  document.querySelector(".overlay")?.remove();
  enterCurrentRoom();
  wakeLoop(true);
  log(`${equipment.name} 已装备。今日种子 ${state.dailySeed} 开始。`);
}

function startDailyRun() {
  if (profileLocked()) return false;
  const seed = dailySeed();
  const plan = dailyPlanFor(seed);
  const equipment = equipmentById.get(plan.theme.equipmentId);
  if (!equipment) return false;
  setAudioScene("battle");
  state.trainingLesson = null;
  state.dailyRun = { seed, themeId: plan.theme.id, label: plan.theme.label };
  state.dailySeed = seed;
  state.rng = seededRandom(`${seed}-${plan.theme.id}`);
  state.runStarted = true;
  state.encounterIndex = 0;
  state.actLevel = 1;
  state.equipment = equipment;
  state.rewardMods = { speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 };
  state.rewardNames = [`每日:${plan.theme.label}`];
  state.routeMarks = { speed: 0, counter: 0, burst: 0, control: 0, damage: 0 };
  state.evidence = { scout: 0, break: 0, finisher: 0 };
  state.bossMark = plan.theme.bossMark;
  state.bossMove = null;
  state.bossPreviewed = false;
  state.oaths = [];
  state.oathPressure = 0;
  state.rewardBias = plan.theme.route;
  state.playerMaxHp = state.tuning.playerFocus;
  state.playerHp = state.playerMaxHp;
  state.pressure = 0;
  state.stance = 100;
  state.lastDirection = null;
  state.drawTimer = 0;
  state.lastBreakdown = "每日刀路开始。";
  state.pendingRewardIds = null;
  state.pendingPathChoiceIds = null;
  state.pathChoices = {};
  state.anchor = { route: plan.theme.route, direction: plan.theme.route === "counter" ? "left" : plan.theme.route === "burst" ? "down" : "right", source: plan.theme.label, label: `${routeIcon(plan.theme.route)} ${plan.theme.label}` };
  state.runId = `daily-${seed}-${plan.theme.id}`;
  resetFightProofs();
  for (const [route, value] of Object.entries(equipment.mods)) {
    state.rewardMods[route] += value;
    if (route !== "any") state.routeMarks[route] += value;
  }
  for (const [route, value] of Object.entries(plan.theme.routeMods)) {
    state.rewardMods[route] += value;
    if (route !== "any") state.routeMarks[route] += value;
  }
  document.querySelector(".overlay")?.remove();
  enterCurrentRoom();
  wakeLoop(true);
  log(`${plan.theme.label}: ${plan.theme.text}`);
  return true;
}

function startTrainingLesson(trainingId) {
  if (profileLocked() || !state.profile.training?.[trainingId]) return false;
  const lesson = trainingCatalog.find((item) => item.id === trainingId);
  if (!lesson) return false;
  const equipment = equipmentById.get(lesson.equipmentId);
  if (!equipment) return false;
  setAudioScene("battle");
  state.trainingLesson = lesson;
  state.dailyRun = null;
  state.runStarted = true;
  state.encounterIndex = 0;
  state.actLevel = 1;
  state.equipment = equipment;
  state.rewardMods = { speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 };
  state.rewardNames = [`训练:${lesson.label}`];
  state.routeMarks = { speed: 0, counter: 0, burst: 0, control: 0, damage: 0 };
  state.evidence = { scout: 0, break: 0, finisher: 0 };
  state.bossMark = lesson.bossMark;
  state.bossMove = null;
  state.bossPreviewed = true;
  state.oaths = [];
  state.oathPressure = 0;
  state.rewardBias = lesson.route;
  state.anchor = { route: lesson.route, label: lesson.label };
  state.pendingRewardIds = null;
  state.pendingPathChoiceIds = null;
  state.pathChoices = {};
  state.lastBreakdown = "训练课开始。";
  state.pressure = 0;
  state.stance = 100;
  state.lastDirection = null;
  state.drawTimer = 0;
  state.runId = `training-${lesson.id}-${Date.now().toString(36)}`;
  resetFightProofs();
  startEncounter(trainingEncounter(lesson));
  log(`${lesson.label}: ${lesson.text}`);
  return true;
}

function currentRoom() {
  if (state.trainingLesson) return trainingEncounter();
  const base = activeEncounters()[state.encounterIndex] ?? null;
  if (!base) return null;
  return scaledEncounter(base, state.actLevel);
}

function pathKey(index = state.encounterIndex, act = state.actLevel) {
  return `A${act}:${index}`;
}

function currentPathChoice(index = state.encounterIndex, act = state.actLevel) {
  return state.pathChoices?.[pathKey(index, act)] ?? null;
}

function encounterForAct(base, actLevel = 1, index = state.encounterIndex) {
  return { ...base, ...(actEncounterVariants[actLevel]?.[index] ?? {}) };
}

function scaledEncounter(base, actLevel = 1, index = state.encounterIndex) {
  const meta = actMeta[actLevel] ?? actMeta[1];
  const source = encounterForAct(base, actLevel, index);
  const pathChoice = currentPathChoice(index, actLevel);
  const scaled = {
    ...source,
    act: actLevel,
    hp: source.hp ? Math.round(source.hp * meta.hp) : source.hp,
    damage: source.damage ? Math.round(source.damage * meta.damage) : source.damage,
    speed: source.speed ? Math.max(900, source.speed - meta.speed) : source.speed,
  };
  if (pathChoice) {
    if (pathChoice.forceType) scaled.type = pathChoice.forceType;
    if (pathChoice.route && pathChoice.route !== "any") scaled.route = pathChoice.route;
    if (scaled.hp && pathChoice.hpScale) scaled.hp = Math.max(1, Math.round(scaled.hp * pathChoice.hpScale));
    if (scaled.damage && pathChoice.damageDelta) scaled.damage = Math.max(1, scaled.damage + pathChoice.damageDelta);
    if (scaled.speed && pathChoice.speedDelta) scaled.speed = Math.max(650, scaled.speed - pathChoice.speedDelta);
    if (pathChoice.risk === "danger") scaled.nodeIcon = pathChoice.icon ?? scaled.nodeIcon;
  }
  if (scaled.type === "boss" && scaled.hp) scaled.hp = Math.max(1, Math.round(scaled.hp * bossDefaultHpScale));
  if (!state.dailyRun && scaled.type === "boss" && !actEncounterVariants[actLevel]?.[index]) {
    scaled.name = meta.bossName;
    scaled.form = meta.bossForm;
    scaled.route = meta.bossRoute;
  }
  if (["fight", "elite", "boss"].includes(scaled.type)) {
    const lesson = scaled.lesson ? `${scaled.lesson}` : scaled.type === "boss" ? "开战继承全部 Boss 烙印。" : "更高幕数会更快、更疼、更难保连。";
    const pathLine = pathChoice ? `${pathChoice.label}：${pathChoice.text}` : lesson;
    scaled.note = `${state.dailyRun ? "每日" : actLabel()} · HP ${scaled.hp}，伤害 ${scaled.damage}，基础抬手 ${scaled.speed}ms。${pathLine}`;
  } else {
    scaled.note = `${state.dailyRun ? "每日" : actLabel()} · ${pathChoice ? `${pathChoice.label}：${pathChoice.text}` : scaled.lesson ?? scaled.note}`;
  }
  return scaled;
}

function actLabel(level = state.actLevel) {
  return actMeta[level]?.label ?? `${level}幕`;
}

function enemyIntentSpeed(encounter = currentRoom()) {
  if (!encounter) return 3200;
  const bossScale = encounter.type === "boss" ? state.tuning.bossTempo : 1;
  const tempo = Math.max(0.1, state.tuning.enemyTempo * bossScale);
  return Math.max(650, (encounter.speed - state.oathPressure) / tempo);
}

function handLimit() {
  return Math.max(1, Math.round(state.tuning.handLimit));
}

function startingHand() {
  return Math.min(handLimit(), Math.max(1, Math.round(state.tuning.startingHand)));
}

function handCount() {
  return state.hand.filter(Boolean).length;
}

function currentDrawCooldown() {
  const rewardSpeed = state.rewardMods.speed + state.rewardMods.any * 0.7;
  const reduction = 1 + rewardSpeed * state.tuning.drawRewardScale;
  return Math.max(80, state.tuning.drawCooldown / reduction);
}

function drawPreviewText(count = Math.round(state.tuning.drawPreviewCount ?? 2)) {
  const preview = state.drawPile.slice(-count).reverse();
  if (!preview.length) return "牌库重洗";
  return preview.map((card) => `${routeIcon(card.route)}${card.name}`).join(" / ");
}

function newRunId() {
  return `${state.dailySeed}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

function resetFightProofs() {
  state.fightProofs = { backstepIntercept: false, trueRead: false, shatterExecute: false };
  state.lastMastery = null;
}

function recipeForCardDirection(cardId, direction, equipmentId = state.equipment?.id) {
  return recipeCatalog.find((recipe) => recipe.equipmentId === equipmentId && recipe.cardId === cardId && recipe.direction === direction) ?? null;
}

function anchorRoute() {
  return state.anchor?.route ?? state.equipment?.route ?? null;
}

function anchorCueForCardDirection(cardId, direction) {
  const route = anchorRoute();
  const cue = route ? anchorMatrix[route]?.[`${cardId}:${direction}`] : null;
  if (!cue) return null;
  return { ...cue, route, direction };
}

function isAnchorWindow(cue) {
  if (!cue) return false;
  const danger = state.intentTime < state.tuning.perfectWindow * 1.18;
  if (cue.route === "speed") return state.bossMove?.key === "backstep" || state.route === "speed" || state.combo >= 4;
  if (cue.route === "counter") return danger || ["fast", "heavy", "feint"].includes(state.bossMove?.key);
  if (cue.route === "burst") return state.fightBreaks > 0 || ["heavy", "ground-grab"].includes(state.bossMove?.key);
  return false;
}

function cardDirectionRoute(card, direction) {
  if (direction === "tap") return card.route;
  return card.variants?.[direction]?.[1] ?? card.route;
}

function isRecipeWindow(recipe) {
  if (!recipe || state.ended || !state.runStarted) return false;
  const move = state.bossMove?.key;
  const danger = state.intentTime < state.tuning.perfectWindow * 1.12;
  if (recipe.id === "chase-intercept") return move === "backstep" && danger;
  if (recipe.id === "guard-mirror") return ["fast", "heavy", "feint"].includes(move) && danger;
  if (recipe.id === "breaker-shatter") return ["heavy", "ground-grab"].includes(move) && danger;
  if (recipe.route === "speed") return move === "backstep" || state.route === "speed" || state.combo >= 4;
  if (recipe.route === "counter") return danger && ["fast", "heavy", "feint"].includes(move);
  if (recipe.route === "burst") return ["heavy", "ground-grab"].includes(move) || state.fightBreaks > 0;
  return false;
}

function cardAffinity(card) {
  const route = card.route;
  const directions = ["up", "right", "left", "down"].map((direction) => {
    const recipe = recipeForCardDirection(card.id, direction);
    const cue = anchorCueForCardDirection(card.id, direction);
    const actionRoute = cardDirectionRoute(card, direction);
    const routeMatch = Boolean(recipe || cue);
    const active = recipe ? isRecipeWindow(recipe) : isAnchorWindow(cue);
    return { direction, route: recipe?.route ?? cue?.route ?? actionRoute, recipe, cue, active, routeMatch };
  });
  const best = directions.find((item) => item.active) ?? directions.find((item) => item.recipe) ?? directions.find((item) => item.cue) ?? null;
  return { route, directions, best };
}

function directionClass(direction) {
  return {
    up: "is-up",
    right: "is-right",
    left: "is-left",
    down: "is-down",
  }[direction] ?? "";
}

function promoteCards(predicate, lookahead = Math.round(state.tuning.promoteLookahead ?? 6)) {
  const start = Math.max(0, state.drawPile.length - lookahead);
  for (let i = state.drawPile.length - 1; i >= start; i -= 1) {
    if (predicate(state.drawPile[i])) {
      const [card] = state.drawPile.splice(i, 1);
      state.drawPile.push(card);
      return true;
    }
  }
  return false;
}

function evaluateMastery(card, direction, route, perfect, breakHit) {
  const recipe = recipeForCardDirection(card.id, direction);
  const active = recipe ? isRecipeWindow(recipe) : false;
  const chaseLineReady = state.route === "speed" && state.combo >= 4;
  let result = "stable";
  if (recipe && active) result = "masterstroke";
  if (recipe?.id === "guard-mirror" && perfect) result = "masterstroke";
  if (recipe?.id === "breaker-shatter" && breakHit && state.combo >= 3) result = "masterstroke";
  if (state.equipment?.id === "storm-katana" && direction === "right" && state.bossMove?.key !== "backstep" && state.bossMark === "backstep" && !chaseLineReady) result = "flaw";
  if (state.equipment?.id === "mirror-fan" && route === "counter" && state.bossMove?.key === "feint" && !perfect) result = "flaw";
  if (state.equipment?.id === "executioner" && direction === "down" && state.bossMove?.key === "ground-grab" && state.fightBreaks <= 0 && !breakHit) result = "flaw";
  return { result, recipe };
}

function applyMasteryResult(mastery) {
  state.lastMastery = mastery;
  if (mastery.result !== "masterstroke" || !mastery.recipe) return 0;
  const recipe = mastery.recipe;
  state.fightProofs[recipe.evidence] = true;
  state.routeScores[recipe.route] += 2;
  state.comboCharge = Math.min(100, state.comboCharge + 18);
  state.drawTimer = Math.min(state.drawTimer, currentDrawCooldown() * 0.52);
  if (recipe.route === "speed") promoteCards((card) => card.route === "speed" || card.id === "chase-cut");
  if (recipe.route === "counter") promoteCards((card) => card.route === "counter" || card.id === "guard");
  if (recipe.route === "burst") promoteCards((card) => card.route === "burst" || card.id === "breaker" || card.id === "execute");
  if (recipe.id === "shadow-return" || recipe.id === "spin-afterimage") {
    state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 6);
    state.pressure = Math.max(0, state.pressure - state.tuning.counterRelief * 0.45);
  }
  if (recipe.id === "execute-fall") state.evidence.finisher += 1;
  return recipe.route === "burst" ? 8 : recipe.route === "counter" ? 6 : 5;
}

function masteryLabel(mastery = state.lastMastery) {
  if (!mastery || mastery.result === "stable") return "";
  if (mastery.result === "flaw") return "错读";
  return recipeById.get(mastery.recipe?.id)?.name ?? "会心读招";
}

function grantTrainingProgress(won) {
  const lesson = state.trainingLesson;
  if (!lesson || !won || profileLocked()) return null;
  state.profile.badges[`clear-${lesson.id}`] = true;
  saveProfile();
  return `${lesson.label}完成章`;
}

function dailyScore() {
  return Math.max(0, Math.round(state.maxCombo * 10 + state.fightReads * 24 + state.fightBreaks * 18 + state.evidence.finisher * 20 - Math.max(0, state.playerMaxHp - state.playerHp)));
}

function grantDailyProgress(won) {
  const run = state.dailyRun;
  if (!run || !won || profileLocked()) return null;
  const score = dailyScore();
  const key = run.seed;
  const previous = state.profile.dailyRecords?.[key] ?? null;
  const bestScore = Math.max(previous?.score ?? 0, score);
  state.profile.dailyRecords[key] = {
    seed: run.seed,
    themeId: run.themeId,
    label: run.label,
    score: bestScore,
    maxCombo: Math.max(previous?.maxCombo ?? 0, state.maxCombo),
    reads: Math.max(previous?.reads ?? 0, state.fightReads),
    breaks: Math.max(previous?.breaks ?? 0, state.fightBreaks),
    clearedAt: new Date().toISOString(),
  };
  state.profile.badges[`daily-${key}`] = true;
  saveProfile();
  return state.profile.dailyRecords[key];
}

function grantFightProgress() {
  const room = currentRoom();
  if (state.dailyRun) return null;
  if (!state.runId || !room || !["fight", "elite", "boss"].includes(room.type)) return null;
  if (profileLocked()) return { locked: true, error: state.profileErrors[state.profileMode] };
  const claimKey = `${state.runId}:A${state.actLevel}:${state.encounterIndex}`;
  if (state.profile.claimedFightKeys.includes(claimKey)) return null;
  const ink = (room.type === "boss" ? 4 : room.type === "elite" ? 3 : 2) + Math.floor(state.maxCombo / 12);
  state.profile.bladeInk += ink;
  const proofGain = {};
  for (const [key, value] of Object.entries(state.fightProofs)) {
    if (!value) continue;
    state.profile.evidence[key] = (state.profile.evidence[key] ?? 0) + 1;
    proofGain[key] = 1;
  }
  const pathChoice = currentPathChoice();
  if (pathChoice?.risk === "danger" && pathChoice.evidence) {
    const gain = Math.max(1, Number(pathChoice.evidenceGain ?? 1));
    state.profile.evidence[pathChoice.evidence] = (state.profile.evidence[pathChoice.evidence] ?? 0) + gain;
    proofGain[pathChoice.evidence] = (proofGain[pathChoice.evidence] ?? 0) + gain;
  }
  const unlocks = unlockProfileMilestones(room, proofGain);
  state.profile.claimedFightKeys.push(claimKey);
  state.profile.claimedFightKeys = state.profile.claimedFightKeys.slice(-160);
  saveProfile();
  return { ink, proofGain, unlocks };
}

function profileGainText(gain) {
  if (gain.locked) return `长期成长锁定：${gain.error}。本战材料未写入。`;
  const proofNames = Object.entries(gain.proofGain)
    .map(([key, value]) => `${profileEvidenceMeta[key]?.label ?? key} +${value}`)
    .join("，");
  const unlockText = gain.unlocks?.length ? `，新开 ${gain.unlocks.join("、")}` : "";
  return `锻刃墨 +${gain.ink}${proofNames ? `，${proofNames}` : ""}${unlockText}。`;
}

function queueDrawIfNeeded() {
  if (handCount() >= handLimit()) {
    state.drawTimer = 0;
    return;
  }
  if (state.drawTimer <= 0) {
    state.drawTimer = currentDrawCooldown();
  }
}

function clearPendingEnd() {
  if (state.pendingEndTimer) {
    window.clearTimeout(state.pendingEndTimer);
    state.pendingEndTimer = null;
  }
}

function resetCombatVisualState() {
  clearPendingEnd();
  state.artLockUntil = 0;
  resetBossMoveClass();
  toggleClass(els.enemy, "is-attacking", false);
  toggleClass(els.enemy, "is-charging", false);
  toggleClass(els.enemy, "is-damaged", false);
  toggleClass(els.enemy, "is-death", false);
  els.enemy.dataset.action = "idle";
  toggleClass(els.player, "is-hit", false);
  toggleClass(els.arena, "is-player-hit", false);
  toggleClass(els.playerHealth, "is-damaged", false);
  toggleClass(els.enemyHealth, "is-damaged", false);
  setTransform(els.player, "");
  setTransform(els.enemy, "");
  els.slashLayer.replaceChildren();
  els.impactLayer.replaceChildren();
  els.comboLayer.replaceChildren();
}

const bossMoveClassKeys = ["fast", "heavy", "feint", "backstep", "ground-grab"];

function resetBossMoveClass() {
  for (const key of bossMoveClassKeys) {
    toggleClass(els.enemy, `is-move-${key}`, false);
  }
  toggleClass(els.enemy, "is-read-danger", false);
  els.enemy.dataset.read = "";
}

function enterCurrentRoom() {
  document.querySelector(".overlay")?.remove();
  const room = currentRoom();
  if (!room) {
    showRunClearOverlay();
    return;
  }
  state.ended = true;
  render();
  if (["scout", "forge", "market"].includes(room.type)) {
    showNodeOverlay(room);
    return;
  }
  if (room.type === "boss" && !state.bossPreviewed) {
    showBossPreviewOverlay(room);
    return;
  }
  startEncounter(room);
}

function shouldOfferPathChoice(index = state.encounterIndex) {
  const base = activeEncounters()[index];
  if (state.dailyRun || !state.runStarted || !base || base.type === "boss") return false;
  return !currentPathChoice(index);
}

function nextPathChoices(index = state.encounterIndex) {
  const base = activeEncounters()[index] ?? activeEncounters()[0] ?? encounters[0];
  const anchorRoute = state.anchor?.route;
  const dominant = state.route !== "neutral" ? state.route : anchorRoute ?? state.equipment?.route ?? base.route;
  const dangerId =
    dominant === "counter"
      ? "counter-risk"
      : dominant === "burst"
        ? "burst-risk"
        : dominant === "damage" || base.type === "forge"
          ? "forge-risk"
          : base.type === "scout"
          ? "scout-risk"
            : "speed-risk";
  const alternateId = dangerId === "speed-risk" ? "counter-risk" : dangerId === "counter-risk" ? "burst-risk" : "speed-risk";
  const unlockedBranches = pathChoiceCatalog.filter((choice) => {
    if (!choice.atlasId || !state.profile.routeAtlas?.[choice.atlasId]) return false;
    if (choice.minAct && state.actLevel < choice.minAct) return false;
    if (choice.route === dominant || choice.route === anchorRoute || choice.route === state.equipment?.route) return true;
    return state.actLevel >= 3;
  });
  const branch = unlockedBranches[Math.floor((state.rng?.() ?? Math.random()) * unlockedBranches.length)]?.id;
  return ["steady", branch, dangerId, alternateId]
    .filter(Boolean)
    .filter((id, index, ids) => ids.indexOf(id) === index)
    .map((id) => pathChoiceCatalog.find((choice) => choice.id === id))
    .filter(Boolean)
    .slice(0, branch ? 3 : 2);
}

function applyPathChoice(choice, index = state.encounterIndex) {
  if (!choice) return;
  state.pathChoices[pathKey(index)] = choice;
  state.pendingPathChoiceIds = null;
  if (choice.routeMark && state.routeMarks[choice.routeMark] !== undefined) {
    state.routeMarks[choice.routeMark] += choice.risk === "danger" ? 2 : 1;
  }
  if (choice.rewardBias && ["speed", "counter", "burst", "damage"].includes(choice.rewardBias)) {
    state.rewardBias = choice.rewardBias;
  }
  if (choice.bossMark) state.bossMark = choice.bossMark;
  refreshBossMark();
}

function advanceRoom() {
  state.encounterIndex += 1;
  if (shouldOfferPathChoice()) {
    showPathChoiceOverlay();
    return;
  }
  enterCurrentRoom();
}

function startEncounter(encounter) {
  if (state.runStarted) setAudioScene("battle");
  const firstFight = state.encounterIndex === 0;
  const pressureSpeed = enemyIntentSpeed(encounter);
  resetCombatVisualState();
  state.drawPile = shuffle([...cards, ...cards]);
  state.hand = [];
  state.combo = 0;
  state.comboCharge = 0;
  state.maxCombo = 0;
  state.fightReads = 0;
  state.fightBreaks = 0;
  state.route = "neutral";
  state.routeScores = { speed: 0, control: 0, counter: 0, burst: 0, damage: 0 };
  state.enemyMaxHp = Math.max(1, Math.round(encounter.hp * state.tuning.enemyHp));
  state.enemyHp = state.enemyMaxHp;
  state.playerMaxHp = state.tuning.playerFocus;
  state.playerHp = firstFight ? state.playerMaxHp : Math.min(state.playerMaxHp, state.playerHp + 18);
  state.intentTime = pressureSpeed;
  state.intentMax = pressureSpeed;
  refreshBossMark();
  chooseBossMove(encounter);
  state.pressure = 0;
  state.stance = 100;
  state.lastDirection = null;
  state.drawTimer = 0;
  state.lastActionAt = performance.now();
  state.hasStarted = false;
  state.ended = false;
  state.pendingRewardIds = null;
  resetFightProofs();
  document.querySelector(".overlay")?.remove();
  forceCombatArt();
  for (let i = 0; i < startingHand(); i += 1) drawCard();
  queueDrawIfNeeded();
  renderHand();
  render();
  wakeLoop(true);
  if (!state.runStarted) {
    log(`选择武器，开始今日种子 ${state.dailySeed}。`);
  } else {
    const markLine = encounter.type === "boss" ? ` 烙印：${bossMarkLabel()}。` : "";
    log(`${encounter.name}. ${encounter.note}${markLine}`);
  }
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor((state.rng?.() ?? Math.random()) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function drawCard() {
  if (handCount() >= handLimit()) return;
  if (state.drawPile.length === 0) {
    state.drawPile = shuffle([...cards, ...cards]);
  }
  const slot = state.hand.findIndex((card, index) => index < handLimit() && !card);
  if (slot >= 0) {
    state.hand[slot] = state.drawPile.pop();
  } else {
    state.hand.push(state.drawPile.pop());
  }
}

function replaceCard(index) {
  state.hand[index] = null;
  queueDrawIfNeeded();
  renderHand();
}

function playCard(index, direction = "tap") {
  if (state.ended || state.notebookOpen || state.versionOpen || !state.runStarted) return;
  const card = state.hand[index];
  if (!card) return;

  const variant = direction === "tap" ? [card.tap, card.route] : card.variants[direction];
  const actionName = variant[0];
  const route = variant[1];
  const now = performance.now();
  const quick = now - state.lastActionAt < state.tuning.comboWindow;
  const danger = state.intentTime < state.tuning.perfectWindow;
  const defensive = route === "counter" || card.id === "guard" || card.id === "shadow-step";
  const perfect = danger && defensive;
  let baseDamage = damageFor(card, route, direction, perfect);
  const breakHit = direction === "down" && (route === "burst" || card.id === "breaker" || card.id === "heavy-cleave");
  const mastery = evaluateMastery(card, direction, route, perfect, breakHit);
  baseDamage += applyMasteryResult(mastery);

  state.lastActionAt = now;
  state.hasStarted = true;
  state.combo = quick ? state.combo + 1 : Math.max(1, Math.floor(state.combo * 0.45));
  state.maxCombo = Math.max(state.maxCombo, state.combo);
  state.comboCharge = Math.min(100, state.comboCharge + 16 + state.combo * 1.5);
  state.routeScores[route] += direction === "tap" ? 1 : 2;
  const anchorCue = direction === "tap" ? null : anchorCueForCardDirection(card.id, direction);
  if (anchorCue) {
    state.routeScores[anchorCue.route] += anchorCue.tier === "core" ? 2 : 1;
    if (isAnchorWindow(anchorCue)) state.comboCharge = Math.min(100, state.comboCharge + 8);
  }
  state.route = dominantRoute();
  state.enemyHp = Math.max(0, state.enemyHp - baseDamage);
  const defeated = state.enemyHp <= 0;
  animateEnemyDamage(route);
  if (route === "speed" || state.rewardMods.any > 0) {
    state.comboCharge = Math.min(100, state.comboCharge + state.rewardMods.speed * 3 + state.rewardMods.any);
  }
  if (route === "control" && direction === "up") {
    state.intentTime = Math.min(state.intentMax, state.intentTime + state.tuning.controlDelay * state.rewardMods.control);
  }
  if (route === "speed" && direction === "right") {
    state.intentTime = Math.min(state.intentMax, state.intentTime + 45 + state.rewardMods.speed * 6);
  }
  if (route === "burst" && direction === "down" && state.combo >= 3) {
    state.pressure = Math.max(0, state.pressure - Math.min(18, 8 + state.rewardMods.burst * 1.2));
  }

  if (mastery.result === "masterstroke") {
    const label = masteryLabel(mastery);
    log(`${actionName}: ${label}，连击读招成立。`);
    spawnMasteryFeedback(mastery.recipe.route, label);
  } else if (mastery.result === "flaw") {
    log(`${actionName}: 错读，被 Boss 看穿。`);
  } else if (perfect) {
    state.fightReads += 1;
    state.evidence.scout += state.bossMove?.key === "feint" ? 1 : 0;
    state.intentTime = state.intentMax;
    state.pressure = Math.max(0, state.pressure - state.tuning.counterRelief);
    state.combo += 2;
    state.routeScores.counter += 3;
    log(`${actionName}: 完美闪反，连击不断。`);
  } else {
    log(`${actionName}: ${routeLabel(route)} +${baseDamage}`);
  }

  if (mastery.result === "masterstroke" && mastery.recipe?.id === "guard-mirror") {
    state.fightReads += 1;
    state.evidence.scout += state.bossMove?.key === "feint" ? 1 : 0;
    state.intentTime = state.intentMax;
    state.pressure = Math.max(0, state.pressure - state.tuning.counterRelief * 0.85);
    state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 8);
  }

  if (breakHit && state.combo >= 3) {
    state.fightBreaks += 1;
    state.evidence.break += 1;
    state.pressure = Math.max(0, state.pressure - state.tuning.breakPressure * 0.42);
  }

  spawnComboFeedback(route);
  applyStanceCost(route, direction, perfect, { suppressBreak: defeated });
  burstMovement(route, direction);
  spawnSlash(route, direction);
  replaceCard(index);

  if (defeated) {
    scheduleVictory();
    return;
  }

  applyActionPressure(card, route, direction, perfect);
  render();
}

function damageFor(card, route, direction, perfect) {
  let value = 8;
  if (card.id === "heavy-cleave") value += 8;
  if (card.id === "execute") value += 12 + Math.min(18, state.combo);
  if (card.id === "breaker") value += 6;
  if (direction === "down") value += 7;
  if (direction === "right") value += Math.min(8, Math.floor(state.combo / 2));
  if (direction === "up") value += route === "control" ? 4 : 2;
  if (perfect) value += 12;
  if (state.route === route && state.combo > 5) value += 5;
  value += state.rewardMods[route] * 3 * state.tuning.rewardPower;
  value += state.rewardMods.any * state.tuning.rewardPower;
  if (direction === "tap") value += state.rewardMods.damage * 2 * state.tuning.rewardPower;
  if (direction === "down") value += state.rewardMods.burst * 2 * state.tuning.rewardPower;
  if (direction === "left") value += state.rewardMods.counter * 2 * state.tuning.rewardPower;
  const anchorCue = direction === "tap" ? null : anchorCueForCardDirection(card.id, direction);
  if (anchorCue) {
    value += anchorCue.tier === "core" ? 7 : anchorCue.tier === "bridge" ? 4 : 2;
    if (isAnchorWindow(anchorCue)) value += anchorCue.tier === "core" ? 5 : 3;
  }
  const encounter = currentRoom();
  if (encounter?.route === route) value += encounter.type === "boss" ? 5 : 3;
  if (state.rewardMods.any > 0 && state.route !== "neutral" && route !== state.route) value += state.rewardMods.any;
  const stanceFactor = state.stance >= 35 ? 1 : state.tuning.lowStanceDamage + (state.stance / 35) * (1 - state.tuning.lowStanceDamage);
  return Math.max(1, Math.round(value * state.tuning.playerDamage * stanceFactor));
}

function applyStanceCost(route, direction, perfect, { suppressBreak = false } = {}) {
  let cost = state.tuning.stanceCost;
  if (direction === "down") cost += state.tuning.burstStanceCost;
  if (state.lastDirection === direction) cost += state.tuning.repeatDirectionCost;
  if (state.lastDirection && state.lastDirection !== direction) cost -= state.tuning.varietyRefund;
  if (route === "counter" || perfect) cost -= state.tuning.counterStanceGain * (perfect ? 1 : 0.45);
  if (route === "control" && direction === "up") cost -= state.tuning.varietyRefund * 0.5;

  state.stance = clamp(state.stance - cost, 0, 100);
  state.lastDirection = direction;

  if (perfect) {
    state.stance = clamp(state.stance + state.tuning.counterStanceGain, 0, 100);
  }

  if (state.stance <= 0 && !suppressBreak) {
    state.pressure = clamp(state.pressure + state.tuning.breakPressure, 0, state.tuning.pressureLimit * 1.8);
    enemyAttack("破绽", 0.88);
    state.stance = 24;
  }
}

function scheduleVictory() {
  state.ended = true;
  state.intentName = "击破";
  state.pressure = 0;
  if (state.combo >= 8 || state.maxCombo >= 12) state.evidence.finisher += 1;
  toggleClass(els.enemy, "is-attacking", false);
  toggleClass(els.enemy, "is-charging", false);
  toggleClass(els.enemy, "is-damaged", false);
  setCombatArt({ boss: currentBossArt("death"), bossAction: "death", lock: 640 });
  restartClass(els.enemy, "is-death");
  render();
  clearPendingEnd();
  state.pendingEndTimer = window.setTimeout(() => {
    state.pendingEndTimer = null;
    endFight(true);
  }, 640);
}

function applyActionPressure(card, route, direction, perfect) {
  if (perfect) return;
  const encounter = currentRoom();
  let pressure = state.tuning.actionPressure;
  if (encounter?.type === "boss") pressure += state.tuning.bossPressure;
  if (encounter?.type === "elite") pressure += state.tuning.elitePressure;
  if (direction === "down") pressure += state.tuning.burstRisk;
  if (route === "control" && direction === "up") pressure -= state.tuning.controlRelief;
  if (route === "counter" || card.id === "guard" || card.id === "shadow-step") pressure -= state.tuning.counterRelief * 0.45;
  if (route === "speed" && direction === "right") pressure -= Math.min(18, state.rewardMods.speed * 1.35 + state.combo * 0.6);
  if (route === "burst" && direction === "down" && state.combo >= 3) pressure -= Math.min(16, state.rewardMods.burst * 1.2 + state.combo * 0.8);
  const chaseLineReady = route === "speed" && direction === "right" && state.route === "speed" && state.combo >= 4;
  if (state.bossMark === "backstep" && direction === "right" && state.bossMove?.key !== "backstep" && !chaseLineReady) pressure += 10;
  if (state.bossMark === "feint" && route === "counter" && !perfect) pressure += 9;
  if (state.bossMark === "ground-grab" && direction === "down" && state.fightBreaks <= 0) pressure += 12;
  if (state.bossMove?.pressure) pressure *= state.bossMove.pressure;

  state.pressure = clamp(state.pressure + pressure, 0, state.tuning.pressureLimit * 1.8);
  if (state.pressure >= state.tuning.pressureLimit) {
    state.pressure = Math.max(0, state.pressure - state.tuning.pressureLimit * 0.72);
    enemyAttack("抢招", state.tuning.riposteDamage);
    state.intentTime = Math.min(state.intentTime, state.intentMax * 0.72);
  }
}

function dominantRoute() {
  let best = "neutral";
  let score = 0;
  for (const [route, value] of Object.entries(state.routeScores)) {
    if (value > score) {
      best = route;
      score = value;
    }
  }
  return score < 2 ? "neutral" : best;
}

function burstMovement(route, direction) {
  const comboLift = Math.min(30, state.combo * 1.7);
  const playerX = direction === "right" ? 48 : direction === "left" ? -48 : route === "speed" ? 28 : 0;
  const playerY = direction === "up" ? -118 : direction === "down" ? -46 : -72 - comboLift;
  const enemyX = route === "burst" ? 20 : route === "control" ? -12 : 9;
  const enemyY = route === "control" ? -28 : route === "burst" ? 15 : 0;
  setCombatArt({ player: artAssets.playerLunge, lock: 260 });
  setTransform(els.player, `translate(${playerX}px, ${playerY}px)`);
  setTransform(els.enemy, `translate(${enemyX}px, ${enemyY}px)`);
  window.setTimeout(() => {
    setTransform(els.player, "");
    setTransform(els.enemy, "");
    renderCombatArt();
  }, 210);
}

function spawnSlash(route, direction) {
  const slash = document.createElement("span");
  slash.className = `slash is-${direction} ${isLowPowerMode() ? "is-lite" : ""}`;
  slash.style.color = routeInfo(route).color;
  const angle = { tap: 8, up: 0, right: 64, left: -64, down: 180 }[direction] ?? 8;
  const placement =
    {
      tap: ["50%", "42%"],
      up: ["50%", "37%"],
      right: ["56%", "43%"],
      left: ["44%", "43%"],
      down: ["50%", "52%"],
    }[direction] ?? ["50%", "42%"];
  slash.style.setProperty("--slash-left", placement[0]);
  slash.style.setProperty("--slash-top", placement[1]);
  slash.style.setProperty("--angle", `${angle}deg`);
  els.slashLayer.append(slash);
  window.setTimeout(() => slash.remove(), isLowPowerMode() ? 360 : 560);
}

function comboRank() {
  if (state.combo >= 32) return { label: "SSS", color: "#f2ead9" };
  if (state.combo >= 22) return { label: "SS", color: "#d79f2b" };
  if (state.combo >= 15) return { label: "S", color: "#a6d93a" };
  if (state.combo >= 10) return { label: "A", color: "#4bbda8" };
  if (state.combo >= 6) return { label: "B", color: "#9f72c8" };
  if (state.combo >= 3) return { label: "C", color: "#d79f2b" };
  return { label: "D", color: "#9c907f" };
}

function spawnComboFeedback(route) {
  if (isLowPowerMode() && state.combo > 1 && state.combo % 4 !== 0) return;
  const rank = comboRank();
  const pop = document.createElement("span");
  pop.className = "combo-pop";
  pop.style.setProperty("--combo-color", routeInfo(route).color);
  pop.innerHTML = `<strong>${state.combo} HIT</strong><span>${rank.label} STYLE</span>`;
  els.comboLayer.append(pop);
  window.setTimeout(() => pop.remove(), 540);
}

function spawnMasteryFeedback(route, label) {
  const pop = document.createElement("span");
  pop.className = "mastery-pop";
  pop.style.setProperty("--mastery-color", routeInfo(route).color);
  pop.textContent = label;
  els.comboLayer.append(pop);
  window.setTimeout(() => pop.remove(), 720);
}

function currentBossArt(action = "idle") {
  const encounter = currentRoom() ?? activeEncounters()[0] ?? encounters[0];
  const frameSet = bossFrameSets[encounter?.form ?? ""];
  if (frameSet) {
    if (action === "idle") return frameSet.idle;
    return frameSet[action] ?? frameSet.idle;
  }
  if (action && action !== "idle" && bossActionSprites[action]) return bossActionSprites[action];
  return bossForms[encounter?.form] ?? bossForms.blade;
}

function resolveBossFrame(frame, action = "idle") {
  const frameSet = bossFrameSets[currentRoom()?.form ?? ""];
  if (frameSet) {
    if (frame === "idle") return frameSet.idle;
    if (frame === "charge") return frameSet[action] ?? frameSet.fast;
    if (frame === "attack") return frameSet.attack;
    if (frame === "damaged" || frame === "death") return frameSet.death;
  }
  if (frame === "idle") return currentBossArt("idle");
  if (frame === "charge") return artAssets.bossCharge;
  if (frame === "attack") return artAssets.bossAttack;
  if (frame === "damaged" || frame === "death") return artAssets.bossDamaged;
  return currentBossArt(action);
}

function clearBossTimeline() {
  bossTimelineToken += 1;
  if (bossTimelineTimer !== null) {
    window.clearTimeout(bossTimelineTimer);
    bossTimelineTimer = null;
  }
}

function setBossArtFrame(src, frame, index = 0, count = 1) {
  if (src && els.bossArt.getAttribute("src") !== src) els.bossArt.src = src;
  els.enemy.dataset.frame = frame;
  els.enemy.dataset.frameIndex = String(index + 1);
  els.enemy.dataset.frameCount = String(count);
}

function playBossTimeline(action, force = false) {
  const timeline = bossActionTimelines[action] ?? null;
  const timelineKey = `${action}:${currentRoom()?.form ?? "none"}`;
  if (!timeline || action === "idle") {
    clearBossTimeline();
    els.enemy.dataset.timeline = "idle";
    setBossArtFrame(currentBossArt("idle"), "idle", 0, 1);
    return;
  }
  if (!force && els.enemy.dataset.timeline === timelineKey) return;
  clearBossTimeline();
  els.enemy.dataset.timeline = timelineKey;
  const token = bossTimelineToken;
  const step = (index) => {
    if (token !== bossTimelineToken) return;
    const [frame, duration] = timeline[Math.min(index, timeline.length - 1)];
    setBossArtFrame(resolveBossFrame(frame, action), frame, index, timeline.length);
    if (index >= timeline.length - 1) return;
    bossTimelineTimer = window.setTimeout(() => step(index + 1), duration);
  };
  step(0);
}

function setCombatArt({ player = null, boss = null, bossAction = "idle", lock = 0, bossCharging = false, force = false } = {}) {
  if (player && els.playerArt.getAttribute("src") !== player) els.playerArt.src = player;
  if (bossAction) els.enemy.dataset.action = bossAction;
  if (bossAction) playBossTimeline(bossAction, force || lock > 0);
  else if (boss) setBossArtFrame(boss, bossAction || "idle", 0, 1);
  if (force) state.artLockUntil = 0;
  if (lock > 0) {
    state.artLockUntil = Math.max(state.artLockUntil, performance.now() + lock);
    window.setTimeout(renderCombatArt, lock + 20);
  }
  if (boss) toggleClass(els.enemy, "is-charging", bossCharging);
}

function renderBossMoveState(danger = false) {
  const move = state.bossMove ?? bossMoves(currentRoom())[0];
  const key = move?.key ?? "fast";
  for (const item of bossMoveClassKeys) {
    toggleClass(els.enemy, `is-move-${item}`, item === key);
  }
  toggleClass(els.enemy, "is-read-danger", danger);
  els.enemy.dataset.read = move?.read ?? "";
}

function forceCombatArt() {
  setCombatArt({
    player: artAssets.playerIdle,
    boss: currentBossArt("idle"),
    bossAction: "idle",
    bossCharging: false,
    force: true,
  });
}

function makeImpactVfx(src, className) {
  const img = document.createElement("img");
  img.className = `impact-vfx ${className}`;
  img.src = src;
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  return img;
}

function renderCombatArt() {
  if (state.ended && els.enemy.classList.contains("is-death")) return;
  if (performance.now() < state.artLockUntil) return;
  const warningWindow = Math.max(360, state.tuning.perfectWindow * 1.35);
  const danger = state.runStarted && !state.ended && state.intentTime < warningWindow;
  const action = danger ? (state.bossMove?.key ?? "fast") : "idle";
  setCombatArt({
    player: artAssets.playerIdle,
    boss: currentBossArt(action),
    bossAction: action,
    bossCharging: danger,
  });
  renderBossMoveState(danger);
}

function tick(delta) {
  if (state.ended || state.notebookOpen || state.tunerOpen || state.versionOpen) return;
  const now = performance.now();
  const decayAfter = now - state.lastActionAt;

  if (!state.runStarted) return;

  if (state.hasStarted && decayAfter > state.tuning.comboDecayDelay && state.combo > 0) {
    const lanternSlowdown = 1 + state.rewardMods.any * 0.28;
    state.comboCharge = Math.max(0, state.comboCharge - (delta * state.tuning.comboDecayRate) / lanternSlowdown);
    if (state.comboCharge <= 0) {
      state.combo = Math.max(0, state.combo - 1);
      state.comboCharge = state.combo > 0 ? 44 : 0;
    }
  }

  tickDraw(delta);
  state.stance = clamp(state.stance + delta * state.tuning.stanceRegen, 0, 100);
  state.pressure = Math.max(0, state.pressure - delta * state.tuning.pressureDecay);
  state.intentTime -= delta;
  const encounter = currentRoom() ?? scaledEncounter(activeEncounters()[0] ?? encounters[0], state.actLevel);
  const enraged = state.enemyHp < state.enemyMaxHp * state.tuning.enrageThreshold;
  const baseSpeed = enemyIntentSpeed(encounter);
  state.intentMax = enraged ? Math.max(650, baseSpeed / state.tuning.enrageTempo) : baseSpeed;
  const moveName = state.bossMove?.label ?? "进攻";
  state.intentName = enraged ? `${moveName} · 急` : moveName;

  if (state.intentTime <= 0) {
    enemyAttack(state.bossMove?.label ?? "进攻", state.bossMove?.damageScale ?? 1);
    state.intentTime = state.intentMax;
    chooseBossMove(encounter);
  }

  render();
}

function tickDraw(delta) {
  if (handCount() >= handLimit()) {
    state.drawTimer = 0;
    return;
  }
  queueDrawIfNeeded();
  state.drawTimer -= delta;
  let changed = false;
  while (state.drawTimer <= 0 && handCount() < handLimit()) {
    drawCard();
    changed = true;
    if (handCount() < handLimit()) {
      state.drawTimer += currentDrawCooldown();
    }
  }
  if (handCount() >= handLimit()) {
    state.drawTimer = 0;
  }
  if (changed) renderHand();
}

function enemyAttack(kind = "进攻", damageScale = 1) {
  const encounter = currentRoom() ?? activeEncounters()[0] ?? encounters[0];
  const bossScale = encounter.type === "boss" ? 1.15 : 1;
  const damage = Math.max(1, Math.round((encounter.damage ?? 13) * state.tuning.enemyDamage * bossScale * damageScale));
  state.playerHp = Math.max(0, state.playerHp - damage);
  state.combo = Math.max(0, Math.floor(state.combo * 0.35));
  state.comboCharge = Math.min(state.comboCharge, 24);
  const line = kind === "抢招" ? "抢招命中" : kind === "破绽" ? "抓住破绽" : `${kind} 命中你`;
  log(`${encounter.name} ${line}，连击碎了。${state.bossMove?.hint ?? "危险临近时左划或用格挡。"}`);
  animateEnemyAttack(kind);
  els.game.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 220, easing: "ease-out" },
  );
  if (state.playerHp <= 0) {
    endFight(false);
  }
}

function animateEnemyAttack(kind) {
  if (isLowPowerMode()) {
    const strike = document.createElement("span");
    strike.className = `impact-strike ${kind === "抢招" ? "is-riposte" : ""}`;
    const burst = document.createElement("span");
    burst.className = "impact-burst";
    els.impactLayer.append(strike, burst);
    setCombatArt({ player: artAssets.playerHit, boss: currentBossArt("attack"), bossAction: "attack", lock: 420 });

    toggleClass(els.enemy, "is-charging", false);
    restartClass(els.enemy, "is-attacking");
    restartClass(els.player, "is-hit");
    restartClass(els.arena, "is-player-hit");
    restartClass(els.playerHealth, "is-damaged");

    window.setTimeout(() => {
      toggleClass(els.enemy, "is-attacking", false);
      toggleClass(els.player, "is-hit", false);
      toggleClass(els.arena, "is-player-hit", false);
      toggleClass(els.playerHealth, "is-damaged", false);
      strike.remove();
      burst.remove();
      renderCombatArt();
    }, 460);
    return;
  }
  const warning = makeImpactVfx(artAssets.vfxWarningHalo, "is-warning");
  const beam = makeImpactVfx(artAssets.vfxTargetBeam, "is-beam");
  const strike = makeImpactVfx(artAssets.vfxDownStrike, "is-strike");
  const burst = makeImpactVfx(artAssets.vfxHitBurst, "is-burst");
  els.impactLayer.append(warning, beam, strike, burst);
  setCombatArt({ player: artAssets.playerHit, boss: currentBossArt("attack"), bossAction: "attack", lock: 620 });

  toggleClass(els.enemy, "is-charging", false);
  restartClass(els.enemy, "is-attacking");
  restartClass(els.player, "is-hit");
  restartClass(els.arena, "is-player-hit");
  restartClass(els.playerHealth, "is-damaged");

  window.setTimeout(() => {
    toggleClass(els.enemy, "is-attacking", false);
    toggleClass(els.player, "is-hit", false);
    toggleClass(els.arena, "is-player-hit", false);
    toggleClass(els.playerHealth, "is-damaged", false);
    warning.remove();
    beam.remove();
    strike.remove();
    burst.remove();
    renderCombatArt();
  }, 680);
}

function animateEnemyDamage(route) {
  setStyleVar(els.enemy, "--hit-color", routeInfo(route).color);
  setStyleVar(els.enemyHealth, "--hit-color", routeInfo(route).color);
  setCombatArt({ boss: currentBossArt("damaged"), bossAction: "damaged", lock: 320 });
  restartClass(els.enemy, "is-damaged");
  restartClass(els.enemyHealth, "is-damaged");
  window.setTimeout(() => {
    toggleClass(els.enemy, "is-damaged", false);
    toggleClass(els.enemyHealth, "is-damaged", false);
    renderCombatArt();
  }, 260);
}

function render() {
  applyPerformanceClass();
  setText(els.comboCount, state.combo);
  setTransform(els.comboBar, scaleX(state.comboCharge / 100, 0.03));
  const rank = comboRank();
  setStyleVar(els.styleRank, "--rank-color", rank.color);
  setText(els.rankLabel, rank.label);
  setText(els.rankHits, `${state.combo} HIT`);
  setText(els.stanceValue, Math.round(state.stance));
  setTransform(els.stanceBar, scaleX(state.stance / 100, 0.03));
  const drawLimit = handLimit();
  if (handCount() >= drawLimit) {
    setTransform(els.drawBar, scaleX(1));
    setText(els.drawText, `满手 · 后续 ${drawPreviewText()}`);
  } else {
    const cooldown = currentDrawCooldown();
    const ratio = clamp(1 - state.drawTimer / cooldown, 0, 1);
    setTransform(els.drawBar, scaleX(ratio, 0.03));
    setText(els.drawText, `${Math.max(1, Math.ceil(state.drawTimer / 1000))}s · 后续 ${drawPreviewText()}`);
  }

  const route = routeInfo(state.route);
  setText(els.routeIcon, route.icon);
  setText(els.routeLabel, route.label);
  setText(els.routeHint, route.hint);
  setStyleVar(els.routePanel, "--route-color", route.color);
  setStyleVar(els.routePanel, "--route-shape", route.shape);
  setStyleVar(els.routePanel, "--route-stamp", `url(${route.stamp})`);
  setInlineStyle(els.routePanel, "borderColor", route.color);
  setInlineStyle(els.routePanel, "boxShadow", `inset 0 0 24px color-mix(in srgb, ${route.color} 24%, transparent)`);

  setTransform(els.enemyHp, scaleX(state.enemyHp / state.enemyMaxHp));
  setText(els.enemyHpText, Math.ceil(state.enemyHp));
  const encounter = currentRoom() ?? scaledEncounter(activeEncounters()[0] ?? encounters[0], state.actLevel);
  setText(els.enemyName, encounter.name);
  setTransform(els.playerHp, scaleX(state.playerHp / state.playerMaxHp));
  setText(els.playerHpText, Math.ceil(state.playerHp));
  setText(els.intentName, state.intentName);
  setStyleVar(els.intent, "--intent", `${Math.round(100 - (state.intentTime / state.intentMax) * 100)}%`);
  const pressureRatio = clamp(state.pressure / state.tuning.pressureLimit, 0, 1);
  setTransform(els.pressureBar, scaleX(pressureRatio));
  setText(els.pressureName, `抢招压力 ${Math.round(pressureRatio * 100)}`);
  setStyleVar(els.enemy, "--boss-mark-color", routeInfo(dominantMarkRoute()).color);
  renderCombatArt();
  const typeLabel =
    {
      training: "训练",
      boss: "首领",
      elite: "精英",
      fight: "战斗",
      scout: "侦察",
      forge: "锻造",
      market: "黑市",
    }[encounter.type] ?? "事件";
  const stageLabel = state.trainingLesson ? `训练课 ${typeLabel}` : state.dailyRun ? `每日刀路 ${typeLabel} ${state.encounterIndex + 1}/${activeEncounters().length}` : state.runStarted ? `${actLabel()} 上行刀路 ${typeLabel} ${state.encounterIndex + 1}/${activeEncounters().length}` : "选武器";
  setText(els.runStage, stageLabel);
  setText(els.equipmentName, state.equipment?.name ?? "未选武器");
  setText(els.rewardStack, state.anchor ? `锚 ${routeIcon(state.anchor.route)} · ${state.rewardNames.length} 证物` : state.rewardNames.length ? `${state.rewardNames.length} 证物 · ${bossMarkLabel()}` : state.dailySeed);
  renderBladeMap();
}

function renderBladeMap() {
  if (!els.bladeMap) return;
  if (state.trainingLesson) {
    const route = state.trainingLesson.route === "any" ? "neutral" : state.trainingLesson.route;
    const html = `
      <span class="map-node is-current is-training" style="${routeStyle(route)}" title="${state.trainingLesson.label}">
        <i>${routeIcon(route)}</i>
        <b>${state.trainingLesson.label}</b>
      </span>
    `;
    if (cachedValue(els.bladeMap, "html") === html) return;
    els.bladeMap.innerHTML = html;
    setCachedValue(els.bladeMap, "html", html);
    return;
  }
  const html = activeEncounters()
    .map((baseNode, index) => {
      const node = scaledEncounter(baseNode, state.actLevel, index);
      const pathChoice = currentPathChoice(index, state.actLevel);
      const route = pathChoice?.route && pathChoice.route !== "any" ? pathChoice.route : node.route === "any" ? "neutral" : node.route;
      const distance = index - state.encounterIndex;
      const stateClass = index < state.encounterIndex ? "is-done" : index === state.encounterIndex ? "is-current" : distance <= 2 ? "is-near" : "is-far";
      return `
        <span class="map-node ${stateClass} ${pathChoice?.risk === "danger" ? "is-danger-path" : ""}" style="${routeStyle(route)}" title="${pathChoice?.label ?? node.name}">
          <i>${pathChoice?.icon ?? node.nodeIcon ?? routeIcon(route)}</i>
          <b>${pathChoice?.label ?? node.name}</b>
        </span>
      `;
    })
    .join("");
  if (cachedValue(els.bladeMap, "html") === html) return;
  els.bladeMap.innerHTML = html;
  setCachedValue(els.bladeMap, "html", html);
}

function renderHand() {
  state.handAffinityKey = currentHandAffinityKey();
  els.hand.style.setProperty("--hand-slots", handLimit());
  const slots = Array.from({ length: handLimit() }, (_, index) => state.hand[index] ?? null);
  const nextChildren = slots.map((card, index) => {
      if (!card) {
        const emptyEl = document.createElement("div");
        emptyEl.className = "card card-empty";
        emptyEl.dataset.slotKey = `empty-${index}`;
        emptyEl.style.setProperty("--route-color", routeInfo("neutral").color);
        emptyEl.style.setProperty("--route-shape", routeInfo("neutral").shape);
        emptyEl.style.setProperty("--route-stamp", `url(${routeInfo("neutral").stamp})`);
        emptyEl.style.setProperty("--grade-card", `url(${gradeMeta.common.asset})`);
        emptyEl.style.setProperty("--grade-color", gradeMeta.common.color);
        emptyEl.innerHTML = `
          <span class="card-sigil">◇</span>
          <span class="card-route"><i>◇</i>补牌中</span>
          <strong class="card-name">蓄牌</strong>
          <span class="card-action">下一张正在进入手牌。</span>
          <span class="card-arrows" aria-hidden="true">
            <span>·</span><span>·</span><span>·</span><span>·</span>
          </span>
        `;
        return emptyEl;
      }
      const cardEl = document.createElement("button");
      const route = routeInfo(card.route);
      const gradeId = cardGradeId(card);
      const grade = cardGrade(card);
      const affinity = cardAffinity(card);
      const affinityId = affinity.best?.recipe?.id ?? `${affinity.best?.cue?.route ?? "none"}-${affinity.best?.cue?.name ?? "none"}`;
      const slotKey = `${index}-${card.id}-${state.equipment?.id ?? "none"}-${state.anchor?.route ?? "no-anchor"}-${affinityId}-${affinity.best?.active ? "hot" : "cold"}`;
      const bestRecipe = affinity.best?.recipe;
      const bestCue = affinity.best?.cue;
      const affinityText = affinity.best?.active
        ? `会心窗口 · ${bestRecipe?.name ?? bestCue?.name ?? routeLabel(affinity.best.route)}`
        : bestRecipe
          ? `${directionGlyph(affinity.best.direction)} ${bestRecipe.name}`
          : bestCue
            ? `${directionGlyph(affinity.best.direction)} ${bestCue.name}`
          : "";
      cardEl.type = "button";
      cardEl.className = `card grade-${gradeId} ${affinity.best?.recipe || affinity.best?.cue ? "has-affinity" : ""} ${affinity.best?.active ? "is-window-lit" : ""}`;
      cardEl.dataset.index = index;
      cardEl.dataset.slotKey = slotKey;
      cardEl.style.setProperty("--card-color", cardColor(card.route));
      cardEl.style.setProperty("--route-color", route.color);
      cardEl.style.setProperty("--route-shape", route.shape);
      cardEl.style.setProperty("--route-stamp", `url(${route.stamp})`);
      cardEl.style.setProperty("--grade-card", `url(${grade.asset})`);
      cardEl.style.setProperty("--grade-color", grade.color);
      cardEl.innerHTML = `
        <span class="card-sigil">${routeIcon(card.route)}</span>
        <span class="card-route"><i>${routeIcon(card.route)}</i>${routeLabel(card.route)}</span>
        <span class="card-grade" aria-label="${grade.label}阶">${"◆".repeat(grade.pips)}</span>
        <strong class="card-name">${card.name}</strong>
        <span class="card-action">${card.tap}</span>
        ${affinityText ? `<span class="card-affinity">${affinityText}</span>` : ""}
        <span class="card-arrows" aria-hidden="true">
          ${affinity.directions
            .map(
              (item) => `
                <span class="${directionClass(item.direction)} ${item.recipe ? "has-recipe" : ""} ${item.cue ? "has-cue" : ""} ${item.routeMatch ? "is-route-match" : ""} ${item.active ? "is-hot" : ""}" style="${routeStyle(item.routeMatch || item.active ? item.route : "neutral")}">
                  ${directionGlyph(item.direction)}
                </span>
              `,
            )
            .join("")}
        </span>
      `;
      attachGesture(cardEl, index);
      return cardEl;
    });
  nextChildren.forEach((child, index) => {
    const current = els.hand.children[index];
    if (!current) {
      els.hand.append(child);
      return;
    }
    if (current.dataset.slotKey !== child.dataset.slotKey) {
      current.replaceWith(child);
    }
  });
  while (els.hand.children.length > nextChildren.length) {
    els.hand.lastElementChild.remove();
  }
}

function currentHandAffinityKey() {
  const dangerBucket = state.intentTime < state.tuning.perfectWindow * 1.12 ? "hot" : "cold";
  return [
    state.hand.map((card) => card?.id ?? "empty").join(","),
    state.equipment?.id ?? "none",
    state.anchor?.route ?? "no-anchor",
    state.route,
    state.bossMove?.key ?? "none",
    dangerBucket,
    Object.keys(state.profile.recipes ?? {}).sort().join(","),
  ].join("|");
}

function refreshHandAffinity() {
  const key = currentHandAffinityKey();
  if (key === state.handAffinityKey) return;
  renderHand();
}

function cardColor(route) {
  const color = routeInfo(route).color;
  return `color-mix(in srgb, ${color} 28%, #1b1914)`;
}

function attachGesture(element, index) {
  let startX = 0;
  let startY = 0;

  element.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events used by automated checks do not always create capture ids.
    }
    element.classList.add("is-pressing");
  });

  element.addEventListener("pointerup", (event) => {
    element.classList.remove("is-pressing");
    if (state.ended || state.notebookOpen || state.versionOpen || !state.runStarted) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const distance = Math.hypot(dx, dy);
    let direction = "tap";
    if (distance < 24) {
      direction = "tap";
    } else if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx > 0 ? "right" : "left";
    } else {
      direction = dy > 0 ? "down" : "up";
    }
    animateCardDirection(element, direction);
    playCard(index, direction);
  });

  element.addEventListener("pointercancel", () => {
    element.classList.remove("is-pressing");
  });
}

function animateCardDirection(element, direction) {
  const cardRect = element.getBoundingClientRect();
  const gameRect = els.game.getBoundingClientRect();
  const vector = {
    tap: { x: 0, y: -92, rotate: -4, glyph: "✦" },
    up: { x: 0, y: -230, rotate: -3, glyph: "↟" },
    right: { x: 190, y: -38, rotate: 14, glyph: "➤" },
    left: { x: -190, y: -38, rotate: -14, glyph: "↺" },
    down: { x: 0, y: 178, rotate: 5, glyph: "◆" },
  }[direction] ?? { x: 0, y: -92, rotate: -4, glyph: "✦" };

  const ghost = element.cloneNode(true);
  ghost.classList.add("card-ghost");
  ghost.classList.remove("is-pressing");
  ghost.setAttribute("aria-hidden", "true");
  ghost.style.left = `${cardRect.left - gameRect.left}px`;
  ghost.style.top = `${cardRect.top - gameRect.top}px`;
  ghost.style.width = `${cardRect.width}px`;
  ghost.style.height = `${cardRect.height}px`;

  const burst = document.createElement("span");
  burst.className = "card-direction-burst";
  burst.textContent = vector.glyph;
  burst.style.left = `${cardRect.left - gameRect.left + cardRect.width / 2}px`;
  burst.style.top = `${cardRect.top - gameRect.top + cardRect.height / 2}px`;
  burst.style.color = getComputedStyle(element).getPropertyValue("--route-color") || routeMeta.neutral.color;

  if (isLowPowerMode()) {
    els.game.append(burst);
    burst.animate(
      [
        { opacity: 0, transform: "translate(-50%, -50%) scale(0.55)" },
        { opacity: 1, transform: `translate(calc(-50% + ${vector.x * 0.1}px), calc(-50% + ${vector.y * 0.1}px)) scale(1.08)`, offset: 0.38 },
        { opacity: 0, transform: `translate(calc(-50% + ${vector.x * 0.28}px), calc(-50% + ${vector.y * 0.28}px)) scale(0.82)` },
      ],
      { duration: 240, easing: "ease-out" },
    ).finished.finally(() => burst.remove());
    return;
  }

  els.game.append(ghost, burst);
  ghost.animate(
    [
      { opacity: 1, transform: "translate(0, 0) rotate(0deg) scale(1)" },
      { opacity: 0.82, transform: `translate(${vector.x * 0.42}px, ${vector.y * 0.42}px) rotate(${vector.rotate * 0.45}deg) scale(1.06)`, offset: 0.36 },
      { opacity: 0, transform: `translate(${vector.x}px, ${vector.y}px) rotate(${vector.rotate}deg) scale(0.82)` },
    ],
    { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  ).finished.finally(() => ghost.remove());

  burst.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.45)" },
      { opacity: 1, transform: `translate(calc(-50% + ${vector.x * 0.16}px), calc(-50% + ${vector.y * 0.16}px)) scale(1.24)`, offset: 0.32 },
      { opacity: 0, transform: `translate(calc(-50% + ${vector.x * 0.48}px), calc(-50% + ${vector.y * 0.48}px)) scale(0.9)` },
    ],
    { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  ).finished.finally(() => burst.remove());
}

function log(message) {
  els.combatLog.textContent = message;
}

function endFight(won) {
  state.ended = true;
  if (state.trainingLesson) {
    showTrainingOverlay(won);
    return;
  }
  if (won) {
    if (state.dailyRun && state.encounterIndex >= activeEncounters().length - 1) {
      showDailyClearOverlay();
    } else if (state.dailyRun) {
      showRewardOverlay();
    } else if (state.encounterIndex >= activeEncounters().length - 1) {
      if (state.actLevel < actMax) {
        showActClearOverlay();
      } else {
        showRunClearOverlay();
      }
    } else {
      showRewardOverlay();
    }
    return;
  }
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>连击断裂</h2>
      <p>${effectTextMarkup(`这轮倒在 ${state.maxCombo} 连。换一把武器，再冲一次。`)}</p>
      <button type="button" data-clear-run>新开一局</button>
    </div>
  `;
  overlay.querySelector("button").addEventListener("click", resetGame);
  els.game.append(overlay);
}

function showDailyClearOverlay() {
  const record = grantDailyProgress(true);
  const score = record?.score ?? dailyScore();
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>每日斩路完成</h2>
      <p>${effectTextMarkup(`${state.dailyRun?.label ?? "每日刀路"} ${state.dailyRun?.seed ?? state.dailySeed} 完成。得分 ${score}，最高 ${state.maxCombo} 连，读招 ${state.fightReads}，破势 ${state.fightBreaks}。每日只记录成绩和完成章，不发永久战斗数值。`)}</p>
      <button type="button" data-clear-run>回到武器</button>
    </div>
  `;
  overlay.querySelector("button").addEventListener("click", resetGame);
  els.game.append(overlay);
}

function showTrainingOverlay(won) {
  const lesson = state.trainingLesson;
  const badge = grantTrainingProgress(won);
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>${won ? "训练完成" : "训练断招"}</h2>
      <p>${effectTextMarkup(`${lesson?.label ?? "训练课"} ${won ? "已完成" : "失败"}。最高 ${state.maxCombo} 连，读招 ${state.fightReads}，破势 ${state.fightBreaks}${badge ? `，${badge}` : ""}。训练不发锻刃墨。`)}</p>
      <button type="button" data-training-again>再练一次</button>
      <button type="button" data-training-close>回到武器</button>
    </div>
  `;
  overlay.querySelector("[data-training-again]").addEventListener("click", () => {
    const id = lesson?.id;
    overlay.remove();
    if (id) startTrainingLesson(id);
  });
  overlay.querySelector("[data-training-close]").addEventListener("click", () => {
    state.trainingLesson = null;
    resetGame();
  });
  els.game.append(overlay);
}

function readMobileAcceptanceRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(mobileAcceptanceStorageKey) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => entry && typeof entry === "object").slice(0, 8);
  } catch {
    return [];
  }
}

function writeMobileAcceptanceRecord(record) {
  const records = [record, ...readMobileAcceptanceRecords()].slice(0, 8);
  localStorage.setItem(mobileAcceptanceStorageKey, JSON.stringify(records));
  return records;
}

function mobileAcceptanceSummary(record) {
  if (!record) return "还没有手机长测记录。";
  const perf = record.probe ?? {};
  return `${record.device || "未填设备"} · ${record.heat || "未填发热"} · ${record.feel || "未填手感"} · ${Math.round((perf.duration ?? 0) / 1000)} 秒 · ${perf.actions ?? 0} 招 · 长任务 ${perf.longTasks ?? 0} 次 · 残留 ${perf.slashNodes ?? 0}/${perf.impactNodes ?? 0}/${perf.comboNodes ?? 0}`;
}

function mobileAcceptanceExportText(record = readMobileAcceptanceRecords()[0]) {
  if (!record) return "";
  return JSON.stringify(
    {
      kind: "Blade Flow mobile acceptance",
      version: record.version,
      savedAt: record.savedAt,
      device: record.device,
      heat: record.heat,
      feel: record.feel,
      note: record.note,
      client: record.client ?? null,
      probe: {
        duration: record.probe?.duration ?? null,
        actions: record.probe?.actions ?? null,
        overlays: record.probe?.overlays ?? null,
        rewardsHandled: record.probe?.rewardsHandled ?? null,
        pathsHandled: record.probe?.pathsHandled ?? null,
        longTasks: record.probe?.longTasks ?? null,
        longTaskDuration: record.probe?.longTaskDuration ?? null,
        domNodes: record.probe?.domNodes ?? null,
        heapUsed: record.probe?.heapUsed ?? null,
        slashNodes: record.probe?.slashNodes ?? null,
        impactNodes: record.probe?.impactNodes ?? null,
        comboNodes: record.probe?.comboNodes ?? null,
        profile: record.probe?.profile ?? null,
        label: record.probe?.label ?? null,
      },
    },
    null,
    2,
  );
}

function isSuspiciousMobileAcceptanceDevice(device) {
  return /viewport|playwright|desktop|local|live mobile|模拟|emulat/i.test(device) || device === "iPhone / Android / 浏览器";
}

function mobileAcceptanceMinor(version) {
  const match = /^v0\.2\.(\d+)$/.exec(String(version ?? ""));
  return match ? Number(match[1]) : null;
}

function mobileAcceptanceClientInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
    pixelRatio: window.devicePixelRatio ?? 1,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    screen: {
      width: window.screen?.width ?? 0,
      height: window.screen?.height ?? 0,
    },
  };
}

function mobileAcceptanceClientIssue(client) {
  if (!client || typeof client !== "object") return "最近记录缺少自动设备信息，请用真实手机重新长测。";
  const userAgent = String(client.userAgent ?? "");
  const maxTouchPoints = Number(client.maxTouchPoints ?? 0);
  const viewportWidth = Number(client.viewport?.width ?? 0);
  const viewportHeight = Number(client.viewport?.height ?? 0);
  const mobileUa = /iphone|ipod|ipad|android.*mobile|mobile safari/i.test(userAgent);
  if (!userAgent || /playwright|headless|windows nt|x11/i.test(userAgent) || !mobileUa) return "最近记录不像真实手机浏览器，请用真实手机重新长测。";
  if (!Number.isFinite(maxTouchPoints) || maxTouchPoints < 1) return "最近记录没有触控信息，请用真实手机重新长测。";
  if (!Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight) || viewportWidth < 280 || viewportWidth > 720 || viewportHeight < 500) return "最近记录的手机视口无效，请竖屏重新长测。";
  return "";
}

function mobileAcceptanceRecordIssue(record) {
  if (!record) return "还没有手机长测记录。";
  if (!/^v0\.2\.\d+$/.test(String(record.version ?? ""))) return "最近记录版本无效，请重新长测。";
  if (mobileAcceptanceMinor(record.version) >= 54) {
    const clientIssue = mobileAcceptanceClientIssue(record.client);
    if (clientIssue) return clientIssue;
  }
  if (!record.savedAt || Number.isNaN(Date.parse(record.savedAt))) return "最近记录保存时间无效，请重新长测。";
  const device = String(record.device ?? "").trim();
  if (!device) return "最近记录没有设备信息，请重新填写真实手机并保存。";
  if (isSuspiciousMobileAcceptanceDevice(device)) return "最近记录看起来来自模拟设备，请用真实手机重新长测。";
  if (!["冷", "温", "热", "烫"].includes(record.heat)) return "最近记录缺少有效发热状态，请重新保存。";
  if (!["顺滑", "偶发卡顿", "明显卡顿", "不可接受"].includes(record.feel)) return "最近记录缺少有效手感状态，请重新保存。";
  const probe = record.probe;
  if (!probe || typeof probe !== "object") return "最近记录缺少长测探针，请重新跑 60 秒。";
  const duration = Number(probe.duration ?? 0);
  if (!Number.isFinite(duration) || duration < 59000) return `最近记录只有 ${Math.round(duration / 1000)} 秒，必须重新跑满 60 秒。`;
  const actions = Number(probe.actions ?? 0);
  if (!Number.isFinite(actions) || actions <= 0) return "最近记录没有实际出招，请重新长测。";
  const slashNodes = Number(probe.slashNodes ?? 0);
  const impactNodes = Number(probe.impactNodes ?? 0);
  const comboNodes = Number(probe.comboNodes ?? 0);
  if (![slashNodes, impactNodes, comboNodes].every(Number.isFinite)) return "最近记录的残留节点无效，请重新长测。";
  if (slashNodes + impactNodes + comboNodes > 12) return "最近记录特效残留过多，请重新长测。";
  return "";
}

function mobileAcceptanceDirectUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("mobileQa", "1");
  return url.toString();
}

async function shareMobileAcceptanceRecord(overlay, emptyMessage = "还没有可分享的长测记录。") {
  const status = overlay.querySelector("[data-mobile-status]");
  const textarea = overlay.querySelector("[data-mobile-export-text]");
  const latest = readMobileAcceptanceRecords()[0];
  const issue = mobileAcceptanceRecordIssue(latest);
  if (issue) {
    status.innerHTML = effectTextMarkup(issue === "还没有手机长测记录。" ? emptyMessage : issue);
    return false;
  }
  const exportText = mobileAcceptanceExportText(latest);
  if (!exportText) {
    status.innerHTML = effectTextMarkup(emptyMessage);
    return false;
  }
  textarea.value = exportText;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Blade Flow mobile acceptance",
        text: exportText,
      });
      status.innerHTML = effectTextMarkup("已打开系统分享面板。发送这条记录即可完成真机证据。");
      return true;
    } catch (error) {
      if (error?.name === "AbortError") {
        status.innerHTML = effectTextMarkup("分享已取消，记录还在本机。");
        return false;
      }
      status.innerHTML = effectTextMarkup(`系统分享失败：${error?.message ?? error}`);
    }
  } else {
    status.innerHTML = effectTextMarkup("当前浏览器不支持系统分享，已改用复制记录。");
  }
  try {
    await navigator.clipboard.writeText(exportText);
    status.innerHTML = effectTextMarkup("最新长测记录已复制，可以直接发到 Discord。");
  } catch {
    textarea.hidden = false;
    textarea.focus();
    textarea.select();
    status.innerHTML = effectTextMarkup("浏览器没有给复制权限。下面的记录可以手动全选发送。");
  }
  return false;
}

function mobileAcceptanceTemplate(status = "") {
  const latest = readMobileAcceptanceRecords()[0];
  const probe = lastMobileAcceptanceProbe;
  const probeText = probe
    ? `上次探针 ${Math.round(probe.duration / 1000)} 秒，${probe.actions} 招，长任务 ${probe.longTasks} 次，残留 ${probe.slashNodes}/${probe.impactNodes}/${probe.comboNodes}。`
    : "先跑一次 60 秒长测，再保存手机发热和手感。";
  return `
    <div class="overlay-panel mobile-qa-panel">
      <h2>真机长测</h2>
      <p>${effectTextMarkup("在手机浏览器里跑省电档 60 秒，保存发热和手感。这个记录用来补 Alpha 5 的真机证据。")}</p>
      <div class="mobile-qa-status" data-mobile-status>${effectTextMarkup(status || probeText)}</div>
      <label class="mobile-qa-field">
        <span>设备</span>
        <input data-mobile-device value="${escapeHtml(latest?.device ?? "")}" placeholder="iPhone / Android / 浏览器">
      </label>
      <label class="mobile-qa-field">
        <span>发热</span>
        <select data-mobile-heat>
          ${["冷", "温", "热", "烫"].map((value) => `<option value="${value}" ${latest?.heat === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </label>
      <label class="mobile-qa-field">
        <span>手感</span>
        <select data-mobile-feel>
          ${["顺滑", "偶发卡顿", "明显卡顿", "不可接受"].map((value) => `<option value="${value}" ${latest?.feel === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      </label>
      <label class="mobile-qa-field">
        <span>备注</span>
        <input data-mobile-note value="${escapeHtml(latest?.note ?? "")}" placeholder="可选，写掉帧、看不清或发热位置">
      </label>
      <div class="mobile-qa-latest">${effectTextMarkup(`最近记录：${mobileAcceptanceSummary(latest)}`)}</div>
      <div class="tuner-actions">
        <button type="button" data-mobile-run>跑 60 秒</button>
        <button class="tuner-secondary" type="button" data-mobile-save>保存并分享</button>
      </div>
      <button class="tuner-secondary mobile-qa-export" type="button" data-mobile-link>复制真机链接</button>
      <button class="tuner-secondary mobile-qa-export" type="button" data-mobile-share>分享最新记录</button>
      <button class="tuner-secondary mobile-qa-export" type="button" data-mobile-export>复制最新记录</button>
      <textarea class="mobile-qa-export-text" data-mobile-export-text readonly hidden></textarea>
      <button class="tuner-secondary mobile-qa-close" type="button" data-mobile-close>关闭</button>
    </div>
  `;
}

async function runMobileAcceptanceProbe(options = {}) {
  const duration = clamp(Number(options.duration ?? 60000), 5000, 300000);
  const interval = clamp(Number(options.interval ?? 120), 60, 500);
  const probe = await window.__bladeFlowDebug.runPerformanceProbe({ duration, interval, profile: 0 });
  lastMobileAcceptanceProbe = probe;
  return probe;
}

function bindMobileAcceptanceOverlay(overlay) {
  overlay.querySelector("[data-mobile-run]").addEventListener("click", async () => {
    const runButton = overlay.querySelector("[data-mobile-run]");
    const status = overlay.querySelector("[data-mobile-status]");
    runButton.disabled = true;
    status.innerHTML = effectTextMarkup("长测中。保持这个页面在前台，不要锁屏。");
    try {
      const probe = await runMobileAcceptanceProbe();
      const message = `完成 ${Math.round(probe.duration / 1000)} 秒，${probe.actions} 招，长任务 ${probe.longTasks} 次，残留 ${probe.slashNodes}/${probe.impactNodes}/${probe.comboNodes}。`;
      if (!overlay.isConnected) {
        showMobileAcceptanceOverlay(message);
        return;
      }
      status.innerHTML = effectTextMarkup(message);
    } catch (error) {
      if (!overlay.isConnected) {
        showMobileAcceptanceOverlay(`长测失败：${error?.message ?? error}`);
        return;
      }
      status.textContent = `长测失败：${error?.message ?? error}`;
    } finally {
      if (overlay.isConnected) runButton.disabled = false;
    }
  });
  overlay.querySelector("[data-mobile-save]").addEventListener("click", async () => {
    const probe = lastMobileAcceptanceProbe;
    const status = overlay.querySelector("[data-mobile-status]");
    if (!probe) {
      status.innerHTML = effectTextMarkup("先跑一次长测，再保存记录。");
      return;
    }
    const duration = Number(probe.duration ?? 0);
    if (duration < 59000) {
      status.innerHTML = effectTextMarkup(`这次长测只有 ${Math.round(duration / 1000)} 秒。必须跑满 60 秒才能保存最终记录。`);
      return;
    }
    const device = overlay.querySelector("[data-mobile-device]").value.trim();
    if (!device) {
      status.innerHTML = effectTextMarkup("先填写真实手机型号和浏览器，再保存记录。");
      return;
    }
    if (isSuspiciousMobileAcceptanceDevice(device)) {
      status.innerHTML = effectTextMarkup("设备看起来不是一台真实手机。请填写真实型号，比如 iPhone 15 Safari。");
      return;
    }
    const record = {
      version: "v0.2.63",
      savedAt: new Date().toISOString(),
      device,
      heat: overlay.querySelector("[data-mobile-heat]").value,
      feel: overlay.querySelector("[data-mobile-feel]").value,
      note: overlay.querySelector("[data-mobile-note]").value.trim(),
      client: mobileAcceptanceClientInfo(),
      probe,
    };
    const issue = mobileAcceptanceRecordIssue(record);
    if (issue) {
      status.innerHTML = effectTextMarkup(issue);
      return;
    }
    writeMobileAcceptanceRecord(record);
    overlay.querySelector(".mobile-qa-latest").innerHTML = effectTextMarkup(`最近记录：${mobileAcceptanceSummary(record)}`);
    status.innerHTML = effectTextMarkup(`已保存：${mobileAcceptanceSummary(record)} 正在打开分享。`);
    await shareMobileAcceptanceRecord(overlay, "刚保存失败，没有可分享的长测记录。");
  });
  overlay.querySelector("[data-mobile-export]").addEventListener("click", async () => {
    const status = overlay.querySelector("[data-mobile-status]");
    const latest = readMobileAcceptanceRecords()[0];
    const issue = mobileAcceptanceRecordIssue(latest);
    if (issue) {
      status.innerHTML = effectTextMarkup(issue === "还没有手机长测记录。" ? "还没有可复制的长测记录。" : issue);
      return;
    }
    const exportText = mobileAcceptanceExportText(latest);
    const textarea = overlay.querySelector("[data-mobile-export-text]");
    textarea.hidden = false;
    textarea.value = exportText;
    try {
      await navigator.clipboard.writeText(exportText);
      status.innerHTML = effectTextMarkup("最新长测记录已复制，可以直接发到 Discord。");
    } catch {
      textarea.focus();
      textarea.select();
      status.innerHTML = effectTextMarkup("浏览器没有给复制权限。下面的记录可以手动全选发送。");
    }
  });
  overlay.querySelector("[data-mobile-share]").addEventListener("click", async () => {
    await shareMobileAcceptanceRecord(overlay);
  });
  overlay.querySelector("[data-mobile-link]").addEventListener("click", async () => {
    const status = overlay.querySelector("[data-mobile-status]");
    const link = mobileAcceptanceDirectUrl();
    try {
      await navigator.clipboard.writeText(link);
      status.innerHTML = effectTextMarkup("真机链接已复制。把它发到手机，跑完 60 秒后保存并分享。");
    } catch {
      status.innerHTML = effectTextMarkup(`复制失败。手动打开：${link}`);
    }
  });
  overlay.querySelector("[data-mobile-close]").addEventListener("click", () => {
    overlay.remove();
  });
}

function showMobileAcceptanceOverlay(status = "") {
  const existingOverlay = document.querySelector(".overlay");
  const overlay = existingOverlay ?? document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = mobileAcceptanceTemplate(status);
  bindMobileAcceptanceOverlay(overlay);
  if (!existingOverlay) els.game.append(overlay);
}

function shouldOpenMobileAcceptanceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("mobileQa") === "1" || params.get("mobileQa") === "true";
}

function showEquipmentOverlay() {
  setAudioScene("menu");
  const dailyPlan = dailyPlanFor();
  const dailyRecord = state.profile.dailyRecords?.[dailyPlan.seed];
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>选择武器</h2>
      <p>你在下，Boss 在上。上划是冲上去，左右是横向闪避，下划是蓄势重斩。</p>
      <button class="choice" type="button" data-toggle-menu-bgm>
        <small class="choice-meta" style="${routeStyle("speed")}"><i>音</i>BGM</small>
        <b>游戏音乐</b>
        <span class="choice-effect">${effectTextMarkup(audioState.enabled ? "已开启。首次点击后播放，三幕会自动切曲。" : "已关闭。点击后重新开启。")}</span>
      </button>
      <button class="choice" type="button" data-open-tuner>
        <b>调配器</b>
        <span>先调难度和压力，再选武器开打。</span>
      </button>
      <button class="choice" type="button" data-open-save>
        <b>本地成长</b>
        <span class="choice-effect">${effectTextMarkup("查看 5 个存档槽、配方工坊和正式/调试成长档。")}</span>
      </button>
      <button class="choice" type="button" data-open-version>
        <small class="choice-meta" style="${routeStyle("control")}"><i>图</i>当前 v0.2.63</small>
        <b>版本记录</b>
        <span class="choice-effect">${effectTextMarkup("这版把运行时图片外置到 Cloudflare R2，仓库更轻。")}</span>
      </button>
      <button class="choice" type="button" data-copy-mobile-link>
        <small class="choice-meta" style="${routeStyle("control")}"><i>链</i>Alpha 5</small>
        <b>复制真机链接</b>
        <span class="choice-effect">${effectTextMarkup("把长测入口发到真实手机，跑满 60 秒后回传 JSON。")}</span>
      </button>
      <button class="choice" type="button" data-open-mobile-qa>
        <small class="choice-meta" style="${routeStyle("control")}"><i>测</i>Alpha 5</small>
        <b>真机长测</b>
        <span class="choice-effect">${effectTextMarkup("手机跑 60 秒省电档，保存发热、手感和探针结果。")}</span>
      </button>
      <button class="choice" type="button" data-start-daily>
        <small class="choice-meta" style="${routeStyle(dailyPlan.theme.route)}"><i>日</i>${dailyPlan.seed}</small>
        <b>${dailyPlan.theme.label}</b>
        <span class="choice-effect">${effectTextMarkup(`${dailyPlan.theme.text}${dailyRecord ? ` 今日最好 ${dailyRecord.score}。` : " 今日未通关。"}`)}</span>
      </button>
      <div class="choice-stack">
        ${equipmentPool
          .map(
            (item) => `
              <button class="choice" type="button" data-equipment="${item.id}">
                <small class="choice-meta" style="${routeStyle(item.route)}"><i>${item.sigil}</i>${item.mark}</small>
                <b>${item.name}</b>
                <span class="choice-effect">${choiceEffectMarkup(item, { showKind: false })}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  overlay.querySelector("[data-open-tuner]").addEventListener("click", () => {
    showTunerOverlay(true);
  });
  overlay.querySelector("[data-toggle-menu-bgm]").addEventListener("click", () => {
    toggleMenuBgm();
    const effect = overlay.querySelector("[data-toggle-menu-bgm] .choice-effect");
    effect.innerHTML = effectTextMarkup(audioState.enabled ? "已开启。首次点击后播放，三幕会自动切曲。" : "已关闭。点击后重新开启。");
  });
  overlay.querySelector("[data-open-save]").addEventListener("click", () => {
    showSaveOverlay();
  });
  overlay.querySelector("[data-open-version]").addEventListener("click", () => {
    showVersionOverlay(true);
  });
  overlay.querySelector("[data-open-mobile-qa]").addEventListener("click", () => {
    showMobileAcceptanceOverlay();
  });
  overlay.querySelector("[data-copy-mobile-link]").addEventListener("click", async () => {
    const button = overlay.querySelector("[data-copy-mobile-link]");
    const effect = button.querySelector(".choice-effect");
    const link = mobileAcceptanceDirectUrl();
    try {
      await navigator.clipboard.writeText(link);
      effect.innerHTML = effectTextMarkup("真机链接已复制。发到手机打开，跑满 60 秒。");
    } catch {
      effect.innerHTML = effectTextMarkup(`复制失败。手动打开：${link}`);
    }
  });
  overlay.querySelector("[data-start-daily]").addEventListener("click", () => {
    startDailyRun();
  });
  overlay.querySelectorAll("[data-equipment]").forEach((button) => {
    button.addEventListener("click", () => {
      const equipment = equipmentPool.find((item) => item.id === button.dataset.equipment);
      startRun(equipment);
    });
  });
  els.game.append(overlay);
}

function showRewardOverlay() {
  const encounter = currentRoom();
  const progressGain = grantFightProgress();
  const choices = state.pendingRewardIds ? state.pendingRewardIds.map((id) => rewardById.get(id)).filter(Boolean) : rewardChoices();
  state.pendingRewardIds = choices.map((choice) => choice.id);
  state.lastBreakdown = `${encounter.name}: 最高 ${state.maxCombo} 连，读招 ${state.fightReads}，破势 ${state.fightBreaks}，路线 ${routeIcon(state.route)} ${routeLabel(state.route)}。`;
  const progressLine = state.dailyRun ? "每日中途不发长期材料，通关后只记成绩。" : progressGain ? profileGainText(progressGain) : "长期材料已记录。";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>风格结算</h2>
      <p>${effectTextMarkup(`${state.lastBreakdown} ${progressLine}`)}</p>
      <div class="choice-stack">
        ${choices
          .map(
            (reward) => `
              <button class="choice ${choiceRarityClass(reward.rarity)} ${choiceKindClass(reward.kind)}" style="${choiceKindStyle(reward.kind)}" type="button" data-reward="${reward.id}">
                <small class="choice-slot">${reward.slotLabel ?? "奖励"}槽</small>
                ${choiceRouteMarkup(reward.route)}
                <span class="choice-title"><b>${reward.name}</b>${choiceKindMarkup(reward.kind)}${choiceRarityMarkup(reward.rarity)}</span>
                <span class="choice-effect">${choiceEffectMarkup(reward)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  overlay.querySelectorAll("[data-reward]").forEach((button) => {
    button.addEventListener("click", () => {
      const reward = choices.find((item) => item.id === button.dataset.reward);
      state.pendingRewardIds = null;
      applyReward(reward);
      advanceRoom();
    });
  });
  els.game.append(overlay);
}

function showPathChoiceOverlay() {
  document.querySelector(".overlay")?.remove();
  const base = activeEncounters()[state.encounterIndex];
  const choices = state.pendingPathChoiceIds ? state.pendingPathChoiceIds.map((id) => pathChoiceCatalog.find((choice) => choice.id === id)).filter(Boolean) : nextPathChoices();
  state.pendingPathChoiceIds = choices.map((choice) => choice.id);
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>选择刀路</h2>
      <p>${effectTextMarkup(`下一段：${base.name}。当前定锚 ${state.anchor?.label ?? "未立锚"}，Boss 烙印 ${bossMarkLabel()}。稳路更安全，险路会改变下一战和奖励池。`)}</p>
      <div class="choice-stack">
        ${choices
          .map((choice) => {
            const route = choice.route === "any" ? "neutral" : choice.route;
            const kind = pathChoiceKind(choice);
            return `
              <button class="choice path-choice ${kind.className}" style="${routeStyle(route)}" type="button" data-path-choice="${choice.id}">
                <small class="choice-slot path-kind"><i>${kind.short}</i><span>${kind.label}</span></small>
                <span class="choice-route"><i>${choice.icon}</i><em>${routeLabel(route)}</em></span>
                <span class="choice-title"><b>${choice.label}</b><small class="choice-risk">${kind.hint}</small></span>
                <span class="choice-effect">${effectTextMarkup(choice.text)}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
  overlay.querySelectorAll("[data-path-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = choices.find((item) => item.id === button.dataset.pathChoice);
      applyPathChoice(choice);
      overlay.remove();
      enterCurrentRoom();
    });
  });
  els.game.append(overlay);
}

function corruptSaveSlot(index, reason, rawSlot) {
  return {
    locked: true,
    rawSlot,
    reason: `槽 ${index + 1} 已锁定：${reason}`,
  };
}

function ensureKnownCardIds(ids, label) {
  if (!Array.isArray(ids)) throw new Error(`${label}不是数组`);
  ids.forEach((id) => {
    if (id === null) return;
    if (typeof id !== "string" || !cardById.has(id)) throw new Error(`${label}引用不存在的卡牌 ${id}`);
  });
}

function ensureKnownChoiceIds(ids, map, label) {
  if (ids == null) return;
  if (!Array.isArray(ids)) throw new Error(`${label}不是数组`);
  ids.forEach((id) => {
    if (typeof id !== "string" || !map.has(id)) throw new Error(`${label}引用不存在的条目 ${id}`);
  });
}

function ensureKnownRouteValue(value, label, { optional = true } = {}) {
  if (value == null && optional) return;
  if (typeof value !== "string" || !routeMeta[value]) throw new Error(`${label}引用不存在的路线 ${value}`);
}

function ensureKnownPathChoices(pathChoices) {
  if (pathChoices == null) return;
  if (typeof pathChoices !== "object" || Array.isArray(pathChoices)) throw new Error("已选刀路不是对象");
  const known = new Map(pathChoiceCatalog.map((choice) => [choice.id, choice]));
  for (const [key, choice] of Object.entries(pathChoices)) {
    if (!/^A\d+:\d+$/.test(key)) throw new Error(`已选刀路键异常 ${key}`);
    if (!choice || typeof choice !== "object" || Array.isArray(choice)) throw new Error(`已选刀路 ${key} 不是对象`);
    if (typeof choice.id !== "string" || !known.has(choice.id)) throw new Error(`已选刀路引用不存在的条目 ${choice.id}`);
  }
}

function validateSaveSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") throw new Error("存档内容不是对象");
  if (typeof snapshot.dailySeed !== "string" || !snapshot.dailySeed) throw new Error("缺少种子");
  if (snapshot.dailyRun && !dailyThemes.some((theme) => theme.id === snapshot.dailyRun.themeId)) throw new Error(`引用不存在的每日主题 ${snapshot.dailyRun.themeId}`);
  const maxRooms = snapshot.dailyRun ? dailyPlanFor(snapshot.dailySeed, snapshot.dailyRun.themeId).encounters.length : encounters.length;
  if (!Number.isInteger(Number(snapshot.encounterIndex)) || Number(snapshot.encounterIndex) < 0 || Number(snapshot.encounterIndex) >= maxRooms) throw new Error("节点编号越界");
  if (!Number.isInteger(Number(snapshot.actLevel)) || Number(snapshot.actLevel) < 1 || Number(snapshot.actLevel) > actMax) throw new Error("幕数越界");
  if (snapshot.equipmentId !== null && snapshot.equipmentId !== undefined && !equipmentById.has(snapshot.equipmentId)) throw new Error(`引用不存在的武器 ${snapshot.equipmentId}`);
  ensureKnownCardIds(snapshot.hand ?? [], "手牌");
  ensureKnownCardIds(snapshot.drawPile ?? [], "牌库");
  ensureKnownChoiceIds(snapshot.pendingRewardIds, rewardById, "待选奖励");
  ensureKnownChoiceIds(snapshot.pendingPathChoiceIds, new Map(pathChoiceCatalog.map((choice) => [choice.id, choice])), "待选路线");
  ensureKnownPathChoices(snapshot.pathChoices);
  ensureKnownRouteValue(snapshot.route, "当前路线");
  ensureKnownRouteValue(snapshot.rewardBias, "奖励倾向");
  if (snapshot.anchor) {
    if (typeof snapshot.anchor !== "object" || Array.isArray(snapshot.anchor)) throw new Error("刃心定锚不是对象");
    ensureKnownRouteValue(snapshot.anchor.route, "刃心定锚路线", { optional: false });
  }
  return true;
}

function validateSaveSlot(slot, index) {
  if (slot === null) return null;
  if (!slot || typeof slot !== "object") return corruptSaveSlot(index, "槽位结构不是对象", slot);
  if (!slot.version || !slot.snapshot) return corruptSaveSlot(index, "缺少版本或快照", slot);
  try {
    validateSaveSnapshot(slot.snapshot);
    return slot;
  } catch (error) {
    return corruptSaveSlot(index, error.message, slot);
  }
}

function readSaveSlots() {
  const raw = localStorage.getItem(saveStorageKey);
  if (!raw) return Array.from({ length: saveSlotCount }, () => null);
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length !== saveSlotCount) throw new Error("存档结构损坏");
  return parsed.map((slot, index) => validateSaveSlot(slot, index));
}

function writeSaveSlots(slots) {
  if (!Array.isArray(slots) || slots.length !== saveSlotCount) throw new Error("存档写入结构错误");
  const serializable = slots.map((slot) => (slot?.locked ? slot.rawSlot ?? null : slot));
  localStorage.setItem(saveStorageKey, JSON.stringify(serializable));
}

function currentSavePhase() {
  const overlay = document.querySelector(".overlay");
  if (overlay?.querySelector("[data-reward]")) return "reward";
  if (overlay?.querySelector("[data-path-choice]")) return "path";
  if (overlay?.querySelector("[data-node-choice]")) return "node";
  if (overlay?.querySelector("[data-start-boss]")) return "boss-preview";
  if (overlay?.querySelector("[data-equipment]")) return "gear";
  if (overlay?.querySelector("[data-clear-run]")) return "clear";
  return state.runStarted && !state.ended ? "combat" : "idle";
}

function createSaveSnapshot() {
  const phase = state.saveReturnPhase ?? currentSavePhase();
  return {
    savedAt: new Date().toISOString(),
    phase,
    dailySeed: state.dailySeed,
    dailyRun: state.dailyRun,
    runStarted: state.runStarted,
    encounterIndex: state.encounterIndex,
    actLevel: state.actLevel,
    equipmentId: state.equipment?.id ?? null,
    hand: state.hand.map((card) => card?.id ?? null),
    drawPile: state.drawPile.map((card) => card.id),
    combo: state.combo,
    comboCharge: state.comboCharge,
    maxCombo: state.maxCombo,
    route: state.route,
    routeScores: state.routeScores,
    fightReads: state.fightReads,
    fightBreaks: state.fightBreaks,
    enemyHp: state.enemyHp,
    enemyMaxHp: state.enemyMaxHp,
    playerHp: state.playerHp,
    playerMaxHp: state.playerMaxHp,
    intentTime: state.intentTime,
    intentMax: state.intentMax,
    intentName: state.intentName,
    hasStarted: state.hasStarted,
    ended: state.ended,
    rewardMods: state.rewardMods,
    rewardNames: state.rewardNames,
    routeMarks: state.routeMarks,
    evidence: state.evidence,
    bossMark: state.bossMark,
    bossMoveKey: state.bossMove?.key ?? null,
    bossPreviewed: state.bossPreviewed,
    oaths: state.oaths,
    oathPressure: state.oathPressure,
    rewardBias: state.rewardBias,
    lastBreakdown: state.lastBreakdown,
    pressure: state.pressure,
    stance: state.stance,
    lastDirection: state.lastDirection,
    drawTimer: state.drawTimer,
    tuning: state.tuning,
    currentPreset: state.currentPreset,
    pendingRewardIds: state.pendingRewardIds,
    pendingPathChoiceIds: state.pendingPathChoiceIds,
    pathChoices: state.pathChoices,
    anchor: state.anchor,
    runId: state.runId,
    fightProofs: state.fightProofs,
    profileMode: state.profileMode,
  };
}

function restoreObject(target, source) {
  return { ...target, ...(source ?? {}) };
}

function cardList(ids = []) {
  ensureKnownCardIds(ids, "存档卡牌");
  return ids.map((id) => (id ? cardById.get(id) : null));
}

function restoreSaveSnapshot(snapshot) {
  validateSaveSnapshot(snapshot);
  clearPendingEnd();
  document.querySelector(".overlay")?.remove();
  state.dailySeed = snapshot.dailySeed;
  state.dailyRun = snapshot.dailyRun?.themeId ? { seed: snapshot.dailyRun.seed ?? snapshot.dailySeed, themeId: snapshot.dailyRun.themeId, label: snapshot.dailyRun.label ?? dailyPlanFor(snapshot.dailySeed, snapshot.dailyRun.themeId).theme.label } : null;
  state.rng = seededRandom(state.dailyRun ? `${state.dailyRun.seed}-${state.dailyRun.themeId}` : snapshot.dailySeed);
  state.runStarted = Boolean(snapshot.runStarted);
  state.encounterIndex = clamp(Number(snapshot.encounterIndex ?? 0), 0, activeEncounters().length - 1);
  state.actLevel = clamp(Number(snapshot.actLevel ?? 1), 1, actMax);
  state.equipment = snapshot.equipmentId ? equipmentById.get(snapshot.equipmentId) : null;
  state.hand = cardList(snapshot.hand);
  state.drawPile = cardList(snapshot.drawPile);
  state.combo = Number(snapshot.combo ?? 0);
  state.comboCharge = Number(snapshot.comboCharge ?? 0);
  state.maxCombo = Number(snapshot.maxCombo ?? 0);
  state.route = snapshot.route ?? "neutral";
  state.routeScores = restoreObject({ speed: 0, control: 0, counter: 0, burst: 0, damage: 0 }, snapshot.routeScores);
  state.fightReads = Number(snapshot.fightReads ?? 0);
  state.fightBreaks = Number(snapshot.fightBreaks ?? 0);
  state.enemyMaxHp = Math.max(1, Number(snapshot.enemyMaxHp ?? 1));
  state.enemyHp = clamp(Number(snapshot.enemyHp ?? state.enemyMaxHp), 0, state.enemyMaxHp);
  state.playerMaxHp = Math.max(1, Number(snapshot.playerMaxHp ?? state.tuning.playerFocus));
  state.playerHp = clamp(Number(snapshot.playerHp ?? state.playerMaxHp), 0, state.playerMaxHp);
  state.intentTime = Number(snapshot.intentTime ?? 1000);
  state.intentMax = Math.max(1, Number(snapshot.intentMax ?? 1000));
  state.intentName = snapshot.intentName ?? "观察中";
  state.hasStarted = Boolean(snapshot.hasStarted);
  state.ended = Boolean(snapshot.ended);
  state.rewardMods = restoreObject({ speed: 0, control: 0, counter: 0, burst: 0, damage: 0, any: 0 }, snapshot.rewardMods);
  state.rewardNames = Array.isArray(snapshot.rewardNames) ? snapshot.rewardNames : [];
  state.routeMarks = restoreObject({ speed: 0, counter: 0, burst: 0, control: 0, damage: 0 }, snapshot.routeMarks);
  state.evidence = restoreObject({ scout: 0, break: 0, finisher: 0 }, snapshot.evidence);
  state.bossMark = snapshot.bossMark ?? null;
  state.bossPreviewed = Boolean(snapshot.bossPreviewed);
  state.oaths = Array.isArray(snapshot.oaths) ? snapshot.oaths : [];
  state.oathPressure = Number(snapshot.oathPressure ?? 0);
  state.rewardBias = snapshot.rewardBias ?? null;
  state.lastBreakdown = snapshot.lastBreakdown ?? "还没有结算。";
  state.pressure = Number(snapshot.pressure ?? 0);
  state.stance = Number(snapshot.stance ?? 100);
  state.lastDirection = snapshot.lastDirection ?? null;
  state.drawTimer = Number(snapshot.drawTimer ?? 0);
  state.tuning = normalizeTuning(snapshot.tuning ?? state.tuning);
  state.currentPreset = snapshot.currentPreset ?? "custom";
  state.pendingRewardIds = Array.isArray(snapshot.pendingRewardIds) ? snapshot.pendingRewardIds : null;
  state.pendingPathChoiceIds = Array.isArray(snapshot.pendingPathChoiceIds) ? snapshot.pendingPathChoiceIds : null;
  state.pathChoices = restoreObject({}, snapshot.pathChoices);
  state.anchor = snapshot.anchor ?? null;
  state.runId = snapshot.runId ?? newRunId();
  state.fightProofs = restoreObject({ backstepIntercept: false, trueRead: false, shatterExecute: false }, snapshot.fightProofs);
  if (snapshot.profileMode && profileStorageKeys[snapshot.profileMode]) switchProfileMode(snapshot.profileMode);
  state.notebookOpen = false;
  state.tunerOpen = false;
  state.versionOpen = false;
  state.saveOpen = false;
  state.saveError = "";
  state.lastActionAt = performance.now();
  const move = bossMoves(currentRoom()).find((item) => item.key === snapshot.bossMoveKey);
  state.bossMove = move ?? bossMoves(currentRoom())[0];
  saveTuning();
  resetCombatVisualState();
  forceCombatArt();
  renderHand();
  render();
  const phase = snapshot.phase;
  if (phase === "reward") {
    state.ended = true;
    showRewardOverlay();
  } else if (phase === "path") {
    state.ended = true;
    showPathChoiceOverlay();
  } else if (phase === "node") {
    state.ended = true;
    showNodeOverlay(currentRoom());
  } else if (phase === "boss-preview") {
    state.ended = true;
    showBossPreviewOverlay(currentRoom());
  } else if (phase === "gear" || !state.runStarted) {
    showEquipmentOverlay();
  } else {
    state.ended = false;
    wakeLoop(true);
  }
  log("已读取本地存档。");
}

function saveSlotSummary(slot) {
  if (!slot) return "空槽。";
  if (slot.locked) return slot.reason;
  const snapshot = slot.snapshot;
  const rooms = snapshot.dailyRun ? dailyPlanFor(snapshot.dailySeed, snapshot.dailyRun.themeId).encounters : encounters;
  const room = scaledEncounter(rooms[snapshot.encounterIndex] ?? rooms[0] ?? encounters[0], snapshot.actLevel ?? 1);
  const equipment = snapshot.equipmentId ? equipmentById.get(snapshot.equipmentId)?.name ?? "未知武器" : "未选武器";
  const savedAt = new Date(snapshot.savedAt).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const mode = snapshot.dailyRun ? "每日" : actLabel(snapshot.actLevel ?? 1);
  return `${savedAt} · ${mode} · ${equipment} · ${room.name} · ${snapshot.rewardNames?.length ?? 0} 奖励`;
}

function showSaveOverlay() {
  if (state.saveOpen) return;
  state.saveReturnPhase = currentSavePhase();
  document.querySelector(".overlay")?.remove();
  state.saveOpen = true;
  let slots = [];
  try {
    slots = readSaveSlots();
    state.saveError = "";
  } catch (error) {
    state.saveError = error.message;
  }
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = saveTemplate(slots);
  bindSaveOverlay(overlay);
  els.game.append(overlay);
}

function saveTemplate(slots) {
  const rows = state.saveError
    ? `<p class="save-error">本地存档读取失败：${escapeHtml(state.saveError)}</p>`
    : slots
        .map(
          (slot, index) => {
            const locked = Boolean(slot?.locked);
            const hasSave = Boolean(slot && !locked);
            return `
            <section class="save-slot ${locked ? "is-corrupt" : hasSave ? "has-save" : "is-empty"}">
              <h3>槽 ${index + 1}<span>${locked ? "已锁定" : hasSave ? "已有进度" : "空"}</span></h3>
              <p>${effectTextMarkup(saveSlotSummary(slot))}</p>
              <div class="save-actions">
                <button type="button" data-save-slot="${index}" ${locked ? "disabled" : ""}>保存当前</button>
                <button type="button" data-load-slot="${index}" ${hasSave ? "" : "disabled"}>读取</button>
                <button class="danger-button" type="button" data-delete-slot="${index}" ${slot ? "" : "disabled"}>${locked ? "删除坏槽" : "删除"}</button>
              </div>
            </section>
          `;
          },
        )
        .join("");
  return `
    <div class="overlay-panel save-panel">
      <h2>本地存档</h2>
      <p>浏览器本机保存。换设备或清浏览器数据会丢。</p>
      ${profileTemplate()}
      <div class="save-grid">${rows}</div>
      <button type="button" data-save-close>关闭</button>
    </div>
  `;
}

function profileTemplate() {
  const profile = state.profile;
  const locked = profileLocked();
  const lockMessage = locked
    ? `<p class="save-error">${escapeHtml(state.profileErrors[state.profileMode])}。当前 profile 已锁定，不会写入材料；可切到另一个 profile，或手动清成长重建。</p>`
    : "";
  const evidence = Object.entries(profileEvidenceMeta)
    .map(([key, meta]) => `<em class="profile-token" style="--token-color:${meta.color}"><b>${meta.short}</b>${profile.evidence[key] ?? 0}</em>`)
    .join("");
  const recipes = recipeCatalog
    .map((recipe) => {
      const owned = hasRecipe(recipe.id);
      const disabled = locked || owned || !canUnlockRecipe(recipe);
      const costText = `墨 ${recipe.cost.bladeInk} · ${profileEvidenceMeta[recipe.evidence].short} ${recipe.cost[recipe.evidence]}`;
      return `
        <button class="profile-recipe ${owned ? "is-owned" : ""}" type="button" data-unlock-recipe="${recipe.id}" ${disabled ? "disabled" : ""} style="${routeStyle(recipe.route)}">
          <i>${routeIcon(recipe.route)}</i>
          <span><b>${recipe.name}</b><small>${owned ? "已掌握" : costText}</small></span>
        </button>
      `;
    })
    .join("");
  const schools = schoolCatalog
    .map((school) => {
      const owned = state.profile.weaponSchools?.[school.equipmentId] ?? {};
      const nodes = school.nodes
        .map((node) => `<em class="${owned[node.id] ? "is-owned" : ""}">${node.label}<small>${owned[node.id] ? node.text : "未开"}</small></em>`)
        .join("");
      return `<section class="profile-school" style="${routeStyle(school.route)}"><b>${school.name}</b><div>${nodes}</div></section>`;
    })
    .join("");
  const atlas = atlasCatalog
    .map((node) => {
      const route = node.route === "any" ? "neutral" : node.route;
      const owned = Boolean(state.profile.routeAtlas?.[node.id]);
      return `<em class="${owned ? "is-owned" : ""}" style="${routeStyle(route)}"><i>${routeIcon(route)}</i><span>${node.label}<small>${owned ? node.text : "未开"}</small></span></em>`;
    })
    .join("");
  const trainings = trainingCatalog
    .map((training) => {
      const owned = Boolean(state.profile.training?.[training.id]);
      const tag = owned ? "button" : "em";
      const action = owned ? ` type="button" data-start-training="${training.id}"` : "";
      return `<${tag} class="${owned ? "is-owned" : ""}" style="${routeStyle(training.route)}"${action}><i>${routeIcon(training.route)}</i><span>${training.label}</span></${tag}>`;
    })
    .join("");
  const dailyPlan = dailyPlanFor();
  const dailyRecord = profile.dailyRecords?.[dailyPlan.seed];
  const daily = `
    <button type="button" data-start-daily-profile style="${routeStyle(dailyPlan.theme.route)}">
      <i>日</i>
      <span><b>${dailyPlan.theme.label}</b><small>${dailyPlan.seed} · ${dailyRecord ? `最好 ${dailyRecord.score}` : "未通关"}</small></span>
    </button>
  `;
  const debugTools =
    state.profileMode === "debug"
      ? `
        <div class="profile-debug">
          <button type="button" data-debug-unlock-all>全解锁</button>
          ${Object.entries(profileEvidenceMeta)
            .map(([key, meta]) => `<button type="button" data-debug-evidence="${key}" style="--token-color:${meta.color}">${meta.short} +1</button>`)
            .join("")}
          <button type="button" data-debug-copy-run>当前局复测</button>
        </div>
      `
      : "";
  return `
    <section class="profile-panel">
      <div class="profile-head">
        <b>${state.profileMode === "debug" ? "调试成长" : "正式成长"}</b>
        <span>锻刃墨 ${profile.bladeInk}</span>
      </div>
      <div class="profile-tokens">${evidence}</div>
      <div class="profile-mode">
        <button type="button" data-profile-mode="real" class="${state.profileMode === "real" ? "is-active" : ""}">正式</button>
        <button type="button" data-profile-mode="debug" class="${state.profileMode === "debug" ? "is-active" : ""}">调试</button>
        <button class="danger-button" type="button" data-profile-reset>${locked ? "删除坏成长" : "清成长"}</button>
      </div>
      ${lockMessage}
      <div class="profile-recipes">${recipes}</div>
      <div class="profile-schools">${schools}</div>
      <div class="profile-atlas"><b>上行图谱</b><div>${atlas}</div></div>
      <div class="profile-training"><b>训练课</b><div>${trainings}</div></div>
      <div class="profile-daily"><b>每日刀路</b><div>${daily}</div></div>
      ${debugTools}
    </section>
  `;
}

function refreshSaveOverlay(overlay) {
  try {
    const slots = readSaveSlots();
    state.saveError = "";
    overlay.innerHTML = saveTemplate(slots);
  } catch (error) {
    state.saveError = error.message;
    overlay.innerHTML = saveTemplate([]);
  }
  bindSaveOverlay(overlay);
}

function bindSaveOverlay(overlay) {
  overlay.querySelectorAll("[data-profile-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      switchProfileMode(button.dataset.profileMode);
      refreshSaveOverlay(overlay);
    });
  });
  overlay.querySelector("[data-profile-reset]")?.addEventListener("click", () => {
    resetProfileMode(state.profileMode);
    refreshSaveOverlay(overlay);
  });
  overlay.querySelectorAll("[data-unlock-recipe]").forEach((button) => {
    button.addEventListener("click", () => {
      unlockRecipe(button.dataset.unlockRecipe);
      refreshSaveOverlay(overlay);
    });
  });
  overlay.querySelector("[data-debug-unlock-all]")?.addEventListener("click", () => {
    debugUnlockAllProfile();
    refreshSaveOverlay(overlay);
  });
  overlay.querySelectorAll("[data-debug-evidence]").forEach((button) => {
    button.addEventListener("click", () => {
      debugAddEvidence(button.dataset.debugEvidence);
      refreshSaveOverlay(overlay);
    });
  });
  overlay.querySelector("[data-debug-copy-run]")?.addEventListener("click", () => {
    debugSaveCurrentRunForReplay();
    refreshSaveOverlay(overlay);
  });
  overlay.querySelectorAll("[data-start-training]").forEach((button) => {
    button.addEventListener("click", () => {
      overlay.remove();
      state.saveOpen = false;
      state.saveReturnPhase = null;
      startTrainingLesson(button.dataset.startTraining);
    });
  });
  overlay.querySelector("[data-start-daily-profile]")?.addEventListener("click", () => {
    overlay.remove();
    state.saveOpen = false;
    state.saveReturnPhase = null;
    startDailyRun();
  });
  overlay.querySelectorAll("[data-save-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slots = readSaveSlots();
      slots[Number(button.dataset.saveSlot)] = {
        version: 1,
        snapshot: createSaveSnapshot(),
      };
      writeSaveSlots(slots);
      refreshSaveOverlay(overlay);
    });
  });
  overlay.querySelectorAll("[data-load-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slot = readSaveSlots()[Number(button.dataset.loadSlot)];
      if (!slot) return;
      state.saveOpen = false;
      state.saveReturnPhase = null;
      overlay.remove();
      restoreSaveSnapshot(slot.snapshot);
    });
  });
  overlay.querySelectorAll("[data-delete-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slots = readSaveSlots();
      slots[Number(button.dataset.deleteSlot)] = null;
      writeSaveSlots(slots);
      refreshSaveOverlay(overlay);
    });
  });
  overlay.querySelector("[data-save-close]")?.addEventListener("click", () => {
    const phase = state.saveReturnPhase;
    state.saveOpen = false;
    state.saveReturnPhase = null;
    overlay.remove();
    if (phase === "reward") {
      state.ended = true;
      showRewardOverlay();
    } else if (phase === "path") {
      state.ended = true;
      showPathChoiceOverlay();
    } else if (phase === "node") {
      state.ended = true;
      showNodeOverlay(currentRoom());
    } else if (phase === "boss-preview") {
      state.ended = true;
      showBossPreviewOverlay(currentRoom());
    } else if (phase === "gear" || !state.runStarted) {
      showEquipmentOverlay();
    } else {
      wakeLoop(true);
    }
  });
}

function rewardChoices() {
  const room = currentRoom();
  const activeAnchor = state.anchor?.route ?? null;
  const routeBias = activeAnchor ?? state.rewardBias ?? state.route;
  const bossBonus = room?.type === "boss" || room?.type === "elite";
  const rewardPool = [
    ...rewards,
    ...(state.dailyRun ? dailyContractChoices(state.dailyRun.themeId) : []),
    ...recipeRewards.filter((reward) => {
      const recipe = recipeById.get(reward.recipeId);
      return recipe && hasRecipe(recipe.id);
    }),
  ];
  const buildRoute = routeBias && routeBias !== "neutral" ? routeBias : state.equipment?.route;
  const correctionRoute = Object.entries(state.rewardMods)
    .filter(([route]) => ["speed", "counter", "burst", "damage", "control"].includes(route))
    .sort((a, b) => a[1] - b[1])[0]?.[0];
  const used = new Set();
  const pickForSlot = (slot, slotLabel, predicate, biasRoute) => {
    const weighted = rewardPool
      .filter((reward) => !used.has(reward.id))
      .filter(predicate)
      .map((reward) => {
        let weight = rewardWeight(reward, { room, bossBonus, routeBias: biasRoute, slot });
        if (slot === "performance" && reward.route === state.route) weight += 1.4;
        if (slot === "build" && activeAnchor && reward.route === activeAnchor) weight += 2.2;
        if (slot === "correction" && reward.route === correctionRoute) weight += 1.6;
        return { reward, weight: Math.max(0.2, weight) };
      });
    const source = weighted.length
      ? weighted
      : rewardPool
          .filter((reward) => !used.has(reward.id))
          .map((reward) => ({ reward, weight: Math.max(0.2, rewardWeight(reward, { room, bossBonus, routeBias: biasRoute, slot })) }));
    const chosen = weightedPick(source).reward;
    used.add(chosen.id);
    return { ...chosen, slot, slotLabel };
  };

  return [
    pickForSlot("performance", "表现", (reward) => reward.route === state.route || reward.kind === "Evidence" || reward.kind === "Upgrade", state.route),
    pickForSlot("build", "构筑", (reward) => reward.route === buildRoute || reward.recipeId || reward.kind === "Relic" || reward.kind === "Inscription", buildRoute),
    pickForSlot("correction", "修正", (reward) => reward.kind === "Rest" || reward.kind === "Evidence" || reward.route === correctionRoute || reward.route === "any", correctionRoute),
  ];
}

function rewardWeight(reward, { room, bossBonus, routeBias, slot }) {
    let weight = 1;
    if (reward.route === routeBias || reward.route === room?.route) weight += 2;
    if (reward.recipeId && reward.route === state.equipment?.route) weight += 2.4;
    if (reward.route === "any") weight += 1;
    if (bossBonus && reward.rarity !== "Common") weight += 1;
    if (reward.kind === "Evidence" && state.fightReads <= 0 && reward.scout) weight -= 0.65;
    if (reward.kind === "Evidence" && state.fightBreaks <= 0 && reward.breakEvidence) weight -= 0.65;
    if (reward.kind === "Evidence" && state.maxCombo < 8 && reward.finisherEvidence) weight -= 0.65;
    if (reward.kind === "Contract" && room?.type === "elite") weight += 1.2;
    if (state.dailyRun && dailyContractPool.some((choice) => choice.id === reward.id)) weight += reward.route === routeBias || reward.route === "any" ? 2.4 : 0.8;
    if (reward.kind === "Inscription" && room?.type === "forge") weight += 2;
    if (slot === "performance" && reward.kind === "Contract") weight -= 0.5;
    if (slot === "correction" && reward.kind === "Contract") weight -= 0.8;
    return weight;
}

function weightedPick(entries) {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = (state.rng?.() ?? Math.random()) * total;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return entries.at(-1);
}

function applyReward(reward) {
  setAnchorFromChoice(reward);
  applyChoice(reward);
  state.rewardBias = reward.kind === "Talent" ? reward.route : state.rewardBias;
}

function setAnchorFromChoice(choice) {
  if (state.anchor || !choice || !["speed", "counter", "burst"].includes(choice.route)) return;
  const direction =
    choice.route === "speed"
      ? "right"
      : choice.route === "counter"
        ? "left"
        : "down";
  state.anchor = {
    route: choice.route,
    direction,
    source: choice.name,
    label: `${routeIcon(choice.route)} ${routeLabel(choice.route)} ${directionGlyph(direction)}`,
  };
  state.rewardBias = choice.route;
  log(`刃心定锚：${state.anchor.label}。后续补牌和奖励会偏向这条打法。`);
}

function applyChoice(choice) {
  state.rewardNames.push(choice.name);
  if (choice.heal) {
    state.playerHp = Math.min(state.playerMaxHp, state.playerHp + choice.heal);
  }
  if (choice.oathPressure) {
    state.oathPressure += choice.oathPressure;
    state.oaths.push(choice.name);
  }
  const mods = choice.mods ?? { [choice.route]: choice.route === "any" ? 1 : choice.kind === "Upgrade" ? 1 : 2 };
  for (const [route, value] of Object.entries(mods)) {
    state.rewardMods[route] += value;
    if (route !== "any" && state.routeMarks[route] !== undefined) state.routeMarks[route] += value;
  }
  if (choice.scout) state.evidence.scout += choice.scout;
  if (choice.breakEvidence) state.evidence.break += choice.breakEvidence;
  if (choice.finisherEvidence) state.evidence.finisher += choice.finisherEvidence;
  if (choice.mark) state.bossMark = choice.mark;
  refreshBossMark();
  if (choice.kind === "Talent" && choice.route !== "any") {
    state.rewardBias = choice.route;
  }
  if (choice.id === "route-scout") {
    const roomRoute = currentRoom()?.route;
    state.rewardBias = state.route !== "neutral" ? state.route : roomRoute === "any" ? "speed" : roomRoute;
  }
}

function displayKind(kind) {
  return {
    Relic: "遗物",
    Talent: "天赋",
    Upgrade: "强化",
    Oath: "誓约",
    Rest: "休整",
    Training: "训练",
    Contract: "契约",
    Inscription: "刻印",
    Evidence: "战斗证据",
  }[kind] ?? kind;
}

function displayRarity(rarity) {
  if (!rarity) return "普通";
  return {
    Common: "普通",
    Uncommon: "稀有",
    Rare: "史诗",
  }[rarity] ?? rarity;
}

function choicesForNode(room) {
  if (room.type === "scout") {
    return [
      eventChoices.find((choice) => choice.id === "scout-fast"),
      rewards.find((choice) => choice.id === "windup-rubbing"),
      eventChoices.find((choice) => choice.id === "repair-focus"),
    ].filter(Boolean);
  }
  if (room.type === "forge") {
    if (state.dailyRun) {
      const theme = dailyThemes.find((item) => item.id === state.dailyRun.themeId);
      const routeInscriptionId = {
        speed: "right-inscription",
        counter: "left-inscription",
        burst: "down-inscription",
      }[theme?.route] ?? "right-inscription";
      return [
        ...dailyContractChoices(state.dailyRun.themeId),
        rewards.find((choice) => choice.id === routeInscriptionId),
        eventChoices.find((choice) => choice.id === "repair-focus"),
      ].filter(Boolean);
    }
    const unlockedTraining = recipeRewards.filter((choice) => hasRecipe(choice.recipeId));
    return [
      eventChoices.find((choice) => choice.id === "forge-chase"),
      eventChoices.find((choice) => choice.id === "forge-break"),
      rewards.find((choice) => choice.id === "left-inscription"),
      ...unlockedTraining,
    ].filter(Boolean);
  }
  if (room.type === "market") {
    return [
      rewards.find((choice) => choice.id === "redline-pursuit"),
      rewards.find((choice) => choice.id === "mirror-oath"),
      rewards.find((choice) => choice.id === "black-drum"),
      eventChoices.find((choice) => choice.id === "repair-focus"),
    ].filter(Boolean);
  }
  return eventChoices;
}

function showNodeOverlay(room) {
  document.querySelector(".overlay")?.remove();
  const choices = choicesForNode(room);
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>${room.name}</h2>
      <p>${effectTextMarkup(`${room.note} 当前 Boss 烙印：${bossMarkLabel()}。上一战：${state.lastBreakdown}`)}</p>
      <div class="choice-stack">
        ${choices
          .map(
            (choice) => `
              <button class="choice ${choiceRarityClass(choice.rarity)} ${choiceKindClass(choice.kind)}" style="${choiceKindStyle(choice.kind)}" type="button" data-node-choice="${choice.id}">
                ${choiceRouteMarkup(choice.route)}
                <span class="choice-title"><b>${choice.name}</b>${choiceKindMarkup(choice.kind)}${choiceRarityMarkup(choice.rarity)}</span>
                <span class="choice-effect">${choiceEffectMarkup(choice)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  overlay.querySelectorAll("[data-node-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = choices.find((item) => item.id === button.dataset.nodeChoice);
      applyChoice(choice);
      advanceRoom();
    });
  });
  els.game.append(overlay);
}

function showBossPreviewOverlay(room) {
  document.querySelector(".overlay")?.remove();
  refreshBossMark();
  const markRoute = dominantMarkRoute();
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>Boss 预演</h2>
      <p>${effectTextMarkup(`${room.name} 吃掉了你的 ${routeLabel(markRoute)}。开战后会出现 ${bossMarkLabel()}。侦察 ${state.evidence.scout}，破势证据 ${state.evidence.break}，终结残片 ${state.evidence.finisher}。`)}</p>
      <button class="choice" type="button" data-start-boss>
        ${choiceRouteMarkup(markRoute)}
        <b>进入最终战</b>
        <span>${room.note}</span>
      </button>
    </div>
  `;
  overlay.querySelector("[data-start-boss]").addEventListener("click", () => {
    state.bossPreviewed = true;
    overlay.remove();
    startEncounter(room);
  });
  els.game.append(overlay);
}

function advanceAct() {
  state.actLevel = Math.min(actMax, state.actLevel + 1);
  state.encounterIndex = 0;
  state.bossPreviewed = false;
  state.pendingRewardIds = null;
  state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 28);
  enterCurrentRoom();
}

function showActClearOverlay() {
  const progressGain = grantFightProgress();
  const progressLine = progressGain ? profileGainText(progressGain) : "长期材料已记录。";
  const nextAct = state.actLevel + 1;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>${actLabel()} 斩路完成</h2>
      <p>${effectTextMarkup(`${state.equipment?.name ?? "武器"} 斩过 ${actLabel()}。最高 ${state.maxCombo} 连，${progressLine} 下一幕：${actLabel(nextAct)}，敌人血量 +${Math.round((actMeta[nextAct].hp - 1) * 100)}%，伤害 +${Math.round((actMeta[nextAct].damage - 1) * 100)}%，抬手更快 ${actMeta[nextAct].speed}ms。`)}</p>
      <button type="button" data-next-act>进入${actLabel(nextAct)}</button>
    </div>
  `;
  overlay.querySelector("[data-next-act]").addEventListener("click", () => {
    overlay.remove();
    advanceAct();
  });
  els.game.append(overlay);
}

function showRunClearOverlay() {
  const progressGain = grantFightProgress();
  const progressLine = progressGain ? profileGainText(progressGain) : "长期材料已记录。";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel">
      <h2>斩路完成</h2>
      <p>${effectTextMarkup(`${state.equipment?.name ?? "武器"} 走完上行刀路。最终战最高 ${state.maxCombo} 连，Boss 烙印是 ${bossMarkLabel()}。${progressLine}`)}</p>
      <button type="button">新开一局</button>
    </div>
  `;
  overlay.querySelector("button").addEventListener("click", resetGame);
  els.game.append(overlay);
}

function applyLiveTuning(previousFocus = state.playerMaxHp) {
  const nextFocus = state.tuning.playerFocus;
  state.playerMaxHp = nextFocus;
  if (nextFocus > previousFocus) {
    state.playerHp = Math.min(nextFocus, state.playerHp + (nextFocus - previousFocus));
  } else {
  state.playerHp = Math.min(nextFocus, state.playerHp);
  }
  state.pressure = clamp(state.pressure, 0, state.tuning.pressureLimit * 1.8);
  if (state.hand.length > handLimit() || handCount() > handLimit()) {
    state.hand = state.hand.slice(0, handLimit()).filter(Boolean).slice(0, handLimit());
    renderHand();
  }
  queueDrawIfNeeded();
  applyPerformanceClass();
  render();
}

function showTunerOverlay(returnToGear = false) {
  if (state.tunerOpen) return;
  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay && !returnToGear) return;
  existingOverlay?.remove();
  state.tunerOpen = true;
  state.returnToGearAfterTuner = returnToGear;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = tunerTemplate();
  bindTunerOverlay(overlay);
  els.game.append(overlay);
}

function tunerTemplate() {
  const presets = Object.entries(tuningPresets)
    .map(
      ([id, preset]) => `
        <button class="preset-button ${state.currentPreset === id ? "is-active" : ""}" type="button" data-preset="${id}">
          ${preset.label}
        </button>
      `,
    )
    .join("");

  const groups = [...new Set(tuningControls.map((control) => control.group))]
    .map(
      (group) => `
        <section class="tuner-section">
          <h3>${group}</h3>
          ${tuningControls
            .filter((control) => control.group === group)
            .map(
              (control) => `
                <label class="tuner-control">
                  <span class="tuner-label">
                    <span>${control.label}</span>
                    <b class="tuner-value" data-tuning-value="${control.key}">${formatTuningValue(control)}</b>
                  </span>
                  <input
                    type="range"
                    min="${control.min}"
                    max="${control.max}"
                    step="${control.step}"
                    value="${state.tuning[control.key]}"
                    data-tuning="${control.key}"
                  />
                </label>
              `,
            )
            .join("")}
        </section>
      `,
    )
    .join("");

  return `
    <div class="overlay-panel tuner-panel">
      <h2>调配器</h2>
      <p>模式、压力、窗口、伤害和成长都放这里。</p>
      <div class="preset-grid">${presets}</div>
      ${groups}
      <div class="tuner-actions">
        <button class="tuner-secondary" type="button" data-tuner-reset>重开本局</button>
        <button type="button" data-tuner-close>关闭</button>
      </div>
    </div>
  `;
}

function bindTunerOverlay(overlay) {
  overlay.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = tuningPresets[button.dataset.preset];
      if (!preset) return;
      const previousFocus = state.playerMaxHp;
      state.currentPreset = button.dataset.preset;
      state.tuning = normalizeTuning(preset);
      saveTuning();
      overlay.innerHTML = tunerTemplate();
      bindTunerOverlay(overlay);
      applyLiveTuning(previousFocus);
    });
  });

  overlay.querySelectorAll("[data-tuning]").forEach((input) => {
    input.addEventListener("input", () => {
      const control = tuningControls.find((item) => item.key === input.dataset.tuning);
      if (!control) return;
      const previousFocus = state.playerMaxHp;
      state.currentPreset = "custom";
      state.tuning[input.dataset.tuning] = clamp(Number(input.value), control.min, control.max);
      overlay.querySelector(`[data-tuning-value="${control.key}"]`).textContent = formatTuningValue(control);
      overlay.querySelectorAll("[data-preset]").forEach((button) => button.classList.remove("is-active"));
      saveTuning();
      applyLiveTuning(previousFocus);
    });
  });

  overlay.querySelector("[data-tuner-reset]").addEventListener("click", () => {
    state.tunerOpen = false;
    state.returnToGearAfterTuner = false;
    overlay.remove();
    resetGame();
  });

  overlay.querySelector("[data-tuner-close]").addEventListener("click", () => {
    const shouldReturnToGear = state.returnToGearAfterTuner && !state.runStarted;
    state.tunerOpen = false;
    state.returnToGearAfterTuner = false;
    overlay.remove();
    if (shouldReturnToGear) {
      showEquipmentOverlay();
      return;
    }
    render();
    wakeLoop(true);
  });
}

function showNotebookOverlay() {
  if (document.querySelector(".overlay") || state.notebookOpen) return;
  state.notebookOpen = true;
  const room = currentRoom() ?? activeEncounters()[0] ?? encounters[0];
  const route = routeInfo(state.route);
  const rewards = state.rewardNames.length ? state.rewardNames.slice(-5).join(" · ") : "还没有奖励。";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel notebook-panel">
      <h2>连击笔记</h2>
      <p>快看，快关，继续连。</p>
      <div class="notebook-grid">
        <div class="notebook-section">
          <b>方向</b>
          <span>你在下，Boss 在上。上划冲向 Boss 并挑空，右划追身，左划侧退闪反，下划蓄势重斩。</span>
        </div>
        <div class="notebook-section">
          <b>当前路线</b>
          <span>${route.icon} ${route.label}: ${route.hint}。${room.name} 怕 ${room.route === "any" ? "◇ 方向变化" : `${routeIcon(room.route)} ${routeLabel(room.route)}`}。</span>
        </div>
        <div class="notebook-section">
          <b>上一战</b>
          <span>${state.lastBreakdown}</span>
        </div>
        <div class="notebook-section">
          <b>当前构筑</b>
          <span>${rewards}</span>
        </div>
      </div>
      <button type="button">关闭</button>
    </div>
  `;
  overlay.querySelector("button").addEventListener("click", () => {
    state.notebookOpen = false;
    overlay.remove();
    wakeLoop(true);
  });
  els.game.append(overlay);
}

function showVersionOverlay(returnToGear = false) {
  if (state.versionOpen || state.tunerOpen) return;
  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay && !returnToGear) return;
  existingOverlay?.remove();
  state.versionOpen = true;
  state.returnToGearAfterVersion = returnToGear;
  const current = versionHistory[0];
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-panel version-panel">
      <h2>版本记录</h2>
      <div class="version-current" style="--version-color:${current.color}">
        <i>${current.icon}</i>
        <b>${current.id} ${current.title}</b>
        <span>${current.points.join(" · ")}</span>
      </div>
      <div class="version-timeline">
        ${versionHistory
          .map(
            (version) => `
              <section class="version-row" style="--version-color:${version.color}">
                <i>${version.icon}</i>
                <div>
                  <b>${version.id} ${version.title}</b>
                  <small>${version.date}</small>
                  <span>${version.points.join(" · ")}</span>
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
      <button type="button">关闭</button>
    </div>
  `;
  overlay.querySelector("button").addEventListener("click", () => {
    const shouldReturnToGear = state.returnToGearAfterVersion && !state.runStarted;
    state.versionOpen = false;
    state.returnToGearAfterVersion = false;
    overlay.remove();
    if (shouldReturnToGear) {
      showEquipmentOverlay();
      return;
    }
    render();
    wakeLoop(true);
  });
  els.game.append(overlay);
}

let last = performance.now();
function isLoopActive() {
  return document.visibilityState === "visible" && state.runStarted && !state.ended && !state.notebookOpen && !state.tunerOpen && !state.versionOpen && !state.saveOpen;
}

function wakeLoop(resetTime = false) {
  if (resetTime) last = performance.now();
  if (!isLoopActive() || frameHandle !== null || lowPowerTimer !== null) return;
  if (isLowPowerMode()) {
    lowPowerTimer = window.setTimeout(() => {
      lowPowerTimer = null;
      if (!isLoopActive() || frameHandle !== null) return;
      frameHandle = requestAnimationFrame(loop);
    }, 32);
    return;
  }
  frameHandle = requestAnimationFrame(loop);
}

function loop(now) {
  frameHandle = null;
  const delta = Math.min(80, now - last);
  last = now;
  tick(delta);
  wakeLoop();
}

els.musicButton.addEventListener("click", toggleMenuBgm);
els.resetButton.addEventListener("click", resetGame);
els.tunerButton.addEventListener("click", showTunerOverlay);
els.saveButton.addEventListener("click", showSaveOverlay);
els.versionButton.addEventListener("click", () => showVersionOverlay(false));
els.notebookButton.addEventListener("click", showNotebookOverlay);
document.addEventListener("pointerdown", handleAudioPointerDown, { capture: true });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") pauseAllBgm();
  if (document.visibilityState === "visible") {
    wakeLoop(true);
    void playCurrentBgm();
  }
});

if (location.hostname === "127.0.0.1" || location.search.includes("debug=1")) {
  const debugCombatArtState = () => {
    const bossImage = els.enemy?.querySelector(".boss-art");
    return {
      action: els.enemy?.dataset.action ?? "",
      frame: els.enemy?.dataset.frame ?? "",
      frameIndex: Number(els.enemy?.dataset.frameIndex ?? 0),
      frameCount: Number(els.enemy?.dataset.frameCount ?? 0),
      timeline: els.enemy?.dataset.timeline ?? "",
      src: bossImage?.getAttribute("src") ?? "",
      classes: els.enemy?.className ?? "",
      overlay: document.querySelector(".overlay h1, .overlay h2")?.textContent?.trim() ?? "",
    };
  };

  window.__bladeFlowDebug = {
    combatArtState() {
      return debugCombatArtState();
    },
    forceBossAction(action = "idle") {
      const move = bossMoves(currentRoom()).find((item) => item.key === action);
      state.ended = false;
      document.querySelector(".overlay")?.remove();
      if (move) state.bossMove = move;
      toggleClass(els.enemy, "is-death", false);
      toggleClass(els.enemy, "is-attacking", action === "attack");
      toggleClass(els.enemy, "is-damaged", action === "damaged");
      toggleClass(els.enemy, "is-charging", action !== "idle" && action !== "attack" && action !== "damaged" && action !== "death");
      setCombatArt({ boss: currentBossArt(action), bossAction: action, bossCharging: action !== "idle" && action !== "attack" && action !== "damaged" && action !== "death", force: true });
      if (move) renderBossMoveState(true);
      else toggleClass(els.enemy, "is-read-danger", false);
      return debugCombatArtState();
    },
    forceBossDeath() {
      state.ended = false;
      document.querySelector(".overlay")?.remove();
      scheduleVictory();
      return debugCombatArtState();
    },
    forceBossMove(key) {
      const fallback = {
        fast: { key: "fast", label: "快刀抬手", hint: "短抬手，左划或格挡更稳。", read: "快", damageScale: 0.86, pressure: 1 },
        heavy: { key: "heavy", label: "慢刀蓄势", hint: "大幅蓄势，可抢破势。", read: "重", damageScale: 1.12, pressure: 1.16 },
        feint: { key: "feint", label: "假抬手", hint: "先假动作，别急着交防守。", read: "伪", damageScale: 0.92, pressure: 1.18 },
        backstep: { key: "backstep", label: "后撤横切", hint: "惩罚无脑右划，等空挥再追。", read: "退", damageScale: 1.05, pressure: 1.22 },
        "ground-grab": { key: "ground-grab", label: "地裂抓取", hint: "惩罚空下划，先破势再处决。", read: "裂", damageScale: 1.24, pressure: 1.26 },
      };
      state.ended = true;
      document.querySelector(".overlay")?.remove();
      state.bossMove = bossMoves(currentRoom()).find((move) => move.key === key) ?? fallback[key] ?? fallback.fast;
      state.intentName = state.bossMove.label;
      state.intentMax = state.tuning.perfectWindow;
      state.intentTime = state.tuning.perfectWindow * 0.72;
      resetBossMoveClass();
      toggleClass(els.enemy, "is-death", false);
      toggleClass(els.enemy, "is-damaged", false);
      toggleClass(els.enemy, "is-attacking", false);
      toggleClass(els.enemy, "is-charging", false);
      render();
      setCombatArt({ boss: currentBossArt(state.bossMove.key), bossAction: state.bossMove.key, bossCharging: true });
      renderBossMoveState(true);
      return { key: state.bossMove.key, label: state.bossMove.label };
    },
    rewardStats() {
      const pool = [...rewards, ...dailyContractPool];
      return {
        total: pool.length,
        dailyContracts: dailyContractPool.length,
        byKind: pool.reduce((summary, reward) => {
          summary[reward.kind] = (summary[reward.kind] ?? 0) + 1;
          return summary;
        }, {}),
        byRoute: pool.reduce((summary, reward) => {
          summary[reward.route] = (summary[reward.route] ?? 0) + 1;
          return summary;
        }, {}),
      };
    },
    dailyContracts(themeId = state.dailyRun?.themeId ?? dailyThemes[0].id) {
      return dailyContractChoices(themeId).map((choice) => ({
        id: choice.id,
        name: choice.name,
        route: choice.route,
        rarity: choice.rarity,
        text: choice.text,
        mods: choice.mods,
        mark: choice.mark,
        oathPressure: choice.oathPressure,
      }));
    },
    previewRewards() {
      return rewardChoices().map((reward) => ({
        id: reward.id,
        slot: reward.slot,
        kind: reward.kind,
        rarity: reward.rarity,
        route: reward.route,
        name: reward.name,
        text: reward.text,
      }));
    },
    previewPathChoices() {
      return nextPathChoices().map((choice) => ({
        id: choice.id,
        label: choice.label,
        route: choice.route,
        risk: choice.risk,
        atlasId: choice.atlasId ?? null,
        text: choice.text,
        evidence: choice.evidence ?? null,
        evidenceGain: choice.evidenceGain ?? 1,
        bossMark: choice.bossMark ?? null,
      }));
    },
    forcePathChoice(id) {
      const choice = pathChoiceCatalog.find((item) => item.id === id);
      if (!choice) return null;
      applyPathChoice(choice);
      const room = scaledEncounter(activeEncounters()[state.encounterIndex] ?? encounters[0], state.actLevel, state.encounterIndex);
      return {
        choice: {
          id: choice.id,
          label: choice.label,
          atlasId: choice.atlasId ?? null,
          evidence: choice.evidence ?? null,
          evidenceGain: choice.evidenceGain ?? 1,
          bossMark: choice.bossMark ?? null,
        },
        room: {
          name: room.name,
          type: room.type,
          route: room.route,
          hp: room.hp ?? null,
          damage: room.damage ?? null,
          speed: room.speed ?? null,
          note: room.note,
        },
        bossMark: state.bossMark,
        rewardBias: state.rewardBias,
      };
    },
    async runPerformanceProbe(options = {}) {
      const duration = clamp(Number(options.duration ?? 30000), 5000, 300000);
      const interval = clamp(Number(options.interval ?? 120), 60, 500);
      const profile = options.profile === undefined ? null : clamp(Math.round(Number(options.profile)), 0, 2);
      if (profile !== null) {
        state.tuning.performanceProfile = profile;
        applyPerformanceClass();
      }
      const longTasks = [];
      let observer = null;
      try {
        observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => longTasks.push(entry.duration));
        });
        observer.observe({ entryTypes: ["longtask"] });
      } catch {
        observer = null;
      }
      if (!state.runStarted) startRun(equipmentPool[0]);
      const directions = ["right", "left", "down", "up", "tap"];
      const started = performance.now();
      let actions = 0;
      let overlays = 0;
      let rewardsHandled = 0;
      let pathsHandled = 0;
      const clickFirst = (selector) => {
        const button = document.querySelector(selector);
        if (!button) return false;
        button.click();
        overlays += 1;
        return true;
      };
      while (performance.now() - started < duration) {
        if (options.keepAlive !== false && state.runStarted && !state.ended) {
          state.playerHp = state.playerMaxHp;
        }
        if (clickFirst("[data-next-act]")) {
          // Act transition handled by UI event.
        } else if (clickFirst("[data-start-boss]")) {
          // Boss preview handled by UI event.
        } else if (clickFirst("[data-node-choice]")) {
          // Event, forge, scout, and market handled by UI event.
        } else if (clickFirst("[data-reward]")) {
          rewardsHandled += 1;
        } else if (clickFirst("[data-path-choice]")) {
          pathsHandled += 1;
        } else if (!state.ended && state.runStarted) {
          const cardIndex = state.hand.findIndex(Boolean);
          if (cardIndex >= 0) {
            playCard(cardIndex, directions[actions % directions.length]);
            actions += 1;
          }
        }
        await new Promise((resolve) => window.setTimeout(resolve, interval));
      }
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      observer?.disconnect();
      const perf = this.performanceState();
      return {
        duration: Math.round(performance.now() - started),
        actions,
        overlays,
        rewardsHandled,
        pathsHandled,
        longTasks: longTasks.length,
        longTaskDuration: Number(longTasks.reduce((sum, value) => sum + value, 0).toFixed(2)),
        domNodes: document.querySelectorAll("*").length,
        heapUsed: performance.memory?.usedJSHeapSize ?? null,
        room: currentRoom()?.name ?? "none",
        act: state.actLevel,
        encounterIndex: state.encounterIndex,
        ended: state.ended,
        ...perf,
      };
    },
    async runMobileAcceptanceProbe(options = {}) {
      return runMobileAcceptanceProbe(options);
    },
    setLastMobileAcceptanceProbe(probe) {
      lastMobileAcceptanceProbe = probe;
      return lastMobileAcceptanceProbe;
    },
    mobileAcceptanceRecords() {
      return readMobileAcceptanceRecords();
    },
    mobileAcceptanceExportText() {
      return mobileAcceptanceExportText();
    },
    clearMobileAcceptanceRecords() {
      localStorage.removeItem(mobileAcceptanceStorageKey);
      lastMobileAcceptanceProbe = null;
      return [];
    },
    injectBadSaveSlot(index = 2) {
      const slots = readSaveSlots();
      slots[index] = { version: 1, snapshot: { dailySeed: state.dailySeed, equipmentId: "missing-weapon", encounterIndex: 0, actLevel: 1 } };
      writeSaveSlots(slots);
      return readSaveSlots().map((slot) => ({ locked: Boolean(slot?.locked), reason: slot?.reason ?? "" }));
    },
    injectBadProfile(mode = state.profileMode) {
      const key = profileStorageKeys[mode] ?? profileStorageKeys.real;
      localStorage.setItem(key, "{bad-profile");
      switchProfileMode(mode);
      return { mode: state.profileMode, locked: profileLocked(), error: state.profileErrors[state.profileMode] };
    },
    actRoster() {
      return [1, 2, 3].map((act) => ({
        act,
        label: actLabel(act),
        rooms: encounters.map((base, index) => {
          const room = scaledEncounter(base, act, index);
          return {
            index,
            type: room.type,
            name: room.name,
            route: room.route,
            form: room.form ?? null,
            hp: room.hp ?? null,
            speed: room.speed ?? null,
            damage: room.damage ?? null,
            lesson: room.lesson ?? null,
          };
        }),
      }));
    },
    jumpToAct(act = 1, index = 0) {
      state.dailyRun = null;
      state.trainingLesson = null;
      state.actLevel = clamp(Number(act) || 1, 1, actMax);
      state.encounterIndex = clamp(Number(index) || 0, 0, encounters.length - 1);
      state.pendingRewardIds = null;
      state.pendingPathChoiceIds = null;
      state.bossPreviewed = false;
      state.ended = false;
      document.querySelector(".overlay")?.remove();
      enterCurrentRoom();
      render();
      return currentRoom();
    },
    performanceState() {
      return {
        profile: performanceProfile(),
        label: els.game.dataset.performance,
        drawPreviewCount: Math.round(state.tuning.drawPreviewCount ?? 2),
        promoteLookahead: Math.round(state.tuning.promoteLookahead ?? 6),
        slashNodes: els.slashLayer.children.length,
        impactNodes: els.impactLayer.children.length,
        comboNodes: els.comboLayer.children.length,
        frameScheduled: frameHandle !== null,
        lowPowerScheduled: lowPowerTimer !== null,
      };
    },
    profileState() {
      return {
        mode: state.profileMode,
        locked: profileLocked(),
        bladeInk: state.profile.bladeInk,
        evidence: state.profile.evidence,
        recipes: state.profile.recipes,
        weaponSchools: state.profile.weaponSchools,
        routeAtlas: state.profile.routeAtlas,
        training: state.profile.training,
        badges: state.profile.badges,
        namedBlades: state.profile.namedBlades,
      };
    },
    audioState() {
      const key = currentBgmKey();
      const track = key ? bgmTracks[key] ?? null : null;
      const audio = track?.audio ?? null;
      return {
        enabled: audioState.enabled,
        unlocked: audioState.unlocked,
        scene: audioState.scene,
        activeKey: key,
        activeLabel: track?.label ?? "",
        paused: audio ? audio.paused : true,
        currentTime: audio ? Number(audio.currentTime.toFixed(2)) : 0,
        duration: audio && Number.isFinite(audio.duration) ? Number(audio.duration.toFixed(2)) : null,
        src: audio ? audio.currentSrc || audio.src : "",
        tracks: Object.fromEntries(
          Object.entries(bgmTracks).map(([trackKey, item]) => [
            trackKey,
            {
              label: item.label,
              paused: item.audio.paused,
              currentTime: Number(item.audio.currentTime.toFixed(2)),
              duration: Number.isFinite(item.audio.duration) ? Number(item.audio.duration.toFixed(2)) : null,
              src: item.audio.currentSrc || item.audio.src,
            },
          ]),
        ),
        lastError: audioState.lastError,
      };
    },
    debugUnlockAllProfile() {
      debugUnlockAllProfile();
      return this.profileState();
    },
    debugAddEvidence(key) {
      debugAddEvidence(key);
      return this.profileState();
    },
  };
}
resetGame();
if (shouldOpenMobileAcceptanceFromUrl()) {
  window.setTimeout(() => {
    showMobileAcceptanceOverlay("真机长测已直达。跑 60 秒后保存并复制记录。");
  }, 0);
}
