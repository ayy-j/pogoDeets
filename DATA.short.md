# Pokémon GO Data – Compact Reference (LLM-friendly)

**Minified endpoints**
- Eggs: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json
- Events: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.min.json
- Raids: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json
- Research: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json
- Rocket Lineups: https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json

Use formatted versions (`.json`) for readability; `.min.json` for size.

## JSON Formatting
- **Minified (`.min.json`)**: No whitespace, single-line, optimized for bandwidth. Recommended for API consumption.

Both formats contain identical data.

## Eggs
- Root: array.
- Fields: name, eggType ("1/2/5/7/10/12 km"), isAdventureSync, isGiftExchange, isRegional, image, canBeShiny, combatPower { min, max }, rarity (1–5), rarityTier (Common/Uncommon/Rare/Very Rare/Ultra Rare).
- Example: 
```json
{
  "name": "Bulbasaur",
  "eggType": "1 km",
  "isAdventureSync": false,
  "isGiftExchange": false,
  "isRegional": false,
  "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm1.icon.png",
  "canBeShiny": true,
  "combatPower": { "min": 637, "max": 637 },
  "rarity": 4,
  "rarityTier": "Very Rare"
}
```

## Events
- Root: array.
- Fields: eventID, name, eventType, heading, link, image, start, end, timezone.
- extraData (nullable) variants:
  - generic { hasSpawns, hasFieldResearchTasks }
  - spotlight { name, canBeShiny, image, bonus, list[] }
  - breakthrough { ... }
  - raidbattles { bosses[] { name, image, canBeShiny }, shinies[] }
  - communityday { spawns[], bonuses[], bonusDisclaimers[], shinies[], specialresearch[] { name, step, tasks[], rewards[] } }
  - promocodes[] (strings)
- Times are ISO 8601; timezone may be null or "Local Time"/region labels.
- eventType reference: See Events.md for ~30 event categories.
- Example (spotlight):
```json
{
  "eventID": "pokemonspotlighthour2025-12-09",
  "name": "Shieldon Spotlight Hour",
  "eventType": "pokemon-spotlight-hour",
  "start": "2025-12-09T18:00:00.000",
  "end": "2025-12-09T19:00:00.000",
  "timezone": "Local Time",
  "extraData": {
    "spotlight": {
      "name": "Shieldon",
      "canBeShiny": true,
      "bonus": "2× Catch XP"
    }
  }
}
```

## Raids
- Root: array.
- Fields: name, tier (Tier 1/3/5, Mega, Shadow Tier 1/3/5), canBeShiny, types[] { name, image }, combatPower { normal { min,max }, boosted { min,max } }, boostedWeather[] { name, image }, image.
- Weather names: sunny, rainy, partly cloudy, cloudy, windy, snow, fog.
- Example:
```json
{
  "name": "Kyurem",
  "tier": "Tier 5",
  "canBeShiny": true,
  "types": [
    { "name": "dragon", "image": "..." },
    { "name": "ice", "image": "..." }
  ],
  "combatPower": {
    "normal": { "min": 1957, "max": 2042 },
    "boosted": { "min": 2446, "max": 2553 }
  },
  "boostedWeather": [
    { "name": "windy", "image": "..." },
    { "name": "snow", "image": "..." }
  ]
}
```

## Research
- Root: object with seasonalInfo and tasks[].
- seasonalInfo: breakthroughPokemon[], spindaPatterns[], season|null.
- task: text, type (catch/throw/battle/explore/training/rocket/buddy/ar/sponsored | null | occasionally omitted), rewards[].
  - encounter reward: { type:"encounter", name, image, canBeShiny, combatPower { min,max } }
  - item reward: { type:"item", name (display label, e.g., "×200"), image, quantity }
- Example:
```json
{
  "seasonalInfo": {
    "breakthroughPokemon": ["Galarian Mr"],
    "spindaPatterns": [6, 7],
    "season": null
  },
  "tasks": [
    {
      "text": "Catch 10 Pokémon",
      "type": "catch",
      "rewards": [
        {
          "type": "encounter",
          "name": "Magikarp",
          "canBeShiny": true,
          "combatPower": { "min": 99, "max": 117 }
        },
        {
          "type": "item",
          "name": "×200",
          "quantity": 200
        }
      ]
    }
  ]
}
```

## Rocket Lineups
- Root: array of members.
- Fields: name, title (Boss/Leader/Grunt), type (empty for bosses/leaders), gender.
- firstPokemon[] / secondPokemon[] / thirdPokemon[] (1–3 each): { name, image, types[], isEncounter, canBeShiny }.
- Encounter rule of thumb: Grunts first slot; Leaders first slot; Giovanni third slot.
- Example:
```json
{
  "name": "Giovanni",
  "title": "Team GO Rocket Boss",
  "type": "",
  "gender": "Male",
  "firstPokemon": [
    {
      "name": "Persian",
      "types": ["normal"],
      "isEncounter": false,
      "canBeShiny": false
    }
  ],
  "thirdPokemon": [
    {
      "name": "Tornadus (Incarnate)",
      "types": ["flying"],
      "isEncounter": true,
      "canBeShiny": false
    }
  ]
}
```

## Common Types & Conventions
- Primitives: string, number, boolean, null; URL strings; ISO 8601 datetimes.
- Arrays `[]` for lists; objects `{}` for structured subfields.
- Images are absolute URLs (mostly cdn.leekduck.com).

## Using the Data

### JavaScript fetch/parse:
```javascript
const response = await fetch('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json');
const eggs = await response.json();
console.log(eggs[0].name); // "Bulbasaur"
```

### Python fetch/parse:
```python
import requests
response = requests.get('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json')
eggs = response.json()
print(eggs[0]['name'])  # "Bulbasaur"
```

### Quick filtering snippets:
- Shiny Tier 5 raids: `raids.filter(r => r.tier === 'Tier 5' && r.canBeShiny)`
- Community Days: `events.filter(e => e.eventType === 'community-day')`
- Catch-type research: `research.tasks.filter(t => t.type === 'catch')`

## Data Updates
Data is scraped from LeekDuck.com and updated when:
- New events are announced
- Raid rotations change
- Egg pools are updated
- Team GO Rocket lineups change
- Research tasks rotate

Update frequency depends on the repository's scraping schedule.

## Additional Resources
- **DATA.md**: Full reference with detailed schemas and examples
- **README.md**: Project setup, pipeline, development
- **Eggs.md**, **Events.md**, **Raids.md**, **Research.md**, **RocketLineups.md**: Dataset-specific documentation
