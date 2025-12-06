# Copilot instructions for pogoDeets

## Big-picture architecture
- This repo is a pure Node.js data pipeline that scrapes the public LeekDuck site to keep a handful of Pokémon GO detail files fresh for whatever site or client consumes `files/*.json`.
- `scrape.js` kicks off the base collection for events, eggs, raids, research tasks, and Team GO Rocket lineups using `pages/events.js`, `pages/eggs.js`, `pages/raids.js`, `pages/research.js`, and `pages/rocketLineups.js`.
- Each of those modules uses `https` + `jsdom` to pull HTML from leekduck.com, normalizes the relevant DOM selectors, and writes both pretty and minified payloads (`files/<topic>.json` and `files/<topic>.min.json`).

## Event detail enrichment flow
- `detailedscrape.js` requires an up-to-date `files/events.min.json`. It creates `files/temp`, iterates each event, and calls the generic and type-specific scrapers in `pages/detailed/` (e.g., `breakthrough.js`, `communityday.js`, `raidbattles.js`, `research.js`, `spotlight.js`, plus `generic.js`).
- Those detail modules write per-event JSON into `files/temp`, naming each chunk like `<eventID>.json` or `<eventID>_generic.json` and annotating it with `type` (`pokemon-spotlight-hour`, `research-breakthrough`, `community-day`, `raid-battles`, `research`, `generic`, etc.).
- `combinedetails.js` reads `files/temp`, merges each `type` block into the `extraData` bag for its matching event in `files/events.min.json`, rewrites `files/events.json` / `files/events.min.json`, and then removes `files/temp` (so that folder always mirrors the latest run).

## Key selectors & data patterns to respect
- `pages/events.js` pulls `eventID`, `name`, image, and event class (`div.events-list.current-events` / `upcoming-events`) plus timezone hints, and cross-references the JSON feed at `https://leekduck.com/feeds/events.json` for accurate start/end timestamps.
- `pages/eggs.js`, `pages/raids.js`, `pages/research.js`, and `pages/rocketLineups.js` each map a tightly controlled set of DOM nodes (`.egg-grid`, `.raid-bosses`, `.task-category`, `.rocket-profile`) into the shape expected downstream; follow their shape when adding new fields.
- Each scraper writes both `files/<topic>.json` and `files/<topic>.min.json` so the repo tracks human-readable and compact versions simultaneously.

## Developer workflow (no hidden tools)
1. Run `npm run scrape` to refresh the baseline JSON files under `files/`.
2. Run `npm run detailedscrape` after `files/events.min.json` exists to fill `files/temp/` with enriched event detail fragments.
3. Run `npm run combinedetails` to merge the fragments into `files/events.json` / `files/events.min.json` and clean up `files/temp`.
- Repeat step 2/3 whenever LeekDuck adds or tweaks event-specific sections; the order matters because `combinedetails` expects the temp files that `detailedscrape` creates.
- There are no automated tests—validation happens by inspecting the updated `files/*.json` payloads after each script.

## Data conventions you must preserve
- The `files/` directory is canonical and committed to the repo; it contains `eggs`, `events`, `raids`, `research`, `rocketLineups`, plus their `.min` twins.
- `files/events.json` is the friendly version while `files/events.min.json` is the compact version that the detail scrapers read back.
- `extraData` inside an event stays `null` unless a detail module injects an object (e.g., `extraData.breakthrough`, `extraData.spotlight`, `extraData.communityday`, `extraData.raidbattles`, `extraData.generic`).
- The detail modules also rely on a `bkp` array—the parsed contents of the previous `events.min.json`—so they can fall back to older `extraData` when a new fetch fails.
- `files/temp/` is ephemeral; `combinedetails.js` deletes it after merging. Never commit `files/temp`, and expect the folder to be absent until you run `npm run detailedscrape`.

## Adding a new event detail type
1. Patent a new module under `pages/detailed/` that exports `get(url, id, bkp)` and writes `{ id, type: "your-type", data: ... }` into `files/temp/<id>.json`.
2. Signal `detailedscrape.js` to invoke that module when `e.eventType` matches the new type.
3. Teach `combinedetails.js` how to merge the new `type` into `extraData` (see the `if (data.type == "research-breakthrough")` chain for reference).
4. Ensure the front end consuming `files/events.json` knows what field under `extraData` to read.

## Troubleshooting notes
- LeekDuck changes break DOM selectors first, so double-check the `.event-section-header` IDs and `.pkmn-list-flex` structures before tweaking logic.
- Use the console logs from each script (they emit warnings when feed data lacks a matching event, errors from `fs`, or `JSDOM` fetch failures) to guide fixes.
- After any update to scraping logic, rerun all three scripts to regenerate both `.json` and `.min.json` files so the tracked data stays consistent.
