# Combo Card Roguelike

This is a portrait mobile roguelike action-card game concept.

The game looks like a card game, but it should feel like a fast combo action game. The player reads a flowing four-card hand, taps or flicks cards as attacks, and tries to keep a stylish combo alive under pressure.

The current main direction is a three-act roguelike. The first build should prove the combat feel before expanding the content pool.

Current playable version: v0.2.64, 35 SFX files wired into player actions, weapon signatures, Boss tells, Boss hit states, and UI choices, runtime art served as WebP from Cloudflare R2, generated image drafts archived as R2 WebP, higher default end-boss HP for more pressure, more distinct second- and third-act Suno BGM with red-thread pursuit and shattered-mirror final-duel identities, dedicated Suno boss BGM for Storm Captain, Redline Rival, and No-Form Blade Shadow, readable tuner text over the ink-paper controls, three act-level Suno BGM tracks longer than 60 seconds with automatic act-based switching, Suno-generated 37-second main-menu BGM with first-tap unlock, clearer route-choice visual signals for steady, atlas, and danger paths, real-phone screenshot polish for Boss sprite cutouts and short mobile browser viewports, automatic mobile client validation for final phone records, copyable real-phone acceptance link, stale invalid mobile-record export blocking, mobile acceptance save gates, save-and-share phone acceptance records, and direct phone-acceptance URL support via `?mobileQa=1`, exportable phone acceptance records for real-device heat and feel testing, image2-generated 8-frame boss sprite sheets for Storm Captain, Redline Rival, Mirror Blade Shadow, and Shield Guard, Boss action frame-sequence playback for reads, attacks, hits, and death, mobile long-run performance probe for debug verification, route-atlas long-term branches that alter in-run path choices, normal-difficulty three-archetype consecutive clear verification, daily special contract pool, expanded weapon-school recipe library, expanded bad-data matrix for profile and run-slot fail-close, daily fixed-seed short-route challenge with profile score records, training lessons as short fixed-action fights, meta-progression atlas with route atlas, debug all-unlock/replay tools, low-power performance profile, tunable future draw preview and promote depth, plus three-act enemy roster, expanded reward pool, six starting weapons, readable Boss action tells, construction anchors, three-slot rewards, path choices, browser local save slots, and forge-recipe profile progression.

Live URL: https://games.atou.cc/combo-card-roguelike/versions/a/

## Document Map

- `docs/research/reference-games.md` records the main reference games and what to borrow.
- `docs/research/subagent-synthesis.md` records the multi-agent ideation passes and filtering rules.
- `docs/design/core-combat.md` defines input, combo flow, route rewards, and first playable goals.
- `docs/design/archetype-card-affinity-spec.md` defines how builds care about specific card-direction pairs, blade stance, card anchors, visual lighting, and Boss counterplay.
- `docs/design/meta-progression-spec.md` defines long-term out-of-run growth through forge recipes, weapon schools, route map unlocks, profiles, and non-stat progression.
- `docs/design/starter-deck.md` defines the first twelve cards and their directional variants.
- `docs/design/roguelike-structure.md` defines run shape, rewards, long-term systems, and the three-act structure.
- `docs/design/relic-pool.md` records the screened relic pool.
- `docs/design/talent-pool.md` records the screened talent pool.
- `docs/design/equipment-pool.md` records the screened equipment pool.
- `docs/design/content-asset-spec.md` defines the Phase 1 Boss, enemy, equipment, relic, contract, and route-map asset requirements.
- `docs/design/audio-design-spec.md` defines BGM, weapon sound identity, Boss audio, hit materials, UI sounds, mixing, and audio acceptance criteria.
- `docs/design/audio-integration-plan.md` defines runtime loading, trigger mapping, low-power behavior, debug hooks, and acceptance checks for audio.
- `docs/design/full-design-spec.md` keeps the complete working spec before splitting.
- `docs/design/visual-language-principles.md` records the color, icon, and shape rules for readable routes and builds.
- `docs/design/style-unification-spec.md` defines the unified guohua ink style rules for Bosses, enemies, equipment, rewards, map nodes, cards, UI, and VFX.
- `docs/design/art-direction-ink-blade.md` records the first water-ink blade art direction and asset rules.
- `docs/design/art-asset-replacement-spec.md` defines the approved stage-layout art replacement scope.
- `docs/performance/mobile-thermal-audit-v1.md` records the v0.2.18 mobile thermal performance audit and optimization result.
- `docs/roadmap/phase-0-combat-prototype.md` defines the first playable combat prototype.
- `docs/roadmap/phase-1-roguelike-vertical-slice.md` defines the first roguelike slice.
- `docs/roadmap/phase-2-content-alpha.md` defines the larger content alpha.
- `docs/roadmap/phase-3-steam-release.md` defines the Steam-ready release target.
- `docs/roadmap/remaining-spec-high-standard-goal.md` consolidates the unfinished specs into the next high-standard alpha goal.
- `docs/verification/phase0-adversarial.md` records the first combat prototype verification.
- `docs/verification/phase1-adversarial.md` records the roguelike slice verification.
- `docs/verification/phase2-adversarial.md` records the content alpha verification.
- `docs/verification/deployment-adversarial.md` records the live `games.atou.cc` deployment verification.
- `docs/verification/v021-notebook-adversarial.md` records the Combo Notebook verification.
- `docs/verification/v027-visual-versioning-adversarial.md` records the visual changelog and route identity verification.
- `docs/verification/v028-hit-feedback-adversarial.md` records the fighter readability and hit feedback verification.
- `docs/verification/v029-combo-stage-adversarial.md` records the combat-stage spacing and combo feedback verification.
- `docs/verification/v0210-card-direction-adversarial.md` records the directional card exit verification.
- `docs/verification/v0211-ink-art-assets-adversarial.md` records the ink blade asset verification.
- `docs/verification/v0212-stage-art-replacement.md` records the approved stage art replacement verification.
- `docs/verification/v0213-ui-style-unification.md` records the clean ink UI style unification verification.
- `docs/verification/v0214-image2-ui-assets.md` records the image2-generated UI asset verification.
- `docs/verification/v0215-guohua-card-ui.md` records the guohua card-grade and route-stamp verification.
- `docs/verification/v0216-readable-boss-forms.md` records the readability and boss-form verification.
- `docs/verification/v0218-mobile-performance.md` records the v0.2.18 mobile performance verification.
- `docs/verification/v0219-blade-path-roguelike.md` records the v0.2.19 上行刀路 implementation and performance verification.
- `docs/verification/v0220-numeric-readability.md` records the v0.2.20 numeric effect readability verification.
- `docs/verification/v0221-rarity-stamps.md` records the v0.2.21 reward rarity stamp verification.
- `docs/verification/v0222-type-card-faces.md` records the v0.2.22 reward type card-face verification.
- `docs/verification/v0223-local-save-slots.md` records the v0.2.23 browser local save-slot verification.
- `docs/verification/v0224-forge-profile.md` records the v0.2.24 forge recipe and profile progression verification.
- `docs/verification/v0226-construction-anchor.md` records the v0.2.26 three-slot reward, construction anchor, draw preview, and path-choice verification.
- `docs/verification/v0227-boss-action-reads.md` records the v0.2.27 Boss action-read verification.
- `docs/verification/v0228-six-starting-weapons.md` records the v0.2.28 six starting weapon verification.
- `docs/verification/v0229-reward-pool.md` records the v0.2.29 relic, talent, contract, and numeric reward-pool verification.
- `docs/verification/v0230-bad-save-locking.md` records the v0.2.30 bad save-slot and profile locking verification.
- `docs/verification/v0231-three-act-roster.md` records the v0.2.31 three-act enemy, elite, Boss, and map-roster verification.
- `docs/verification/v0231-three-act-clear-record.md` records the v0.2.31 local and live full three-act clear-flow verification under custom clear-test tuning.
- `docs/verification/v0232-low-power-performance.md` records the v0.2.32 low-power performance profile and tuner-parameter verification.
- `docs/verification/v0233-meta-atlas-profile.md` records the v0.2.33 weapon-school, training, route-atlas, debug-profile, and meta-progression verification.
- `docs/verification/v0234-training-lessons.md` records the v0.2.34 training-lesson combat, fixed Boss action, and no-material reward verification.
- `docs/verification/v0235-daily-blade-path.md` records the v0.2.35 daily fixed-seed short-route challenge and no-material profile score verification.
- `docs/verification/v0236-bad-data-matrix.md` records the v0.2.36 profile and run-slot bad-data matrix verification.
- `docs/verification/v0237-school-recipes.md` records the v0.2.37 expanded forge recipe, weapon-school node, and card-window verification.
- `docs/verification/v0238-daily-contracts.md` records the v0.2.38 daily special contract-pool verification.
- `docs/verification/v0239-three-archetype-normal-clear.md` records the v0.2.39 normal-difficulty three-archetype consecutive clear verification.
- `docs/verification/v0240-boss-action-atlas.md` records the v0.2.40 Boss action image-state verification.
- `docs/verification/v0241-route-atlas-branches.md` records the v0.2.41 route-atlas long-term branch verification.
- `docs/verification/v0242-mobile-long-run-probe.md` records the v0.2.42 mobile long-run probe verification.
- `docs/verification/v0243-boss-frame-sequence.md` records the v0.2.43 Boss action frame-sequence verification.
- `docs/verification/v0244-storm-boss-sprite-sheet.md` records the v0.2.44 image2-generated Storm Captain sprite-sheet verification.
- `docs/verification/v0245-boss-sprite-sheet-coverage.md` records the v0.2.45 image2-generated Redline, Mirror, and Shield Boss sprite-sheet verification.
- `docs/verification/v0246-mobile-acceptance-panel.md` records the v0.2.46 phone acceptance panel verification.
- `docs/verification/v0247-mobile-acceptance-export.md` records the v0.2.47 phone acceptance export verification.
- `docs/verification/v0248-mobile-acceptance-direct-link.md` records the v0.2.48 direct phone-acceptance URL verification.
- `docs/verification/v0249-mobile-acceptance-share.md` records the v0.2.49 native phone-acceptance share verification.
- `docs/verification/v0250-mobile-acceptance-save-share.md` records the v0.2.50 save-and-share phone-acceptance verification.
- `docs/verification/mobile-acceptance-validator.md` records the final real-phone JSON validation gate.
- `docs/verification/final-mobile-acceptance-record.md` records the final mobile acceptance result under the explicit simulated-mobile downgrade.
- `docs/verification/final-mobile-simulated-acceptance-record.md` records the explicit simulated-mobile downgrade for the final mobile acceptance gate.
- `docs/roadmap/remaining-spec-completion-audit-v0255-simulated-acceptance.md` records the completion audit after that downgrade.
- `docs/verification/v0251-mobile-acceptance-save-gates.md` records the v0.2.51 in-page save gate verification.
- `docs/verification/v0252-mobile-acceptance-stale-record-gates.md` records the v0.2.52 stale invalid record export gates.
- `docs/verification/v0253-mobile-acceptance-link-copy.md` records the v0.2.53 real-phone acceptance link-copy verification.
- `docs/verification/v0254-mobile-client-validation.md` records the v0.2.54 automatic mobile client validation verification.
- `docs/verification/v0255-mobile-cutout-safe-area.md` records the v0.2.55 Boss sprite cutout and short mobile viewport verification.
- `docs/verification/v0256-route-choice-visual-cues.md` records the v0.2.56 route-choice visual cue verification.
- `docs/verification/v0257-main-menu-bgm.md` records the v0.2.57 main-menu BGM verification.
- `docs/verification/v0258-act-bgm.md` records the v0.2.58 three-act BGM verification.
- `docs/verification/v0259-tuner-readability.md` records the v0.2.59 tuner readability verification.
- `docs/verification/v0260-boss-bgm.md` records the v0.2.60 Boss-specific BGM verification.
- `docs/verification/v0261-act-bgm-distinction.md` records the v0.2.61 second- and third-act BGM distinction verification.
- `docs/verification/v0262-boss-hp-pressure.md` records the v0.2.62 default Boss HP pressure verification.
- `docs/verification/v0263-r2-image-hosting.md` records the v0.2.63 Cloudflare R2 WebP hosting verification.
- `docs/verification/v0264-sfx-integration.md` records the v0.2.64 SFX integration verification.
- `docs/verification/art-asset-replacement-acceptance.md` defines the acceptance gate for fully replacing the live combat art.
