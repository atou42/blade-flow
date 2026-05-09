# v0.2.5 Stance Debt Adversarial Verification

Date: 2026-05-04

Scope: prevent infinite-card button mashing from overpowering bosses by adding stance debt, low-stance damage loss, and vulnerability punishment while preserving strategic full-run clears.

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

## Check: same-direction spam gets punished

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.5-spam2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, select 风暴太刀, right-flick repeatedly]"
"$PWCLI" console error
```

Output observed:

```json
{
  "breakHit": true,
  "finalLog": "街头刀手 抓住破绽，连击碎了。危险临近时左划或用格挡。",
  "stance": "28",
  "hp": "89",
  "enemy": "32",
  "pressure": "抢招压力 55"
}
```

Recent samples showed stance falling from 70 to 50 to 31 to 9 before vulnerability punishment fired.

Screenshot evidence: `output/playwright/v025-right-spam-punished.png`.

Result: PASS

## Check: varied strategic play can still clear standard mode

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "http://127.0.0.1:4273/?v=0.2.5-full2"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, vary directions, pause periodically, favor left on bosses, play through all rooms]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "通关",
  "stage": "A3 首领 12/12",
  "hp": "100",
  "stance": "61",
  "actions": 100,
  "breaks": 0,
  "seenTitles": ["风格结算", "霓虹神龛", "风格结算", "方向道场", "风格结算", "通关"]
}
```

Screenshot evidence: `output/playwright/v025-standard-strategic-clear.png`.

Result: PASS

## Check: deployed page punishes same-direction spam

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open "https://games.atou.cc/combo-card-roguelike/versions/a/?v=0.2.5"
"$PWCLI" resize 390 844
"$PWCLI" eval "[clear tuning, select 风暴太刀, right-flick repeatedly]"
"$PWCLI" console error
```

Output observed:

```json
{
  "version": "v0.2.5 架势债务",
  "breakHit": true,
  "log": "街头刀手 抓住破绽，连击碎了。危险临近时左划或用格挡。",
  "stance": "30",
  "hp": "89",
  "enemy": "33",
  "pressure": "抢招压力 54"
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `dc3c23e8-d6ee-4e71-852b-7737fa32b611`.

Screenshot evidence: `output/playwright/v025-live-spam-punished.png`.

Result: PASS

VERDICT: PASS
