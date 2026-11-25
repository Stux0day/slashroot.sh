## 🎨 Couleurs du site (thèmes)

Toutes les couleurs du site viennent d'un seul thème. Pour en changer, il suffit de modifier **une seule ligne** :
le `@import` en tête de [`src/styles/global.css`](src/styles/global.css).

```css
@import './themes/rouge.css';
```

Remplace `rouge` par le nom d'un des thèmes du tableau ci-dessous. Le serveur de dev recharge la page tout seul.

Cette ligne doit rester la **première règle** du fichier : la norme CSS ignore un `@import` placé après d'autres
règles. Les composants utilisent les variables du thème. Seule exception : `src/pages/blog/index.astro` utilise encore
les variables `--accent`, `--black` et `--gray` du starter Astro. Aucun thème ne les définit, donc ces styles ne
s'appliquent pas.

### Thèmes disponibles (`src/styles/themes/`)

| Thème       | Fichier          | Teinte                         | Accent sombre | Accent clair |
| :---------- | :--------------- | :----------------------------- | :------------ | :----------- |
| `rouge`     | `rouge.css`      | rouge signal sur noir neutre   | `#ff3d3d`     | `#d42222`    |
| `magenta`   | `magenta.css`    | rose vif                       | `#f472b6`     | `#b02a72`    |
| `sepia`     | `sepia.css`      | brun désaturé, papier ancien   | `#c08a5e`     | `#8a5230`    |
| `amethyste` | `amethyste.css`  | violet                         | `#b47cf5`     | `#7b30c4`    |
| `ambre`     | `ambre.css`      | ambre de terminal              | `#f5a623`     | `#8f5c05`    |
| `indigo`    | `indigo.css`     | bleu-violet profond            | `#8b9cff`     | `#3d4fc4`    |
| `acide`     | `acide.css`      | vert-jaune                     | `#b6e83a`     | `#4e6b0d`    |
| `nord`      | `nord.css`       | bleu arctique                  | `#7fc3e3`     | `#1f6e96`    |
| `phosphore` | `phosphore.css`  | vert cathodique                | `#3ddc84`     | `#0d723d`    |
| `tron`      | `tron.css`       | cyan électrique sur noir       | `#00e5ff`     | `#0b6b7e`    |
| `lagune`    | `lagune.css`     | turquoise                      | `#2dd4bf`     | `#0c7063`    |
| `graphite`  | `graphite.css`   | aucune couleur, contraste seul | `#ffffff`     | `#000000`    |

Chaque thème définit une variante **sombre** (`:root` et `:root[data-theme='sombre']`) et une variante **claire**
(`:root[data-theme='clair']`). La bascule jour/nuit de la barre du haut marche donc avec tous les thèmes.

### Retoucher une couleur ou créer un thème

Un thème renseigne ces variables, dans ses deux variantes :

| Variable   | Rôle                                                 |
| :--------- | :--------------------------------------------------- |
| `--void`   | fond de page (la surface la plus sombre en mode nuit) |
| `--panel`  | fond des panneaux et des cartes                      |
| `--rule`   | filets et bordures                                   |
| `--text`   | texte principal                                      |
| `--dim`    | texte secondaire                                     |
| `--signal` | couleur d'accent (liens, titres, boutons)            |
| `--live`   | état « OK » (vert terminal)                          |
| `--voile`  | voile semi-transparent de la barre du haut (`rgba`)  |

- **Pour ajuster une couleur**, modifie la valeur dans le fichier du thème actif.
- **Pour créer un thème**, copie un fichier de `src/styles/themes/`, renomme-le et change ses valeurs, puis pointe
  le `@import` de `global.css` dessus. Les thèmes existants respectent le contraste WCAG AA (4.5:1) : vérifie
  `--signal` et `--dim` sur `--void` et sur `--panel`, dans les deux variantes.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
