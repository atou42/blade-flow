# v0.2.30 坏档锁定验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 3 坏档 fail-close，不声明整个 goal 完成。

## 已落地内容

本地 run 存档从“任意一槽坏了整个存档面板失败”改成单槽锁定。有效槽、空槽和坏槽会分别显示，坏槽不能保存或读取，但可以删除。保存其他槽时，坏槽原始数据会被保留，不会被默认空槽覆盖。

存档快照会检查种子、幕数、节点编号、武器、手牌、牌库、待选奖励和待选路线。引用不存在的武器、卡牌、奖励或路线会明确显示锁定原因。

长期成长 profile 解析失败时会锁定对应 profile。正式和调试 profile 分开锁，切到另一个 profile 仍可用。锁定 profile 不会写入材料，也不会用默认空成长伪装正常。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，进入 v0.2.30，选择风暴太刀，保存槽 1，注入一个引用不存在武器的坏槽 3，打开存档面板，确认槽 3 锁定且槽 1 可读取；再保存槽 2，确认槽 3 仍锁定且没有被清空。随后注入正式 profile 坏 JSON，确认正式 profile 锁定，切换到调试 profile 后仍可用，再切回正式 profile 仍显示锁定原因。

运行结果如下。

```json
{
  "version": "V0.2.30 坏档锁定",
  "startVersion": "锁 当前 V0.2.30",
  "saveSummary": [
    { "index": 0, "className": "save-slot has-save", "loadDisabled": false },
    { "index": 1, "className": "save-slot is-empty", "loadDisabled": true },
    { "index": 2, "className": "save-slot is-corrupt", "saveDisabled": true, "loadDisabled": true, "deleteDisabled": false },
    { "index": 3, "className": "save-slot is-empty", "loadDisabled": true },
    { "index": 4, "className": "save-slot is-empty", "loadDisabled": true }
  ],
  "afterSave": [
    { "index": 0, "className": "save-slot has-save" },
    { "index": 1, "className": "save-slot has-save" },
    { "index": 2, "className": "save-slot is-corrupt" }
  ],
  "badSlotReason": "槽 3 已锁定：引用不存在的武器 missing-weapon",
  "profileLocked": true,
  "debugProfileUsable": true,
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v030-bad-save.png`

## 部署验收

第一次发布时 Cloudflare API 返回 502，校验与生成已通过。随后重跑 `npm run publish-games` 成功发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: a283d5a5-0826-4ede-87ee-42cfccf4b534
```

线上手机视口验证结果如下。

```json
{
  "version": "V0.2.30 坏档锁定",
  "before": [
    { "index": 0, "className": "save-slot has-save", "loadDisabled": false },
    { "index": 1, "className": "save-slot is-empty", "loadDisabled": true },
    { "index": 2, "className": "save-slot is-corrupt", "saveDisabled": true, "loadDisabled": true, "deleteDisabled": false }
  ],
  "after": [
    { "index": 0, "className": "save-slot has-save" },
    { "index": 1, "className": "save-slot has-save" },
    { "index": 2, "className": "save-slot is-corrupt" }
  ],
  "badProfile": {
    "mode": "real",
    "locked": true
  },
  "debugProfileUsable": true,
  "realProfileLocked": true,
  "errors": []
}
```

线上入口数据也已确认更新为 `v0.2.30` 和 `v0.2.30 坏档锁定`。

线上截图：

- `/tmp/blade-flow-v030-live.png`

## 未完成项

这只补了坏档 fail-close 的关键路径。完整局外成长仍需要武器学派树、上行图谱、高危长期解锁、训练课和更完整的坏档矩阵。完整 goal 还需要三幕通关、性能记录、敌人/精英/Boss 内容池和完整 Boss sprite 动作表。
