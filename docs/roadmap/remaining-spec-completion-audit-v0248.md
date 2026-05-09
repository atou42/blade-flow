# v0.2.48 剩余 Spec 完成审计

审计对象：`docs/roadmap/remaining-spec-high-standard-goal.md`

审计结论：不能标记 complete。线上版本已经推进到 `v0.2.48 真机直达`，代码、入口、导出链路、Hub 和桌面移动视口验收都已完成，但仍缺一条来自真实手机浏览器的 60 秒长测导出 JSON。Playwright 手机视口可以证明流程可打开，不能证明真实手机发热和手感。

## 已复核证据

| 要求 | 当前证据 | 状态 |
| --- | --- | --- |
| 线上正式入口可打开 | `https://games.atou.cc/combo-card-roguelike/versions/a/?v=048-curl-live` 返回 `v0.2.48 真机直达` | 已验收 |
| Games Hub 版本已更新 | `https://games.atou.cc/data/games-hub.json?v=048-curl-live` 返回 `score: v0.2.48`、`title: v0.2.48 真机直达` | 已验收 |
| 真机长测可直达 | `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1` 在手机视口显示长测面板和 `跑 60 秒` 按钮 | 已验收 |
| 普通入口不受影响 | 不带 `mobileQa=1` 时没有长测按钮，仍显示武器选择流程 | 已验收 |
| 部署走标准流程 | `npm run publish-games` 通过，Cloudflare Version ID `fb21a431-1eeb-4c8c-a0e4-4bed6f0d1955` | 已验收 |
| 真实手机 60 秒发热和手感记录 | 尚未收到真实手机导出的 JSON | 缺失 |

## 实际检查过的状态

本地 `node --check src/game.js` 通过。

公开目录同步后 `node --check public/combo-card-roguelike/versions/a/src/game.js` 通过。

`npm run check-games` 通过，公开版本目录只保留 `assets`、`index.html`、`src`、`styles.css`。

线上 Playwright 手机视口验收结果显示，直达链接有 `data-mobile-run` 按钮、复制提示文本和 `v0.2.48 真机直达` 版本；普通链接没有长测按钮。

验收记录写在 `docs/verification/v0248-mobile-acceptance-direct-link.md`。

## 不能完成的原因

完整 goal 的最后缺口是物理设备证据。当前环境无法模拟手持手机的温升、浏览器后台策略、触控手感和长时间握持体验。必须拿到真实手机浏览器导出的 60 秒记录后，才可以把这个 active goal 标记完成。

## 完成前最后一步

用真实手机打开 `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1`，跑完 60 秒，保存发热和手感，点击复制最新记录，把导出的 JSON 写回最终验收记录。拿到这条记录后再重跑最终审计。
