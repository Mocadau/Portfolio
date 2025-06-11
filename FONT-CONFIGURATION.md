# Schriftart-Konfiguration

## Wie du die Schriftart für das gesamte Portfolio änderst

Die Schriftart für das komplette Portfolio wird jetzt zentral über eine CSS-Variable gesteuert.

### Schritt 1: Datei öffnen
Öffne die Datei: `src/app.css`

### Schritt 2: Variable ändern
Suche nach dieser Zeile (ca. Zeile 25):
```css
--font-family: sans-serif;
```

### Schritt 3: Neue Schriftart eintragen
Ersetze `sans-serif` durch deine gewünschte Schriftart:

#### Beispiele:

**System-Schriftarten:**
```css
--font-family: sans-serif;          /* Standard sans-serif */
--font-family: serif;               /* Standard serif */
--font-family: monospace;           /* Standard monospace */
```

**Spezifische Schriftarten:**
```css
--font-family: "Helvetica Neue", sans-serif;
--font-family: "Arial", sans-serif;
--font-family: "Georgia", serif;
--font-family: "Times New Roman", serif;
--font-family: "Courier New", monospace;
```

**Google Fonts (falls importiert):**
```css
--font-family: "Roboto", sans-serif;
--font-family: "Open Sans", sans-serif;
--font-family: "Lato", sans-serif;
```

### Das war's!
Nach dem Speichern wird die neue Schriftart automatisch im gesamten Portfolio verwendet:
- Alle Seiten (Home, Projects, About, etc.)
- Alle Komponenten (Navigation, Buttons, Text, etc.)
- Alle Überschriften und Absätze
- Loading-Texte und Fehlermeldungen

### Hinweis für Google Fonts
Falls du Google Fonts verwenden möchtest:

1. Füge den Import in `src/App.svelte` hinzu (auskommentierte Zeilen ca. Zeile 25-35)
2. Oder füge `@import` direkt in `src/app.css` hinzu:
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
```

### Technische Details
- Die Variable `--font-family` ist in `src/app.css` definiert
- Sie wird automatisch auf alle Text-Elemente angewendet
- Alle bestehenden `font-family` Definitionen wurden ersetzt
- Funktioniert mit allen Browsern die CSS Custom Properties unterstützen
