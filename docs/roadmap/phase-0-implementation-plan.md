# Phase 0 Implementation Plan

## Objective

Build a mobile-first static web prototype that proves the core combat loop: four-card hand, tap or flick actions, immediate replacement, combo pressure, route feedback, and a short enemy duel.

## Technical Direction

Use plain HTML, CSS, and JavaScript for the first prototype. Avoid package installation and framework setup until the core feel is proven.

The prototype should run as a static page and be easy to host under a subpath such as `/combo-card-roguelike/`.

## Deliverables

Create a playable `index.html` entry point with a portrait game surface.

Create CSS for mobile-first layout, high-contrast readable cards, clear route state, and strong hit feedback.

Create JavaScript for card draw, tap actions, flick actions, combo decay, route scoring, enemy intent, damage, and fight reset.

Include a short in-game enemy duel loop with one enemy, one boss-like pressure phase, and visible combo style feedback.

## Phase 0 Content Cut

Use the twelve-card starter deck.

Use one default equipment identity based on Storm Katana.

Use only immediate route feedback. Do not implement the full relic, talent, or equipment pools yet.

Use lightweight route states: Speed, Control, Counter, Burst, and Damage.

## Validation

Open the page in a real browser.

Verify desktop and mobile viewport rendering.

Verify tapping cards, flicking cards, combo continuation, combo decay, enemy pressure, victory, defeat, and reset.

Run an adversarial verification pass against gesture ambiguity, tiny tap targets, unreadable mobile text, overlapping UI, and stale state after reset.

## Commit Gate

Commit this implementation plan before code.

Commit the playable prototype after local verification.

Commit any verification fixes separately if they are substantial.

