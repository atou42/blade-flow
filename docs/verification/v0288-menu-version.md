# v0.2.88 菜单版本修正验收

日期：2026-05-17

范围：

- 主菜单版本记录卡片不再显示旧的 `v0.2.84`。
- 手机端通过 `v0.2.88` 资源版本强制拉取新脚本。
- 长测记录保存时使用当前版本号。

验证：

```bash
node --check src/game.js
```

本地手机视口 Playwright：

```json
{
  "ok": true,
  "hasCurrent": true,
  "hasOld84": false,
  "issues": []
}
```
