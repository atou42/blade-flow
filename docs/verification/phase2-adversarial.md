# Phase 2 Adversarial Verification

Date: 2026-05-04

Scope: content alpha with ten gear choices, twelve-room three-act run, event room, training room, expanded reward pool, reward kinds, route bias, daily seed determinism, mobile overlays, full run clear, and browser console cleanliness.

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

## Check: small mobile gear overlay supports ten equipment choices

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 320 568
"$PWCLI" eval "[scroll to last equipment and click it]"
```

Output observed:

```json
{
  "choices": 10,
  "lastRect": {
    "x": 31,
    "y": 396.4375,
    "width": 258,
    "height": 65.5625,
    "bottom": 462
  },
  "overlay": false,
  "equipment": "Compass Chain",
  "stage": "A1 Fight 1/12",
  "rewardStack": "D260504"
}
```

Result: PASS

Screenshot evidence: `output/playwright/phase2-mobile-gear.png`.

## Check: full content-alpha run reaches final boss clear

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Meteor Axe, clear fights, choose event/training/rewards]"
```

Output observed:

```json
{
  "title": "Run Clear",
  "stage": "A3 Boss 12/12",
  "rewards": "11 rewards · D260504",
  "equipment": "Meteor Axe",
  "playerHp": "100",
  "actions": 103,
  "seen": [
    "Style Clear",
    "Style Clear",
    "Neon Shrine",
    "Style Clear",
    "Style Clear",
    "Direction Dojo",
    "Style Clear",
    "Style Clear",
    "Style Clear",
    "Style Clear",
    "Style Clear",
    "Run Clear"
  ],
  "eventSeen": true,
  "trainingSeen": true
}
```

Result: PASS

## Check: reward picks include talent, upgrade, and relic, and are deterministic by daily seed

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[run to first reward, reset, run to first reward again]"
```

Output observed:

```json
{
  "first": [
    {
      "name": "Counter Doctrine",
      "kind": "Talent · Common",
      "text": "Left flicks near danger keep more combo."
    },
    {
      "name": "Launcher EX",
      "kind": "Upgrade · Common",
      "text": "Launch cards add stronger enemy delay."
    },
    {
      "name": "Guard Point",
      "kind": "Relic · Common",
      "text": "Left flicks and Guard punish danger harder."
    }
  ],
  "second": [
    {
      "name": "Counter Doctrine",
      "kind": "Talent · Common",
      "text": "Left flicks near danger keep more combo."
    },
    {
      "name": "Launcher EX",
      "kind": "Upgrade · Common",
      "text": "Launch cards add stronger enemy delay."
    },
    {
      "name": "Guard Point",
      "kind": "Relic · Common",
      "text": "Left flicks and Guard punish danger harder."
    }
  ],
  "deterministic": true,
  "kinds": [
    "Talent · Common",
    "Upgrade · Common",
    "Relic · Common"
  ]
}
```

Result: PASS

## Check: event room works on 320x568 and advances to elite

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 320 568
"$PWCLI" eval "[jump to Neon Shrine, scroll/click final event choice]"
```

Output observed:

```json
{
  "before": {
    "choices": 3,
    "clientHeight": 343,
    "scrollHeight": 343,
    "touch": "pan-y"
  },
  "rect": {
    "x": 31,
    "y": 301.921875,
    "width": 258,
    "height": 79.484375,
    "bottom": 381.40625
  },
  "overlay": false,
  "stage": "A1 Elite 4/12",
  "playerHp": "100"
}
```

Result: PASS

Screenshot evidence: `output/playwright/phase2-after-event-mobile.png`.

## Check: Route Scout actually sets reward bias

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[choose Route Scout in event room]"
```

Output observed:

```json
{
  "rewardBias": "speed",
  "stage": "A1 Elite 4/12",
  "overlay": false
}
```

Result: PASS

## Check: browser console has no errors

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" console error
```

Output observed:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

VERDICT: PASS
