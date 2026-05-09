# v0.2.10 Card Direction Verification

Date: 2026-05-06

Scope: card exit direction readability, swipe feedback, fade-out animation, and mobile portrait layout.

Checks run:

- `node --check src/game.js`
- Local server mobile viewport `390 x 844`
- Gear selection into combat
- Direct right-direction animation invocation through Playwright
- Real mouse drag from card center to the right
- Browser console error check

Findings:

- Header shows `v0.2.10 飞牌方向`.
- Played cards now leave a temporary ghost card.
- The ghost card flies farther in the final direction and fades out.
- A large direction glyph appears from the card center and follows the same direction.
- Real right swipe resolved to the right-route action.
- The normal card replacement and draw cooldown still continue after the animation.
- Console errors: 0.

Residual risk:

- This verifies one swipe direction with automation and the shared animation path. Manual feel checks should still tune exact travel distance for each direction.
