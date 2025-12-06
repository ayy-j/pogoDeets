# Pokémon GO Data – Compact Reference (LLM-friendly)

**Minified endpoints**
- Eggs: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json
- Events: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.min.json
- Raids: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json
- Research: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json
- Rocket Lineups: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json

Use formatted versions (`.json`) for readability; `.min.json` for size.

## Eggs
- Root: array.
- Fields: name, eggType ("1/2/5/7/10/12 km"), isAdventureSync, isGiftExchange, isRegional, image, canBeShiny, combatPower { min, max }, rarity (1–5), rarityTier (Common/Uncommon/Rare/Very Rare/Ultra Rare).
- Example: Bulbasaur 1 km, canBeShiny, CP 637/637, rarityTier "Very Rare".
- Hatch CP is effectively fixed for most entries (min usually equals max).

## Events
- Root: array.
- Fields: eventID, name, eventType, heading, link, image, start, end, timezone.
- extraData (nullable) variants:
  - generic { hasSpawns, hasFieldResearchTasks }
  - spotlight { name, canBeShiny, image, bonus, list[] }
  - breakthrough { ... }
  - raidbattles { bosses[] { name, image, canBeShiny }, shinies[] }
  - communityday { spawns[], bonuses[], bonusDisclaimers[], shinies[], specialresearch[] { name, step, tasks[], rewards[] } }
  - promocodes[] (strings; present on research-style events)
- Times are ISO 8601; timezone may be null or "Local Time"/region labels.

## Raids
- Root: array.
- Fields: name, tier (Tier 1/3/5, Mega, Shadow Tier 1/3/5), canBeShiny, types[] { name, image }, combatPower { normal { min,max }, boosted { min,max } }, boostedWeather[] { name, image }, image.
- Weather names: sunny, rainy, partly cloudy, cloudy, windy, snow, fog.

## Research
- Root: object with seasonalInfo and tasks[].
- seasonalInfo: breakthroughPokemon[], spindaPatterns[], season|null.
- task: text, type (catch/throw/battle/explore/training/rocket/buddy/ar/sponsored | null | occasionally omitted), rewards[].
  - encounter reward: { type:"encounter", name, image, canBeShiny, combatPower { min,max } }
  - item reward: { type:"item", name (display label, e.g., "×200"), image, quantity }

## Rocket Lineups
- Root: array of members.
- Fields: name, title (Boss/Leader/Grunt), type (empty for bosses/leaders), gender.
- firstPokemon[] / secondPokemon[] / thirdPokemon[] (1–3 each): { name, image, types[], isEncounter, canBeShiny }.
- Encounter rule of thumb: Grunts first slot; Leaders first slot; Giovanni third slot.

## Common Types & Conventions
- Primitives: string, number, boolean, null; URL strings; ISO 8601 datetimes.
- Arrays `[]` for lists; objects `{}` for structured subfields.
- Images are absolute URLs (mostly cdn.leekduck.com).

## Quick filtering snippets (pseudo-JS)
- Shiny Tier 5 raids: `raids.filter(r => r.tier === 'Tier 5' && r.canBeShiny)`
- Community Days: `events.filter(e => e.eventType === 'community-day')`
- Catch-type research: `research.tasks.filter(t => t.type === 'catch')`
