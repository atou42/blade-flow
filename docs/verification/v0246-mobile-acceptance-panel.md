# v0.2.46 真机长测入口验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 5 移动端质量缺口。此前已有浏览器长测探针，但真实手机发热和手感没有稳定记录入口。v0.2.46 在武器选择页新增“真机长测”，允许手机浏览器直接跑 60 秒省电档，并把发热、手感、设备和备注与探针结果一起保存到本地浏览器。

## 已落地内容

- 首页武器选择面板新增 `真机长测` 入口。
- 真机长测面板可跑 60 秒省电档自动长测。
- 面板保存设备、发热、手感、备注和自动探针结果。
- 记录写入 `blade-flow-mobile-acceptance-v1`，最多保留 8 条。
- 调试接口新增 `runMobileAcceptanceProbe`、`mobileAcceptanceRecords`、`clearMobileAcceptanceRecords`。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

本地功能验收覆盖：

- 武器选择页能看到 `真机长测`。
- 面板能打开。
- 5 秒调试长测能完成。
- 未跑长测时不能保存假记录。
- 跑完长测后能保存发热和手感记录。
- 记录能从调试接口读回。

本地 Playwright 结果：

```json
{
  "version": "v0.2.46 真机长测",
  "hasButton": true,
  "panelTitle": "真机长测",
  "saveBeforeProbe": "先跑一次长测，再保存记录。",
  "panelAfterRun": true,
  "statusAfterRun": "完成 6 秒，6 招，长任务 0 次，残留 0/0/0。",
  "records": 1,
  "latest": {
    "version": "v0.2.46",
    "device": "Playwright mobile viewport",
    "heat": "温",
    "feel": "顺滑",
    "duration": 6144,
    "actions": 6,
    "slashNodes": 0,
    "impactNodes": 0,
    "comboNodes": 0
  }
}
```

本地截图证据：

- `.playwright-cli/page-2026-05-08T15-08-49-059Z.png`

## 线上验收

部署地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=046-mobile-qa-live`。

Cloudflare Current Version ID：`7b29f857-36f5-4718-b0c5-e186fb1b92bd`。

线上功能验收：

```json
{
  "version": "v0.2.46 真机长测",
  "hasButton": true,
  "panelTitle": "真机长测",
  "saveBeforeProbe": "先跑一次长测，再保存记录。",
  "panelAfterRun": true,
  "statusAfterRun": "完成 6 秒，6 招，长任务 0 次，残留 0/0/0。",
  "records": 1,
  "latest": {
    "version": "v0.2.46",
    "device": "Playwright live mobile viewport",
    "heat": "温",
    "feel": "顺滑",
    "duration": 6048,
    "actions": 6,
    "slashNodes": 0,
    "impactNodes": 0,
    "comboNodes": 0
  }
}
```

线上正式入口和 Games Hub 均返回 `v0.2.46 真机长测`。

线上 60 秒默认长测探针：

```json
{
  "duration": 61228,
  "actions": 61,
  "overlays": 19,
  "rewardsHandled": 5,
  "pathsHandled": 8,
  "longTasks": 3,
  "longTaskDuration": 189,
  "domNodes": 159,
  "heapUsed": 3357037,
  "act": 2,
  "encounterIndex": 2,
  "profile": 0,
  "label": "save",
  "slashNodes": 0,
  "impactNodes": 0,
  "comboNodes": 0
}
```

线上截图证据：

- `.playwright-cli/page-2026-05-08T15-13-57-661Z.png`

## 剩余风险

这个版本把真实手机记录入口做进线上版本，并证明默认 60 秒长测能在线上跑完，但不能替代实际手机测试。完整 goal 仍需要在真实手机上跑一次或多次 60 秒长测，并把发热、手感和截图记录回验收文档。
