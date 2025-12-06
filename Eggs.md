# Endpoints

- Formatted: [`GET /files/eggs.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/eggs.json)
- Minimized: [`GET /files/eggs.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/eggs.min.json)

# Example Egg Object

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
