# v0.2.51 剩余 Spec 完成审计

审计对象：`docs/roadmap/remaining-spec-high-standard-goal.md`

审计结论：不能标记 complete。线上版本已经推进到 `v0.2.51 保存门槛`，真机记录入口、保存、复制、直达、系统分享、保存后自动分享、最终 JSON 校验器和页面内保存门槛都已完成并部署，但仍缺真实手机浏览器跑完 60 秒后实际发回的 JSON。

## 已复核证据

| 要求 | 当前证据 | 状态 |
| --- | --- | --- |
| 线上正式入口可打开 | `https://games.atou.cc/combo-card-roguelike/versions/a/?v=051-curl-live` 返回 `v0.2.51 保存门槛` | 已验收 |
| Games Hub 版本已更新 | `https://games.atou.cc/data/games-hub.json?v=051-curl-live` 返回 `score: v0.2.51`、`title: v0.2.51 保存门槛` | 已验收 |
| 真机长测可直达 | `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1` 在手机视口显示长测面板和 `跑 60 秒` 按钮 | 已验收 |
| 真机记录可复制 | `docs/verification/v0247-mobile-acceptance-export.md`、`docs/verification/v0248-mobile-acceptance-direct-link.md` | 已验收 |
| 真机记录可系统分享 | `docs/verification/v0249-mobile-acceptance-share.md` | 已验收 |
| 保存后自动分享 | `docs/verification/v0250-mobile-acceptance-save-share.md` | 已验收 |
| 页面内保存门槛 | `docs/verification/v0251-mobile-acceptance-save-gates.md` 记录短测、空设备、模拟设备均无法保存 | 已验收 |
| 最终 JSON 有可执行校验和文档生成门 | `tools/validate-mobile-acceptance.mjs` 和 `docs/verification/mobile-acceptance-validator.md` | 已验收 |
| 公开运行目录干净 | `docs/verification/v0251-mobile-acceptance-save-gates.md` 记录公开 tools 路径 404，运行目录只保留四类文件 | 已验收 |
| 真实手机 60 秒发热和手感记录 | 尚未收到真实手机导出的 JSON | 缺失 |

## 实际检查过的状态

`node --check src/game.js` 通过。

公开目录同步后 `node --check public/combo-card-roguelike/versions/a/src/game.js` 通过。

`npm run check-games` 通过。

线上 Playwright 手机视口验收显示，短测只有 12 秒时不能保存；设备名是 `local mobile viewport` 时不能保存；设备名是 `iPhone 15 Safari` 且 probe 满 60 秒时会保存并分享 `v0.2.51` JSON。

公开运行目录清理后重新部署，Cloudflare Version ID 为 `9f319cc5-02ca-41de-ad0f-005b36a9aa83`。

## 不能完成的原因

最后缺口仍是物理设备证据。当前环境可以证明线上流程、保存门槛、分享 payload、fallback、最终校验器和最终验收 Markdown 生成，但不能产生真实手机的发热、手感、手机浏览器长期运行和用户实际分享记录。必须拿到真实手机跑完 60 秒后发回的 JSON，才能把 active goal 标记完成。

## 完成前最后一步

用真实手机打开 `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1`，跑完 60 秒，填写真实设备，点 `保存并分享`，把系统分享发出的 JSON 回传。拿到这条记录后，运行 `node tools/validate-mobile-acceptance.mjs <json-file> --markdown-out docs/verification/final-mobile-acceptance-record.md`，再重跑最终审计。
