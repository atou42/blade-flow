# Combo Card Core Design

Date: 2026-05-04

This document records the core design for a portrait mobile combo card game. The roguelike version is the main direction. The stage-based version is kept as a future variant so the project can change shape later without losing the original design branch.

## Core Fantasy

The game looks like a card game, but it should feel like a fast action combo game. The player is not slowly solving a turn. The player is reading a fast card stream, choosing the next move, and keeping the combo alive under pressure.

The intended feeling is close to a Devil May Cry style combo flow, translated into portrait mobile card controls. Cards are not abstract commands. Each card is an action. Playing a card means making a move, and chaining cards means performing a combo.

## Input Model

The hand sits at the bottom of the portrait screen. It should feel like a set of large action slots, not a draggable hand-management area.

Tapping a card plays its basic action. Swiping from the card plays a directional variant. The touch start chooses the card. The release direction chooses the move. This avoids turning selection and execution into two separate actions.

The simple layer is tap-to-play. A new player can keep a combo alive by tapping quickly and reading obvious cards.

The advanced layer is flick-to-variant. Up usually means launch, start, or lift. Right usually means chase or continue pressure. Left usually means evade, retreat, or counter-position. Down usually means slam, finisher, or heavy commit. Direction meanings should stay stable across the whole game.

The game should not require dragging cards, rearranging cards, or confirming a selected card during combat. Those actions compete with the flick input and slow the game down.

## Combat Flow

The player always has a small active hand, likely four cards. When a card is played, a new card immediately flows in. The player is constantly scanning the hand and deciding what can be chained next.

The combo meter is the center of combat. It drains over time and is maintained by playing valid actions quickly. Playing slowly, getting hit, or dropping timing reduces the combo state. The player should feel a real loss when the combo drops, but the penalty should push them to start again instead of making the fight feel failed.

Enemies create pressure, but they are not the main puzzle. The main puzzle is the card stream. Enemy attacks should be short, readable interruptions that ask whether the player keeps attacking, evades into the combo, blocks into a counter, or cashes out with a finisher.

The first version should focus on one-on-one combat. That keeps the screen readable on mobile and lets the player feel like they are dueling through a combo route. Multi-enemy fights can come later after the core flow is proven.

## Combo Rules

The base rule is generous. Any card played inside the combo window can keep the combo alive. The game should not feel like a rigid matching puzzle.

Advanced combo value comes from overlapping bonuses. Many connection rules can coexist. Matching colors, using related actions, chaining directions, reacting to enemy state, and sequencing card families can all add value at the same time.

The important rule is: everything can connect, but good connections hit harder, flow faster, look better, and create stronger state.

This keeps the game accessible while still giving skilled players room to express mastery. A casual player can tap quickly and feel powerful. A strong player can see multiple layers of connection at once and push the same hand into a much stronger result.

## Combo Routes

Combo routes are temporary states created by how the player is currently fighting. They are not fixed classes chosen before the run.

An aggressive chain creates a damage route. It produces bigger hits and stronger finishers.

A rapid chain creates a speed route. It accelerates draw, lowers friction, and creates a feeling of the hand not stopping.

A dodge-and-counter chain creates a counter route. It rewards risk, precision, and close calls.

A launch, break, and lock chain creates a control route. It keeps the enemy pinned, delayed, or vulnerable.

A built-up chain creates a burst route. It stores pressure and converts it into a heavy payoff.

The interface should only surface the current dominant route. The player should not need to read a full rules panel during combat. The game can show the current state as a short style label, strong color shift, sound layer, and animation treatment.

## Route Rewards

The first version uses immediate route boosts as the main reward model, with a small amount of temporary card transformation as extra spectacle.

Route rewards should not make the player stop and manage resources. The reward should be felt while fighting. If the player builds a route, the game should immediately become faster, heavier, safer, sharper, or more explosive.

The speed route makes the hand feel alive. It can speed up replacement cards, slightly widen the combo window, and make right-flick chase actions feel sharper. At higher intensity, one card in hand can temporarily become a faster variant.

The control route makes the enemy more vulnerable. It can extend launch time, delay enemy retaliation, improve break effects, and make up-flick actions create stronger openings. At higher intensity, one launch or break card can temporarily become a control-enhanced variant.

The counter route turns danger into style. It can strengthen the next action after a dodge, guard, or left-flick variant. It should reward close timing without requiring the whole game to become a parry test. At higher intensity, one evasion or guard card can temporarily become a counter-enhanced variant.

The burst route creates payoff tension. It can make heavy hits and finishers stronger, louder, and more visually dramatic. It should encourage the player to decide whether to cash out now or keep building. At higher intensity, Execute or Heavy Cleave can temporarily become a burst-enhanced variant.

The damage route is the simple aggressive route. It increases direct hit value and makes repeated pressure feel rewarding. It should be easy to trigger but less expressive than the other routes, so players naturally graduate into speed, control, counter, and burst play.

The first version should avoid a full route resource system. Resource spending can return later if the game needs deeper buildcraft, but it should not be part of the first playable.

## Starter Deck Direction

The first starter deck uses the blade-dance direction.

This deck should feel like a light weapon style translated into cards. It is the best first deck because every card can be understood as a physical move, and the player can feel the action meaning without reading long text.

The deck borrows stacking pleasure from the card-synergy direction and danger pleasure from the counter direction, but it does not make either of them the main identity. The default experience should be fast, direct, and stylish.

The first deck has twelve cards.

| Card | Basic tap action | Main role |
| --- | --- | --- |
| Quick Slash | A fast close-range hit | Keeps the combo moving |
| Thrust | A forward stab | Starts pressure and closes distance |
| Launcher | An upward strike | Starts air or control routes |
| Chase Cut | A forward chase attack | Continues pressure after movement or launch |
| Spin Cut | A circular slash | Covers awkward hands and keeps flow alive |
| Shadow Step | A quick evasive move | Dodges pressure while preserving combo |
| Guard | A short defensive stance | Converts danger into counter chances |
| Breaker | A guard-breaking strike | Opens enemies for stronger follow-ups |
| Flying Blade | A ranged cut | Keeps combo alive when not in melee range |
| Heavy Cleave | A slower heavy hit | Builds burst and damage route value |
| Execute | A finisher | Cashes out built combo pressure |
| Overdrive | A temporary style surge | Makes the current route louder and faster |

Directional variants should follow the same language across the deck. Up pushes toward launch or setup. Right pushes toward chase or pressure. Left pushes toward evade, reposition, or counter. Down pushes toward slam, finisher, or commitment.

Quick Slash is the basic glue card. It should be fast and forgiving. Its variants can lift, chase, withdraw, or cut down depending on direction.

Thrust is the clean opener. It should make the player feel like they can start pressure instantly. Its right variant should be one of the clearest chase actions in the early deck.

Launcher creates the first obvious combo route. It should teach that certain actions make later cards feel better without making the connection mandatory.

Chase Cut is the main continuation card. It rewards the player for staying aggressive and should be one of the most satisfying cards to use after a launch, dodge, or ranged hit.

Spin Cut is the safety valve. It should help the player recover from messy hands without dropping combo. It should not be the strongest card, but it should feel good when the player is about to lose flow.

Shadow Step proves that evasion is part of the combo. It should not feel like stopping. A good Shadow Step should immediately invite a counter, chase, or ranged follow-up.

Guard teaches defensive timing. It should be simpler and slower than Shadow Step, but more reliable. A well-timed Guard can create a counter route.

Breaker gives enemies texture. It should matter against guarded, armored, or interrupting enemies. It helps the combat avoid becoming pure card solitaire.

Flying Blade keeps the player active when distance or enemy behavior would otherwise break flow. It should support speed routes and ranged continuation without replacing melee pressure.

Heavy Cleave is the commitment card. It should feel heavier, riskier, and more rewarding. It is the bridge between normal combo play and burst payoff.

Execute cashes out. It should be tempting, but not always correct. The player should feel the difference between using it early and using it after a strong route has built pressure.

Overdrive is the style spike. It should not be a normal damage button. It should temporarily make the current route stronger, louder, faster, or more explosive.

## Starter Deck Directional Variants

The first version uses stable directional meaning with route rewards layered on top. The player should learn the directions through action first. Route bonuses should feel like extra payoff, not hidden controls.

| Card | Tap | Up flick | Right flick | Left flick | Down flick |
| --- | --- | --- | --- | --- | --- |
| Quick Slash | Fast slash | Rising slash | Chase slash | Retreat slash | Pressing slash |
| Thrust | Straight stab | Lifting stab | Dash thrust | Backstep stab | Deep pierce |
| Launcher | Uppercut cut | High launch | Air chase | Reset step | Slam setup |
| Chase Cut | Forward cut | Rising chase | Double chase | Crossback cut | Driving cut |
| Spin Cut | Circular hit | Lift spin | Advancing spin | Evasive spin | Ground spin |
| Shadow Step | Short evade | Phase through | Chase step | Backstep | Low slip |
| Guard | Short guard | Guard break lift | Guard advance | Parry retreat | Heavy counter |
| Breaker | Break strike | Armor lift | Break rush | Feint break | Crush strike |
| Flying Blade | Ranged cut | Rising blade | Piercing blade | Returning blade | Falling blade |
| Heavy Cleave | Heavy hit | Heavy launch | Shoulder cleave | Guarded retreat | Down cleave |
| Execute | Finisher | Aerial execute | Chase execute | Counter execute | Burst execute |
| Overdrive | Route surge | Control surge | Speed surge | Counter surge | Burst surge |

Up variants should feed control and air value. They are good when the player wants to lift, delay, or open a stronger follow-up.

Right variants should feed speed and pressure. They are good when the player wants to keep moving forward and make the hand feel faster.

Left variants should feed counter and recovery value. They are good when the player needs to avoid danger without losing flow.

Down variants should feed damage and burst value. They are good when the player wants commitment, payoff, or a heavier hit.

The variant names can change later. The important part is the player-facing language: up means lift, right means chase, left means evade or counter, down means slam or cash out.

## Roguelike Version

The roguelike version is the main direction.

Each run is a chain of short fights. A fight should last around one to two minutes. The player wins by defeating enemies, but the real goal is to keep the combo alive and finish fights with strong style.

After each fight, the player gains a small choice that changes the deck, card behavior, combo bonuses, route bias, or risk profile. Rewards should support different ways to be stylish, not only larger damage numbers.

The deck should stay lean. The game depends on fast reading. Too many similar cards or long card text will damage the core experience. New cards and upgrades should be visually distinct and readable at speed.

Run identity comes from how the deck changes the combo routes. One run might push speed and endless flow. Another might reward perfect dodges and counters. Another might build toward huge finishers. The same core input stays consistent, but each run asks the player to chase a different kind of combo high.

Failure should feel like losing momentum, not wasting time. Since runs are mobile-friendly, restarts should be fast. Meta-progression, if used, should unlock variety and style options rather than raw power that makes early play feel incomplete.

## Roguelike Reward Model

The reward model combines three layers: deck change, card upgrade, and style relic.

Deck change is the simplest layer. After fights, the player can add a new card, remove a card, or replace a card. This layer changes what the player can draw and how often certain combo routes appear.

Card upgrade is the action layer. Upgrades should change a card's tap action, one directional variant, or its route reward. A good upgrade should be visible in combat. It should not be a tiny percentage increase that the player cannot feel.

Style relics are the run identity layer. A relic changes the rules around combo routes, replacement speed, enemy pressure, finishers, or card transformation. Relics should make a run feel different without forcing the player to relearn the controls.

The first version should prioritize rewards that change feel. Examples include faster card replacement after right-flick actions, a stronger next hit after left-flick evasion, longer enemy vulnerability after up-flick launch, and louder finisher payoff after down-flick commitment.

Reward choices should stay compact. A normal fight can offer three choices. Elite fights can offer a stronger relic. Shops can sell cards, upgrades, removals, and relics. Rest points can upgrade, remove, or convert a card.

The reward pool should borrow from several roguelike patterns. The route map and risk choices come from path-based deckbuilders. Blessing-like upgrades modify actions without breaking the base input. Synergy relics create stacking excitement. Card evolution makes familiar cards feel fresh. Extreme stacking should exist, but it should be controlled so the phone screen remains readable.

The first playable should not include full meta-progression or many currencies. It should include a compact equipment-contract layer because equipment now defines the opening identity of a run.

## 上行刀路 Spec

The current roguelike route structure is 上行刀路. The map is a vertical blade path. The player starts from the bottom of the phone screen and climbs toward the act boss at the top. A route choice is not only a reward choice. It is a battle contract that changes how the next fight flows, what the hand tends to generate, what the boss learns, and what kind of risk the player accepts.

Each map step should be readable in two seconds. The player sees only the next two layers. Stable routes offer rest, scouting, forging, and shops. Risk routes offer elites, cursed chests, black-market trades, and hunt nodes. Stable routes help the player repair the run and understand the boss. Risk routes give stronger relics, equipment tuning, or one-shot marks, but they make the next fight harder to read, harder to keep flowing, or more likely to teach the boss a counter to the player's dominant style.

Non-combat nodes must change combat feel. A shop can sell cards, relics, one-shot marks, equipment inscriptions, and boss intelligence. A forge can bias a card toward right-flick chase, left-flick riposte, down-flick break, or another visible action path. A scout node reveals one boss windup and makes that move show its visual tell earlier in the real fight. A boss preview plays a short shadow rehearsal before the real boss. A hunt node removes one boss component through a dangerous mini-fight; skipping it leaves that component alive.

Rewards are split into card changes, card upgrades, equipment inscriptions, relics, contracts, one-shot marks, and boss evidence. Card changes alter the lean deck. Card upgrades alter a tap action, a directional variant, or a route payoff. Equipment inscriptions strengthen one loop inside the selected starting identity. Relics mutate the run's feel. Contracts push one route into a stronger but more dangerous state. One-shot marks create short-term action spikes. Boss evidence turns read quality, break quality, and stylish finishing into long-term information or future unlocks.

Combo quality decides reward width. Boss-read quality decides intelligence and codex progress. Break quality decides material and boss-route quality. A messy clear should still move the run forward, but it should only give ordinary rewards. The strongest route-changing rewards should require the player to read a windup, keep combo pressure alive, break the boss during danger, or finish with a specific direction.

Equipment is a starting contract, not a traditional gear screen. The first playable uses six identities: Storm Katana for right-flick chase and fast refill; Gravity Hammer for launch into down-slam break; Mirror Fan for left-flick reading and afterimage counter; Gunblade for melee-ranged rhythm; Executioner for break into Execute; Duelist's Scabbard for thin-deck fast cycling. The first implementation can focus on Storm Katana, Mirror Fan, and Executioner before expanding all six.

Relics use the same visual route language as combat. Chase uses green arrow strokes. Launch uses cyan rising blades. Counter uses purple spiral marks. Burst uses gold heavy stamps. Pressure uses red cuts. The icon and color must communicate route identity before text does.

Contracts replace ordinary curses. A chase contract can speed up right-flick replacement while teaching the boss a backstep slash after repeated pursuit. A counter contract can greatly improve perfect left-flick payoff while weakening normal guard. A burst contract can unlock earlier Execute while locking a card after a missed down-flick. The player should feel that the bargain is about whether they can perform, not whether they can absorb a hidden stat penalty.

Bosses are shaped by route ecology. The act boss has a fixed identity, but map choices leave route marks on it. If the player repeatedly takes chase routes, the boss learns pursuit counters. If the player leans on counter routes, the boss gains feints. If the player builds burst, the boss protects or delays Execute windows. These counters must not invalidate the route. They should demand the advanced version of that route.

The first route slice should be one act with seven to eight nodes and a six-to-eight-minute run time. Use one final boss, three readable route identities, three equipment identities, three special rules, and two relics per route. The slice passes only if three consecutive runs can feel clearly different: close-range chase pressure, patient read-and-counter, and frozen-burst execution.

## Relics, Talents, And Equipment

Relics, talents, and equipment are separate systems. They should not all become generic stat bonuses.

Relics are run-only passive rule changes. They trigger automatically during combat and should make the current run feel strange, stylish, or broken in a controlled way. Relics are the main source of run identity.

Examples include faster replacement after repeated right-flick actions, stronger follow-up after perfect left-flick evasion, copied cards after long combo chains, stronger Execute after a route switch, or temporary card transformation after a finisher.

The relic pool has three design branches.

Route relics are the main branch. They support speed, control, counter, burst, and damage routes. These relics make the current run readable and help the player understand what kind of style they are building.

Stacking relics are the escalation branch. Some relics can be taken more than once, and each copy makes the effect stronger. These relics create late-run excitement, but only a small part of the pool should stack to keep balance and screen readability under control.

Strange relics are the mutation branch. They change card behavior in memorable ways, such as making Flying Blade return, Shadow Step leave an afterimage, Heavy Cleave relaunch enemies, or Execute transform after a missed cash-out. These relics should be rare or boss-tier.

The first relic pool should be roughly seventy percent route relics, twenty percent stacking relics, and ten percent strange relics. Route relics keep the system stable. Stacking relics create growth. Strange relics create stories.

## Initial Relic Pool

This is the first screened relic pool. It keeps effects that are readable at speed, felt immediately in combat, and connected to the core input language.

| Relic | Branch | Route | Rarity | Effect |
| --- | --- | --- | --- | --- |
| Redline Scabbard | Route | Speed | Common | Right flicks make the next tap auto-chase. |
| Step-Cancel Charm | Route | Speed | Common | After Shadow Step, the next card recovers instantly. |
| Sliding Grip | Route | Speed | Uncommon | Right flicks can be buffered during another card's ending frames. |
| Comet Sheath | Route | Speed | Rare | Every fourth card becomes a chase variant if possible. |
| High Hand Sigil | Route | Control | Common | Up flicks lightly lift grounded enemies, even on non-Launcher cards. |
| Floating Point | Route | Control | Common | Airborne enemies stay suspended while the player plays tap actions. |
| Juggler's Mark | Route | Control | Uncommon | Launcher up flick marks a target; the next Chase Cut snaps to it. |
| Spin Orbit | Route | Control | Rare | Spin Cut up flick keeps enemies circling until hit by a slam. |
| Guard Point | Route | Counter | Common | Guard left flick counters instead of only blocking. |
| Borrowed Edge | Route | Counter | Uncommon | Perfect evade makes the next Quick Slash repeat once. |
| Reversal Hilt | Route | Counter | Uncommon | After Guard blocks, the next left flick becomes a counter variant. |
| Black Silk Guard | Route | Counter | Rare | Shadow Step left flick stores the avoided hit and releases it on Breaker. |
| Drop Hammer | Route | Burst | Common | Down flicks gain a shockwave if the target is airborne. |
| Break Spark | Route | Burst | Common | Breaker down flick detonates enemy armor instead of only breaking it. |
| Overdrive Fuse | Route | Burst | Uncommon | After Overdrive, the next down flick triggers twice. |
| Execution Drum | Route | Burst | Rare | Execute down flick hits all marked or staggered enemies. |
| Open Wound Compass | Route | Damage | Common | Left or right flick after Quick Slash makes the target bleed on movement. |
| Split-Tip Spear | Route | Damage | Common | Thrust variants pierce through the first target. |
| Hungry Blade | Route | Damage | Common | Execute can trigger on staggered enemies, not only low-health enemies. |
| Crown of Cuts | Route | Damage | Rare | Each unique starter attack used in a combo adds one final phantom slash. |
| Sky Receipt | Stacking | Control | Common | Every few up flicks add a small juggle pop; extra copies lower the trigger count. |
| Backstep Spark | Stacking | Counter | Common | Left flick after enemy windup leaves a counter spark; extra copies widen timing and add sparks. |
| Guard Rail | Stacking | Counter | Common | Guard blocks nudge enemies upward; extra copies make the nudge launch-ready. |
| Impact Tax | Stacking | Burst | Common | Down flicks add stronger hit-stop on first contact; extra copies increase impact up to a cap. |
| Orbit Pin | Stacking | Speed | Uncommon | Flying Blade circles after a right flick; extra copies extend orbit time. |
| Step Debt | Stacking | Counter | Uncommon | Each Shadow Step this fight sharpens the next left flick; extra copies increase the per-step gain. |
| Mirror Tempo | Stacking | Speed | Uncommon | Repeating the last direction on a different card speeds it up; extra copies widen the timing window. |
| Combo Lantern | Stacking | Any | Uncommon | At a combo threshold, the next variant glows and gains wider timing; extra copies lower the threshold. |
| Black Ribbon | Stacking | Burst | Rare | Execute resets one variant direction if it kills; extra copies reset more directions. |
| Crown of Sparks | Stacking | Any | Rare | Every fourth distinct direction creates a crown hit; extra copies reduce the requirement. |
| Mirror Scar | Strange | Counter | Rare | Left flicks leave a delayed afterimage that repeats the card's basic action. |
| Grave Palm | Strange | Burst | Rare | Down flicks briefly pin enemies, making the next hit unable to whiff. |
| Blade Magnet | Strange | Speed | Rare | Flying Blade marks enemies; right flicks snap to marked targets. |
| Compass Wound | Strange | Any | Rare | If the last two flicks used opposite directions, the next card upgrades. |
| Iron Encore | Strange | Any | Boss | The last card played before Overdrive repeats once during Overdrive. |
| Guillotine Weather | Strange | Burst | Boss | Airborne enemies take Execute effects from any down flick. |
| Blood Cinema | Strange | Burst | Boss | The first time a fight would end, time slows and the killing card repeats in its flashiest variant. |

Rejected relic directions include inverted controls, frequent forced inputs, effects that require long memory chains, and pure stat increases with no visible action change.

Talents are progression and route preference. Long-term talents unlock tools, options, training features, reward control, starting styles, and challenge modes. In-run talents can bias a run toward speed, control, counter, burst, or damage.

Talents should not become raw power inflation. They should help players practice and express a style, not make early combat feel incomplete.

## Initial Talent Pool

This is the first screened talent pool. Talents are split into long-term tools, in-run route shaping, and optional mastery challenges.

| Talent | Type | Timing | Effect |
| --- | --- | --- | --- |
| Starter Draft | Long-term | Early unlock | Pick one of three starter deck presets before a run. |
| First Cut Tutor | Long-term | Tutorial boss unlock | Choose one starter card to appear in the opening hand. |
| Clean Hand | Long-term | Mid-account unlock | Once per run, reroll the opening four-card hand. |
| Practice Mark | Long-term | Training unlock | Mark one card as a practice focus and track its successful chains. |
| Combo Notebook | Long-term | After several runs | Save recent successful three-card combo strings for review. |
| Ghost Replay | Long-term | Boss defeat unlock | Review a short input timeline after death. |
| Direction Drills | Long-term | Training unlock | Practice up, right, left, and down variants in a drill room. |
| Slow Room | Long-term | Elite unlock | Practice combat at reduced speed outside real runs. |
| Combo Labels | Long-term | Account option | Cards can show learned tags such as launch, chase, counter, or finisher. |
| Route Scout | Long-term | Act 2 unlock | See one extra node ahead on the run map. |
| Boss Study | Long-term | After losing to a boss | Boss preview shows one signature mechanic. |
| Reward Filter | Long-term | Drafting unlock | Mark one disliked card family to appear less often. |
| Reward Pin | Long-term | Mid-game unlock | Once per act, pin a reward choice and decide after the next room. |
| Variant Bias | Long-term | Flick mastery unlock | Rewards slightly prefer cards matching a chosen direction. |
| Upgrade Lens | Long-term | Upgrade unlock | Reward screens show whether a card has known combo links. |
| Mentor Choice | Long-term | First clear unlock | After elite rooms, choose the reward category first. |
| Collection Case | Long-term | Account feature | Track discovered cards, variants, relics, and combo chains. |
| Oath Slots | Long-term | Act 1 repeat unlock | Unlock selectable run restrictions for self-directed difficulty. |
| Daily Seed | Long-term | Account unlock | Access a fixed daily run with shared rules. |
| Input Buffer Tuning | Long-term | Account setting | Choose a supported flick buffer feel before a run. |
| Speed Draft | In-run | Act reward | Reward screens show more right-flick cards and speed upgrades. |
| Chain Pursuit | In-run | Act reward | After upgrading a right variant, the next reward favors chase cards. |
| Rapid Refinement | In-run | Boss reward | Existing right variants appear more often in upgrade offers. |
| Air Marshal | In-run | Act reward | Reward screens show more up-flick cards and control upgrades. |
| Clean Arc | In-run | Act reward | Rewards favor cards that connect from up into right. |
| Gravity Lesson | In-run | Act reward | Down upgrades appear more often on cards that already have up variants. |
| Counter Doctrine | In-run | Act reward | Reward screens show more left-flick cards and counter upgrades. |
| Riposte Bias | In-run | Act reward | Guard, Shadow Step, and Quick Slash upgrades skew left. |
| Slipstream | In-run | Act reward | Left cards are more likely to be paired with right cards in rewards. |
| Return Cut | In-run | Act reward | Counter upgrades appear more often on attacks, not only defense cards. |
| Break Doctrine | In-run | Act reward | Reward screens show more down-flick cards and burst upgrades. |
| Heavy Line | In-run | Act reward | Heavy Cleave, Breaker, and Execute upgrades skew down. |
| Crush Window | In-run | Act reward | Cards with up variants more often receive down payoff upgrades. |
| Ender Priority | In-run | Boss reward | Execute-style cards appear more often after choosing down upgrades. |
| Sharp Basics | In-run | Act reward | Basic tap upgrades appear more often on attack cards. |
| Form Commitment | In-run | Boss reward | Pick one direction; future rewards and upgrades strongly favor it. |
| Directional Purist | Mastery | Challenge unlock | Each combat highlights one direction for extra score and reward charge. |
| Perfect Pursuit | Mastery | Score goal | Bonus for killing enemies shortly after a right-flick action. |
| Airborne Doctrine | Mastery | Challenge mode | Enemies take less ground damage but more launch and control damage. |
| Groundbreaker | Mastery | Challenge mode | Down-flick effects build stagger faster, but enemies recover faster after stagger ends. |
| Thin Blade Vow | Mastery | Challenge mode | Deck cannot exceed ten cards; extra rewards become upgrades, removals, or score. |
| Starter Pride | Mastery | Challenge mode | Starter cards begin upgraded, but rare cards appear less often. |
| Overdrive Debt | Mastery | Difficulty modifier | Overdrive starts charged, but using it increases enemy aggression for the fight. |
| Full Compass | Mastery | Score goal | Using up, right, left, and down in one combo grants Compass score. |
| Juggler's License | Mastery | Advanced tool | Adds an air-time meter for launch and control mastery. |
| Risk Ledger | Mastery | Advanced tool | Before elites, choose one added enemy modifier for a visible reward boost. |
| Flicksmith | Mastery | Advanced tool | Shows post-combat breakdown by direction, card, damage, control, defense, and wasted actions. |
| Grandmaster Seed | Mastery | Challenge mode | Fixed expert seed with locked rewards, leaderboard score, and no mid-run rerolls. |

Rejected talent directions include permanent raw damage, mandatory grind gates, talents that make standard runs stressful, and talents that hide essential combat information behind progression.

Equipment defines the starting identity of a run. It can change which part of the starter deck is emphasized. A light blade can favor speed and chase actions. A heavy blade can favor burst and down-flick commitment. A shadow blade can favor evasion and counter routes. A ring blade can favor ranged continuation and spin actions.

Equipment should be readable before the run starts. The player should understand how the equipment changes their opening style without reading long rules.

The long-term structure can unlock new equipment, new relic pools, new starting styles, and new talent branches. These systems should expand variety first and permanent strength second.

## Initial Equipment Pool

This first screened equipment pool is larger than the relic and talent pools because equipment carries starting identity. Equipment is grouped into style sets, weapons, utility gear, buildcraft gear, and boss or cursed gear.

| Equipment | Type | Route bias | Effect |
| --- | --- | --- | --- |
| Duelist Foil | Style set | Speed / Counter | A precise rapier set that favors Thrust, Quick Slash, Guard, and single-target timing. |
| Ironbreaker | Style set | Burst / Counter | A shield-and-mace set that turns Guard, Breaker, and Heavy Cleave into a slow punish style. |
| Storm Katana | Style set | Speed / Control | A dash blade set that favors Quick Slash, Chase Cut, Shadow Step, and launch-to-chase routes. |
| Gravity Hammer | Style set | Control / Burst | A hammer set that keeps enemies airborne, then turns down flicks into heavy slam payoff. |
| Twin Daggers | Style set | Speed / Counter | A dual-dagger set built around many small hits, evasive repositioning, and Execute finishers. |
| Chain Scythe | Style set | Control / Counter | A midrange set that pulls, trips, recalls, and controls distance with Flying Blade and Launcher. |
| Gunblade | Style set | Speed / Burst | A melee-ranged hybrid where close hits create shot follow-ups and Overdrive burst windows. |
| Mirror Fan | Style set | Counter / Control | An evasive illusion set where dodges leave echoes or decoys that feed counter routes. |
| Rocket Boots | Style set | Control / Speed | A movement-first set where Launcher, Chase Cut, and Spin Cut turn aerial positioning into damage. |
| Executioner | Style set | Burst / Damage | A heavy finisher set built around Breaker, Heavy Cleave, and Execute kill confirms. |
| Wind Bowblade | Style set | Speed / Counter | A ranged skirmisher set where Flying Blade and Shadow Step keep pressure while repositioning. |
| Resonance Blade | Style set | Speed / Burst | A rhythm blade set where repeated direction patterns strengthen Spin Cut, Chase Cut, and Overdrive. |
| Sand Chakram | Style set | Control / Counter | A returning-blade set that makes Spin Cut and Flying Blade create delayed return paths. |
| Beast Claws | Style set | Speed / Damage | A feral set that rewards staying aggressive with Quick Slash, Chase Cut, and Spin Cut. |
| Ink Brush | Style set | Control / Counter | A calligraphy blade set where Flying Blade and Shadow Step leave lingering stroke zones. |
| Crown of Blades | Style set | Control / Counter | A command-blade set where Guard and Flying Blade create floating blade echoes. |
| Twin Needle | Weapon | Speed | Right flick repeats the last basic action at reduced strength if it hit. |
| Glass Fang | Weapon | Counter / Burst | Left flick after a hit stores a riposte; the next tap becomes a light finisher. |
| Viper Stiletto | Weapon | Damage / Burst | Down flick marks a wounded target; Execute consumes the mark for stronger payoff. |
| Iron Mandible | Weapon | Burst | Down flick converts the next tap into an armor-breaking slam. |
| Grave Splitter | Weapon | Control / Burst | Up flick on heavy cards launches both target and player, enabling aerial variants. |
| Executioner's Saw | Weapon | Damage / Burst | Basic attacks shred enemies; Execute refunds if used on a shredded target. |
| Pilgrim Spear | Weapon | Control | Up flick on Thrust pins airborne enemies instead of launching them higher. |
| Comet Lance | Weapon | Control / Speed | Right flick after an up flick becomes a piercing chase through targets. |
| Serpent Chain | Weapon | Control / Counter | Right flick extends range; left flick recalls the blade and counters if the enemy acts. |
| Thorn Whip | Weapon | Control / Burst | Up flick launches at range; down flick slams all launched enemies. |
| Halo Chakram | Weapon | Speed / Control | Tap throws the ring; flick direction changes its return path and modifies the next card. |
| Ash Gunblade | Weapon | Speed / Burst | Tap attacks in melee; right flick fires a chase shot after a melee hit. |
| Needle Rapier | Weapon | Damage | Repeated taps on one target refine a wound; flick direction changes the wound payoff. |
| Saint's Estoc | Weapon | Counter / Control | Guard tap creates a perfect-thrust window with up, right, and left follow-ups. |
| Stone Fist Blade | Weapon | Burst / Counter | Guard braces; the next down flick becomes a close-range shockwave. |
| Bell Hammer | Weapon | Control / Burst | Down flick dazes grounded enemies; up flick after daze launches heavier. |
| Four-Wind Jian | Weapon | Any | Each direction upgrades one starter family: up Launcher, right Chase, left Step, down Breaker. |
| Compass Blade | Weapon | Any | The first flick direction each combat brands the fight style and adds matching behavior. |
| Miststep Cloak | Utility | Counter | The first left flick each fight becomes a vanish and delays enemy intent by one beat. |
| Training Bracers | Utility | Comfort | Opening hand always includes one Guard or Shadow Step. |
| Compass Engine | Utility | Any | Completing left, right, up, and down marks grants a safe redraw. |
| Feather Brake | Utility | Speed / Safety | Right-flick chase can be canceled into Guard before impact. |
| Stone Palm | Utility | Counter / Break | Guard stores one impact; the next Breaker spends it to interrupt armor. |
| Lantern Talisman | Utility | Comfort | Highlights the safest flick direction on one card as a learning aid. |
| Windlace Boots | Utility | Counter | Left-flick Shadow Step keeps combo count alive even when no target is hit. |
| Blueglass Mask | Utility | Control | Seeing a launched enemy lets the player preview the next draw. |
| Oath Guard | Utility | Safety | Blocking protects combo count once; repeated mistakes break the oath for the fight. |
| Drift Soles | Utility | Speed | Right-flick chase can redirect once if the target dies or moves. |
| Null Charm | Utility | Comfort | Once per combo, a failed variant becomes its basic tap instead of whiffing. |
| Clockwork Palm | Utility | Counter / Control | Guard, Shadow Step, and Breaker in sequence freeze enemy intent for one beat. |
| Duelist's Scabbard | Buildcraft | Speed | Start with Quick Slash upgraded, remove Heavy Cleave, and bias rewards toward slash cards. |
| Skyhook Rig | Buildcraft | Control | Replace Thrust with Launcher upgraded; the first reward always offers a launch card. |
| Mirror Guard | Buildcraft | Counter | Replace Spin Cut with Guard upgraded; Guard upgrades into counter variants. |
| Executioner's Seal | Buildcraft | Burst | Start with Execute upgraded and bias rewards toward marked, wounded, or threshold effects. |
| Black Thread | Buildcraft | Counter | Shadow Step starts upgraded; early evades convert adjacent attacks into counter cards. |
| Split-Edge Manual | Buildcraft | Any | First upgrade on each starter unlocks an extra flick variant instead of adding stats. |
| Broken Sheath | Buildcraft | Speed | Start with one fewer card; first elite drops a removal or conversion reward. |
| Winged Hilt | Buildcraft | Control | Flying Blade replaces Breaker; launch and blade rewards are linked. |
| Needle Compass | Buildcraft | Any | After each boss, choose one direction to bias the next act's rewards. |
| Rust-Eater Charm | Buildcraft | Mutation | The first card removed offers a corrupted stronger version. |
| Eclipse Cloak | Buildcraft | Counter | Shadow Step starts upgraded; every third evade upgrades a left-flick card. |
| Butcher's Ledger | Buildcraft | Burst | Execute replaces Flying Blade; kill rewards offer upgrade, removal, or mutation. |
| Gravity Spurs | Buildcraft | Control / Speed | Launcher gains a chase follow-up; launch rewards become more common after aerial kills. |
| Ratchet Gauntlet | Buildcraft | Any | Each upgrade asks whether the card branches toward damage, speed, control, or burst. |
| Grave Nail | Buildcraft | Burst | Cards that kill can mutate into finisher-family cards. |
| Wildcard Scabbard | Buildcraft | Any | After the first elite, replace the least-used starter with a route-matching rare card. |
| Crown of the First Boss | Boss / Cursed | Any | First card each room is empowered and copies its flick direction to the next card, but missing costs HP. |
| Black Kite Cloak | Boss | Speed / Control | Right flicks auto-chase airborne targets, but grounded enemies punish harder. |
| Glass Meteor | Boss | Control / Burst | Down flick after up flick becomes a meteor finisher; taking damage shatters the bonus for the room. |
| Mirrorbrand | Cursed | Counter | Left flick repeats the last enemy attack as a counter; if no attack was countered, it backfires. |
| Ash Halo | Cursed | Burst | Overdrive starts charged every room, but ending it empties the hand briefly. |
| Maw Engine | Boss | Burst | Down flick consumes the current combo count for a massive burst, then resets the chain. |
| Saint of Knives | Boss | Speed | Flying Blade returns through enemies after any right flick. |
| Obsidian Drum | Boss | Burst / Control | Every down flick charges a beat; the fourth beat stuns the room. |
| Black Sun Dial | Boss | Any | Every twelve actions triggers time stop for one card, then enemies act faster after time resumes. |
| The Boss's Spare Hand | Boss / Cursed | Any | Adds a fifth ghost card that repeats the last flick direction, but can turn against the player after being hit. |

Rejected equipment directions include plain armor or weapon stats, random affix piles, effects that hide enemy intent too much, and gear that makes the game feel like a traditional RPG inventory screen.

## Run Structure

The three-act structure is the current main direction.

A run is divided into three acts. Each act has its own combat rhythm, enemy pressure, reward flavor, and boss. The player should feel the run changing shape as they move forward, not simply seeing larger numbers.

Act one teaches flow. It should make the player comfortable with tap actions, basic flick variants, combo continuation, and one or two route states. The boss should test whether the player can keep playing while responding to clear pressure.

The current act one theme is a warm-up street fight. It should feel grounded, readable, and direct. Enemies teach pressure without overwhelming the player.

Act two adds disruption. It should introduce enemies, modifiers, or rewards that push the player into stronger route identity. This act is where the run starts to feel different based on the cards and upgrades chosen.

The current act two theme is a distorted battlefield where the rhythm is disrupted. It should introduce stranger enemy timing, route-specific rewards, and modifiers that make the player adapt their combo habits.

Act three asks for mastery. It should increase speed, punish sloppy play more clearly, and give the player chances to create big finishers. The final boss should test sustained flow, route switching, and cashing out at the right moment.

The current act three theme is a high-pressure duel tower. It should feel fast, sharp, and climactic. The final stretch should reward players who can keep reading the card stream while switching routes under pressure.

The alternate branch is a continuous short-fight structure.

In that branch, a run is a longer ladder of compact fights with less act framing. This version is better for fast mobile sessions, daily challenge modes, and score chasing. It gives the game a cleaner arcade feel, but it has less dramatic shape than the three-act version.

If the project later changes direction, the same encounters and rewards can be rearranged. The three-act version groups fights into dramatic arcs. The continuous version turns them into a cleaner ladder.

## Stage-Based Version

The stage-based version is a future branch, not the first direction.

In this version, each level is a hand-authored combat challenge. The enemy, card pool, rewards, and encounter rhythm can be tuned around a specific lesson or spectacle.

This version is better for a campaign, boss ladder, score attack, or curated challenge mode. It allows more authored moments and cleaner difficulty pacing.

The tradeoff is lower replay variety. Since the core design is built around flow and improvisation, the stage version should emphasize mastery, medals, leaderboards, and high-style clears instead of pretending to be endlessly fresh.

If the game later pivots to stage-based design, the same combat system can remain intact. The run map becomes a level list. Post-fight rewards become fixed unlocks, medal goals, or challenge modifiers.

## First Playable Target

The first playable should prove that the player can read four cards, tap or flick one, get an immediate action, receive a replacement card, and feel pressure to continue.

It should include one enemy, one combo meter, a small set of action cards, basic tap actions, directional variants, generous combo continuation, and at least three visible combo route states.

The first playable is successful if a new player can survive by tapping, while a practiced player can visibly play faster, use directional variants, maintain longer combos, and trigger stronger route effects.
