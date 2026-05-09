# v0.2.1 Combo Notebook Adversarial Verification

Date: 2026-05-04

Scope: in-combat Combo Notebook overlay, mobile viewport, pause behavior, close behavior, and console cleanliness.

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

## Check: notebook opens after gear selection and displays expected combat guidance

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open http://127.0.0.1:4273 --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Storm Katana, open notebook, wait, close notebook]"
"$PWCLI" console error
```

Output observed:

```json
{
  "open": {
    "title": "Combo Notebook",
    "sections": 4,
    "text": true
  },
  "hpBefore": "100",
  "hpPaused": "100",
  "overlayClosed": true,
  "stage": "A1 Fight 1/12"
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

Screenshot evidence: `output/playwright/v021-notebook-mobile.png`.

## Check: deployed notebook works on `games.atou.cc`

Command run:

```bash
PWCLI=/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh
"$PWCLI" open https://games.atou.cc/combo-card-roguelike/versions/a/ --browser chromium
"$PWCLI" resize 390 844
"$PWCLI" eval "[select Storm Katana, open notebook, close notebook]"
"$PWCLI" console error
```

Output observed:

```json
{
  "title": "Combo Notebook",
  "sections": 4,
  "text": true,
  "stage": "A1 Fight 1/12",
  "closed": true
}
```

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Cloudflare version ID: `c4a15908-1056-448a-bf98-5b3921330ec6`.

Result: PASS

VERDICT: PASS
