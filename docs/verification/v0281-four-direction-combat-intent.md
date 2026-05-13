# v0.2.81 Four-Direction Combat Intent Verification

Date: 2026-05-13

Scope: first playable pass for the four-direction combat intent rebuild.

Verified build:
- `index.html` and `src/game.js` cache bust: `v0.2.81`
- Local URL: `http://127.0.0.1:4173/`
- Browser viewport: `430 x 932`

Checks:
- `node --check src/game.js` passed.
- Mobile snapshot showed `v0.2.81 四向意图`, the weapon picker text `上追身，左破招，右重刀，下撤身`, and updated weapon/reward descriptions.
- Read matrix probe passed the intended semantics:
  - fast prep + left: `early-left-intercept`, `白裂预破`, low reward.
  - fast confirm + left: `perfect-left`, `白裂破招，快刀截断`.
  - feint fake + left: `left-whiff`, `空破，被假抬手骗了`.
  - heavy confirm + right: `break-confirm`, `金裂破势，重刀截断`.
  - heavy confirm + left: `left-deflect`, `金裂太重，快刀不破`.
  - backstep confirm + up: `early-chase`, `追早了，撞上横切`.
  - backstep recover + up: `backstep-chase`, `露空上追，保住连击`.
  - ground-grab prep + down: `retreat-return`, `撤出脚下危险，断连回手`.
  - ground-grab confirm + right: `break-confirm`, `金裂破势，重刀截断`.
- Action commitment probe at 90ms intervals accepted only the first of four rapid swipes; right whiff recovery was `1240ms`, following left/down/up attempts were blocked.
- Right-greed probe on fast confirm returned `heavy-whiff`, feedback `重刀贪早，被抢招`, recovery `1240ms`.
- Down-retreat probe on ground-grab prep returned `retreat-return`, recovery `520ms`, draw timer shortened to `108ms`, no interrupt.
- Storm Captain mixed-room probe jumped to act 1 index 7 and confirmed the room as `风暴队长` / `boss` / `storm`. In that boss room:
  - backstep recover + up returned `backstep-chase`.
  - fast confirm + left returned `perfect-left`.
  - heavy confirm + right returned `poise-hit`.
  - ground-grab prep + down returned `retreat-return`.
- Poise probe used right swipes:
  - right poise hit applied `1.5` poise damage and `440ms` recovery.
  - second right broke poise, entered vulnerability, and drew immediately.
  - full-hand right break also entered vulnerability and drew immediately.
- SFX state confirmed remapped gesture tracks are decoded before use:
  - `playerFlickUp`, `playerFlickRight`, `playerFlickLeft`, `playerFlickDown` all `decoded: true`.
  - battle warm events showed `failed: 0`.
- Swipe probe after reload:
  - `dispatchDurations`: `16.6, 2.9, 3.3, 3.6, 0.2, 0.3`
  - `resourceCount`: `0`
  - `warmReady`: `true`
  - `audioLastError`: empty
- Console error check: `0` errors, `0` warnings.
- Screenshot artifact: `.playwright-cli/element-2026-05-13T02-18-38-893Z.png`

Residual note:
- One combined long performance probe was polluted by a preceding page state and produced a large spike. A clean reload swipe probe did not reproduce it and showed zero resource fetches on swipe.
