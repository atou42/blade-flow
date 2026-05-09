# v0.2.64 SFX Integration Verification

Verdict: PASS.

Scope:

- Count and decode the formal audio assets.
- Confirm every formal SFX file is referenced by runtime code.
- Confirm generated originals remain under `assets/generated/audio/v0.1/`.
- Confirm browser-triggered player, weapon, Boss, UI, mute, and low-power-safe behavior.

Checks run:

```text
node --check src/game.js
```

Result: syntax passed.

```text
find assets/audio -type f -name '*.mp3' | wc -l
find assets/audio/sfx -type f -name '*.mp3' | wc -l
find assets/audio/bgm -type f -name '*.mp3' | wc -l
find assets/generated/audio/v0.1 -type f | wc -l
```

Result:

```text
formal_audio_count=52
sfx_count=35
bgm_count=17
raw_audio_count=72
```

```text
ffprobe -v error ... each assets/audio/*.mp3
```

Result:

```text
decode_bad=0
```

Runtime reference check:

```text
rg -o 'file: "\./assets/audio/[^"]+"' src/game.js
comm -23 /tmp/audio-refs.txt /tmp/audio-files.txt
comm -13 /tmp/audio-refs.txt /tmp/audio-files.txt
```

Result:

- No missing referenced file.
- All 35 SFX files are referenced.
- Unreferenced formal files are the 8 route/Boss/settlement BGM layers plus 2 older BGM alternates, kept as reserves.

Browser probes:

```text
http://127.0.0.1:8101/?debug=1&v=0264-sfx-local
```

Player and weapon action probe produced:

```text
playerCardPress
playerCardRelease
playerFlickRight
weaponStormKatana
bossTakeHit
bossEvade
```

Boss tell probe produced:

```text
bossFastTell
bossSlowTell
bossFeintTell
bossRetreatTell
bossGroundGrabTell
bossDeath
```

Mute probe result:

```text
enabled=false
loadedFast=false
lastError=""
```

Five-second audio-on probe:

```text
actions=8
longTasks=0
longTaskDuration=0
loadedSfxCount=13
lastError=""
```

Recent triggered SFX included player flick up/right/left/down, weapon Storm Katana, Boss slow tell, perfect counter, Boss blocked, player stance break, and Boss stance break.
