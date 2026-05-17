# v0.2.87 进战与受击节奏验收

日期：2026-05-17

范围：

- 选关后不再等待整套战斗资源预热。
- Boss 实验战开始不再卡在调试台。
- Boss 命中玩家后增加恢复间隔，标准难度避免连续压招。

验证：

```bash
node --check src/game.js
```

本地手机视口 Playwright：

```json
{
  "ok": true,
  "introMs": 528,
  "battleMs": 292,
  "debugBattleMs": 412,
  "hpBefore": 125,
  "hpAfter": 109,
  "intentMax": 2200,
  "intentTime": 2920,
  "graceMs": 720,
  "issues": []
}
```

Boss 实验战回归：

```json
{
  "ok": true,
  "consoleIssues": []
}
```
