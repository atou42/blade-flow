# v0.2.4 Tuner And Pressure Adversarial Verification

Date: 2026-05-04

Scope: combat-pressure tuning panel, six difficulty presets, editable pressure/damage/timing sliders, pressure-based enemy riposte during combo, and default run health.

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

## Check: tuner opens before gear selection and exposes presets plus parameters

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.4-tuner-shot"
"$PWCLI" resize 390 844
"$PWCLI" eval "[open tuner from gear overlay, count controls and presets]"
```

Output observed:

```json
{
  "title": "调配器",
  "controls": 23,
  "presets": 6
}
```

Screenshot evidence: `output/playwright/v024-tuner-mobile.png`.

Result: PASS

## Check: hell preset persists and forces in-combo riposte pressure

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.4-clean3"
"$PWCLI" resize 390 844
"$PWCLI" eval "[open tuner, choose 地狱, close, select 风暴太刀, rapid flick until riposte]"
"$PWCLI" console error
```

Output observed:

```json
{
  "version": "v0.2.4 调配器",
  "opened": "调配器",
  "presetCount": 6,
  "hellActive": true,
  "bossSpeed": "2.35x",
  "returnedToGear": "选择武器",
  "stage": "A1 战斗 1/12",
  "hp": "35",
  "log": "街头刀手 抢招命中，连击碎了。危险临近时左划或用格挡。",
  "pressure": "抢招压力 63",
  "savedPreset": "hell"
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Screenshot evidence: `output/playwright/v024-tuner-hell-riposte.png`.

Result: PASS

## Check: standard preset still clears a full three-act run

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.4-full"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear saved tuning, select 风暴太刀, play through all rooms]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "通关",
  "stage": "A3 首领 12/12",
  "hp": "46",
  "actions": 111,
  "ripostes": 7,
  "seenTitles": ["风格结算", "霓虹神龛", "风格结算", "方向道场", "风格结算", "通关"]
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Screenshot evidence: `output/playwright/v024-standard-full-run.png`.

Result: PASS

## Check: integer tuner values render correctly

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.4-format"
"$PWCLI" resize 390 844
"$PWCLI" eval "[open tuner and inspect displayed values]"
```

Output observed:

```json
{
  "threshold": "100",
  "action": "9",
  "boss": "1x"
}
```

Result: PASS

## Check: deployed tuner and hell riposte work

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "https://games.atou.cc/combo-card-roguelike/versions/a/?v=0.2.4"
"$PWCLI" resize 390 844
"$PWCLI" eval "[open tuner from gear overlay, select 地狱, start run, rapid flick until riposte]"
"$PWCLI" console error
```

Output observed:

```json
{
  "version": "v0.2.4 调配器",
  "opened": "调配器",
  "presetCount": 6,
  "controlCount": 23,
  "stage": "A1 战斗 1/12",
  "hp": "35",
  "log": "街头刀手 抢招命中，连击碎了。危险临近时左划或用格挡。",
  "pressure": "抢招压力 63",
  "savedPreset": "hell"
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `9f61a805-d77f-4080-adf8-5c5b09bd7ee0`.

Screenshot evidence: `output/playwright/v024-live-tuner-hell.png`.

Result: PASS

VERDICT: PASS
