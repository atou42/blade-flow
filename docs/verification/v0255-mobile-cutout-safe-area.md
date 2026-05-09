# v0.2.55 手机修边验收

用户手机截图显示两个问题：Boss 动作图带出大块棋盘格底，短手机浏览器视口下底部手牌离浏览器工具栏太近，部分内容被遮挡。

## 修复内容

- 四类 Boss 的 32 张独立动作帧已从带底 WebP 处理为真实透明 WebP，覆盖 idle、fast、heavy、feint、backstep、ground-grab、attack 和 death。
- 短手机视口新增紧凑排版。390px 宽、840px 高及以下时，会缩短竞技场、战斗日志和手牌高度，隐藏抽牌队列与底部说明，并给浏览器底栏额外预留空间。
- 版本推进到 `v0.2.55 手机修边`，Hub 描述和公开入口说明同步更新。

## 本地验证

```bash
sips -g pixelWidth -g pixelHeight -g hasAlpha assets/art/boss-sprites-v1/mirror-blade/fast.webp assets/art/boss-sprites-v1/redline-rival/attack.webp assets/art/boss-sprites-v1/shield-guard/heavy.webp assets/art/boss-sprites-v1/storm-captain/ground-grab.webp
```

结果：四张抽样动作帧均为 `hasAlpha: yes`。

```bash
python3 - <<'PY'
from pathlib import Path
from PIL import Image
for path in sorted(Path('assets/art/boss-sprites-v1').glob('*/*.webp')):
    if path.name == 'sheet.webp':
        continue
    im = Image.open(path).convert('RGBA')
    if min(a for *_, a in im.getdata()) >= 250:
        raise SystemExit(f'NO_ALPHA {path}')
print('alpha-check-done')
PY
```

结果：PASS，32 张动作帧都有透明像素。

```bash
node --check src/game.js
node --check tools/validate-mobile-acceptance.mjs
```

结果：PASS。

Playwright 本地手机视口验证：

| 视口 | 版本 | 手牌到底部余量 | 抽牌队列 | 底部说明 | 结论 |
| --- | --- | ---: | --- | --- | --- |
| 390x740 | v0.2.55 手机修边 | 19px | hidden | hidden | PASS |
| 390x844 | v0.2.55 手机修边 | 37.09px | visible | visible | PASS |

截图：

- `output/playwright/v0255-local-short-viewport.png`
- `output/playwright/v0255-local-tall-viewport.png`

## 线上验证

部署版本：Cloudflare `f5c321b0-3a29-42f6-85bf-569683cf7eca`。

```bash
curl -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=0255-live-curl' | rg -o 'v0\.2\.55|手机修边'
curl -s 'https://games.atou.cc/data/games-hub.json?v=0255-live-curl' | rg -o 'v0\.2\.55 手机修边'
curl -I -s 'https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/boss-sprites-v1/mirror-blade/fast.webp?v=0255-live-curl'
```

结果：正式入口返回 `v0.2.55 手机修边`，Hub 返回 `v0.2.55 手机修边`，线上 Boss 动作帧返回 `HTTP/2 200`。

Playwright 线上短手机视口验证：

| 视口 | 版本 | Boss 帧 | 手牌到底部余量 | 抽牌队列 | 底部说明 | 结论 |
| --- | --- | --- | ---: | --- | --- | --- |
| 390x740 | v0.2.55 手机修边 | `boss-sprites-v1/mirror-blade/attack.webp` | 19px | hidden | hidden | PASS |

截图：

- `output/playwright/v0255-live-short-viewport.png`
