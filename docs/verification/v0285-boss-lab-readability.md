# v0.2.85 Boss 实验战可读性验收

日期：2026-05-17

范围：

- 修复 Boss 实验战在手机上浅底白字看不清的问题。
- 确认 Boss 卡和实验预设卡被高对比深底样式覆盖。
- 确认 `?bossLab=1` 仍可打开、套用预设并进入 Boss 战。

验证：

```bash
node --check src/game.js
node --check tools/verify-boss-lab-e2e.playwright.js
```

结果：通过。

本地手机视口 Playwright：

```json
{
  "ok": true,
  "consoleIssues": []
}
```

样式抽样：

```json
{
  "bossCard": {
    "background": "rgba(18, 16, 13, 0.86)",
    "color": "rgb(242, 234, 217)"
  },
  "experimentCard": {
    "background": "rgba(18, 16, 13, 0.88)",
    "color": "rgb(242, 234, 217)"
  }
}
```

截图：

```text
output/boss-lab-readable-v0285.png
```
