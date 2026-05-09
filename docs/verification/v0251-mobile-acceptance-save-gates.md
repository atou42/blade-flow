# v0.2.51 真机记录保存门槛验收

v0.2.50 已经能保存后立即分享，但页面仍允许保存空设备、短测或模拟设备记录。这会让最终 JSON 到校验器时才失败。v0.2.51 把这些失败前移到页面内，避免无效记录发回。

## 已落地内容

- 不足 59000 ms 的长测不能保存。
- 设备为空不能保存。
- 设备看起来像 `viewport`、`playwright`、`desktop`、`local`、`模拟` 或 `emulator` 时不能保存。
- 有效记录保存后写入 `v0.2.51`，并继续自动分享。
- 普通入口不带 `mobileQa=1` 时仍是正常武器选择流程。

## 本地验收

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

Playwright 手机视口覆盖：

```json
{
  "results": [
    {
      "name": "short-probe-blocked",
      "version": "v0.2.51 保存门槛",
      "records": 0,
      "status": "这次长测只有 12 秒。必须跑满 60 秒才能保存最终记录。",
      "shared": false
    },
    {
      "name": "empty-device-blocked",
      "records": 0,
      "status": "先填写真实手机型号和浏览器，再保存记录。",
      "shared": false
    },
    {
      "name": "fake-device-blocked",
      "records": 0,
      "status": "设备看起来不是一台真实手机。请填写真实型号，比如 iPhone 15 Safari。",
      "shared": false
    },
    {
      "name": "valid-save-share",
      "version": "v0.2.51 保存门槛",
      "records": 1,
      "sharedVersion": "v0.2.51",
      "sharedDevice": "iPhone 15 Safari",
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。"
    }
  ]
}
```

截图：`output/playwright/v0251-local-save-gates.png`。

## 线上验收

Cloudflare Version ID：`9f319cc5-02ca-41de-ad0f-005b36a9aa83`。

部署检查：

```bash
npm run publish-games
```

结果：PASS。第一次部署后发现 `tools` 被同步进公开运行目录，随后移除 `public/combo-card-roguelike/versions/a/tools` 并重新部署。最终公开运行目录只保留 `assets`、`index.html`、`src`、`styles.css`。

线上入口检查：

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=051-curl-live' | rg -n 'v0\.2\.51|保存门槛|保存并分享|mobileQa'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=051-curl-live'
curl -L -s -o /tmp/blade-tools-check.txt -w '%{http_code}\n' 'https://games.atou.cc/combo-card-roguelike/versions/a/tools/validate-mobile-acceptance.mjs?v=051-clean'
```

结果：PASS。正式入口返回 `v0.2.51 保存门槛`，Hub 返回 `score: v0.2.51` 和版本标题 `v0.2.51 保存门槛`，公开 tools 路径返回 404。

线上 Playwright 手机视口覆盖：

```json
{
  "results": [
    {
      "name": "live-short-blocked",
      "version": "v0.2.51 保存门槛",
      "records": 0,
      "status": "这次长测只有 12 秒。必须跑满 60 秒才能保存最终记录。",
      "shared": false
    },
    {
      "name": "live-fake-device-blocked",
      "records": 0,
      "status": "设备看起来不是一台真实手机。请填写真实型号，比如 iPhone 15 Safari。",
      "shared": false
    },
    {
      "name": "live-valid-save-share",
      "version": "v0.2.51 保存门槛",
      "records": 1,
      "sharedVersion": "v0.2.51",
      "sharedDevice": "iPhone 15 Safari",
      "status": "已打开系统分享面板。发送这条记录即可完成真机证据。"
    }
  ]
}
```

截图：`output/playwright/v0251-live-save-gates.png`。

## 剩余风险

保存门槛能减少无效 JSON，但仍不能替代真实手机长测。完整 goal 仍需要一条真实手机跑完 60 秒后发回的 JSON。
