# pogoDeets

A Pokémon GO data scraping pipeline that pulls current game data from LeekDuck and provides it as consumable JSON endpoints.

## Overview

pogoDeets scrapes live Pokémon GO data from [LeekDuck.com](https://leekduck.com) and provides clean, structured JSON files for:

- **Eggs**: What Pokémon hatch from which egg types
- **Events**: Current and upcoming in-game events with detailed information
- **Raids**: Current raid bosses across all tiers
- **Research**: Field research tasks and their rewards
- **Rocket Lineups**: Team GO Rocket member teams and encounter rewards

Data is automatically scraped and updated regularly, with both formatted (human-readable) and minified (compact) versions available.

## Quick Start

### Accessing the Data

All data files are available via raw GitHub URLs:

| Data Type | Formatted URL | Minified URL |
|-----------|--------------|--------------|
| **Eggs** | [eggs.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.json) | [eggs.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/eggs.min.json) |
| **Events** | [events.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.json) | [events.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.min.json) |
| **Raids** | [raids.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.json) | [raids.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json) |
| **Research** | [research.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.json) | [research.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/research.min.json) |
| **Rocket Lineups** | [rocketLineups.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.json) | [rocketLineups.min.json](https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/rocketLineups.min.json) |

### Example Usage

```javascript
// Fetch current raid bosses
fetch('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/raids.min.json')
  .then(response => response.json())
  .then(raids => {
    const tier5Raids = raids.filter(raid => raid.tier === 'Tier 5');
    console.log('Current T5 bosses:', tier5Raids.map(r => r.name));
  });
```

```python
import requests

# Fetch current events
response = requests.get('https://raw.githubusercontent.com/ayy-j/pogoDeets/refs/heads/main/files/events.min.json')
events = response.json()

# Find Community Day events
community_days = [e for e in events if e['eventType'] == 'community-day']
print(f"Upcoming Community Days: {len(community_days)}")
```

## Documentation

Detailed documentation for each data type:

- **[Eggs Documentation](Eggs.md)** - Egg hatches, rarity tiers, and Adventure Sync rewards
- **[Events Documentation](Events.md)** - Event types, extra data structures, and seasonal information
- **[Raids Documentation](Raids.md)** - Raid tiers, CP ranges, weather boosts, and type information
- **[Research Documentation](Research.md)** - Field research tasks, rewards, and seasonal breakthroughs
- **[Rocket Lineups Documentation](RocketLineups.md)** - Team GO Rocket encounters, leaders, and grunt types

## How It Works

The scraping pipeline runs in three stages:

### 1. Base Scraping (`npm run scrape`)

Runs `scrape.js` to collect baseline data:
- Scrapes current events, eggs, raids, research tasks, and Rocket lineups
- Writes both `.json` (formatted) and `.min.json` (minified) files to `files/` directory
- Uses `jsdom` to parse HTML from LeekDuck pages

### 2. Detail Scraping (`npm run detailedscrape`)

Runs `detailedscrape.js` to enrich event data:
- Requires `files/events.min.json` to exist
- Creates `files/temp/` directory
- Iterates through events and calls specialized scrapers based on event type:
  - `pages/detailed/breakthrough.js` - Research Breakthrough details
  - `pages/detailed/communityday.js` - Community Day spawns, bonuses, shinies
  - `pages/detailed/raidbattles.js` - Raid boss details
  - `pages/detailed/research.js` - Research event promo codes
  - `pages/detailed/spotlight.js` - Spotlight Hour Pokémon
  - `pages/detailed/generic.js` - Generic event details (spawns, field research)
- Writes per-event JSON files to `files/temp/<eventID>.json`

### 3. Detail Combination (`npm run combinedetails`)

Runs `combinedetails.js` to merge enriched data:
- Reads all files from `files/temp/`
- Merges detail data into corresponding events in `files/events.min.json`
- Populates `extraData` field with type-specific information
- Rewrites `files/events.json` and `files/events.min.json`
- Cleans up `files/temp/` directory

## Data Structure

Each data file contains an array of objects. The structure varies by data type:

### Simple Arrays
- **Eggs**: Array of Pokémon objects with egg distance, rarity, and CP info
- **Raids**: Array of raid boss objects with tier, types, CP ranges, and weather boosts

### Object with Metadata
- **Research**: Object containing `seasonalInfo` and `tasks` array

### Enriched Data
- **Events**: Array of event objects, some with populated `extraData` containing event-specific details

### Hierarchical Data
- **Rocket Lineups**: Array of Rocket member objects with nested Pokémon teams

## Development

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Local Setup

```bash
# Clone the repository
git clone https://github.com/ayy-j/pogoDeets.git
cd pogoDeets

# Install dependencies
npm install

# Run the scraping pipeline
npm run scrape              # Base data collection
npm run detailedscrape      # Enrich event data (requires events.min.json)
npm run combinedetails      # Merge enriched data back into events

# Or run all three in sequence
npm run scrape && npm run detailedscrape && npm run combinedetails
```

### Project Structure

```
pogoDeets/
├── files/                  # Output directory for JSON data
│   ├── eggs.json
│   ├── eggs.min.json
│   ├── events.json
│   ├── events.min.json
│   ├── raids.json
│   ├── raids.min.json
│   ├── research.json
│   ├── research.min.json
│   ├── rocketLineups.json
│   └── rocketLineups.min.json
├── pages/                  # Scraper modules
│   ├── detailed/          # Event detail scrapers
│   │   ├── breakthrough.js
│   │   ├── communityday.js
│   │   ├── generic.js
│   │   ├── raidbattles.js
│   │   ├── research.js
│   │   └── spotlight.js
│   ├── eggs.js
│   ├── events.js
│   ├── raids.js
│   ├── research.js
│   └── rocketLineups.js
├── scrape.js              # Main base scraper
├── detailedscrape.js      # Event detail enrichment
├── combinedetails.js      # Merge enriched data
├── package.json
├── README.md              # This file
├── Eggs.md               # Eggs data documentation
├── Events.md             # Events data documentation
├── Raids.md              # Raids data documentation
├── Research.md           # Research data documentation
└── RocketLineups.md      # Rocket Lineups documentation
```

## Data Freshness

Data is scraped from LeekDuck, which is typically updated:
- When new events are announced
- When raid rotations change
- When egg pools are updated
- When Team GO Rocket lineups change

The frequency of updates in this repository depends on the scraping schedule configured for the pipeline.

## Attribution

- Data source: [LeekDuck.com](https://leekduck.com)
- Pokémon and Pokémon GO are trademarks of Nintendo, Creatures Inc., and Game Freak
- This is an unofficial fan project and is not affiliated with Niantic, Nintendo, or The Pokémon Company

## Contributing

Contributions are welcome! Areas that could use improvement:

- Additional data sources
- More detailed parsing of event-specific information
- Error handling and retry logic
- Automated testing
- Data validation

## License

This project is provided as-is for educational and community purposes. Please respect LeekDuck's terms of service when using this scraper.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the individual documentation files for detailed field descriptions
- Review the source code in the `pages/` directory for scraping logic

---

**Note**: This scraper depends on LeekDuck's website structure. If LeekDuck updates their site design or HTML structure, the scrapers may need to be updated accordingly.
