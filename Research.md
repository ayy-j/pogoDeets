# Endpoints

Access the scraped Pokémon GO field research task data via the following endpoints:

- **Formatted (Human-readable)**: [`GET /files/research.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.json)
  - Includes indentation and line breaks for easy reading
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.json`

- **Minimized (Compact)**: [`GET /files/research.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json)
  - Single-line JSON without formatting, optimized for bandwidth
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json`

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
| **`quantity`** | `int`     | Parsed quantity (defaults to 1 when not shown). |

## Additional Examples from Live Data

### Multiple Encounter Rewards

Some tasks offer a choice of encounters:

```json
{
    "text": "Catch 7 different species of Pokémon",
    "type": "catch",
    "rewards": [
        {
            "type": "encounter",
            "name": "Abra",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm63.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 534,
                "max": 575
            }
        },
        {
            "type": "encounter",
            "name": "Hoothoot",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm163.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 262,
                "max": 290
            }
        },
        {
            "type": "encounter",
            "name": "Karrablast",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm588.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 469,
                "max": 506
            }
        }
    ]
}
```

### Mixed Rewards (Encounter + Items)

Many tasks offer both Pokémon encounters and item rewards:

```json
{
    "text": "Catch a Dragon-type Pokémon",
    "type": "catch",
    "rewards": [
        {
            "type": "encounter",
            "name": "Dratini",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm147.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 397,
                "max": 430
            }
        },
        {
            "type": "encounter",
            "name": "Bagon",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm371.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 459,
                "max": 495
            }
        },
        {
            "type": "encounter",
            "name": "Axew",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm610.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 547,
                "max": 586
            }
        },
        {
            "type": "item",
            "name": "×1500",
            "image": "https://cdn.leekduck.com/assets/img/items/Stardust.png",
            "quantity": 1500
        },
        {
            "type": "item",
            "name": "×3",
            "image": "https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png",
            "quantity": 3
        }
    ]
}
```

### Spinda Pattern Task

Special tasks that reward specific Spinda patterns:

```json
{
    "text": "Make 5 Great Curveball Throws in a row",
    "type": "throw",
    "rewards": [
        {
            "type": "encounter",
            "name": "Spinda 6",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm327.f05.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 486,
                "max": 523
            }
        },
        {
            "type": "encounter",
            "name": "Spinda 7",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm327.f06.icon.png",
            "canBeShiny": true,
            "combatPower": {
                "min": 486,
                "max": 523
            }
        }
    ]
}
```

## Task Type Categories

Research tasks are organized by type based on the action required:

- **`catch`**: Catching Pokémon (e.g., "Catch 10 Pokémon", "Catch a Dragon-type")
- **`throw`**: Making throws (e.g., "Make 5 Great Throws", "Make an Excellent Throw")
- **`battle`**: Battling (e.g., "Win a raid", "Win a Trainer Battle in the GO Battle League")
- **`explore`**: Walking and exploration (e.g., "Hatch an Egg", "Spin 5 PokéStops")
- **`training`**: Powering up and evolving (e.g., "Power up Pokémon 5 times", "Evolve a Pokémon")
- **`rocket`**: Team GO Rocket battles (e.g., "Defeat 3 Team GO Rocket Grunts")
- **`buddy`**: Buddy interactions (e.g., "Earn 2 Candies walking with your buddy")
- **`ar`**: AR photography tasks (e.g., "AR Scanning")
- **`sponsored`**: Sponsored tasks (e.g., "Send 3 Gifts to friends")
- **`event`**: Event-specific tasks (may be `null` for ad-hoc tasks)

## Understanding Rewards

### Encounter Rewards
- You encounter one of the listed Pokémon (randomly selected if multiple options)
- CP ranges are fixed for research encounters
- Shiny-eligible encounters have `canBeShiny: true`

### Item Rewards
- Common items: Poké Balls, Berries, Potions, Revives
- Valuable items: Rare Candy, Golden Razz Berries, Star Pieces, Lucky Eggs
- Resources: Stardust, XP (represented as items with quantities)

### Multiple Rewards
When a task shows multiple rewards, you typically receive:
- **One** of the encounter options (randomly chosen)
- **OR** one of the item sets (randomly chosen)
- **OR** both an encounter and items (depends on the task)

Check the live data to see current reward structures!

## Seasonal Information

The `seasonalInfo` object provides metadata about the current season:

- **`breakthroughPokemon`**: Pokémon available from Research Breakthroughs (7-day streak reward)
- **`spindaPatterns`**: Currently available Spinda form numbers (patterns change monthly)
- **`season`**: The current Pokémon GO season name (if parseable from the page)

Example from live data:
```json
{
    "breakthroughPokemon": ["Galarian Mr"],
    "spindaPatterns": [6, 7],
    "season": null
}
```
