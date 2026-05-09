# v0.2.56 路线辨识验收

用户手机截图显示，刀路选择里的稳定路线、图谱分支和高危路线缺少足够明确的视觉区分，标签和效果阅读容易混在一起。

## 修复内容

- 路线选择按钮新增风险类型视觉层：稳定路线为绿，图谱分支为金，高危路线为红。
- 左侧新增大号风险牌，顶部保留路线流派图标。玩家可以同时看到“这条路的风险类型”和“这条路偏向哪个流派”。
- 效果数字改回短数字块，不再因为网格布局被拉成长色条。
- 版本推进到 `v0.2.56 路线辨识`，Hub 描述和公开入口说明同步更新。

## 本地验证

```bash
node --check src/game.js
node --check tools/validate-mobile-acceptance.mjs
```

结果：PASS。

Playwright 本地手机视口验证生成 `output/playwright/v0256-local-path-choice-atlas.png`。同屏出现三类路线：

| 类型 | 标签 | 颜色 | 结论 |
| --- | --- | --- | --- |
| 稳定路线 | 稳 | 绿色 | PASS |
| 图谱分支 | 图 | 金色 | PASS |
| 高危路线 | 险 | 红色 | PASS |

效果数字宽度保持为短块，没有再铺满整行。

## 线上验证

部署版本：Cloudflare `94ed9db1-f73a-487b-8165-014745a9a716`。

```bash
curl -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=0256-live-curl' | rg -o 'v0\.2\.56|路线辨识'
curl -s 'https://games.atou.cc/data/games-hub.json?v=0256-live-curl' | rg -o 'v0\.2\.56 路线辨识'
```

结果：正式入口返回 `v0.2.56 路线辨识`，Hub 返回 `v0.2.56 路线辨识`。

Playwright 线上手机视口验证生成 `output/playwright/v0256-live-path-choice.png`。同屏出现稳定路线、图谱分支和高危路线，颜色分别为绿色、金色和红色，效果数字保持为短块。
