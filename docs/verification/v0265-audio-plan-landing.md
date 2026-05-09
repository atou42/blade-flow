# v0.2.65 Audio Plan Landing Verification

VERDICT: PASS

Scope:

- Land the audio integration plan in runtime behavior.
- Fix first-tap mute so it behaves as a real audio switch.
- Ensure normal, daily, and training battle starts all trigger `uiBattleStart`.
- Re-run local and live browser acceptance for SFX triggers, mute, low-power behavior, and debug state.

Changes landed:

- `toggleMenuBgm()` now marks audio as unlocked on first button tap, then toggles enabled state instead of only starting music.
- `startDailyRun()` and `startTrainingLesson()` now trigger `uiBattleStart`, matching normal `startRun()`.
- Version label advanced to `v0.2.65 音频方案落地`.

## Static Checks

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
syntax passed
```

Command run:

```bash
find assets/audio -type f -name '*.mp3' | wc -l
find assets/audio/sfx -type f -name '*.mp3' | wc -l
find assets/audio/bgm -type f -name '*.mp3' | wc -l
```

Output observed:

```text
formal_audio_count=52
sfx_count=35
bgm_count=17
```

Command run:

```bash
find assets/audio -type f -name '*.mp3' -print0 | xargs -0 -n1 ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1
```

Output observed:

```text
decode_bad=0
decoded_files=52
```

Command run:

```bash
rg -o '"\./assets/audio/[^"]+\.mp3"' src/game.js
comm -23 /tmp/blade-flow-audio-refs.txt /tmp/blade-flow-audio-files.txt
comm -13 /tmp/blade-flow-audio-refs.txt /tmp/blade-flow-audio-files.txt
```

Output observed:

```text
missing_refs=0
unreferenced_audio=10
referenced_sfx=35
```

The 10 unreferenced files are the reserved route, Boss threat, settlement, and old alternate BGM tracks.

## Local Browser Checks

Local URL:

```text
http://127.0.0.1:8102/?debug=1&v=0265-audio-landing
```

First mute tap:

```text
initial: enabled=true unlocked=false activeKey=menu
afterFirstMute: enabled=false unlocked=true paused=true recentSfx=uiMuteToggle lastError=""
afterEnable: enabled=true unlocked=true activeKey=menu paused=false lastError=""
```

Normal battle start and right-flick Storm Katana:

```text
afterNormalStart: scene=battle activeKey=act1 recentSfx includes uiBattleStart
afterRightFlick: recentSfx includes playerCardPress, playerCardRelease, playerFlickRight, weaponStormKatana, bossTakeHit, bossEvade
loaded press/release/right/weapon=true
lastError=""
```

Boss tell coverage:

```text
recentSfx includes bossFastTell, bossSlowTell, bossFeintTell, bossRetreatTell, bossGroundGrabTell
lastError=""
```

Daily and training battle starts:

```text
daily: scene=battle activeKey=act1 recentSfx includes uiBattleStart lastError=""
training: returned=true scene=battle activeKey=act1 recentSfx includes uiBattleStart lastError=""
```

Muted Boss tell probe:

```text
enabled=false
recentSfx length before=16
recentSfx length after forceBossMove("fast")=16
lastError=""
```

Low-power probe:

```text
profile=0
playSfx("bossTakeHit")=false
playSfx("playerCardPress")=false
playSfx("bossFastTell")=true
lastError=""
```

Five-second audio-on performance probe:

```text
actions=6
longTasks=0
longTaskDuration=0
loadedSfxCount=21
lastError=""
```

Mobile viewport console check:

```text
viewport=390x844
console errors=0
console warnings=0
screenshot=.playwright-cli/page-2026-05-09T10-05-44-897Z.png
```

## Deployment

Canonical package updated:

```text
/Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site/public/combo-card-roguelike/versions/a/
```

Command run:

```bash
npm run check-games && npm run prepare-games && npm run publish-games
```

Output observed:

```text
Validated 13 games
Generated 13 playable game pages
Validated back-home invariant for 13 game pages
Uploaded 4 files
games.atou.cc (custom domain)
Current Version ID: f03d06a3-1859-40f0-9328-77cf63e6d532
```

## Live Checks

Command run:

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=0265-live-curl' | rg -n 'v0\.2\.65|音频方案落地'
```

Output observed:

```text
v0.2.65 音频方案落地
```

Command run:

```bash
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=0265-live-curl' | rg -n 'combo-card-roguelike|v0\.2\.65|音频方案落地'
```

Output observed:

```text
score: v0.2.65
title: v0.2.65 音频方案落地
```

Live browser URL:

```text
https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0265-live-audio
```

Output observed:

```text
versionText="v0.2.65 音频方案落地"
firstMute: enabled=false unlocked=true recentSfx=uiMuteToggle lastError=""
afterCombat activeKey=act1
recentSfx includes uiBattleStart, playerCardPress, playerCardRelease, playerFlickRight, weaponStormKatana, bossTakeHit, bossEvade, bossFastTell, bossSlowTell, bossFeintTell, bossRetreatTell, bossGroundGrabTell
lastError=""
console errors=0
console warnings=0
```
