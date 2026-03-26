# Osobní IT Profil 2.0

Asynchronní, dynamicky generovaný webový profil. Architektura striktně odděluje datovou vrstvu (JSON) od prezentační logiky (DOM/CSS) a eliminuje redundanci kódu.

## Architektura systému

Projekt využívá nativní Web API bez externích závislostí. Časová složitost renderování DOM stromu je lineární $\mathcal{O}(N)$, kde $N$ odpovídá počtu datových uzlů v `profile.json`.

*   **`profile.json`:** Datový model (Single Source of Truth). Obsahuje pole dovedností, zájmů a definice projektů.
*   **`app.js`:** Řídící logika. Pomocí asynchronní metody `fetch()` provádí HTTP GET request na datový model a injektuje data do sémantických kotev v HTML. Implementuje defenzivní programování (ošetření chybějících nodů a padlých spojení).
*   **`index.html`:** Sémantická kostra (DOM). Neobsahuje žádná hardcoded data, slouží primárně jako receptor.
*   **`style.css`:** Vizuální vrstva. Produkční standard orientovaný na vysoký Signal-to-Noise Ratio (SNR), využívající CSS proměnné pro konzistenci designového tokenu.

## Nasazení (Deployment)

Aplikace je plně statická a je určena pro hosting na platformách jako GitHub Pages. 

1. Push do repozitáře na GitHubu.
2. V nastavení repozitáře (`Settings` -> `Pages`) zvolit větev `main` jako zdroj (Source).
3. Systém automaticky zkompiluje a vystaví statický build.

## Verzování (Git Workflow)

Historie tohoto repozitáře striktně dodržuje standard [Conventional Commits](https://www.conventionalcommits.org/). Každý zásah do systému je atomický a sémanticky kategorizovaný.

Příklady platné taxonomie v tomto repozitáři:
*   `feat(data):` Modifikace datového modelu.
*   `feat(js):` Změny v asynchronní logice a DOM manipulaci.
*   `style(ui):` Zásahy do vizuální vrstvy.
*   `docs(core):` Úpravy systémové dokumentace.