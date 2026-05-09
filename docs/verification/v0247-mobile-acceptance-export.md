# v0.2.47 真机长测记录导出验收

v0.2.46 已把真机长测入口做进线上版本，但记录只留在手机本地。v0.2.47 补上“复制最新记录”，让手机跑完后可以把真实设备的发热、手感和探针结果发回，用于补齐 `remaining-spec-high-standard-goal.md` 的最终真机证据。

## 已落地内容

- 真机长测面板新增 `复制最新记录`。
- 复制内容是结构化 JSON，包含设备、发热、手感、备注和探针数据。
- 如果浏览器拒绝剪贴板权限，会显示可手动全选发送的记录文本。
- 调试接口新增 `mobileAcceptanceExportText()`。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

本地功能验收覆盖：

- 未保存记录时点击复制，会提示没有可复制记录。
- 跑完短长测并保存记录后，导出文本包含 `Blade Flow mobile acceptance`。
- 导出文本里的版本、设备、发热、手感和残留节点与保存记录一致。
- 剪贴板不可用时，导出文本会显示在 textarea 里，方便手动发送。

本地 Playwright 结果：

```json
{
  "version": "v0.2.47 记录导出",
  "emptyExportStatus": "还没有可复制的长测记录。",
  "records": 1,
  "exportHasKind": true,
  "exportHasDevice": true,
  "exportVersion": "v0.2.47",
  "textareaVisible": true,
  "textareaHasKind": true,
  "statusAfterExport": "浏览器没有给复制权限。下面的记录可以手动全选发送。"
}
```

本地截图证据：

- `.playwright-cli/page-2026-05-08T15-25-54-268Z.png`

## 线上验收

部署地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=047-mobile-export-live`。

Cloudflare Current Version ID：`9ad49c0d-b12b-493b-b6d3-b9ceb1faf3ec`。

线上功能验收：

```json
{
  "version": "v0.2.47 记录导出",
  "emptyExportStatus": "还没有可复制的长测记录。",
  "records": 1,
  "exportHasKind": true,
  "exportHasDevice": true,
  "exportVersion": "v0.2.47",
  "textareaVisible": true,
  "textareaHasKind": true,
  "statusAfterExport": "浏览器没有给复制权限。下面的记录可以手动全选发送。"
}
```

线上正式入口和 Games Hub 均返回 `v0.2.47 记录导出`。

线上截图证据：

- `.playwright-cli/page-2026-05-08T15-30-56-397Z.png`

## 剩余风险

这个版本让真机记录可以发回，但仍不能代替真实手机实测。完整 goal 仍需要至少一条来自真实手机浏览器的 60 秒长测记录，并将导出的 JSON 贴回验收文档。
