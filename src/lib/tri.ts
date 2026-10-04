// Ordre d'affichage des articles, partagé par les menus de la barre supérieure
// et par les pages de liste. Un seul comparateur pour tout le site : sans ça,
// un article pouvait apparaître troisième dans le menu et premier sur la page
// du dossier.

import type { CollectionEntry } from 'astro:content';

/** Poids d'un article qui ne déclare pas `ordre`. Zéro et non l'infini : c'est
 *  ce qui fait de `ordre` un écart par rapport au rangement habituel plutôt
 *  qu'un classement parallèle. Avec l'infini, le seul article portant un
 *  `ordre` — quelle que soit sa valeur — doublait tous les autres, et un
 *  `ordre: 100` remontait en tête au lieu de descendre. */
const POIDS_NEUTRE = 0;

/** Compare deux articles selon trois critères, dans cet ordre :
 *
 *   1. `ordre` en frontmatter, du plus petit au plus grand. C'est un poids, pas
 *      un rang : **négatif pour remonter, positif pour descendre**, absent pour
 *      ne pas intervenir. `ordre: -10` colle un article en haut de son dossier,
 *      `ordre: 100` l'envoie en bas.
 *   2. `pubDate`, du plus récent au plus ancien.
 *   3. le titre, alphabétique (règles françaises : les accents ne renvoient pas
 *      les mots en fin de liste).
 *
 *  Le troisième critère n'est pas décoratif : il garantit qu'il n'existe jamais
 *  d'ex æquo. Sans lui, deux articles publiés le même jour retombaient dans
 *  l'ordre où le chargeur de contenu avait lu les fichiers — arbitraire, et
 *  susceptible de changer d'un build à l'autre.
 *
 *  Pour une série à lire dans l'ordre (un tutoriel en plusieurs parties), le
 *  poids sert aussi de numérotation : `-30`, `-20`, `-10` place les trois
 *  parties en tête du dossier et dans le bon sens.
 */
export const parOrdreDAffichage = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => {
  const poids = (a.data.ordre ?? POIDS_NEUTRE) - (b.data.ordre ?? POIDS_NEUTRE);
  if (poids !== 0) return poids;

  const date = (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0);
  if (date !== 0) return date;

  return a.data.title.localeCompare(b.data.title, 'fr');
};
