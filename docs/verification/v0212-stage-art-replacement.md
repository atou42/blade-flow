# v0.2.12 Stage Art Replacement Verification

Date: 2026-05-07

VERDICT: PASS

The live `games.atou.cc` build now uses the approved clean ink stage direction for the combat screen. The old visible `ink-player.svg`, `ink-boss.svg`, and `ink-splatter.svg` references were removed from shipped `index.html`, `styles.css`, and `src/game.js`.

## Checks

Check: source syntax

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
pass, no output
```

Result: PASS

Check: production assets present and transparent

Command run:

```bash
find assets/art/stage-layout-v1 -type f -maxdepth 1 | sort | wc -l
sips -g hasAlpha assets/art/stage-layout-v1/*.png
```

Output observed:

```text
12
every PNG returned hasAlpha: yes
```

Result: PASS

Check: old visible combat art is not referenced by shipped source

Command run:

```bash
rg -n "ink-player|ink-boss|ink-splatter" \
  public/combo-card-roguelike/versions/a/index.html \
  public/combo-card-roguelike/versions/a/styles.css \
  public/combo-card-roguelike/versions/a/src/game.js || true
```

Output observed:

```text
no matches
```

Result: PASS

Check: Games hub pipeline

Command run:

```bash
npm run check-games
npm run prepare-games
npm run check-games-ui
```

Output observed:

```text
Validated 12 games
Generated 12 playable game pages
Validated back-home invariant for 12 game pages
```

Result: PASS

Check: deployment

Command run:

```bash
npm run publish-games
```

Output observed:

```text
Uploaded 17 files
games.atou.cc (custom domain)
Current Version ID: d5c5bc5c-7395-45d8-996e-60add0306cf9
```

Result: PASS

Check: live asset availability

Command run:

```bash
python3 - <<'PY'
from urllib.request import Request, urlopen
BASE='https://games.atou.cc/combo-card-roguelike/versions/a'
paths=['/','/styles.css','/src/game.js','/assets/art/stage-layout-v1/arena-bg.webp','/assets/art/stage-layout-v1/player-idle.png','/assets/art/stage-layout-v1/player-lunge.png','/assets/art/stage-layout-v1/player-hit.png','/assets/art/stage-layout-v1/boss-idle.png','/assets/art/stage-layout-v1/boss-charge.png','/assets/art/stage-layout-v1/boss-attack.png','/assets/art/stage-layout-v1/boss-damaged.png','/assets/art/stage-layout-v1/vfx-warning-halo.png','/assets/art/stage-layout-v1/vfx-target-beam.png','/assets/art/stage-layout-v1/vfx-down-strike.png','/assets/art/stage-layout-v1/vfx-hit-burst.png']
for path in paths:
    with urlopen(Request(BASE+path+'?v=0212'), timeout=20) as res:
        print(res.status, path, res.headers.get('content-type'))
PY
```

Output observed:

```text
all required paths returned 200
image paths returned image/png or image/webp
```

Result: PASS

Check: live browser smoke, 390 x 844

Command run:

```bash
playwright-cli --session bladelive open https://games.atou.cc/combo-card-roguelike/versions/a/?v=0212
playwright-cli --session bladelive resize 390 844
playwright-cli --session bladelive eval "..."
```

Output observed:

```json
{
  "version": "v0.2.12 美术替换",
  "player": { "src": "./assets/art/stage-layout-v1/player-idle.png", "w": 520, "h": 481 },
  "boss": { "src": "./assets/art/stage-layout-v1/boss-idle.png", "w": 490, "h": 520 },
  "oldRefs": false
}
```

Result: PASS

Check: live attack and Boss hit feedback

Command run:

```bash
playwright-cli --session bladelive eval "resetGame(); startRun(equipmentPool[0]); playCard(0, 'up'); ..."
playwright-cli --session bladelive eval "enemyAttack('进攻', 1); ..."
```

Output observed:

```json
{
  "combo": "1",
  "playerSrc": "./assets/art/stage-layout-v1/player-lunge.png",
  "bossSrc": "./assets/art/stage-layout-v1/boss-damaged.png",
  "slashCount": 1
}
{
  "playerSrc": "./assets/art/stage-layout-v1/player-hit.png",
  "bossSrc": "./assets/art/stage-layout-v1/boss-attack.png",
  "vfxCount": 4,
  "playerHit": true
}
```

Result: PASS

Check: live mobile layout, 430 x 932

Command run:

```bash
playwright-cli --session bladelive resize 430 932
playwright-cli --session bladelive eval "..."
```

Output observed:

```json
{
  "viewport": [430, 932],
  "cards": 4,
  "version": "v0.2.12 美术替换"
}
```

The Boss and player boxes remained vertically separated in the arena.

Result: PASS

Check: overlay controls and console

Command run:

```bash
playwright-cli --session bladelive eval "open and close version panel, open and close tuner"
playwright-cli --session bladelive console
```

Output observed:

```text
version panel opened and closed
tuner panel opened and closed
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS
