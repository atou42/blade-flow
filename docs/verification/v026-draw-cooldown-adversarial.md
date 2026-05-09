# v0.2.6 Draw Cooldown Adversarial Verification

Date: 2026-05-04

Scope: replace instant infinite refill with visible draw cooldown, prevent hand hoarding, keep standard strategy clearable, and expose draw pacing as tuning parameters.

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

## Check: played cards leave empty slots and visible draw progress

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.6-cooldown2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, select 风暴太刀, play one card, inspect hand slots and draw bar]"
"$PWCLI" console error
```

Output observed:

```json
{
  "before": {
    "hand": 4,
    "empty": 0,
    "drawText": "满手"
  },
  "afterPlay": {
    "hand": 3,
    "empty": 1,
    "drawText": "1s"
  },
  "mid": {
    "hand": 3,
    "empty": 1,
    "drawText": "1s"
  }
}
```

Follow-up after browser time advanced:

```json
{
  "hand": 4,
  "empty": 0,
  "drawText": "满手"
}
```

Screenshot evidence: `output/playwright/v026-draw-cooldown.png`.

Result: PASS

## Check: rapid play can empty the hand instead of instantly refilling

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.6-empty2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, select 风暴太刀, play four cards quickly]"
"$PWCLI" console error
```

Output observed:

```json
{
  "emptyNow": {
    "hand": 0,
    "empty": 4,
    "drawText": "1s",
    "combo": "4"
  }
}
```

Follow-up after browser time advanced:

```json
{
  "hand": 4,
  "empty": 0,
  "drawText": "满手",
  "combo": "0"
}
```

Result: PASS

## Check: standard strategy can still clear with cooldown

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.6-full2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, vary directions, wait when hand is empty, play through all rooms]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "通关",
  "stage": "A3 首领 12/12",
  "hp": "100",
  "stance": "100",
  "actions": 100,
  "waits": 316,
  "breaks": 0,
  "seenTitles": ["风格结算", "霓虹神龛", "风格结算", "方向道场", "风格结算", "通关"]
}
```

Screenshot evidence: `output/playwright/v026-standard-cooldown-clear.png`.

Result: PASS

## Check: deployed page uses visible draw cooldown

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "https://games.atou.cc/combo-card-roguelike/versions/a/?v=0.2.6"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, select 风暴太刀, play one card, inspect hand and draw bar]"
sleep 1
"$PWCLI" eval "[inspect hand after cooldown]"
"$PWCLI" console error
```

Output observed:

```json
{
  "before": {
    "hand": 4,
    "empty": 0,
    "drawText": "满手",
    "version": "v0.2.6 补牌冷却"
  },
  "afterPlay": {
    "hand": 3,
    "empty": 1,
    "drawText": "1s",
    "version": "v0.2.6 补牌冷却"
  }
}
```

Follow-up after browser time advanced:

```json
{
  "hand": 4,
  "empty": 0,
  "drawText": "满手",
  "version": "v0.2.6 补牌冷却"
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `d881e700-0e3c-41f4-99d0-a3c1ee13e6d7`.

Screenshot evidence: `output/playwright/v026-live-draw-cooldown.png`.

Result: PASS

VERDICT: PASS
