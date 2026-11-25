## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Sous Windows PowerShell, `npm run dev -- --host` échoue (le `--` est avalé par npm.ps1) : utiliser
`npx astro dev --background --host 0.0.0.0` pour exposer le site sur le réseau local (accès depuis un téléphone).

Après un changement de la section `markdown` d'`astro.config.mjs` (coloration du code…), relancer le serveur avec
`astro dev stop` puis `astro dev --background --force` : sans `--force`, le cache de contenu garde les articles
rendus avec l'ancienne configuration (le build, lui, est à jour).

Sous Windows, un fichier réécrit en entier (et non modifié) échappe parfois à la surveillance du serveur de dev, qui
continue de servir l'ancien CSS du composant. Si un changement n'apparaît pas, relancer le serveur
(`astro dev stop`, puis `astro dev --background --host 0.0.0.0`).

Un `astro build` peut échouer sur `EBUSY: resource busy or locked` (fichier de `dist/` verrouillé par l'antivirus ou
l'indexation) : relancer le build, ce n'est pas une erreur du code.

## Couleurs et design

- **Toutes les couleurs sont dans `src/styles/tokens.css`**, et nulle part ailleurs : jamais de couleur en dur dans
  un composant, toujours une variable (`--papier`, `--encre`, `--encre-2`, `--encre-3`, `--filet`, `--accent`…).
- Chaque couleur s'écrit `light-dark(<clair>, <sombre>)`. Le mode suit le système, ou le choix du bouton de la barre
  du haut (`data-theme="light|dark"` sur `<html>`, mémorisé dans `localStorage.theme`).
- **Changer la couleur d'accent** = changer `--accent-h` (teinte OKLCH 0–360, 29 = rouge), `--accent-c`
  (saturation) et `--accent-l` (luminosité du mode clair : 54 %, 50 % pour vert et turquoise) en tête de
  `tokens.css`. Préréglages vérifiés dans le README, section « Couleurs et design ». Ne pas toucher aux luminosités
  du mode sombre (66 % et 74 %) sans revérifier les contrastes.
- Deux accents : `--accent` (vif) pour les aplats, filets et grands éléments ; `--accent-texte` pour tout texte en
  couleur de moins de 24 px (liens, étiquettes, survols, contour de focus). En mode sombre, l'accent vif ne tient
  que ~4:1 sur l'anthracite : jamais en petit texte.
- Mode sombre : fond anthracite `#2e2d2a`, blocs de code plus foncés que la page (`#242321`) pour que les
  commentaires de Shiki (github-dark-default) restent lisibles.
- Le favicon (`public/favicon.svg`) a un rouge fixe : le changer à la main si la teinte change.
- Polices : Archivo (variable, graisse 400–900, chasse 100–125 %) et JetBrains Mono, via l'API de polices
  d'`astro.config.mjs`. Les titres élargis utilisent `font-variation-settings: var(--etire)` et non `font-stretch` :
  le `@font-face` généré ne déclare pas la plage de chasse.
- Mise en page pleine largeur (`--largeur: 100%`). Grille de 12 colonnes partout ; la page d'article passe en trois
  zones à partir de 80rem (rail `NavDossier` sur 3 colonnes, texte sur 6, sommaire sur 3, via `subgrid`). Les listes
  d'articles (`ListeArticles.astro`) changent de nombre de colonnes par requêtes de conteneur, pas par media queries.
- Styles scopés : un `<svg>` rendu par `Icon.astro` n'est pas dans la portée du composant parent. Le cibler avec
  `:global(svg)` ou l'envelopper dans un élément du parent.
- La signature géante du pied de page (`SiteFooter.astro`) est calée à `13.25cqi` pour « slashroot.sh » : à
  recalculer si `SITE_TITLE` change de longueur.
- Contenus : `src/data/site.ts` (accueil, dossiers), `src/content/blog/` (articles), `public/cv.pdf` (le bouton
  « Télécharger le CV » n'apparaît que si ce fichier existe).
- `src/components/HeaderLink.astro` vient de l'ancien design : il reste uniquement parce que l'article de
  démonstration `using-mdx.mdx` l'importe.
- Garder le README et ce fichier à jour quand le design change.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
