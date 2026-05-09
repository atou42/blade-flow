# Phase 2 Implementation Plan

Date: 2026-05-04

## Completion Standard

Phase 2 is complete when the prototype moves from one fixed six-fight slice into a repeatable content alpha with visible run variety.

The run must support more encounter types, more reward identities, and at least one non-combat utility mode without breaking the fast mobile combat surface.

## Scope

Add a larger three-act encounter chain with normal fights, elites, bosses, an event room, and a training room.

Split rewards into relic, talent, and upgrade choices while keeping every choice short enough for portrait play.

Add run modifiers that are felt in combat: route-biased enemies, reward effects, training drills, daily seed display, and post-fight breakdown.

Keep the current static app architecture. Phase 2 is still about proving the playable loop, not adding build tooling.

## Verification Plan

Use browser checks on 390x844 and 320x568.

Verify gear selection, event choice, training skip/claim, reward choice, elite/boss progression, full run clear, reset, console cleanliness, and at least one adversarial path where a small screen must scroll and still advance.

Record executed evidence in `docs/verification/phase2-adversarial.md`.
