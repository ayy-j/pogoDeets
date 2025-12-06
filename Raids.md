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
