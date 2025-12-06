# Endpoints

Access the scraped Team GO Rocket lineup data via the following endpoints:

- **Formatted (Human-readable)**: [`GET /files/rocketLineups.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.json)
  - Includes indentation and line breaks for easy reading
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.json`

- **Minimized (Compact)**: [`GET /files/rocketLineups.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json)
  - Single-line JSON without formatting, optimized for bandwidth
  - URL: `https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json`

# Data Structure

The rocket lineup data is provided as an array of Team GO Rocket member objects. Each object represents a Rocket member (Giovanni, Leaders, or Grunts) and their possible Pokémon teams.

## Example Rocket Lineup Objects

### Team GO Rocket Boss (Giovanni)

From the current live data:

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

### Team GO Rocket Leader (Cliff)

```json
{
    "name": "Cliff",
    "title": "Team GO Rocket Leader",
    "type": "",
    "gender": "Male",
    "firstPokemon": [
        {
            "name": "Larvitar",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm246.icon.png",
            "types": ["rock", "ground"],
            "isEncounter": true,
            "canBeShiny": true
        }
    ],
    "secondPokemon": [
        {
            "name": "Annihilape",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm979.icon.png",
            "types": ["fighting", "ghost"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Honchkrow",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm430.icon.png",
            "types": ["dark", "flying"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Skarmory",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm227.icon.png",
            "types": ["steel", "flying"],
            "isEncounter": false,
            "canBeShiny": false
        }
    ],
    "thirdPokemon": [
        {
            "name": "Tyranitar",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm248.icon.png",
            "types": ["rock", "dark"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Machamp",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm68.icon.png",
            "types": ["fighting"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Luxray",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm405.icon.png",
            "types": ["electric"],
            "isEncounter": false,
            "canBeShiny": false
        }
    ]
}
```

### Team GO Rocket Grunt (Type-Specific)

Fire-type Grunt example:

```json
{
    "name": "Fire-type Female Grunt",
    "title": "Team GO Rocket Grunt",
    "type": "fire",
    "gender": "Female",
    "firstPokemon": [
        {
            "name": "Darumaka",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm554.icon.png",
            "types": ["fire"],
            "isEncounter": true,
            "canBeShiny": false
        },
        {
            "name": "Numel",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm322.icon.png",
            "types": ["fire", "ground"],
            "isEncounter": true,
            "canBeShiny": false
        },
        {
            "name": "Tepig",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm498.icon.png",
            "types": ["fire"],
            "isEncounter": true,
            "canBeShiny": false
        }
    ],
    "secondPokemon": [
        {
            "name": "Houndoom",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm229.icon.png",
            "types": ["dark", "fire"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Ninetales",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm38.icon.png",
            "types": ["fire"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Pignite",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm499.icon.png",
            "types": ["fire", "fighting"],
            "isEncounter": false,
            "canBeShiny": false
        }
    ],
    "thirdPokemon": [
        {
            "name": "Houndoom",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm229.icon.png",
            "types": ["dark", "fire"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Darmanitan",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm555.fSTANDARD.icon.png",
            "types": ["fire"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Emboar",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm500.icon.png",
            "types": ["fire", "fighting"],
            "isEncounter": false,
            "canBeShiny": false
        }
    ]
}
```

### Special Grunt (Magikarp Grunt)

The infamous all-Magikarp lineup:

```json
{
    "name": "Water-type Male Grunt",
    "title": "Team GO Rocket Grunt",
    "type": "water",
    "gender": "Male",
    "firstPokemon": [
        {
            "name": "Magikarp",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm129.icon.png",
            "types": ["water"],
            "isEncounter": true,
            "canBeShiny": false
        }
    ],
    "secondPokemon": [
        {
            "name": "Magikarp",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm129.icon.png",
            "types": ["water"],
            "isEncounter": true,
            "canBeShiny": false
        }
    ],
    "thirdPokemon": [
        {
            "name": "Magikarp",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm129.icon.png",
            "types": ["water"],
            "isEncounter": false,
            "canBeShiny": false
        },
        {
            "name": "Gyarados",
            "image": "https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm130.icon.png",
            "types": ["water", "flying"],
            "isEncounter": false,
            "canBeShiny": false
        }
    ]
}
```

# Field Reference

## Rocket Member Object

| Field              | Type         | Description | Example Values |
|------------------- |------------- |------------|----------------|
| **`name`**         | `string`     | The name/identifier for this Rocket member. | `"Giovanni"`, `"Cliff"`, `"Fire-type Female Grunt"` |
| **`title`**        | `string`     | The official title of this Rocket member. | `"Team GO Rocket Boss"`, `"Team GO Rocket Leader"`, `"Team GO Rocket Grunt"` |
| **`type`**         | `string`     | The type specialty for Grunts (empty for Leaders/Giovanni). | `"fire"`, `"water"`, `"psychic"`, `""` (empty for bosses) |
| **`gender`**       | `string`     | The gender presentation of the Rocket member. | `"Male"`, `"Female"` |
| **`firstPokemon`** | `Pokemon[]`  | Array of possible Pokémon in the first slot. Giovanni and some Leaders have only one option. | Array of 1-3 Pokémon objects |
| **`secondPokemon`**| `Pokemon[]`  | Array of possible Pokémon in the second slot. One is randomly selected per battle. | Array of 1-3 Pokémon objects |
| **`thirdPokemon`** | `Pokemon[]`  | Array of possible Pokémon in the third slot. This is the encounter reward if defeated. | Array of 1-3 Pokémon objects |

## Pokémon Object

| Field              | Type       | Description | Example Values |
|------------------- |----------- |------------|----------------|
| **`name`**         | `string`   | The name of the Pokémon, including form variants. | `"Persian"`, `"Tornadus (Incarnate)"`, `"Alolan Muk"` |
| **`image`**        | `string`   | CDN URL for the Pokémon's icon sprite. | `"https://cdn.leekduck.com/assets/img/pokemon_icons_crop/pm53.icon.png"` |
| **`types`**        | `string[]` | Array of type names for this Pokémon (lowercase). | `["normal"]`, `["fire", "fighting"]`, `["dark", "ghost"]` |
| **`isEncounter`**  | `boolean`  | `true` if this Pokémon can be your encounter reward after defeating the Rocket member. Usually only first slot Pokémon for Grunts and third slot for Leaders/Giovanni. | `true` for encounter rewards, `false` for non-catchable |
| **`canBeShiny`**   | `boolean`  | Whether this Pokémon can be encountered as shiny. Important for shiny hunters! | `true` for some Pokémon like Larvitar, `false` for most |

## Rocket Member Categories

### Bosses
- **Giovanni**: The big boss with a legendary encounter reward (currently Tornadus Incarnate)
  - Always starts with Persian
  - Has 3 options for second slot
  - Has the legendary as third slot

### Leaders
- **Cliff**: Rock/Ground specialist
- **Arlo**: Psychic/Steel specialist  
- **Sierra**: Dark/Ghost specialist

Each Leader:
- Has a fixed first Pokémon (your encounter reward)
- Has 3 options for second slot (randomly chosen per battle)
- Has 3 options for third slot (randomly chosen per battle)

### Grunts

Grunts are categorized by type and gender:

**Type-Specific Grunts**:
- Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

**Special Grunts**:
- **Starter Grunt** (Male): Uses starter Pokémon from all generations
- **Snorlax Grunt** (Female): Features Snorlax in multiple slots
- **Decoy Grunt** (Female): Bellsprout-focused lineup
- **Magikarp Grunt** (Male): All Magikarp (with potential Gyarados surprise)

## Understanding Encounters

When you defeat a Rocket member, you get to catch one of their Pokémon:

- **Grunts**: You catch one of their **first slot** Pokémon (whichever one they used)
- **Leaders**: You catch their **first slot** Pokémon (always fixed per Leader)
- **Giovanni**: You catch his **third slot** Pokémon (the legendary)

Look for `"isEncounter": true` to identify which Pokémon are catchable after battle.

## Tips for Using This Data

1. **Check `canBeShiny`**: If you're hunting shinies, focus on encounters where this is `true`
2. **Plan your counters**: Use the `types` array to choose effective counter Pokémon
3. **Multiple options**: Second and third slots have multiple possibilities - be prepared for any of them
4. **Type matching**: Grunt `type` tells you what to expect, but check the actual Pokémon for dual types
