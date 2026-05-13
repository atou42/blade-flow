# v0.2.78 Fast Three-Stage Intercept Verification

Date: 2026-05-11

Scope:

- Fast Boss left-flick defense should not be a single tiny pass/fail timing check.
- Early readable prep, perfect confirm, and late hit phases should all interrupt the fast attack.
- Rewards must differ by timing quality.

Acceptance target:

- Fast timeline is `confirm: 360ms`, `hit: 160ms`, `recover: 220ms`.
- Early readable prep left-flick returns `early-left-intercept`, interrupts, uses normal `700ms` recovery, and logs `预读截手，打断快刀但收益低。`
- Confirm left-flick returns `perfect-left`, interrupts, uses `210ms` recovery, and logs `快刀左划拦截，闪反打断。`
- Hit left-flick returns `late-left-intercept`, interrupts, uses `820ms` recovery, and logs `险截救回，打断了但后摇很重。`

Local verification:

- `node --check src/game.js` passed.
- `node --check public/combo-card-roguelike/versions/a/src/game.js` passed.
- `npm run check-games`, `npm run prepare-games`, and `npm run check-games-ui` passed.
- Browser probe at `390x844` with `?debug=1` showed `v0.2.78 三段截手`.
- Debug read matrix returned fast timeline `confirm: 360`, `hit: 160`, `recover: 220`.
- Fast prep left-flick label `预读左划`, result `early-left-intercept`, recovery `700`, interrupt `true`.
- Fast confirm left-flick label `左划拦截`, result `perfect-left`, recovery `210`, interrupt `true`.
- Fast hit left-flick label `险截`, result `late-left-intercept`, recovery `820`, interrupt `true`.
- `.blade` computed display remained `none`.
- Browser console had 0 errors and 0 warnings.

Live verification:

- Published to Cloudflare version `1a126ece-d630-441f-ab2b-1d4bdebe0088`.
- `https://games.atou.cc/combo-card-roguelike/versions/a/` references `styles.css?v=0.2.78` and `src/game.js?v=0.2.78`.
- Live `src/game.js?v=0.2.78` contains `fast: { confirm: 360, hit: 160, recover: 220 }`, `early-left-intercept`, and `late-left-intercept`.
- Live browser probe at `390x844` with `?debug=1&v=0.2.78` matched local three-stage results and had 0 console errors or warnings.
