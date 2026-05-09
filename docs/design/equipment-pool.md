# Equipment Pool

## Pool Shape

Equipment defines starting identity. It should change how the run begins, what the player looks for, and which part of the starter deck becomes expressive.

Equipment is grouped into style sets, weapons, utility gear, buildcraft gear, and boss or cursed gear.

## Style Sets

Duelist Foil, Ironbreaker, Storm Katana, Gravity Hammer, Twin Daggers, Chain Scythe, Gunblade, Mirror Fan, Rocket Boots, Executioner, Wind Bowblade, Resonance Blade, Sand Chakram, Beast Claws, Ink Brush, Crown of Blades.

## Weapons

Twin Needle, Glass Fang, Viper Stiletto, Iron Mandible, Grave Splitter, Executioner's Saw, Pilgrim Spear, Comet Lance, Serpent Chain, Thorn Whip, Halo Chakram, Ash Gunblade, Needle Rapier, Saint's Estoc, Stone Fist Blade, Bell Hammer, Four-Wind Jian, Compass Blade.

## Utility Gear

Miststep Cloak, Training Bracers, Compass Engine, Feather Brake, Stone Palm, Lantern Talisman, Windlace Boots, Blueglass Mask, Oath Guard, Drift Soles, Null Charm, Clockwork Palm.

## Buildcraft Gear

Duelist's Scabbard, Skyhook Rig, Mirror Guard, Executioner's Seal, Black Thread, Split-Edge Manual, Broken Sheath, Winged Hilt, Needle Compass, Rust-Eater Charm, Eclipse Cloak, Butcher's Ledger, Gravity Spurs, Ratchet Gauntlet, Grave Nail, Wildcard Scabbard.

## Boss And Cursed Gear

Crown of the First Boss, Black Kite Cloak, Glass Meteor, Mirrorbrand, Ash Halo, Maw Engine, Saint of Knives, Obsidian Drum, Black Sun Dial, The Boss's Spare Hand.

## First-Version Picks

The first version should start with six equipment identities: Storm Katana, Gravity Hammer, Mirror Fan, Gunblade, Executioner, and Duelist's Scabbard.

These cover speed chase, launch slam, evade counter, melee-ranged rhythm, heavy execute, and thin-deck fast cycling.

## 首版装备契约细化

装备在上行刀路中是开局契约，不是传统装备栏。玩家开局只选一件主装备。它决定起手打法、奖励倾向、Boss 反制风险和错读代价。首个肉鸽切片先实现 Storm Katana、Mirror Fan、Executioner 三件，另外三件保留为扩展目标。

| Equipment | 中文名 | 首版定位 | 强收益 | 明确缺陷 | Boss 反制 |
| --- | --- | --- | --- | --- | --- |
| Storm Katana | 风暴太刀 | 高速追击 | Right flick shortens replacement cooldown and makes Chase Cut snap forward more aggressively. | Repeated pursuit raises overheat and leaves fewer safe cards. | Boss learns backstep slash after repeated right-flick pressure. |
| Mirror Fan | 镜扇 | 读招闪反 | Left flick during a real windup leaves an afterimage that repeats the next light action. | Normal guard is weaker and late evades lose combo protection faster. | Boss gains feints after the player succeeds with repeated left-flick counters. |
| Executioner | 处刑者 | 破势爆发 | Breaker, Heavy Cleave, and Execute gain stronger break and finisher windows. | Startup is slower and missed down flicks lock one card briefly. | Boss protects Execute windows with ground grab or delayed armor. |
| Gravity Hammer | 重力锤 | 挑空下砸 | Up flick into down flick builds heavy break quickly. | Weak against fast blade pressure before launch starts. | Boss adds anti-air downpress after repeated launch routes. |
| Gunblade | 铳刃 | 近远换拍 | Melee hits load shot follow-ups that keep combo alive at range. | Empty shots interrupt rhythm and delay replacement. | Boss dashes through predictable ranged follow-ups. |
| Duelist's Scabbard | 决斗刀鞘 | 薄牌循环 | Starts with a thinner fast deck and stronger basic slash cadence. | Lower break and lower burst ceiling. | Boss uses guard stance to punish low-commitment loops. |

装备调校只允许强化当前装备的一条动作循环。例如风暴太刀可以调校右划追身、追击补牌或过热爆发，但不能调校成镜扇式闪反。这样装备会形成身份，而不是变成随机词条堆。
