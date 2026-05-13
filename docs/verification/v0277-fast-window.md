# v0.2.77 Fast Window Verification

Date: 2026-05-11

Scope:

- Fast Boss attack confirm window should be human-reactable on mobile.
- The `左划拦截` prompt must remain visible throughout the confirm phase.
- Fast confirm left-flick should still interrupt the Boss.
- Early and late reads must still produce different feedback.

Acceptance target:

- Fast timeline confirm window is `520ms`.
- Fast timeline hit window is `120ms`.
- Fast confirm debug state reads `左划拦截`.
- Fast confirm left-flick resolves as `perfect-left`, interrupts the Boss, and logs `快刀左划拦截，闪反打断`.

Local verification:

- `node --check src/game.js` passed.
- `node --check public/combo-card-roguelike/versions/a/src/game.js` passed.
- `npm run check-games`, `npm run prepare-games`, and `npm run check-games-ui` passed.
- Browser probe at `390x844` with `?debug=1` showed `v0.2.77 快刀可反`.
- Debug timeline returned `fast.confirm = 520`, `fast.hit = 120`, `fast.recover = 220`.
- Fast confirm state returned `左划拦截`; fast confirm left-flick returned `perfect-left`, `interrupt: true`.
- Fast hit state returned `已贴身`.
- `.blade` computed display remained `none`.
- Browser console had 0 errors and 0 warnings.

Live verification:

- Published to Cloudflare version `133fa84a-87e4-423c-b588-23bab78ec1e0`.
- `https://games.atou.cc/combo-card-roguelike/versions/a/` references `styles.css?v=0.2.77` and `src/game.js?v=0.2.77`.
- Live `src/game.js?v=0.2.77` contains `fast: { confirm: 520, hit: 120, recover: 220 }`.
- Live browser probe at `390x844` with `?debug=1&v=0.2.77` matched the local results and had 0 console errors or warnings.
