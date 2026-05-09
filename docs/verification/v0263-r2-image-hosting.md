# v0.2.63 R2 Image Hosting

The runtime image package has moved out of the game repository.

Public base:

```text
https://pub-de6823af3a394765b91428a3cb3ee2d7.r2.dev/blade-flow/v0.2.62
```

Cloudflare R2 bucket:

```text
blade-flow-assets
```

Uploaded assets:

- 71 runtime WebP files from `assets/art/`
- 15 generated draft WebP files converted from `assets/generated/v0.*/*_001.png`

The runtime now loads combat art, Boss forms, Boss action frames, card textures, stamps, and UI paper textures from Cloudflare R2 public WebP URLs.

The large local folders are intentionally excluded from Git:

```text
assets/art/
assets/generated/v*/
```

Verification:

```text
curl -fsSI https://pub-de6823af3a394765b91428a3cb3ee2d7.r2.dev/blade-flow/v0.2.62/assets/art/stage-layout-v1/player-idle.webp
curl -fsSI https://pub-de6823af3a394765b91428a3cb3ee2d7.r2.dev/blade-flow/v0.2.62/assets/art/ui-guohua-v2/ui-panel.webp
curl -fsSI https://pub-de6823af3a394765b91428a3cb3ee2d7.r2.dev/blade-flow/v0.2.62/assets/generated/v0.2/bf-v02-duel-stage-layout_001.webp
```

All three public probes returned `200 OK`, `Content-Type: image/webp`, and long-lived immutable cache headers.

Custom domain status:

```text
Not configured. The public r2.dev URL is the active asset host.
```
