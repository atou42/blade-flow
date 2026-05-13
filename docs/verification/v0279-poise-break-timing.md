# v0.2.79 Poise Break Timing Verification

Date: 2026-05-12

Scope:

- Slow-armored heavy Boss attacks must give the player enough real time to break poise.
- Three poise layers should be breakable by two ordinary down-flick poise hits.
- The first poise hit should not use full heavy recovery.

Acceptance target:

- Heavy timeline is `confirm: 900ms`, `hit: 160ms`, `recover: 320ms`.
- Ordinary down-flick poise damage is `1.5`.
- First down-flick against three poise layers returns `poise-hit`, `recoveryMs: 360`, and leaves `1.5` layers worth of poise.
- Second down-flick after waiting out recovery returns `poise-break`, `recoveryMs: 190`, interrupts the Boss, and enters vulnerability.

Local verification:

- `node --check src/game.js` passed.
- `node --check public/combo-card-roguelike/versions/a/src/game.js` passed.
- `npm run check-games`, `npm run prepare-games`, and `npm run check-games-ui` passed.
- Browser probe at `390x844` with `?debug=1` showed `v0.2.79 护势可破`.
- Debug timeline returned `heavy.confirm = 900`, `heavy.hit = 160`, `heavy.recover = 320`.
- Real chain probe started with 3 poise layers.
- First ordinary down-flick returned `poise-hit`, `poiseDamage: 1.5`, `recoveryMs: 360`, and left `remaining: 2`, `progress: 0.5`.
- After waiting for natural recovery, second ordinary down-flick was not blocked, returned `poise-break`, `poiseDamage: 1.5`, `recoveryMs: 190`, `interrupt: true`, and entered vulnerability.
- Browser console had 0 errors and 0 warnings.

Live verification:

- Published to Cloudflare version `1cdbd9ca-7427-4fdb-b5e4-52cac104361f`.
- `https://games.atou.cc/combo-card-roguelike/versions/a/` references `styles.css?v=0.2.79` and `src/game.js?v=0.2.79`.
- Live `src/game.js?v=0.2.79` contains `heavy: { confirm: 900, hit: 160, recover: 320 }` and the shortened poise-hit recovery path.
- Live browser probe at `390x844` with `?debug=1&v=0.2.79` matched the local two-down-flick poise-break results and had 0 console errors or warnings.
