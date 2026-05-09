# v0.2.13 UI Style Unification Verification

Date: 2026-05-07

VERDICT: PASS

The live build now uses the clean ink duel visual language across the UI, not only inside the arena. HUD panels, combat cards, draw queue, weapon selection, tuner, notebook, and version log were restyled to match the approved stage art direction.

## Checks

Check: source syntax and old visible art references

Command run:

```bash
node --check src/game.js
rg -n "ink-player|ink-boss|ink-splatter" index.html styles.css src/game.js || true
```

Output observed:

```text
node --check passed
no old visible combat art references
```

Result: PASS

Check: local mobile UI, 390 x 844

Command run:

```bash
playwright-cli --session bladeui open http://127.0.0.1:8897/?local=0213
playwright-cli --session bladeui resize 390 844
playwright-cli --session bladeui screenshot
```

Output observed:

```text
weapon selection rendered with v0.2.13 界面统一
choice cards, route icons, and paper/ink panels were readable
```

Result: PASS

Check: local combat and overlays

Command run:

```bash
playwright-cli --session bladeui click 风暴太刀
playwright-cli --session bladeui eval "open/close tuner, version log, notebook"
```

Output observed:

```json
{
  "tuner": true,
  "version": true,
  "notebook": true,
  "closed": true
}
```

Result: PASS

Check: local 430 x 932 viewport

Command run:

```bash
playwright-cli --session bladeui resize 430 932
playwright-cli --session bladeui eval "..."
```

Output observed:

```json
{
  "viewport": [430, 932],
  "version": "v0.2.13 界面统一",
  "cards": 4,
  "oldRefs": false
}
```

Result: PASS

Check: Games hub pipeline and deployment

Command run:

```bash
npm run check-games
npm run prepare-games
npm run check-games-ui
npm run publish-games
```

Output observed:

```text
Validated 12 games
Generated 12 playable game pages
Validated back-home invariant for 12 game pages
Uploaded 5 files
Current Version ID: 1fb87382-f31e-4427-be91-234eabac0c12
```

Result: PASS

Check: live HTTP and hub data

Command run:

```bash
python3 live URL probe for page, styles.css, src/game.js, and games-hub.json
```

Output observed:

```text
all checked URLs returned 200
games hub returned score v0.2.13 and title v0.2.13 界面统一
```

Result: PASS

Check: live browser smoke

Command run:

```bash
playwright-cli --session bladeuilive open https://games.atou.cc/combo-card-roguelike/versions/a/?v=0213
playwright-cli --session bladeuilive resize 390 844
playwright-cli --session bladeuilive eval "..."
playwright-cli --session bladeuilive resize 430 932
playwright-cli --session bladeuilive console
```

Output observed:

```json
{
  "version": "v0.2.13 界面统一",
  "hasChoice": true,
  "player": 520,
  "boss": 490,
  "oldRefs": false
}
{
  "equipped": "风暴太刀",
  "cards": 4,
  "tuner": true,
  "version": true,
  "overlayClosed": true
}
```

Console output:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS
