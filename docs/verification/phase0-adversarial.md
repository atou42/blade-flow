# Phase 0 Adversarial Verification

Date: 2026-05-04

VERDICT: PASS

## Scope

This verification covers the static Phase 0 combat prototype in `index.html`, `styles.css`, and `src/game.js`.

## Checks

Check: JavaScript syntax

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
exit code 0
```

Result: PASS

Check: Static resources and missing path behavior

Command run:

```bash
python3 - <<'PY'
from urllib.request import urlopen
from urllib.error import HTTPError
for path in ['/', '/styles.css', '/src/game.js', '/missing']:
    try:
        with urlopen('http://127.0.0.1:4273'+path, timeout=2) as r:
            print(path, r.status, r.headers.get_content_type())
    except HTTPError as e:
        print(path, e.code, e.headers.get_content_type())
PY
```

Output observed:

```text
/ 200 text/html
/styles.css 200 text/css
/src/game.js 200 text/javascript
/missing 404 text/html
```

Result: PASS

Check: First-read grace period

Command run:

```bash
playwright-cli eval "async () => { await new Promise(r => setTimeout(r, 900)); return {player: document.querySelector('#playerHpText').textContent, intent: document.querySelector('#intentName').textContent, combo: document.querySelector('#comboCount').textContent, cards: [...document.querySelectorAll('.card')].map(c => c.querySelector('.card-name').textContent)}; }"
```

Output observed:

```json
{
  "player": "100",
  "intent": "Waiting",
  "combo": "0",
  "cards": ["Launcher", "Execute", "Overdrive", "Flying Blade"]
}
```

Result: PASS

Check: Four-direction gesture chain

Command run:

```bash
playwright-cli eval "async () => { ...flick right/up/left/down across cards... }"
```

Output observed:

```json
{
  "combo": "4",
  "route": "疾 Speed",
  "enemy": "171",
  "player": "100",
  "log": "Pressing slash: 杀 Burst route +15"
}
```

Result: PASS

Check: Rapid input stress

Command run:

```bash
playwright-cli eval "async () => { ...run 12 rapid flicks with mixed directions... }"
```

Output observed:

```json
{
  "combo": "12",
  "route": "疾 Speed",
  "enemy": "55",
  "player": "100",
  "overlay": false,
  "cards": 4
}
```

Result: PASS

Check: Reset idempotency and tiny movement threshold

Command run:

```bash
playwright-cli eval "async () => { ...click reset twice, tiny move, then right flick... }"
```

Output observed:

```json
{
  "before": {"player": "100", "enemy": "220", "cards": 4},
  "afterTiny": "Ranged cut: 疾 Speed route +8",
  "afterRight": "Piercing blade: 疾 Speed route +8",
  "combo": "2",
  "cards": 4
}
```

Result: PASS

Check: Victory overlay and reset from overlay

Command run:

```bash
playwright-cli eval "async () => { ...play 28 rapid flicks, read overlay, click run it back... }"
```

Output observed:

```json
{
  "won": true,
  "title": "Style Clear",
  "player": "100",
  "enemy": "220",
  "cards": 4,
  "overlayAfterReset": false
}
```

Result: PASS

Check: Mobile tap target size

Command run:

```bash
playwright-cli resize 390 844
playwright-cli eval "() => [...document.querySelectorAll('.card')].map(card => { const r = card.getBoundingClientRect(); return {name: card.querySelector('.card-name').textContent, width: Math.round(r.width), height: Math.round(r.height)}; })"
```

Output observed:

```json
[
  {"name": "Thrust", "width": 77, "height": 142},
  {"name": "Execute", "width": 77, "height": 142},
  {"name": "Flying Blade", "width": 77, "height": 142},
  {"name": "Guard", "width": 77, "height": 142}
]
```

Result: PASS

Check: Browser console

Command run:

```bash
playwright-cli console error
```

Output observed:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

Check: Mobile and desktop screenshots

Command run:

```bash
playwright-cli resize 390 844
playwright-cli screenshot --filename output/playwright/phase0-mobile-clean.png
playwright-cli resize 1280 900
playwright-cli screenshot --filename output/playwright/phase0-desktop-clean.png
```

Output observed:

```text
Screenshots rendered the Blade Flow prototype, not a stale browser page.
No visible overlap was found in the mobile screenshot.
```

Result: PASS

