README – Webflow CMS Filter + Infinite Scroll

Dette repositoryet inneholder et egendefinert filter- og infinite-scroll-skript for Webflow CMS.
Koden gjør det mulig å filtrere CMS-kort basert på kategorier, velge flere kategorier samtidig,
vise alle kort, og automatisk laste inn flere elementer når brukeren scroller nedover siden.

Koden er 100% uavhengig av plugins som Finsweet og fungerer på alle Webflow-prosjekter.

🚀 Funksjoner

✔ Flervalg-filter (brukeren kan velge flere kategorier samtidig)

✔ “Vis alle”-knapp for å nullstille filtrering

✔ Infinite scroll (laster inn flere elementer dynamisk uten Webflow pagination)

✔ Kategorier leses automatisk fra CMS-feltene

✔ Rask og effektiv filtrering (cache av kategorier per kort)

✔ CSS-klasser for synlighet (is-hidden) og aktiv knapp (is-active)

✔ Støtte for store CMS-lister


## 🔌 Installasjon i Webflow

### 1. Legg inn CSS

Legges i **Site Settings → Custom Code → Inside `<head>`** eller på siden du ønsker:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/attentioErik/webflow-custom-scripts@latest/basic-filter.css">

<script src="https://cdn.jsdelivr.net/gh/attentioErik/webflow-custom-scripts@latest/basic-filter.js"></script>
