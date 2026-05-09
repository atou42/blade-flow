# v0.2.8 Hit Feedback Verification

Date: 2026-05-04

Scope: fighter readability, Boss body, Boss health visibility, attack motion, player damage feedback, and mobile portrait layout.

Checks run:

- `node --check src/game.js`
- Local server at `http://127.0.0.1:4274/`
- Playwright mobile viewport `390 x 844`
- Gear selection into combat
- Player card click
- Natural Boss attack pressure
- Browser console error check

Findings:

- Header shows `v0.2.8 受击反馈`.
- Player figure is smaller and no longer dominates the arena.
- Boss figure is visible above the player with body, core, halo, and weapon.
- Boss HP remains visible at the top of the arena.
- Boss attacks animate downward toward the player.
- Player hit feedback now includes arena flash, player shake, red impact burst, and a red/orange HP bar reaction.
- Player attacks also flash Boss body and Boss HP.
- Console errors: 0.

Residual risk:

- The figures are still abstract geometric placeholders. They now read better as duel bodies, but later art direction should replace them with final silhouettes.
