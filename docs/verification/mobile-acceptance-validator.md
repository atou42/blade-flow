# 真机验收记录校验器

`tools/validate-mobile-acceptance.mjs` 用来校验最后一条真实手机 JSON。它不是替代真机测试，而是防止把桌面移动视口、短测、字段缺失或异常残留误当成完成证据。

2026-05-09 用户确认将本轮 goal 的最后移动端证据降级为模拟验收。这个校验器仍只服务真实手机 JSON；降级验收记录在 `docs/verification/final-mobile-acceptance-record.md` 和 `docs/verification/final-mobile-simulated-acceptance-record.md`，不能把模拟验收当作本工具 PASS。

## 用法

把手机分享出的 JSON 保存成一个文件后运行：

```bash
node tools/validate-mobile-acceptance.mjs path/to/mobile-record.json
```

也可以从 stdin 传入：

```bash
pbpaste | node tools/validate-mobile-acceptance.mjs -
```

通过后直接生成最终验收 Markdown：

```bash
node tools/validate-mobile-acceptance.mjs path/to/mobile-record.json --markdown-out docs/verification/final-mobile-acceptance-record.md
```

## PASS 条件

- `kind` 必须是 `Blade Flow mobile acceptance`。
- `version` 必须来自支持真机验收的版本。
- `device` 必须像真实手机，不能是 Playwright、viewport、desktop 或本地模拟记录。
- `v0.2.54` 及之后的记录必须包含自动 `client` 信息，UA 要像真实手机浏览器，触控点必须大于 0，视口必须像竖屏手机。
- `savedAt` 必须是有效时间。
- `heat` 必须是 `冷`、`温`、`热`、`烫` 之一。
- `feel` 必须是 `顺滑`、`偶发卡顿`、`明显卡顿`、`不可接受` 之一。
- `probe.duration` 必须至少 59000 ms。
- `probe.actions` 必须大于 0。
- `probe.slashNodes + probe.impactNodes + probe.comboNodes` 不能超过 12。

校验器 PASS 后，可以用 `--markdown-out` 生成最终验收文档，再做一次完整 completion audit。

## 自测记录

有效真机形态样例：

```bash
node tools/validate-mobile-acceptance.mjs -
```

结果：PASS。`iPhone 15 Pro Safari`、`duration: 60120`、`actions: 432` 被接受。带 `--markdown-out output/verification/final-mobile-acceptance-sample.md` 时，会生成一份包含摘要和原始 JSON 的最终验收 Markdown。

Markdown 生成自测：

```json
{
  "verdict": "PASS",
  "summary": {
    "version": "v0.2.51",
    "device": "iPhone 15 Pro Safari",
    "duration": 60120,
    "actions": 432
  },
  "markdownOut": "output/verification/final-mobile-acceptance-sample.md"
}
```

桌面移动视口假记录：

```bash
node tools/validate-mobile-acceptance.mjs -
```

结果：FAIL。`device: local mobile viewport` 被拒绝，原因是 `device 看起来不是一台真实手机。`

带 `--markdown-out` 的失败记录不会生成验收 Markdown。自测输出为 `exit=1 no_bad_doc=0`，表示命令失败且坏文档不存在。

短测记录：

```bash
node tools/validate-mobile-acceptance.mjs -
```

结果：FAIL。`duration: 12000` 被拒绝，原因是 `长测时长不足 60 秒。`
