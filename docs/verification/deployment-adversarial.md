# Deployment Adversarial Verification

Date: 2026-05-04

Live URL: https://games.atou.cc/combo-card-roguelike/versions/a/

Cloudflare Worker: `games-atou-hub`

Deployment version ID: `e386a4ce-2c34-44f5-9e55-37f46782e487`

## Check: Games data and UI generation pass before deploy

Command run:

```bash
cd /Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site
npm run check-games && npm run prepare-games && npm run check-games-ui
```

Output observed:

```text
Validated 6 games in /Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site/data/games-source.json
Generated 6 playable game pages for https://games.atou.cc
Validated back-home invariant for 6 game pages
```

Result: PASS

## Check: local generated site opens all expected paths

Command run:

```bash
python3 -m http.server 8899 --bind 127.0.0.1
python3 - <<'PY'
import urllib.request
for path in ['/', '/combo-card-roguelike/', '/combo-card-roguelike/versions/a/', '/combo-card-roguelike/versions/a/styles.css', '/combo-card-roguelike/versions/a/src/game.js', '/data/games-hub.json']:
    r = urllib.request.urlopen('http://127.0.0.1:8899' + path, timeout=2)
    print(path, r.status, r.headers.get('content-type'))
PY
```

Output observed:

```text
/ 200 text/html
/combo-card-roguelike/ 200 text/html
/combo-card-roguelike/versions/a/ 200 text/html
/combo-card-roguelike/versions/a/styles.css 200 text/css
/combo-card-roguelike/versions/a/src/game.js 200 text/javascript
/data/games-hub.json 200 application/json
```

Result: PASS

## Check: local hub links to the new game and version

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:8899/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[check Blade Flow card links]"
"$PWCLI" open http://127.0.0.1:8899/combo-card-roguelike/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[check back-home and playable version link]"
```

Output observed:

```json
{
  "hasGame": true,
  "playUrl": "https://games.atou.cc/combo-card-roguelike/versions/a/",
  "detailUrl": "http://127.0.0.1:8899/combo-card-roguelike/"
}
```

```json
{
  "title": "Blade Flow - Games",
  "hasBack": true,
  "hasPlay": true
}
```

Result: PASS

## Check: deploy to Cloudflare

Command run:

```bash
cd /Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site
npm run publish-games
```

Output observed:

```text
Validated 6 games in /Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site/data/games-source.json
Generated 6 playable game pages for https://games.atou.cc
Validated back-home invariant for 6 game pages
Uploaded games-atou-hub (18.48 sec)
Deployed games-atou-hub triggers (8.37 sec)
  https://games-atou-hub.sobighead-c.workers.dev
  games.atou.cc (custom domain)
Current Version ID: b3ba946b-822c-480f-b14d-7dbc28caa12d
```

The project report was refreshed after syncing the final source directory. The final deploy returned:

```text
Uploaded games-atou-hub (19.33 sec)
Deployed games-atou-hub triggers (7.97 sec)
  https://games-atou-hub.sobighead-c.workers.dev
  games.atou.cc (custom domain)
Current Version ID: e386a4ce-2c34-44f5-9e55-37f46782e487
```

Result: PASS

## Check: live paths return 200

Command run:

```bash
python3 - <<'PY'
import urllib.request
for path in ['/', '/combo-card-roguelike/', '/combo-card-roguelike/versions/a/', '/combo-card-roguelike/versions/a/styles.css', '/combo-card-roguelike/versions/a/src/game.js', '/data/games-hub.json']:
    req = urllib.request.Request('https://games.atou.cc' + path, headers={'User-Agent': 'Mozilla/5.0 Codex verification'})
    r = urllib.request.urlopen(req, timeout=10)
    print(path, r.status, r.headers.get('content-type'), r.url)
PY
```

Output observed:

```text
/ 200 text/html https://games.atou.cc/
/combo-card-roguelike/ 200 text/html https://games.atou.cc/combo-card-roguelike/
/combo-card-roguelike/versions/a/ 200 text/html https://games.atou.cc/combo-card-roguelike/versions/a/
/combo-card-roguelike/versions/a/styles.css 200 text/css https://games.atou.cc/combo-card-roguelike/versions/a/styles.css
/combo-card-roguelike/versions/a/src/game.js 200 text/javascript https://games.atou.cc/combo-card-roguelike/versions/a/src/game.js
/data/games-hub.json 200 application/json https://games.atou.cc/data/games-hub.json
```

Result: PASS

## Check: live hub, detail page, and playable version work on mobile viewport

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open https://games.atou.cc/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[check Blade Flow card and links]"
"$PWCLI" open https://games.atou.cc/combo-card-roguelike/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[check detail page back-home and play link]"
"$PWCLI" open https://games.atou.cc/combo-card-roguelike/versions/a/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select gear and clear the full twelve-room run]"
"$PWCLI" console error
```

Output observed:

```json
{
  "hasGame": true,
  "playUrl": "https://games.atou.cc/combo-card-roguelike/versions/a/",
  "detailUrl": "https://games.atou.cc/combo-card-roguelike/"
}
```

```json
{
  "title": "Blade Flow - Games",
  "hasBack": true,
  "hasPlay": true
}
```

```json
{
  "title": "Run Clear",
  "stage": "A3 Boss 12/12",
  "rewards": "11 rewards · D260504",
  "actions": 104,
  "eventSeen": true,
  "trainingSeen": true
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

Screenshot evidence: `output/playwright/deployed-phase2-run-clear.png`.

VERDICT: PASS
