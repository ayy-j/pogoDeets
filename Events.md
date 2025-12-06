# Endpoints

- Formatted: [`GET /files/events.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/events.json)
- Minimized: [`GET /files/events.min.json`](https://raw.githubusercontent.com/ayy-j/pogoDeets/main/files/events.min.json)

# Example Event Object

```json
{
    "eventID": "legendaryraidhour20241204",
    "name": "Kyogre Raid Hour",
    "eventType": "raid-hour",
    "heading": "Raid Hour",
    "link": "https://www.leekduck.com/events/legendaryraidhour20241204/",
    "image": "https://cdn.leekduck.com/assets/img/events/raidhour.jpg",
    "start": "2024-12-04T18:00:00.000",
    "end": "2024-12-04T19:00:00.000",
    "timezone": "Local Time",
    "extraData": {
        "generic": {
            "hasSpawns": true,
            "hasFieldResearchTasks": false
        },
        "raidbattles": {
            "bosses": [
                {
                    "name": "Kyogre",
                    "image": "https://cdn.leekduck.com/assets/img/pokemon_icons/pm382.icon.png",
                    "canBeShiny": true
                }
            ],
            "shinies": []
        }
    }
}
```

# Fields

| Field           | Type     | Description |
|---------------- |--------- |------------|
| **`eventID`**   | `string` | The ID of the event (last path segment of the LeekDuck URL). |
| **`name`**      | `string` | The display name of the event. |
| **`eventType`** | `string` | The event classification, taken from the CSS class on the card. See [List of Event Types](#list-of-event-types). |
| **`heading`**   | `string` | The heading text shown on the LeekDuck card. |
| **`link`**      | `string` | Canonical link to the event page on LeekDuck. |
| **`image`**     | `string` | Header/thumbnail image for the event. |
| **`start`**     | `string` | ISO 8601 start datetime (can be `null`). See [Note for Start/End dates](#note-for-startend-dates). |
| **`end`**       | `string` | ISO 8601 end datetime (can be `null`). See [Note for Start/End dates](#note-for-startend-dates). |
| **`timezone`**  | `string` | A short hint parsed from the card text when present (`Local Time`, `PST`, `PDT`, `EST`, `EDT`, `UTC`, etc.) otherwise `null`. |
| **`extraData`** | dynamic  | Type-specific enrichment merged in by `npm run detailedscrape` + `npm run combinedetails`. See [Extra Data](#extra-data). |

## List of Event Types

Event types are read directly from the CSS class on each LeekDuck card. The list below reflects what is commonly seen today but can change if LeekDuck updates their styling.

| Events/Misc.               | Research                  | Raids/Battle         | GO Rocket |
|--------------------------- |-------------------------- |--------------------- |-----------|
| `community-day`            | `research`                | `raid-day`           | `go-rocket-takeover` |
| `event`                    | `timed-research`          | `raid-battles`       | `team-go-rocket` |
| `live-event`               | `limited-research`        | `raid-hour`          | `giovanni-special-research` |
| `pokemon-go-fest`          | `research-breakthrough`   | `raid-weekend`       |  |
| `global-challenge`         | `special-research`        | `go-battle-league`   |  |
| `safari-zone`              | `research-day`            | `elite-raids`        |  |
| `ticketed-event`           |                           | `max-battles`        |  |
| `location-specific`        |                           | `max-mondays`        |  |
| `bonus-hour`               |                           |                      |  |
| `pokemon-spotlight-hour`   |                           |                      |  |
| `potential-ultra-unlock`   |                           |                      |  |
| `update`                   |                           |                      |  |
| `season`                   |                           |                      |  |
| `pokemon-go-tour`          |                           |                      |  |
| `go-pass`                  |                           |                      |  |
| `ticketed`                 |                           |                      |  |
| `pokestop-showcase`        |                           |                      |  |
| `wild-area`                |                           |                      |  |
| `city-safari`              |                           |                      |  |

If you want to figure out what type of event a specific event on [LeekDuck.com/events](https://www.leekduck.com/events/) is, use your browser's dev tools to determine what class is setting the background color of that event. The class name is the same as the event type (except for `pokemon-go-fest` and `pokemon-spotlight-hour`, where the accented "é" is replaced with "e").

## Note for Start/End dates

The `start` and `end` fields are DateTime strings encoded in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). When LeekDuck marks an event as global, the value ends with `Z` (UTC). Otherwise, it reflects the local-time wording shown on the card. `timezone` captures a short hint like `Local Time`, `PST`, or `UTC` when present.

Depending on your consumer, many parsers (for example, JavaScript's `Date.parse()`) will handle the timezone offset automatically.

## Extra Data

`extraData` is populated by the detail workflow (`npm run detailedscrape` then `npm run combinedetails` after `npm run scrape`). If you skip that workflow, `extraData` stays `null`.

### Generic (all events)

```json
"extraData": {
    "generic": {
        "hasSpawns": true,
        "hasFieldResearchTasks": true
    }
}
```

### Pokémon Spotlight Hours

```json
"extraData": {
    "spotlight": {
        "name": "Mantine",
        "canBeShiny": true,
        "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_226_00.png",
        "bonus": "2× Transfer Candy",
        "list": [
            {
                "name": "Mantine",
                "canBeShiny": true,
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_226_00.png"
            }
        ]
    }
}
```

### Research Breakthroughs

```json
"extraData": {
    "breakthrough": {
        "name": "Klink",
        "canBeShiny": true,
        "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_599_00.png",
        "list": [
            {
                "name": "Klink",
                "canBeShiny": true,
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_599_00.png"
            }
        ]
    }
}
```

### Raid Battles

```json
"extraData": {
    "raidbattles": {
        "bosses": [
            {
                "name": "Mega Charizard Y",
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_006_52.png",
                "canBeShiny": true
            }
        ],
        "shinies": [
            {
                "name": "Charizard",
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_006_00_shiny.png"
            }
        ]
    }
}
```

### Community Days

```json
"extraData": {
    "communityday": {
        "spawns": [
            {
                "name": "Deino",
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_633_00.png"
            }
        ],
        "bonuses": [
            {
                "text": "Increased Spawns",
                "image": "https://www.leekduck.com/assets/img/events/bonuses/wildgrass.png"
            },
            {
                "text": "1/4 Egg Hatch Distance",
                "image": "https://www.leekduck.com/assets/img/events/bonuses/eggdistance.png"
            }
        ],
        "bonusDisclaimers": [
            "* Disclaimer string, if it exists."
        ],
        "shinies": [
            {
                "name": "Deino",
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_633_00_shiny.png"
            },
            {
                "name": "Zweilous",
                "image": "https://www.leekduck.com/assets/img/pokemon_icons/pokemon_icon_634_00_shiny.png"
            }
        ],
        "specialresearch": [
            {
                "name": "Field Notes: Deino (1/4)",
                "step": 1,
                "tasks": [
                    {
                        "text": "Earn 3 hearts with your buddy",
                        "reward": {
                            "text": "Poké Ball ×15",
                            "image": "https://www.leekduck.com/assets/img/items/Pok%C3%A9%20Ball.png"
                        }
                    }
                ],
                "rewards": [
                    {
                        "text": "×2000",
                        "image": "https://www.leekduck.com/assets/img/items/Stardust.png"
                    }
                ]
            }
        ]
    }
}
```

### Promo Codes (research events)

For research-focused events, promo codes embedded in the page are extracted:

```json
"extraData": {
    "promocodes": [
        "1P0KEM0NGO",
        "C4NDY4LL"
    ]
}
```
