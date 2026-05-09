# v0.2.49 剩余 Spec 完成审计

审计对象：`docs/roadmap/remaining-spec-high-standard-goal.md`

审计结论：不能标记 complete。线上版本已经推进到 `v0.2.49 分享记录`，真机记录入口、复制、直达和系统分享链路都已完成并部署，但仍缺真实手机浏览器跑完 60 秒后分享或复制出来的 JSON。浏览器手机视口可以证明分享 payload 正确，不能证明真实手机发热和手感。

## 已复核证据

| 要求 | 当前证据 | 状态 |
| --- | --- | --- |
| 线上正式入口可打开 | `https://games.atou.cc/combo-card-roguelike/versions/a/?v=049-curl-live` 返回 `v0.2.49 分享记录` | 已验收 |
| Games Hub 版本已更新 | `https://games.atou.cc/data/games-hub.json?v=049-curl-live` 返回 `score: v0.2.49`、`title: v0.2.49 分享记录` | 已验收 |
| 真机长测可直达 | `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1` 在手机视口显示长测面板和 `跑 60 秒` 按钮 | 已验收 |
| 真机记录可复制 | `docs/verification/v0247-mobile-acceptance-export.md` 和 `docs/verification/v0248-mobile-acceptance-direct-link.md` | 已验收 |
| 真机记录可系统分享 | `docs/verification/v0249-mobile-acceptance-share.md` 记录 `sharedTitle: Blade Flow mobile acceptance`、`sharedVersion: v0.2.49` | 已验收 |
| 分享按钮可读 | `output/playwright/v0249-live-share.png` 显示 `保存记录`、`分享最新记录`、`复制最新记录`、`关闭` | 已验收 |
| 普通入口不受影响 | 不带 `mobileQa=1` 时没有长测按钮，仍显示武器选择流程 | 已验收 |
| 部署走标准流程 | `npm run publish-games` 通过，Cloudflare Version ID `3899d6db-5431-4386-9871-d4fef0039f6b` | 已验收 |
| 真实手机 60 秒发热和手感记录 | 尚未收到真实手机导出的 JSON | 缺失 |

## 实际检查过的状态

`node --check src/game.js` 通过。

公开目录同步后 `node --check public/combo-card-roguelike/versions/a/src/game.js` 通过。

`npm run check-games` 通过。

线上 Playwright 手机视口验收显示，`mobileQa=1` 会打开真机长测面板，面板有 `跑 60 秒`、`保存记录`、`分享最新记录`、`复制最新记录`、`关闭`，模拟系统分享拿到的 JSON 版本为 `v0.2.49`。

## 不能完成的原因

最后缺口仍是物理设备证据。当前环境没有真实手机温升、手持触感、系统分享到 Discord 的实际动作和手机浏览器长期运行状态。必须拿到真实手机跑完 60 秒后分享或复制出的 JSON，才能把这个 active goal 标记完成。

## 完成前最后一步

用真实手机打开 `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1`，跑完 60 秒，保存发热和手感，点 `分享最新记录` 或 `复制最新记录`，把 JSON 发回并写入最终验收记录。拿到这条记录后再重跑最终审计。
