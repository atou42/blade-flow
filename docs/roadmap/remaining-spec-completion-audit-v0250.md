# v0.2.50 剩余 Spec 完成审计

审计对象：`docs/roadmap/remaining-spec-high-standard-goal.md`

审计结论：不能标记 complete。线上版本已经推进到 `v0.2.50 保存即分享`，真机记录入口、保存、复制、直达、系统分享和保存后自动分享都已完成并部署，但仍缺真实手机浏览器跑完 60 秒后实际发回的 JSON。

## 已复核证据

| 要求 | 当前证据 | 状态 |
| --- | --- | --- |
| 线上正式入口可打开 | `https://games.atou.cc/combo-card-roguelike/versions/a/?v=050-curl-live` 返回 `v0.2.50 保存即分享` | 已验收 |
| Games Hub 版本已更新 | `https://games.atou.cc/data/games-hub.json?v=050-curl-live` 返回 `score: v0.2.50`、`title: v0.2.50 保存即分享` | 已验收 |
| 真机长测可直达 | `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1` 在手机视口显示长测面板和 `跑 60 秒` 按钮 | 已验收 |
| 真机记录可复制 | `docs/verification/v0247-mobile-acceptance-export.md`、`docs/verification/v0248-mobile-acceptance-direct-link.md` | 已验收 |
| 真机记录可系统分享 | `docs/verification/v0249-mobile-acceptance-share.md` | 已验收 |
| 保存后自动分享 | `docs/verification/v0250-mobile-acceptance-save-share.md` 记录 `saveButtonText: 保存并分享`、`sharedVersion: v0.2.50` | 已验收 |
| 分享成功后面板不展开 JSON | `docs/verification/v0250-mobile-acceptance-save-share.md` 记录 `textareaHidden: true` | 已验收 |
| 普通入口不受影响 | 不带 `mobileQa=1` 时没有长测按钮，仍显示武器选择流程 | 已验收 |
| 部署走标准流程 | `npm run publish-games` 通过，Cloudflare Version ID `5b6530c3-ca5d-46cd-81e4-63c3a3d658fe` | 已验收 |
| 最终 JSON 有可执行校验门 | `tools/validate-mobile-acceptance.mjs` 和 `docs/verification/mobile-acceptance-validator.md` | 已验收 |
| 真实手机 60 秒发热和手感记录 | 尚未收到真实手机导出的 JSON | 缺失 |

## 实际检查过的状态

`node --check src/game.js` 通过。

公开目录同步后 `node --check public/combo-card-roguelike/versions/a/src/game.js` 通过。

`npm run check-games` 通过。

线上 Playwright 手机视口验收显示，`mobileQa=1` 会打开真机长测面板；保存记录会写入 `v0.2.50` JSON，并把该 JSON 交给系统分享 payload；普通入口没有长测按钮。

最终 JSON 校验器已经补上：`tools/validate-mobile-acceptance.mjs` 会拒绝非 JSON、桌面/viewport 假设备、时长不足、字段缺失和特效残留过多的记录。

## 不能完成的原因

最后缺口仍是物理设备证据。当前环境可以证明线上流程、分享 payload 和 fallback，但不能产生真实手机的发热、手感、手机浏览器长期运行和用户实际分享记录。必须拿到真实手机跑完 60 秒后发回的 JSON，才能把 active goal 标记完成。

## 完成前最后一步

用真实手机打开 `https://games.atou.cc/combo-card-roguelike/versions/a/?mobileQa=1`，跑完 60 秒，点 `保存并分享`，把系统分享发出的 JSON 回传。拿到这条记录后，先用 `node tools/validate-mobile-acceptance.mjs <json-file>` 校验，通过后写入最终验收记录，再重跑最终审计。
