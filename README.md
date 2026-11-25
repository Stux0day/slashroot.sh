## 🎨 Couleurs et design

Le design suit l'esprit d'un manuel technique suisse : fond papier, encre noire, un seul accent, une grille de
12 colonnes et de grands titres en chasse élargie. Il existe en mode clair et en mode sombre : le site suit la
préférence du système, et le bouton soleil/lune de la barre du haut permet de forcer l'un ou l'autre.

**Toutes les couleurs sont dans [`src/styles/tokens.css`](src/styles/tokens.css)**, et nulle part ailleurs. Chacune
s'écrit `light-dark(<mode clair>, <mode sombre>)`.

### Mise en page

Le site occupe toute la largeur de la fenêtre (`--largeur: 100%` dans `tokens.css` ; une valeur fixe comme `86rem`
le ramène à une colonne centrée). Pour que les lignes restent lisibles sur un grand écran :

- les listes d'articles passent sur deux colonnes, puis trois, selon la place réellement disponible ;
- à partir de 1280 px, une page d'article se répartit en trois zones : les articles du même dossier à gauche, le
  texte au centre (70 caractères par ligne au plus), le sommaire à droite ;
- le texte et les grands titres grandissent légèrement avec l'écran.

### Changer la couleur d'accent

L'accent colore le logo, les liens, les boutons, les numéros de section et le « _ » des titres. Il se règle avec
trois valeurs, en tête de `tokens.css` :

```css
--accent-h: 29;    /* teinte, de 0 à 360 */
--accent-c: 0.22;  /* saturation */
--accent-l: 54%;   /* luminosité en mode clair */
```

Le serveur de dev recharge la page tout seul. L'accent existe en deux versions, calculées à partir de ces réglages :

- `--accent`, l'accent **vif**, pour les aplats et les grands éléments : logo, boutons, « _ » des titres, grands
  numéros, barre de lecture, filets d'accent ;
- `--accent-texte`, pour les **petits textes** en couleur : liens, étiquettes, survols.

En mode clair, les deux sont identiques. En mode sombre, un rouge vif est trop foncé pour rester lisible en petit
sur l'anthracite : `--accent-texte` y est plus lumineux. Les luminosités du mode sombre sont fixées dans
`tokens.css` pour tenir les contrastes WCAG, quelle que soit la teinte. Préréglages vérifiés (contraste sur le fond
de page) :

| Couleur   | `--accent-h` | `--accent-c` | `--accent-l` | Mode clair        | Sombre, vif | Sombre, petits textes |
| :-------- | -----------: | -----------: | -----------: | :---------------- | :---------- | :-------------------- |
| rouge     |           29 |        0.22  |         54 % | `#d00405` — 5,1:1 | `#fc4738`   | `#fd8171` — 5,6:1     |
| vermillon |           40 |        0.17  |         54 % | `#bb3f00` — 4,9:1 | `#e56636`   | `#ea9070` — 5,7:1     |
| orange    |           55 |        0.13  |         54 % | `#a6560a` — 4,7:1 | `#ce7a3b`   | `#d89c73` — 5,8:1     |
| vert      |          150 |        0.135 |         50 % | `#087736` — 5,0:1 | `#4ba964`   | `#7fbc8b` — 6,2:1     |
| turquoise |          190 |        0.085 |         50 % | `#06726e` — 5,1:1 | `#4ba39e`   | `#7eb7b3` — 6,1:1     |
| bleu      |          255 |        0.175 |         54 % | `#066cd1` — 4,6:1 | `#3b92fa`   | `#74aef7` — 6,0:1     |
| indigo    |          275 |        0.18  |         54 % | `#545ed5` — 4,8:1 | `#7584fe`   | `#94a4fa` — 5,8:1     |
| violet    |          305 |        0.22  |         54 % | `#8e3bd2` — 5,1:1 | `#b264fb`   | `#c290f8` — 5,6:1     |
| magenta   |          345 |        0.22  |         54 % | `#be148b` — 5,1:1 | `#e849b0`   | `#ee80c1` — 5,6:1     |

L'accent vif du mode sombre tient au moins 3,9:1 sur le fond, suffisant pour les grands éléments et les aplats (le
seuil WCAG est 3:1), et le texte des boutons posé dessus au moins 5:1. Au-delà de la saturation indiquée, la couleur
sort de ce que l'écran sait afficher. Le favicon ([`public/favicon.svg`](public/favicon.svg)) garde un rouge fixe :
à changer à la main si tu changes de teinte.

### Les autres couleurs

| Variable      | Rôle                                                        |
| :------------ | :---------------------------------------------------------- |
| `--papier`    | fond de page                                                |
| `--papier-2`  | aplats : code en ligne, en-têtes de tableau                 |
| `--code-fond` | fond des blocs de code                                      |
| `--encre`     | texte principal et filets épais                             |
| `--encre-2`   | texte secondaire (descriptions, chapôs)                     |
| `--encre-3`   | étiquettes et métadonnées                                   |
| `--filet`     | filets fins, purement décoratifs                            |
| `--dispo`     | pastille « Ouvert aux opportunités »                        |

Si tu modifies une valeur, vérifie le contraste du texte sur `--papier` dans les deux modes (4,5:1 au minimum).

Le fond du mode sombre est un anthracite chaud (`#2e2d2a`), pas un noir. Les blocs de code y sont plus foncés que la
page (`#242321`), comme un terminal encastré : sur un fond plus clair, les commentaires de la coloration
syntaxique deviendraient illisibles. Pour foncer ou éclaircir le fond, change la seconde valeur de `--papier`, puis
décale de la même façon `--papier-2` (un cran plus clair) et `--filet` (deux crans plus clair). Revérifie ensuite le
contraste de `--encre-3` et de l'accent sur le nouveau fond.

### Polices

[Archivo](https://fonts.google.com/specimen/Archivo) pour le texte et les titres (police variable, élargie à 125 %
pour les grands titres) et [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) pour le code et les
étiquettes. Elles sont déclarées dans [`astro.config.mjs`](astro.config.mjs) et téléchargées par Astro au build.

### Où se trouve quoi

| Fichier                              | Contenu                                                      |
| :----------------------------------- | :----------------------------------------------------------- |
| `src/styles/tokens.css`              | couleurs, polices, tailles, espacements                      |
| `src/styles/base.css`                | remise à zéro et classes partagées (`.btn`, `.puce`, `.etiquette`…) |
| `src/styles/prose.css`               | mise en forme du contenu des articles (titres, code, tableaux) |
| `src/layouts/BaseLayout.astro`       | cadre commun : barre du haut, contenu, pied de page          |
| `src/layouts/ArticleLayout.astro`    | page d'un article : en-tête, rail du dossier, sommaire, articles voisins |
| `src/components/`                    | barre du haut, pied de page, listes d'articles, icônes…      |
| `src/data/site.ts`                   | tout le texte de l'accueil et la liste des dossiers          |
| `src/content/blog/`                  | les articles                                                 |
| `public/cv.pdf`                      | le CV : le bouton « Télécharger le CV » n'apparaît que si ce fichier existe |

`src/components/HeaderLink.astro` vient de l'ancien design : il reste uniquement parce que l'article de démonstration
`using-mdx.mdx` l'importe.

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
