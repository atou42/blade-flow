# v0.2.68 Card Selection Audio Asset Verification

日期：2026-05-09

结论：VERDICT: PASS

本次只处理卡牌选择类 UI 音效资产，不接入运行时代码。目标是把 Suno 真实音效 attack 段保留为 raw 变体，并输出符合 `docs/design/card-selection-audio-spec.md` 时长要求的 9 个正式短音效。

## Raw 资产

Raw 目录：

```text
assets/generated/audio/v0.1/ui-card-select-raw/v2/
```

检查结果：

```text
raw_mp3_count=36
raw_decode_bad=0
```

修正：

```text
assets/generated/audio/v0.1/ui-card-select-raw/v2/.mp3
```

已改名为：

```text
assets/generated/audio/v0.1/ui-card-select-raw/v2/panel-reveal-B2.mp3
```

## 正式文件

输出目录：

```text
assets/audio/sfx/ui/
```

正式新增文件：

```text
sfx-ui-card-touch-01.mp3
sfx-ui-card-confirm-01.mp3
sfx-ui-card-reject-01.mp3
sfx-ui-weapon-select-01.mp3
sfx-ui-reward-performance-01.mp3
sfx-ui-reward-build-01.mp3
sfx-ui-reward-correction-01.mp3
sfx-ui-reward-rare-sheen-01.mp3
sfx-ui-panel-reveal-01.mp3
```

Selection map:

```text
card-touch-A2.mp3       -> sfx-ui-card-touch-01.mp3
card-confirm-A1.mp3     -> sfx-ui-card-confirm-01.mp3
card-reject-A1.mp3      -> sfx-ui-card-reject-01.mp3
weapon-select-A1.mp3    -> sfx-ui-weapon-select-01.mp3
reward-perf-A2.mp3      -> sfx-ui-reward-performance-01.mp3
reward-build-B1.mp3     -> sfx-ui-reward-build-01.mp3
reward-corr-A1.mp3      -> sfx-ui-reward-correction-01.mp3
reward-rare-B2.mp3      -> sfx-ui-reward-rare-sheen-01.mp3
panel-reveal-B2.mp3     -> sfx-ui-panel-reveal-01.mp3
```

Formal duration check:

```text
sfx-ui-card-touch-01.mp3              0.120s
sfx-ui-card-confirm-01.mp3            0.180s
sfx-ui-card-reject-01.mp3             0.160s
sfx-ui-weapon-select-01.mp3           0.320s
sfx-ui-reward-performance-01.mp3      0.240s
sfx-ui-reward-build-01.mp3            0.280s
sfx-ui-reward-correction-01.mp3       0.300s
sfx-ui-reward-rare-sheen-01.mp3       0.220s
sfx-ui-panel-reveal-01.mp3            0.260s
```

Formal decode check:

```text
formal_audio_count=61
ui_sfx_count=16
formal_decode_bad=0
```

## 接入状态

这 9 个正式文件尚未接入 `src/game.js`。后续接入必须走预热和缓存策略，不能在触摸关键路径里首次创建 Audio、发起音频请求或做图片 decode。
