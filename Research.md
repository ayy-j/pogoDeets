# Endpoints

- Formatted: [`GET /files/research.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/research.json)
- Minimized: [`GET /files/research.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/research.min.json)

# Example Payload

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

# Fields

| Field            | Type               | Description |
|----------------- |------------------- |------------|
| **`seasonalInfo`** | `SeasonalInfo`     | Seasonal metadata parsed from the page (see below). |
| **`tasks`**        | `ResearchTask[]`   | Array of current research tasks and their rewards. |

## `SeasonalInfo`

| Field                     | Type          | Description |
|-------------------------- |-------------- |------------|
| **`breakthroughPokemon`** | `string[]`    | Names of Pokémon currently available from Research Breakthroughs, when present. |
| **`spindaPatterns`**      | `int[]`       | Spinda pattern numbers currently available (may be empty). |
| **`season`**              | `string|null` | Optional season name parsed from the header text. |

## `ResearchTask`

| Field         | Type           | Description |
|-------------- |--------------- |------------|
| **`text`**    | `string`       | The task text exactly as shown on LeekDuck. |
| **`type`**    | `string|null`  | Category derived from the task section. Common values: `event`, `catch`, `throw`, `battle`, `explore`, `training`, `rocket`, `buddy`, `ar`, `sponsored`. Some ad-hoc tasks may be `null` if the page lacks a mapped category. |
| **`rewards`** | `Reward[]`     | One or more rewards for completing the task. |

## `Reward`

Rewards are typed objects. Two shapes are currently emitted:

### Encounter Reward

| Field                 | Type      | Description |
|---------------------- |---------- |------------|
| **`type`**            | `string`  | Always `"encounter"`. |
| **`name`**            | `string`  | Pokémon name. |
| **`image`**           | `string`  | Sprite URL. |
| **`canBeShiny`**      | `boolean` | Whether the encounter can be shiny. |
| **`combatPower.min`** | `int`     | Minimum CP for the encounter. |
| **`combatPower.max`** | `int`     | Maximum CP for the encounter. |

### Item Reward

| Field          | Type      | Description |
|--------------- |---------- |------------|
| **`type`**     | `string`  | Always `"item"`. |
| **`name`**     | `string`  | Display label from LeekDuck (often includes the quantity, e.g., `×200`). |
| **`image`**    | `string`  | Icon for the item. |
| **`quantity`** | `int`     | Parsed quantity (defaults to 1 when not shown). |# Endpoints

- Formatted: [`GET /data/research.json`](https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.json)
- Minimized: [`GET /data/research.min.json`](https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.min.json)

# Example Research Object

```json
{
    "text": "Catch 5 Pokémon",
    "type": "catch",
    "rewards": [
        {
            "name": "Misdreavus",
            "image": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_200_00.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 779,
                "max": 825
            }
        },
        {
            "name": "Shuppet",
            "image": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_353_00.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 401,
                "max": 436
            }
        },
        {
            "name": "Duskull",
            "image": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_355_00.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 273,
                "max": 302
            }
        }
    ]
}
```
# Fields

| Field         | Type     | Description
|-------------- |--------- |---------------------
| **`text`**    | `string` | The research task text.
| **`type`**    | `string` | The type of research.<br />Can be `event`, `catch`, `throw`, `battle`, `explore`, `training`, `rocket`, `buddy`, `ar`, `sponsored`
| **`rewards`** | `Reward` | The rewards for completing the research Task. See [Reward](#Reward)

# Other Objects

## Reward

### Example Object

```json
{
    "name": "Misdreavus",
    "image": "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_200_00.png",
    "canBeShiny": true,
    "combatPower": {
        "min": 779,
        "max": 825
    }
}
```

### Fields

| Field                 | Type      | Description
|---------------------- |---------- |---------------------
| **`name`**            | `string`  | The name of the reward Pokemon.
| **`image`**           | `string`  | The image of the reward Pokemon.
| **`canBeShiny`**      | `boolean` | Whether or not the reward Pokemon can be shiny.
| **`combatPower.min`** | `int`     | The minimum combat power of the reward Pokemon.
| **`combatPower.max`** | `int`     | The maximum combat power of the reward Pokemon.
