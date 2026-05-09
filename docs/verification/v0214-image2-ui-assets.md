# v0.2.14 Image2 UI Assets Verification

Date: 2026-05-07

VERDICT: PASS

The UI pass now uses image2-generated production assets instead of only CSS color styling. The generated material sheet lives under `assets/generated/v0.4/`, and the sliced production UI textures live under `assets/art/ui-ink-v1/`.

## Checks

Check: image2 generation output

Command run:

```bash
python ~/.codex/skills/image2/scripts/image2.py \
  --size 2k-square \
  --output-dir assets/generated/v0.4 \
  --base-name bf-v04-ui-material-sheet \
  --image https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/stage-layout-v1/arena-bg.webp?v=0213 \
  --prompt "clean ink duel UI material sheet ..."
```

Output observed:

```text
assets/generated/v0.4/bf-v04-ui-material-sheet_001.png
assets/generated/v0.4/bf-v04-ui-material-sheet_response.json
```

Result: PASS

Check: production UI textures

Command run:

```bash
find assets/art/ui-ink-v1 -maxdepth 1 -type f -print | sort | xargs -n 1 file
du -h assets/art/ui-ink-v1/*
```

Output observed:

```text
ui-panel.webp    image/webp
ui-card.webp     image/webp
ui-overlay.webp  image/webp
ui-control.webp  image/webp
all files are under 130 KB each
```

Result: PASS

Check: source syntax and references

Command run:

```bash
node --check src/game.js
rg -n "ui-ink-v1|v0\\.2\\.14|image2" index.html styles.css src/game.js README.md
rg -n "ink-player|ink-boss|ink-splatter" index.html styles.css src/game.js || true
```

Output observed:

```text
node --check passed
v0.2.14 and ui-ink-v1 references are present
no old visible combat art references
```

Result: PASS

Check: local browser smoke

Command run:

```bash
playwright-cli --session bladeimgui open http://127.0.0.1:8897/?local=0214
playwright-cli --session bladeimgui resize 390 844
playwright-cli --session bladeimgui eval "..."
```

Output observed:

```json
{
  "version": "v0.2.14 image2 UI",
  "uiPanel": true,
  "hasChoice": true,
  "cardBg": true,
  "panelBg": true
}
```

Result: PASS

Check: local combat and overlays

Command run:

```bash
playwright-cli --session bladeimgui click 风暴太刀
playwright-cli --session bladeimgui eval "open tuner and version log"
playwright-cli --session bladeimgui resize 430 932
playwright-cli --session bladeimgui console
```

Output observed:

```json
{
  "version": "v0.2.14 image2 UI",
  "cards": 4,
  "oldRefs": false
}
```

Console output:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
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
Uploaded 9 files
Current Version ID: 6cbcc4ba-b924-419b-900c-0fd7ce1889ed
```

Result: PASS

Check: live URLs and hub data

Command run:

```bash
python3 live URL probe for page, styles.css, src/game.js, ui-panel.webp, ui-card.webp, ui-overlay.webp, ui-control.webp, and games-hub.json
```

Output observed:

```text
all checked URLs returned 200
games hub returned score v0.2.14 and title v0.2.14 image2 UI
```

Result: PASS

Check: live browser smoke

Command run:

```bash
playwright-cli --session bladeimglive open https://games.atou.cc/combo-card-roguelike/versions/a/?v=0214
playwright-cli --session bladeimglive resize 390 844
playwright-cli --session bladeimglive eval "..."
playwright-cli --session bladeimglive resize 430 932
playwright-cli --session bladeimglive console
```

Output observed:

```json
{
  "version": "v0.2.14 image2 UI",
  "choice": true,
  "uiPanel": true,
  "cardBg": true,
  "panelBg": true,
  "oldRefs": false
}
{
  "equipped": "风暴太刀",
  "cards": 4,
  "cardBg": true,
  "tuner": true,
  "version": true,
  "closed": true
}
```

Console output:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS
