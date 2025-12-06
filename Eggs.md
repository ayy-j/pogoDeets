# Endpoints

Access the scraped Pokémon GO egg data via the following endpoints:

- **Formatted (Human-readable)**: [`GET /files/eggs.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.json)
  - Includes indentation and line breaks for easy reading
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.json`

- **Minimized (Compact)**: [`GET /files/eggs.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json)
  - Single-line JSON without formatting, optimized for bandwidth
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json`

# Data Structure

The egg data is provided as an array of Pokémon objects. Each object represents a Pokémon that can hatch from eggs in Pokémon GO.

## Example Egg Objects

### Basic Egg (1 km)

From the current live data:

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

### Adventure Sync Reward (10 km)

Eggs obtained from Adventure Sync weekly rewards:

```json
{
    "name": "Riolu",
    "eggType": "5 km",
    "isAdventureSync": true,
    "isGiftExchange": false,
    "isRegional": false,
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm447.icon.png",
    "canBeShiny": true,
    "combatPower": {
        "min": 567,
        "max": 567
    },
    "rarity": 1,
    "rarityTier": "Common"
}
```

### Gift Exchange Egg (7 km)

Eggs obtained from Route Gift Exchange:

```json
{
    "name": "Galarian Corsola",
    "eggType": "7 km",
    "isAdventureSync": false,
    "isGiftExchange": true,
    "isRegional": false,
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm222.fGALARIAN.icon.png",
    "canBeShiny": true,
    "combatPower": {
        "min": 855,
        "max": 855
    },
    "rarity": 1,
    "rarityTier": "Common"
}
```

### Ultra Rare Hatch (Multiple Egg Types)

The rarest hatches appear across multiple egg types:

```json
{
    "name": "Larvesta",
    "eggType": "2 km",
    "isAdventureSync": false,
    "isGiftExchange": false,
    "isRegional": false,
    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm636.icon.png",
    "canBeShiny": true,
    "combatPower": {
        "min": 855,
        "max": 855
    },
    "rarity": 5,
    "rarityTier": "Ultra Rare"
}
```

*Note: The same Pokémon may appear in multiple egg types with varying rarity. Larvesta, for example, appears in 2 km, 5 km, and 10 km eggs.*

# Fields

| Field                 | Type      | Description |
|---------------------- |---------- |------------|
| **`name`**            | `string`  | The name of the hatched Pokémon. |
| **`eggType`**         | `string`  | The distance bucket of the egg. Common values: `1 km`, `2 km`, `5 km`, `7 km`, `10 km`, `12 km`. |
| **`isAdventureSync`** | `boolean` | Whether the egg is obtained from Adventure Sync rewards. |
| **`isGiftExchange`**  | `boolean` | Whether the egg comes from the Route Gift Exchange pool. |
| **`isRegional`**      | `boolean` | Whether the Pokémon is region-locked. |
| **`image`**           | `string`  | Sprite for the hatched Pokémon. |
| **`canBeShiny`**      | `boolean` | Whether the hatched Pokémon can be shiny. |
| **`combatPower.min`** | `int`     | The minimum CP for the hatch. When LeekDuck lists a single CP value, `min` and `max` will match. |
| **`combatPower.max`** | `int`     | The maximum CP for the hatch. |
| **`rarity`**          | `int`     | The number of “mini-egg” rarity pips shown on LeekDuck (higher = rarer, usually 1–5). |
| **`rarityTier`**      | `string`  | Text version of rarity derived from `rarity` (`Common`, `Uncommon`, `Rare`, `Very Rare`, `Ultra Rare`, or `Unknown`). |

## Additional Context

### Egg Type Distribution

Current egg types and typical distance requirements:

- **1 km**: Starter Pokémon from all generations (Bulbasaur, Charmander, Squirtle, etc.)
- **2 km**: Common and baby Pokémon (Bonsly, Ducklett, Cleffa, etc.)
- **5 km**: Mix of uncommon species, some regional variants when available
- **7 km**: Alolan, Galarian, and Hisuian forms (from friend gifts)
- **10 km**: Rare Pokémon (Beldum, Jangmo-o, Dreepy, pseudo-legendaries)
- **12 km**: Strange Eggs from Team GO Rocket (Dark and Poison types primarily)

### Rarity Tiers Explained

Based on LeekDuck's rarity pip system:

- **Rarity 1 (Common)**: Most frequently encountered, shorter hatch pool rotations
- **Rarity 2 (Uncommon)**: Moderately rare, decent hatch rates
- **Rarity 3 (Rare)**: Less common, may take multiple hatches to encounter
- **Rarity 4 (Very Rare)**: Significantly reduced hatch rate
- **Rarity 5 (Ultra Rare)**: Extremely rare hatches (e.g., Larvesta appearing in multiple egg pools)
