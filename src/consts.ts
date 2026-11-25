// Données globales du site, importables depuis n'importe quel fichier.
import { identite } from './data/site';

/** Nom du site (titre des pages d'articles, flux RSS) : l'identité affichée
 *  dans la barre du haut. */
export const SITE_TITLE = identite.service;

/** Version des favicons, ajoutée à leur adresse (/favicon.svg?v=2). Les
 *  navigateurs, Firefox en tête, gardent un favicon en cache très longtemps
 *  sans le redemander : changer d'adresse est le seul moyen sûr de leur faire
 *  prendre le nouveau. À incrémenter à chaque modification du favicon. */
export const VERSION_FAVICON = '2';

/** Description par défaut (balise meta, flux RSS). */
export const SITE_DESCRIPTION =
	"Portfolio d'un administrateur systèmes et infrastructure : Linux, Terraform, gestion de secrets, supervision.";
