# v0.2.3 Boss Pressure Adversarial Verification

Date: 2026-05-04

Scope: boss/enemy intent should advance after gear selection even before the player plays the first card.

## Check: bug reproduces before fix

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273/
"$PWCLI" resize 390 844
"$PWCLI" eval "[select 风暴太刀, wait 4.2 seconds, inspect hp and log]"
```

Output observed:

```json
{
  "hp": "100",
  "log": "风暴太刀 已装备。今日种子 D260504 开始。",
  "intent": "等待出招",
  "combo": "0"
}
```

Result: FAIL before fix

## Check: gear overlay stays paused, but combat starts attacking after gear selection

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.3c"
"$PWCLI" resize 390 844
"$PWCLI" eval "[click 风暴太刀]"
sleep 5
"$PWCLI" eval "[inspect hp, log, intent, state flags]"
```

Output observed:

```json
{
  "hp": "87",
  "log": "街头刀手 命中你，连击碎了。危险临近时左划或用格挡。",
  "intent": "街头刀手 进攻",
  "runStarted": true,
  "hasStarted": false
}
```

Result: PASS

## Check: three-act run still clears

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.3-run"
"$PWCLI" resize 390 844
"$PWCLI" eval "[select 风暴太刀, rapidly play through all rooms]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "通关",
  "stage": "A3 首领 12/12",
  "actions": 108,
  "seenTitles": ["风格结算", "霓虹神龛", "风格结算", "方向道场", "风格结算", "通关"]
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

## Check: deployed page attacks while player idles

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "https://games.atou.cc/combo-card-roguelike/versions/a/?v=0.2.3"
"$PWCLI" resize 390 844
"$PWCLI" eval "[click 风暴太刀]"
sleep 5
"$PWCLI" eval "[inspect hp, log, stage]"
"$PWCLI" console error
```

Output observed:

```json
{
  "version": "v0.2.3 Boss 压迫",
  "hp": "87",
  "log": "街头刀手 命中你，连击碎了。危险临近时左划或用格挡。",
  "stage": "A1 战斗 1/12",
  "hasStarted": false
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `8deacb2e-68af-40ee-bd9a-bc9d121522ef`.

Screenshot evidence: `output/playwright/v023-live-boss-attacks.png`.

Result: PASS

VERDICT: PASS
