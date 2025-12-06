# Pokémon GO Data Structure Reference

This document focuses on the structure and contents of the JSON data files provided by pogoDeets. For project setup and scraping pipeline information, see [README.md](README.md).

## Quick Reference

All data files are available as both formatted (`.json`) and minified (`.min.json`) versions:

| Data Type | Description | URL |
|-----------|-------------|-----|
| [Eggs](#eggs-data) | Pokémon that hatch from eggs | [eggs.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json) |
| [Events](#events-data) | Current and upcoming events | [events.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.min.json) |
| [Raids](#raids-data) | Current raid bosses | [raids.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json) |
| [Research](#research-data) | Field research tasks | [research.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json) |
| [Rocket Lineups](#rocket-lineups-data) | Team GO Rocket encounters | [rocketLineups.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json) |

---

## Eggs Data

**Structure**: Array of Pokémon objects

**Root Level**: `[]` (Array)

### Object Structure

```json
{
  "name": "string",
  "eggType": "string",
  "isAdventureSync": boolean,
  "isGiftExchange": boolean,
  "isRegional": boolean,
  "image": "string (URL)",
  "canBeShiny": boolean,
  "combatPower": {
    "min": number,
    "max": number
  },
  "rarity": number,
  "rarityTier": "string"
}
```

### Example Entry

```json
{
  "name": "Bulbasaur",
  "eggType": "1 km",
  "isAdventureSync": false,
  "isGiftExchange": false,
  "isRegional": false,
  "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm1.icon.png",
  "canBeShiny": true,
  "combatPower": {
    "min": 637,
    "max": 637
  },
  "rarity": 4,
  "rarityTier": "Very Rare"
}
```

### Field Details

- **name**: Pokémon name including form variants (e.g., "Alolan Geodude", "Indeedee (Male)")
- **eggType**: Distance category - `"1 km"`, `"2 km"`, `"5 km"`, `"7 km"`, `"10 km"`, `"12 km"`
- **isAdventureSync**: `true` for Adventure Sync weekly reward exclusives
- **isGiftExchange**: `true` for Route Gift Exchange pool
- **isRegional**: `true` for region-locked Pokémon (currently all `false`)
- **canBeShiny**: Whether shiny variant is possible
- **combatPower**: Fixed CP range for hatches (min usually equals max)
- **rarity**: Numeric rarity (1-5, higher = rarer)
- **rarityTier**: Human-readable rarity (`"Common"`, `"Uncommon"`, `"Rare"`, `"Very Rare"`, `"Ultra Rare"`)

---

## Events Data

**Structure**: Array of event objects

**Root Level**: `[]` (Array)

### Object Structure

```json
{
  "eventID": "string",
  "name": "string",
  "eventType": "string",
  "heading": "string",
  "link": "string (URL)",
  "image": "string (URL)",
  "start": "string (ISO 8601) | null",
  "end": "string (ISO 8601) | null",
  "timezone": "string | null",
  "extraData": {
    "generic": { ... },
    "spotlight": { ... },
    "breakthrough": { ... },
    "raidbattles": { ... },
    "communityday": { ... }
  } | null
}
```

### Example Entry

```json
{
  "eventID": "pokemonspotlighthour2025-12-09",
  "name": "Shieldon Spotlight Hour",
  "eventType": "pokemon-spotlight-hour",
  "heading": "Pokémon Spotlight Hour",
  "link": "https://leekduck.com/events/pokemonspotlighthour2025-12-09/",
  "image": "https://cdn.leekduck.com/assets/img/events/pokemonspotlighthour.jpg",
  "start": "2025-12-09T18:00:00.000",
  "end": "2025-12-09T19:00:00.000",
  "timezone": "Local Time",
  "extraData": {
    "spotlight": {
      "name": "Shieldon",
      "canBeShiny": true,
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png",
      "bonus": "2× Catch XP",
      "list": [
        {
          "name": "Shieldon",
          "canBeShiny": true,
          "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png"
        }
      ]
    },
    "generic": {
      "hasSpawns": true,
      "hasFieldResearchTasks": false
    }
  }
}
```

### Field Details

- **eventID**: Unique identifier derived from LeekDuck URL
- **eventType**: Event category (see Events.md for complete list of ~30 types)
- **start/end**: ISO 8601 datetime strings, may be `null`
- **timezone**: Time zone hint (`"Local Time"`, `"PST"`, `"UTC"`, etc.) or `null`
- **extraData**: Optional enriched data object, populated by detail scrapers:
  - **generic**: Present for most events with `hasSpawns` and `hasFieldResearchTasks` flags
  - **spotlight**: Spotlight Hour Pokémon and bonus details
  - **breakthrough**: Research Breakthrough reward Pokémon
  - **raidbattles**: Raid boss details with `bosses[]` and `shinies[]` arrays
  - **communityday**: Comprehensive CD data with spawns, bonuses, shinies, special research
  - **promocodes**: Array of promo code strings for research events

### Extra Data Variants

#### Generic (Most Events)
```json
"generic": {
  "hasSpawns": true,
  "hasFieldResearchTasks": false
}
```

#### Spotlight Hour
```json
"spotlight": {
  "name": "Mantine",
  "canBeShiny": true,
  "image": "URL",
  "bonus": "2× Transfer Candy",
  "list": [{ "name": "...", "canBeShiny": true, "image": "URL" }]
}
```

#### Raid Battles
```json
"raidbattles": {
  "bosses": [
    { "name": "Kyurem", "image": "URL", "canBeShiny": true }
  ],
  "shinies": [
    { "name": "Kyurem", "image": "URL" }
  ]
}
```

#### Community Day
```json
"communityday": {
  "spawns": [{ "name": "...", "image": "URL" }],
  "bonuses": [{ "text": "...", "image": "URL" }],
  "bonusDisclaimers": ["..."],
  "shinies": [{ "name": "...", "image": "URL" }],
  "specialresearch": [
    {
      "name": "...",
      "step": 1,
      "tasks": [{ "text": "...", "reward": { "text": "...", "image": "URL" } }],
      "rewards": [{ "text": "...", "image": "URL" }]
    }
  ]
}
```

---

## Raids Data

**Structure**: Array of raid boss objects

**Root Level**: `[]` (Array)

### Object Structure

```json
{
  "name": "string",
  "tier": "string",
  "canBeShiny": boolean,
  "types": [
    {
      "name": "string",
      "image": "string (URL)"
    }
  ],
  "combatPower": {
    "normal": {
      "min": number,
      "max": number
    },
    "boosted": {
      "min": number,
      "max": number
    }
  },
  "boostedWeather": [
    {
      "name": "string",
      "image": "string (URL)"
    }
  ],
  "image": "string (URL)"
}
```

### Example Entry

```json
{
  "name": "Kyurem",
  "tier": "Tier 5",
  "canBeShiny": true,
  "types": [
    {
      "name": "dragon",
      "image": "https://leekduck.com/assets/img/types/dragon.png"
    },
    {
      "name": "ice",
      "image": "https://leekduck.com/assets/img/types/ice.png"
    }
  ],
  "combatPower": {
    "normal": {
      "min": 1957,
      "max": 2042
    },
    "boosted": {
      "min": 2446,
      "max": 2553
    }
  },
  "boostedWeather": [
    {
      "name": "windy",
      "image": "https://leekduck.com/assets/img/weather/windy.png"
    },
    {
      "name": "snow",
      "image": "https://leekduck.com/assets/img/weather/snowy.png"
    }
  ],
  "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_646_11.png"
}
```

### Field Details

- **tier**: Raid difficulty - `"Tier 1"`, `"Tier 3"`, `"Tier 5"`, `"Mega"`, `"Shadow Tier 1/3/5"`
- **types**: Array of 1-2 type objects with lowercase type names
- **combatPower.normal**: CP range when caught without weather boost
- **combatPower.boosted**: CP range when caught with weather boost (higher IVs)
- **boostedWeather**: Array of weather conditions that boost this boss
- **canBeShiny**: Shiny eligibility flag

### Weather Types
- `"sunny"`, `"rainy"`, `"partly cloudy"`, `"cloudy"`, `"windy"`, `"snow"`, `"fog"`

---

## Research Data

**Structure**: Object with seasonal info and tasks array

**Root Level**: `{}` (Object)

### Object Structure

```json
{
  "seasonalInfo": {
    "breakthroughPokemon": ["string"],
    "spindaPatterns": [number],
    "season": "string | null"
  },
  "tasks": [
    {
      "text": "string",
      "type": "string | null",
      "rewards": [
        {
          "type": "encounter",
          "name": "string",
          "image": "string (URL)",
          "canBeShiny": boolean,
          "combatPower": {
            "min": number,
            "max": number
          }
        },
        {
          "type": "item",
          "name": "string",
          "image": "string (URL)",
          "quantity": number
        }
      ]
    }
  ]
}
```

### Example Entry

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
          "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm129.icon.png",
          "canBeShiny": true,
          "combatPower": {
            "min": 99,
            "max": 117
          }
        },
        {
          "type": "item",
          "name": "×200",
          "image": "https://cdn.leekduck.com/assets/img/items/Stardust.png",
          "quantity": 200
        }
      ]
    }
  ]
}
```

### Field Details

#### Seasonal Info
- **breakthroughPokemon**: Array of Pokémon names available from 7-day streak rewards
- **spindaPatterns**: Array of currently available Spinda pattern numbers
- **season**: Current season name or `null`

#### Tasks
- **text**: Task description exactly as shown in-game
- **type**: Task category - `"catch"`, `"throw"`, `"battle"`, `"explore"`, `"training"`, `"rocket"`, `"buddy"`, `"ar"`, `"sponsored"`, or `null`
- **rewards**: Array of reward objects (mixed encounter and item types)

#### Reward Types

**Encounter Reward**:
```json
{
  "type": "encounter",
  "name": "Pokémon name",
  "image": "URL",
  "canBeShiny": boolean,
  "combatPower": { "min": number, "max": number }
}
```

**Item Reward**:
```json
{
  "type": "item",
  "name": "Display label (e.g., ×200)",
  "image": "URL",
  "quantity": number
}
```

---

## Rocket Lineups Data

**Structure**: Array of Team GO Rocket member objects

**Root Level**: `[]` (Array)

### Object Structure

```json
{
  "name": "string",
  "title": "string",
  "type": "string",
  "gender": "string",
  "firstPokemon": [
    {
      "name": "string",
      "image": "string (URL)",
      "types": ["string"],
      "isEncounter": boolean,
      "canBeShiny": boolean
    }
  ],
  "secondPokemon": [ /* same structure */ ],
  "thirdPokemon": [ /* same structure */ ]
}
```

### Example Entry

```json
{
  "name": "Giovanni",
  "title": "Team GO Rocket Boss",
  "type": "",
  "gender": "Male",
  "firstPokemon": [
    {
      "name": "Persian",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm53.icon.png",
      "types": ["normal"],
      "isEncounter": false,
      "canBeShiny": false
    }
  ],
  "secondPokemon": [
    {
      "name": "Kangaskhan",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm115.icon.png",
      "types": ["normal"],
      "isEncounter": false,
      "canBeShiny": false
    },
    {
      "name": "Rhyperior",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm464.icon.png",
      "types": ["ground", "rock"],
      "isEncounter": false,
      "canBeShiny": false
    },
    {
      "name": "Nidoking",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm34.icon.png",
      "types": ["poison", "ground"],
      "isEncounter": false,
      "canBeShiny": false
    }
  ],
  "thirdPokemon": [
    {
      "name": "Tornadus (Incarnate)",
      "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm641.fINCARNATE.icon.png",
      "types": ["flying"],
      "isEncounter": true,
      "canBeShiny": false
    }
  ]
}
```

### Field Details

#### Member Info
- **name**: Rocket member identifier (e.g., "Giovanni", "Fire-type Female Grunt")
- **title**: Official title - `"Team GO Rocket Boss"`, `"Team GO Rocket Leader"`, `"Team GO Rocket Grunt"`
- **type**: Type specialty for Grunts (e.g., `"fire"`, `"water"`), empty string for Leaders/Giovanni
- **gender**: `"Male"` or `"Female"`

#### Pokémon Slots
- **firstPokemon**: Array of 1-3 possible Pokémon for first slot
- **secondPokemon**: Array of 1-3 possible Pokémon for second slot (one randomly chosen per battle)
- **thirdPokemon**: Array of 1-3 possible Pokémon for third slot (one randomly chosen per battle)

#### Pokémon Object
- **name**: Pokémon name with form variants
- **types**: Array of lowercase type names (e.g., `["fire", "fighting"]`)
- **isEncounter**: `true` if this Pokémon can be caught after defeating the member
  - Grunts: First slot Pokémon are encounters
  - Leaders: First slot Pokémon is encounter
  - Giovanni: Third slot Pokémon (legendary) is encounter
- **canBeShiny**: Shiny eligibility for the encounter

---

## Data Types Reference

### Common Types Used Across All Data

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text value | `"Bulbasaur"`, `"Tier 5"` |
| `number` | Numeric value (integer or float) | `637`, `1.5` |
| `boolean` | True or false | `true`, `false` |
| `null` | Absence of value | `null` |
| `URL` | String containing a URL | `"https://cdn.leekduck.com/..."` |
| `ISO 8601` | Date/time string | `"2025-12-09T18:00:00.000"` |

### Array vs Object Structures

- **Arrays `[]`**: Used for lists of items (eggs, events, raids, rocket members)
- **Objects `{}`**: Used for structured data with named fields (research root, CP ranges, types)

### Nested Objects

Many fields contain nested objects:
- `combatPower`: Contains `min`/`max` or `normal`/`boosted` objects
- `extraData`: Contains various sub-objects depending on event type
- Type/weather arrays: Contain objects with `name` and `image` fields

---

## JSON Formatting

### Formatted Files (`.json`)
- Indented with 2 spaces
- Line breaks after each element
- Human-readable
- Larger file size

### Minified Files (`.min.json`)
- No whitespace or line breaks
- Compact single-line format
- Optimized for bandwidth
- Recommended for API consumption

Both formats contain identical data - choose based on your use case.

---

## Using the Data

### Parsing JSON

**JavaScript**:
```javascript
const response = await fetch('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json');
const eggs = await response.json();
console.log(eggs[0].name); // "Bulbasaur"
```

**Python**:
```python
import requests
response = requests.get('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json')
eggs = response.json()
print(eggs[0]['name'])  # "Bulbasaur"
```

### Filtering Data

**Find all shiny-eligible T5 raids**:
```javascript
const raids = await fetch(URL).then(r => r.json());
const shinyT5 = raids.filter(r => r.tier === 'Tier 5' && r.canBeShiny);
```

**Get all catch-type research tasks**:
```javascript
const research = await fetch(URL).then(r => r.json());
const catchTasks = research.tasks.filter(t => t.type === 'catch');
```

**Find Community Day events**:
```javascript
const events = await fetch(URL).then(r => r.json());
const communityDays = events.filter(e => e.eventType === 'community-day');
```

---

## Data Updates

Data is scraped from LeekDuck.com and updated when:
- New events are announced
- Raid rotations change
- Egg pools are updated
- Team GO Rocket lineups change
- Research tasks rotate

The frequency depends on the scraping schedule configured for this repository.

---

## Additional Resources

- **Project README**: [README.md](README.md) - Setup, pipeline, development
- **Eggs Documentation**: [Eggs.md](Eggs.md) - Detailed egg data reference
- **Events Documentation**: [Events.md](Events.md) - Event types and extra data
- **Raids Documentation**: [Raids.md](Raids.md) - Raid tiers and mechanics
- **Research Documentation**: [Research.md](Research.md) - Task types and rewards
- **Rocket Lineups Documentation**: [RocketLineups.md](RocketLineups.md) - Team GO Rocket encounters

---

## Data Source

All data is scraped from [LeekDuck.com](https://leekduck.com), a community-maintained Pokémon GO resource.

Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and Game Freak. This is an unofficial fan project.
