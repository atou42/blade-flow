# World Map V1 Asset Manifest

## Runtime WebP

运行时优先使用 `assets/art/world-map-v1/` 下的 WebP。

| 文件 | 建议用途 | 说明 |
| --- | --- | --- |
| `world-overview.webp` | 世界地图主背景 | 最适合做总地图。画面有天裂、山脉、城邦、上行路径，能承载一二三幕入口。 |
| `act1-storm-gate.webp` | 一幕入口：风暴门 | 最贴合第一幕。山路、城门、断旗、风暴压迫都对。 |
| `act1-sky-bridge.webp` | 一幕分支：断桥/追击险路 | 适合做第一幕中段节点或路线预览，不如风暴门适合当主入口。 |
| `act2-redline-hunter-city.webp` | 二幕入口：赤线猎场 | 最贴合第二幕。红线、废城、追猎感很强。 |
| `act2-mirror-corridor.webp` | 二幕分支：镜廊 | 适合镜侍、镜廊祭司、假抬手训练节点。 |
| `act3-black-moon-citadel.webp` | 三幕入口：无相高路 | 最贴合第三幕。黑月、尖塔、高处压迫明确。 |
| `forge-mountain-gate.webp` | 锻刃炉/雪山炉备用 | 更像高山锻造点，不适合作为当前三幕主地图。 |
| `lower-road-inn.webp` | 下层驿站/主菜单备用 | 气质偏安全点，适合新手入口、休整、刀塾或菜单背景。 |

## Raw Sources

原始 JPG 保留在 `assets/generated/art/world-map-v1/raw/`，用于后续重新裁切、调色或更高质量转码。

## Map Entry Recommendation

地图界面先用 `world-overview.webp` 做底图，在画面上放三个可点入口：风暴门、赤线猎场、无相高路。

调试选择不需要做成正式存档入口。建议放在地图界面右上角或底部小按钮区，点击某一幕后直接设置 `actLevel` 并进入该幕第一战。这样不会污染正常开始流程，也方便后续加 Boss 直达、训练直达。
