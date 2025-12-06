# Endpoints

Access the scraped Pokémon GO raid boss data via the following endpoints:

- **Formatted (Human-readable)**: [`GET /files/raids.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.json)
  - Includes indentation and line breaks for easy reading
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.json`

- **Minimized (Compact)**: [`GET /files/raids.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json)
  - Single-line JSON without formatting, optimized for bandwidth
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json`

# Data Structure

The raid data is provided as an array of raid boss objects. Each object represents a Pokémon currently available in raids.

## Example Raid Objects

### Tier 5 Legendary Raid

From the current live data:

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

### Mega Raid

```json
{
    "name": "Mega Gyarados",
    "tier": "Mega",
    "canBeShiny": true,
    "types": [
        {
            "name": "water",
            "image": "https://leekduck.com/assets/img/types/water.png"
        },
        {
            "name": "dark",
            "image": "https://leekduck.com/assets/img/types/dark.png"
        }
    ],
    "combatPower": {
        "normal": {
            "min": 1855,
            "max": 1937
        },
        "boosted": {
            "min": 2319,
            "max": 2422
        }
    },
    "boostedWeather": [
        {
            "name": "rainy",
            "image": "https://leekduck.com/assets/img/weather/rainy.png"
        },
        {
            "name": "windy",
            "image": "https://leekduck.com/assets/img/weather/windy.png"
        }
    ],
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm130.fMEGA.icon.png"
}
```

### Shadow Raid (Tier 3)

Shadow raids feature Shadow Pokémon that can be rescued:

```json
{
    "name": "Scyther",
    "tier": "Shadow Tier 3",
    "canBeShiny": true,
    "types": [
        {
            "name": "bug",
            "image": "https://leekduck.com/assets/img/types/bug.png"
        },
        {
            "name": "flying",
            "image": "https://leekduck.com/assets/img/types/flying.png"
        }
    ],
    "combatPower": {
        "normal": {
            "min": 1414,
            "max": 1546
        },
        "boosted": {
            "min": 1768,
            "max": 1933
        }
    },
    "boostedWeather": [
        {
            "name": "rainy",
            "image": "https://leekduck.com/assets/img/weather/rainy.png"
        },
        {
            "name": "windy",
            "image": "https://leekduck.com/assets/img/weather/windy.png"
        }
    ],
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm123.icon.png"
}
```

### Tier 1 Raid

Lower-tier raids for solo players:

```json
{
    "name": "Geodude",
    "tier": "Tier 1",
    "canBeShiny": true,
    "types": [
        {
            "name": "rock",
            "image": "https://leekduck.com/assets/img/types/rock.png"
        },
        {
            "name": "ground",
            "image": "https://leekduck.com/assets/img/types/ground.png"
        }
    ],
    "combatPower": {
        "normal": {
            "min": 688,
            "max": 739
        },
        "boosted": {
            "min": 860,
            "max": 923
        }
    },
    "boostedWeather": [
        {
            "name": "partly cloudy",
            "image": "https://leekduck.com/assets/img/weather/partlycloudy.png"
        },
        {
            "name": "sunny",
            "image": "https://leekduck.com/assets/img/weather/sunny.png"
        }
    ],
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm74.icon.png"
}
```

# Fields

| Field                | Type          | Description |
|--------------------- |-------------- |------------|
| **`name`**           | `string`      | The name of the raid or shadow raid boss. |
| **`tier`**           | `string`      | Raid tier label scraped from LeekDuck. Common values include `Tier 1`, `Tier 3`, `Tier 5`, `Mega`, and `Shadow Tier 1/3/5`. |
| **`canBeShiny`**     | `boolean`     | Whether the boss can be shiny. |
| **`types`**          | `Type[]`      | The type(s) of the boss. See [Type](#Type). |
| **`combatPower`**    | `CombatPower` | Catch CP ranges for normal and weather-boosted encounters. See [CombatPower](#CombatPower). |
| **`boostedWeather`** | `Weather[]`   | Weather conditions that boost the boss. See [Weather](#Weather). |
| **`image`**          | `string`      | The boss sprite. |

# Other Objects

## Type

### Example Object

```json
{
    "name": "fire",
    "image": "https://www.leekduck.com/assets/img/types/fire.png"
}
```

### Fields

| Field       | Type     | Description
|------------ |--------- |---------------------
| **`name`**  | `string` | The name of the type
| **`image`** | `string` | The image of the type. 

## CombatPower

### Example Object

```json
{
    "normal": {
        "min": 1414,
        "max": 1546
    },
    "boosted": {
        "min": 1768,
        "max": 1933
    }
}
```

### Fields

| Field             | Type  | Description |
|------------------ |------ |------------|
| **`normal.min`**  | `int` | Minimum CP for a non-boosted catch. |
| **`normal.max`**  | `int` | Maximum CP for a non-boosted catch. |
| **`boosted.min`** | `int` | Minimum CP when weather boosted. |
| **`boosted.max`** | `int` | Maximum CP when weather boosted. |

## Weather

### Example Object

```json
{
    "name": "rainy",
    "image": "https://www.leekduck.com/assets/img/weather/rainy.png"
}
```

### Fields

| Field       | Type     | Description |
|------------ |--------- |------------|
| **`name`**  | `string` | Weather label from LeekDuck (e.g., `sunny`, `rainy`, `partly cloudy`, `cloudy`, `windy`, `snow`, `fog`). |
| **`image`** | `string` | Icon for the weather type. |

## Raid Tiers Explained

Raids are categorized by difficulty tier:

- **Tier 1**: Easy solo raids, great for beginners or quick daily tasks
- **Tier 3**: Moderate difficulty, can be soloed by experienced trainers with strong counters
- **Tier 5**: Legendary raids, typically require 3-5+ trainers depending on level and counters
- **Mega**: Mega Evolution raids, difficulty similar to Tier 5 but with different rewards
- **Shadow Tier 1/3/5**: Shadow Pokémon raids featuring rescued Shadow Pokémon

## Weather Boosting

Weather boosts affect both raid difficulty and catch rewards:

- **During the raid**: Boss is powered up, dealing more damage (harder battle)
- **After catching**: Higher CP range (check `boosted` CP values)
- **Stardust bonus**: Weather-boosted catches give extra Stardust

The `boostedWeather` array shows which weather conditions boost each boss. Match these to current in-game weather for optimal catches!

### Weather Types

- **Sunny/Clear**: Boosts Fire, Grass, Ground
- **Rainy**: Boosts Water, Electric, Bug
- **Partly Cloudy**: Boosts Normal, Rock
- **Cloudy**: Boosts Fairy, Fighting, Poison
- **Windy**: Boosts Dragon, Flying, Psychic
- **Snow**: Boosts Ice, Steel
- **Fog**: Boosts Dark, Ghost

## CP Ranges Explained

Each raid boss has two CP ranges:

### Normal CP
The CP range when catching without weather boost. This is what you'll see most of the time.

### Boosted CP
The CP range when catching during weather that boosts the boss's type(s). Higher CP = better IV floor (minimum 10/10/10).

**Pro tip**: A 100% IV boss will always be at the maximum CP for its range. If you catch at max CP, you've got a perfect!

## Using This Data

### Building Raid Teams
Use the `types` array to determine effectiveness:
```javascript
const boss = raids.find(r => r.name === "Kyurem");
console.log(boss.types); // [{"name": "dragon", ...}, {"name": "ice", ...}]
// Use Fighting, Rock, Steel, Fairy counters!
```

### Shiny Hunting
Check `canBeShiny` before investing time:
```javascript
const shinyEligible = raids.filter(r => r.canBeShiny);
console.log(`${shinyEligible.length} raid bosses can be shiny!`);
```

### Weather Planning
Find bosses boosted by current weather:
```javascript
const currentWeather = "rainy";
const boosted = raids.filter(r => 
    r.boostedWeather.some(w => w.name === currentWeather)
);
// Focus on these for higher CP catches!
```

## Special Raid Types

### Shadow Raids
- Feature Shadow Pokémon that can be purified
- Indicated by "Shadow" in the tier name
- Rescued Shadow Pokémon can be caught after victory
- Require Shadow Raid passes or Raid Passes

### Mega Raids
- Allow you to Mega Evolve the species after catching
- Earn Mega Energy from the raid
- Mega-evolved Pokémon provide bonuses to all raiders

### Legendary Raids (Tier 5)
- Feature Legendary and Mythical Pokémon
- Highest difficulty and best rewards
- Often tied to special events
- Can be shiny (check `canBeShiny`)

## Tier Distribution

Current raid tier structure in live data:

- **4 Tier 1 bosses**: Quick solo raids (Geodude, Aipom, Aron, Gulpin)
- **3 Tier 3 bosses**: Paldean Tauros variants, Bombirdier, Dondozo
- **1 Tier 5 boss**: Kyurem (current legendary rotation)
- **1 Mega boss**: Mega Gyarados
- **Multiple Shadow bosses**: Shadow Drowzee, Ralts, Bagon, Snover (T1), Scyther, Aerodactyl, Sableye (T3), Heatran (T5)

*Note: Raid rotations change regularly! Check the live data for current bosses.*
