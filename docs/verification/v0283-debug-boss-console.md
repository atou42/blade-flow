# v0.2.83 Boss 调试台验收记录

日期：2026-05-14

## 范围

本次落地 `docs/design/debug-console-boss-tuning-spec.md` 的第一版实现。目标是让手机竖屏下可以进入 Boss 调试台，选择三幕关键 Boss，调整数值、成长包和起手配置，导入导出 JSON，本地保存预设，并从调试战结束页复制战斗结果。

## 实现结果

- `?debug=1` 下开放 Boss 调试台；正式入口不默认暴露。
- 支持一幕风暴队长、二幕赤线宿敌、三幕无相刀影直达挑战。
- 支持 Boss 血量、速度、伤害、玩家专注、玩家伤害、出牌间隔、后摇倍率、完美窗、奖励强度、AI 压力和重复惩罚调节。
- 支持低配、推荐、压力三类成长包，支持额外奖励、证物和起手牌调整。
- 支持配置导出、导入、本地预设保存和坏配置拒绝。
- 调试战不会写入正式成长档，调试结果只写入独立命名空间。
- 调试战内版本按钮打开轻量抽屉，可以重开本场、回调试台或复制配置。

## 本地检查

```bash
node --check src/game.js
```

结果：通过。

```bash
curl -s -o /tmp/blade-flow-debug.html -w '%{http_code} %{size_download}\n' 'http://127.0.0.1:4173/?debug=1'
```

结果：`200 5661`。

## 浏览器端到端

```bash
~/.codex/skills/playwright/scripts/playwright_cli.sh run-code "$(cat tools/verify-debug-console-e2e.playwright.js)" --json
```

结果：

```json
{
  "ok": true,
  "exported": {
    "boss": "redline-rival",
    "growth": "act2-standard",
    "hpScale": 1.45,
    "cardIntervalMs": 620,
    "recoveryScale": 1.25
  },
  "state": {
    "room": "赤线宿敌",
    "act": 2,
    "rewardNames": ["成长包:二幕推荐通关", "镜痕", "坠锤", "追击刻印"],
    "cardIntervalMs": 620,
    "recoveryScale": 1.25
  },
  "invalidResults": ["不支持的调试配置版本", "不存在的 Boss：missing", "不存在的奖励：missing-reward"],
  "bottomGap": 251,
  "consoleIssues": []
}
```

覆盖项：

- 手机视口打开 `?debug=1`。
- 从入口打开 Boss 调试台。
- 选择二幕 Boss 赤线宿敌。
- 修改血量、速度、出牌间隔和后摇倍率。
- 切换二幕推荐成长包。
- 导出 JSON 并校验字段。
- 保存本地预设。
- 启动调试战并确认 Boss、幕数、成长包和调参生效。
- 战斗内打开调试抽屉并返回调试台。
- 导入刚才导出的配置。
- 验证错误 schema、不存在 Boss、不存在奖励会被拒绝。
- 强制结算调试战，确认结果页出现。
- 确认正式成长档没有被写入。
- 确认调试结果写入独立调试记录。
- 确认底部安全距离大于 8px。
- 确认浏览器 console 没有 error。

## 视觉截图

```bash
~/.codex/skills/playwright/scripts/playwright_cli.sh screenshot --filename output/playwright/debug-console-e2e-result.png --json
```

截图位置：`output/playwright/debug-console-e2e-result.png`。

结果页按钮在 390px 竖屏视口下可读，底部留有安全距离。

## 结论

v0.2.83 Boss 调试台本地验收通过。它已经能用于下一轮 Boss 难度、成长包和出牌节奏调试。
