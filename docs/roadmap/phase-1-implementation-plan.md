# Phase 1 Implementation Plan

## Objective

Expand the Phase 0 duel into the first 上行刀路 roguelike slice. The goal is not to prove a full three-act shell yet. The goal is to prove that route choices can change the next fight's hand rhythm, boss behavior, and reward quality.

## Deliverables

Add a pre-run equipment choice using three first-slice identities: Storm Katana, Mirror Fan, and Executioner.

Add a vertical blade-path map with seven to eight nodes and two visible future layers.

Add node types for normal combat, elite, shop, forge, scout, event, boss preview, and final boss.

Add a reward screen after victory with choices across card changes, card upgrades, relics, contracts, one-shot marks, equipment inscriptions, and boss evidence.

Add a small relic and contract subset focused on chase, counter, and burst.

Add final boss route marks so the boss visibly reacts to the player's strongest route before the fight.

Add run completion after the one-act slice.

## Scope Cut

The Phase 1 slice does not need every documented relic, talent, equipment item, event, or boss.

The Phase 1 slice does not need the complete three-act structure.

The Phase 1 slice should preserve the Phase 0 combat feel. Rewards must not add long menus or slow the loop.

## Validation

Verify each equipment identity changes the first minute of play.

Verify victory opens route rewards instead of only resetting.

Verify each reward choice changes the next fight's hand rhythm, boss tell, player action, or route identity.

Verify the run can advance through the one-act blade path and complete.

Verify the final boss shows the player's route mark and changes at least one opening behavior from it.

Verify reset returns to a clean pre-run state.

Run the adversarial checks again on mobile viewport, gesture stress, reset idempotency, stale overlay state, and console errors.

## Commit Gate

Commit this plan first.

Commit Phase 1 implementation after browser verification.

Commit verification notes after adversarial validation.
