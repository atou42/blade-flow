# v0.2.84 Boss 实验战验收

日期：2026-05-17

## 范围

这一版把 Boss 调试台开放为主菜单里的 Boss 实验战，并支持 `?bossLab=1` 直达。新增四个实验预设：教学容错、回血护盾、破势爆发、赤线压力。导出页显示最近实验结果，方便比较同一 Boss 的多次调参。

## 验证

通过 `node --check src/game.js`。

通过 `node --check tools/verify-boss-lab-e2e.playwright.js`。

本地服务 `http://127.0.0.1:4185/?bossLab=1` 返回 `200 5661`。

使用 Chromium 手机视口 390x844 验证公开直达入口、实验预设套用、开战、强制 Boss 死亡结算、返回实验台、最近结果显示。结果：

```json
{
  "title": "Boss 实验战",
  "presetCount": 4,
  "message": "已套用实验：风暴队长 回血护盾",
  "room": "风暴队长",
  "act": 1,
  "openingHand": ["guard", "shadow-step", "breaker", "quick-slash"],
  "resultTitle": "实验战胜利",
  "resultHasFirstHit": true,
  "recentHasWin": true,
  "errors": []
}
```

复验底部按钮文字可读性，`挑战此 Boss`、`复制配置`、`保存预设` 均有可见文本。截图输出：`output/boss-lab-e2e.png`。

## 结论

公开 Boss 实验战入口和单 Boss 实验预设可用。调试战仍不写入正式成长档。
