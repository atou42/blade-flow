# v0.2.7 Visual Versioning Verification

Date: 2026-05-04

Scope: version management presentation, changelog access, route color/icon/shape identity, and mobile portrait layout.

Checks run:

- `node --check src/game.js`
- Local server at `http://127.0.0.1:4273/`
- Playwright mobile viewport `390 x 844`
- Browser console error check

Findings:

- Header shows `v0.2.7 视觉日志` and opens the version panel during combat.
- Gear selection includes a version record entry, so changelog is visible before a run starts.
- Version panel lists `v0.2.7` through `v0.2.0` with visual marks and concise change notes.
- Equipment choices now show route icons and values before names.
- Cards show route color, route sigil, route label, and direction glyphs.
- Route panel changes icon, color, and shape with current route state.
- Console errors: 0.

Residual risk:

- This pass verifies visual presentation and interaction. It does not rebalance combat values.
