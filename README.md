# TeamRandomizer PRO

> **English** | [Čeština](#čeština)

A lightweight, client-side web application for fair and instant random team generation from any list of players.

## Features

- **Flexible Team Modes:** Split players into pairs (2 per team), trios (3 per team), quads (4 per team), or specify an exact number of teams (2–20).
- **Live Player Counter:** Automatically counts entered players in real time and validates team sizes.
- **Captain Assignment:** Optional toggle to mark the first player in each generated team as the team captain.
- **Draw History & Persistence:** Saves the player list and recent draw history in `localStorage` so nothing is lost on reload.
- **One-Click Copy:** Copy the generated teams to the clipboard with a toast confirmation.
- **Synthesized Sound Effects:** Interactive audio feedback powered by the Web Audio API.

## Technologies

- **HTML5** & **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Font Awesome 6.4.0** (icons)
- **Web Audio API** & **Web Storage API (`localStorage`)**

## Usage

No build tools or backend required:

1. Clone or download this repository.
2. Open `index.html` directly in any modern web browser (or serve it via GitHub Pages / a local static server).
3. Enter player names (one per line), select a team mode, and click **Rozlosovat týmy**.

---

## Čeština

Lehká klientská webová aplikace pro rychlé a spravedlivé náhodné rozlosování hráčů do týmů.

### Hlavní funkce

- **Flexibilní režimy losování:** Rozdělení hráčů do dvojic (2 v týmu), trojic (3 v týmu), čtveřic (4 v týmu) nebo do přesného počtu týmů (2–20).
- **Živý počet hráčů:** Automaticky počítá zadané hráče v reálném čase a hlídá minimální počty pro zvolený režim.
- **Určení kapitána:** Volitelná možnost označit prvního hráče v každém týmu jako kapitána.
- **Historie losování a ukládání:** Ukládá seznam hráčů i historii losování do `localStorage`, takže data zůstanou zachována i po obnovení stránky.
- **Kopírování jedním kliknutím:** Zkopírování výsledků do schránky s potvrzovací notifikací.
- **Zvukové efekty:** Interaktivní zvuková odezva generovaná pomocí Web Audio API.

### Technologie

- **HTML5** & **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Font Awesome 6.4.0** (ikony)
- **Web Audio API** & **Web Storage API (`localStorage`)**

### Spuštění

Aplikace nevyžaduje žádný build ani backend:

1. Naklonujte nebo stáhněte tento repozitář.
2. Otevřete soubor `index.html` přímo v libovolném moderním prohlížeči (případně přes GitHub Pages nebo lokální statický server).
3. Zadejte seznam hráčů (každý na nový řádek), vyberte režim a klikněte na **Rozlosovat týmy**.
