# Phase 1 Adversarial Verification

Date: 2026-05-04

Scope: roguelike vertical slice with gear selection, six-fight act progression, reward picks, run clear, mobile overlay behavior, run HUD compression, health carry-over, and Combo Lantern drain behavior.

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

## Check: static resources resolve and missing paths fail

Command run:

```bash
python3 - <<'PY'
import urllib.request
for path in ['/', '/styles.css', '/src/game.js', '/missing']:
    try:
        r = urllib.request.urlopen('http://127.0.0.1:4273' + path, timeout=2)
        print(path, r.status, r.headers.get('content-type'))
    except Exception as e:
        print(path, type(e).__name__, getattr(e, 'code', ''))
PY
```

Output observed:

```text
/ 200 text/html
/styles.css 200 text/css
/src/game.js 200 text/javascript
/missing HTTPError 404
```

Result: PASS

## Check: small mobile gear overlay can scroll and the last gear can be selected

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 320 568
"$PWCLI" eval "[gear overlay scroll and click probe]"
```

Output observed:

```json
{
  "before": {
    "choices": 6,
    "panelClientHeight": 504,
    "panelScrollHeight": 519,
    "overlayTouch": "pan-y",
    "panelTouch": "pan-y"
  },
  "lastRect": {
    "x": 31,
    "y": 396.1875,
    "width": 258,
    "height": 65.5625,
    "bottom": 461.75
  },
  "afterClick": {
    "overlay": false,
    "equipment": "Duelist's Scabbard",
    "stage": "Act 1 · Fight 1/6"
  },
  "stripNoOverlap": true
}
```

Result: PASS

Screenshot evidence: `output/playwright/phase1-mobile-gear-compact.png`.

## Check: reward flow advances to the next encounter

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Storm Katana, flick until win, choose reward]"
```

Output observed:

```json
{
  "start": {
    "stage": "Act 1 · Fight 1/6",
    "equipment": "Storm Katana",
    "overlay": false
  },
  "reward": {
    "title": "Style Clear",
    "rewardCount": 3
  },
  "afterChoice": {
    "stage": "Act 1 · Fight 2/6",
    "rewards": "1 rewards",
    "enemy": "Back-Alley Guard",
    "overlay": false
  }
}
```

Result: PASS

## Check: full six-fight run reaches Act 3 clear

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Executioner, clear all fights, choose rewards]"
```

Output observed:

```json
{
  "title": "Run Clear",
  "stage": "Act 3 · Fight 6/6",
  "rewards": "5 rewards",
  "playerHp": "100",
  "guards": 66
}
```

Result: PASS

## Check: health carries forward instead of refilling every fight

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[set playerHp to 74, end fight, choose reward]"
```

Output observed:

```json
{
  "title": "Style Clear",
  "stage": "Act 1 · Fight 2/6",
  "playerHp": "92",
  "statePlayerHp": 92
}
```

Result: PASS

## Check: enemy pressure damages player after combat starts

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Mirror Fan, tap once, wait 12 seconds]"
```

Output observed:

```json
{
  "afterAction": {
    "hp": "100",
    "intent": "Street Cutter strike",
    "combo": "1",
    "access": "object"
  },
  "afterWait": {
    "hp": "87",
    "intent": "Street Cutter strike",
    "combo": "0"
  }
}
```

Result: PASS

## Check: Combo Lantern now slows combo charge drain

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[compare 1 second decay with no lantern and with lantern]"
```

Output observed:

```json
{
  "noLantern": 61.24850000000003,
  "withLantern": 68.58369565217389,
  "slowed": true
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
