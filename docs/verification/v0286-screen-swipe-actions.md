# v0.2.86 全屏滑动出招验收

日期：2026-05-17

范围：

- 战斗区任意位置滑动触发方向动作。
- 出招不再要求点中某张手牌。
- 四个方向使用固定动作语义，手牌不会因为方向出招被消耗。

验证：

```bash
node --check src/game.js
```

本地手机视口 Playwright：

```json
{
  "ok": true,
  "results": [
    { "direction": "up", "cardId": "chase-cut", "handStable": true },
    { "direction": "left", "cardId": "guard", "handStable": true },
    { "direction": "right", "cardId": "breaker", "handStable": true },
    { "direction": "down", "cardId": "shadow-step", "handStable": true }
  ],
  "issues": []
}
```

截图：

```text
output/screen-swipe-v0286.png
```
