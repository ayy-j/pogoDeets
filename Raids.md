# Endpoints

- Formatted: [`GET /files/raids.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/raids.json)
- Minimized: [`GET /files/raids.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/raids.min.json)

# Example Raid Object

```json
{
    "name": "Scyther",
    "tier": "Shadow Tier 3",
    "canBeShiny": true,
    "types": [
        {
            "name": "bug",
            "image": "https://www.leekduck.com/assets/img/types/bug.png"
        },
        {
            "name": "flying",
            "image": "https://www.leekduck.com/assets/img/types/flying.png"
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
            "image": "https://www.leekduck.com/assets/img/weather/rainy.png"
        },
        {
            "name": "windy",
            "image": "https://www.leekduck.com/assets/img/weather/windy.png"
        }
    ],
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm123.icon.png"
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
