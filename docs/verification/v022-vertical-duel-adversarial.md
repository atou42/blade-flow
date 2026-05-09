# v0.2.2 Vertical Duel Adversarial Verification

Date: 2026-05-04

Scope: Chinese UI pass, mobile vertical boss duel layout, up-flick direction mapping, reward/event/training flow, full three-act run, and console cleanliness.

## Check: JavaScript parses

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
<no output, exit code 0>
```

Result: PASS

## Check: mobile duel reads as player below boss

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273/
"$PWCLI" resize 390 844
"$PWCLI" eval "[select 风暴太刀, inspect stage text, positions, labels, cards]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "Blade Flow 竖屏连击卡牌",
  "stage": "A1 战斗 1/12",
  "equipment": "风暴太刀",
  "log": "风暴太刀 已装备。今日种子 D260504 开始。",
  "playerBelowEnemy": true,
  "labels": ["↑ 挑空", "→ 追击", "← 闪反", "↓ 爆发"],
  "cardNames": ["影步", "破甲", "重劈", "突刺"],
  "hasEnglishEquipped": false
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Screenshot evidence: `output/playwright/v022-chinese-vertical-duel-final-after.png`.

Result: PASS

## Check: up flick resolves into the upward route

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" eval "[dispatch up flick on a visible card, inspect route and movement transform]"
```

Output observed:

```json
{
  "log": "破甲上挑: 空 · 挑空 +21",
  "after": "matrix(1, 0, 0, 1, 0, -24)",
  "slashTransform": "matrix(1, 0, 0, 0, -4, -79)"
}
```

Result: PASS

## Check: full three-act run still clears after Chinese and vertical layout changes

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273/
"$PWCLI" resize 390 844
"$PWCLI" eval "[select 风暴太刀, rapidly play through all rooms, choose first rewards/events/training]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "通关",
  "stage": "A3 首领 12/12",
  "actions": 109,
  "seenTitles": ["风格结算", "霓虹神龛", "风格结算", "方向道场", "风格结算", "通关"],
  "containsOldEnglish": false
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Screenshot evidence: `output/playwright/v022-full-run-clear-mobile.png`.

Result: PASS

## Check: deployed page keeps the same vertical Chinese duel

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "https://games.atou.cc/combo-card-roguelike/versions/a/?v=0.2.2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[select 风暴太刀, inspect stage text, positions, labels, old-English strings]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "Blade Flow 竖屏连击卡牌",
  "stage": "A1 战斗 1/12",
  "equipment": "风暴太刀",
  "log": "风暴太刀 已装备。今日种子 D260504 开始。",
  "playerBelowEnemy": true,
  "labels": ["↑ 挑空", "→ 追击", "← 闪反", "↓ 爆发"],
  "hasOldEnglish": false
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `2138dbe4-0305-445d-904b-311d67858958`.

Screenshot evidence: `output/playwright/v022-live-mobile.png`.

Result: PASS

VERDICT: PASS
