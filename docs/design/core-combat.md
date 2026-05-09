# Core Combat Design

## Core Fantasy

The game looks like a card game, but it should feel like a fast combo action game.

The player is not solving a slow turn. The player is reading a fast four-card stream, choosing a move, and keeping the combo alive.

## Input Model

The active hand sits at the bottom of the portrait screen. It should feel like four large action slots.

Tapping a card plays the basic action.

Flicking from a card plays a directional variant. The touch start chooses the card. The release direction chooses the move.

The direction language stays stable.

Up means launch, lift, setup, or control.

Right means chase, pressure, speed, or forward movement.

Left means evade, retreat, counter, or reposition.

Down means slam, heavy commit, burst, or finisher.

## Combo Rules

The base rule is generous. Any card played inside the combo window can keep the combo alive.

Better connections create stronger results. Matching route tags, direction patterns, enemy state, card families, and action relationships can all stack.

The important rule is simple: everything can connect, but good connections hit harder, flow faster, look better, and create stronger state.

## Combo Routes

Speed route makes the hand feel faster and rewards right-flick pressure.

Control route keeps enemies vulnerable and rewards up-flick launch or break play.

Counter route turns danger into style and rewards left-flick evasion or Guard timing.

Burst route creates payoff tension and rewards down-flick commitment or Execute timing.

Damage route is the simple aggressive route and stays easy to trigger.

## Route Rewards

The first version uses immediate route boosts, with a small amount of temporary card transformation.

Route rewards should be felt during combat, not managed in a menu. If the player builds a route, the game should immediately become faster, heavier, safer, sharper, or more explosive.

## Archetype And Card Affinity

Cards keep stable physical identities. A card should not become a generic direction button.

Builds change which card-direction pairs become high-value windows. Storm Katana can make Chase Cut right-flick feel like a core chase move. Mirror Fan can make Guard left-flick feel like the key read-and-counter move. Executioner can make Breaker or Execute down-flick feel like the payoff.

The player should actively create these windows through combat state, boss reads, and run rewards. The detailed rules for blade stance, card-direction anchors, visual lighting, and boss counterplay live in `docs/design/archetype-card-affinity-spec.md`.

## First Playable Target

The first playable should prove that the player can read four cards, tap or flick one, get an immediate action, receive a replacement card, and feel pressure to continue.

It should include one enemy, one combo meter, the twelve-card starter deck, directional variants, generous combo continuation, and at least three visible combo route states.
