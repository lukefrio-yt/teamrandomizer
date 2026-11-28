# TeamRandomizer PRO

> **English** | [Čeština](#čeština)

A lightweight, modern Apple-style client-side web application for fair and instant random team generation from any list of players.

## Features

- **Apple HIG Design:** Clean, native Apple iOS/macOS look & feel with fluid spring animations, system typography, and responsive cards.
- **Light & Dark Theme:** Built-in theme switcher supporting automatic system detection and manual toggle.
- **Flexible Team Modes:** Split players into pairs (2 per team), trios (3 per team), quads (4 per team), or specify an exact number of teams.
- **Live Player Counter:** Automatically counts entered players in real time and validates team sizes with proper Czech plurals.
- **Captain Assignment:** iOS-style toggle to designate the first player in each generated team as the captain with a badge.
- **Draw History & Persistence:** Saves the player list and recent draw history in `localStorage` so nothing is lost on reload.
- **One-Click Copy:** Copy the generated teams to the clipboard with fallback support and toast confirmation.
- **Synthesized Sound Effects:** Interactive audio feedback powered by the Web Audio API with a mute/unmute toggle.
- **Zero External Dependencies:** Built with inline SF-style SVG icons for instant loading, full offline support, and zero third-party CDNs.

## Technologies

- **HTML5** & **CSS3** (Apple Human Interface Guidelines, CSS Variables, Spring Animations)
- **Vanilla JavaScript (ES6+)**
- **Web Audio API** & **Web Storage API (`localStorage`)**
- **Inline SVG Icons** (SF-style)

## Usage

No build tools or backend required:

1. Clone or download this repository.
2. Open `index.html` directly in any modern web browser (or serve it via GitHub Pages / a local static server).
3. Enter player names (one per line), select a team mode, and click **Rozlosovat týmy**.

---

## Čeština

Lehká a moderní webová aplikace v Apple stylu pro rychlé a spravedlivé náhodné rozlosování hráčů do týmů.

### Hlavní funkce

- **Apple HIG design:** Čistý vzhled inspirovaný systémem iOS a macOS s plynulými pružnými animacemi, nativní typografií a kartami.
- **Světlý a tmavý režim:** Plná podpora přepínání témat s automatickou detekcí systémových preferencí a manuálním přepínačem.
- **Flexibilní režimy losování:** Rozdělení hráčů do dvojic (2 v týmu), trojic (3 v týmu), čtveřic (4 v týmu) nebo do přesného počtu týmů.
- **Živý počet hráčů:** Automaticky počítá zadané hráče v reálném čase se správným skloňováním a hlídá minimální počty.
- **Určení kapitána:** iOS přepínač pro označení prvního hráče v každém týmu jako kapitána s odznakem.
- **Historie losování a ukládání:** Ukládá seznam hráčů i historii losování do `localStorage`, takže data zůstanou zachována i po obnovení stránky.
- **Kopírování jedním kliknutím:** Spolehlivé zkopírování výsledků do schránky s fallbackem a potvrzovací notifikací.
- **Zvukové efekty:** Zvuková odezva generovaná pomocí Web Audio API s možností ztlumení.
- **Zcela bez externích závislostí:** Všechny ikony jsou přímo v SVG (SF styl), aplikace běží 100% offline a bez externích CDN knihoven.

### Technologie

- **HTML5** & **CSS3** (Apple design systém, proměnné, spring animace)
- **Vanilla JavaScript (ES6+)**
- **Web Audio API** & **Web Storage API (`localStorage`)**
- **Vektorové ikony v SVG**

### Spuštění

Aplikace nevyžaduje žádný build ani backend:

1. Naklonujte nebo stáhněte tento repozitář.
2. Otevřete soubor `index.html` přímo v libovolném moderním prohlížeči.
3. Zadejte seznam hráčů (každý na nový řádek), vyberte režim a klikněte na **Rozlosovat týmy**.
