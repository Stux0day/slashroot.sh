## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Sous Windows PowerShell, `npm run dev -- --host` échoue (le `--` est avalé par npm.ps1) : utiliser
`npx astro dev --host` pour exposer le site sur le réseau local (accès depuis un téléphone).

## Couleurs / thèmes

- Le thème actif se choisit à **un seul endroit** : la ligne `@import './themes/<nom>.css';` en tête de
  `src/styles/global.css`. Elle doit rester la première règle du fichier (sinon le navigateur ignore l'`@import`).
- Thèmes disponibles dans `src/styles/themes/` : `rouge` (actif), `magenta`, `sepia`, `amethyste`, `ambre`,
  `indigo`, `acide`, `nord`, `phosphore`, `tron`, `lagune`, `graphite`.
- Chaque thème définit les mêmes variables en sombre (`:root, :root[data-theme='sombre']`) et en clair
  (`:root[data-theme='clair']`) : `--void`, `--panel`, `--rule`, `--text`, `--dim`, `--signal` (accent), `--live`,
  `--voile`. Un nouveau thème doit toutes les définir, dans les deux variantes, avec un contraste WCAG AA (4.5:1).
- Dans les composants, utiliser ces variables, jamais une couleur en dur.
- « Changer la couleur du site » = changer l'`@import` ; « retoucher une teinte » = éditer le fichier du thème actif.
- Le tableau complet (teintes, valeurs d'accent) est dans le README, section « Couleurs du site ». Garder le README,
  ce fichier et le commentaire en tête de `global.css` à jour quand on ajoute ou renomme un thème.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
