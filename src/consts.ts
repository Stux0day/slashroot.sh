// Données globales du site, importables depuis n'importe quel fichier.
import { identite } from './data/site';

/** Nom du site : logo, titre des pages, flux RSS. */
export const SITE_TITLE = 'slashroot.sh';

/** Description par défaut (balise meta, flux RSS). */
export const SITE_DESCRIPTION = `Portfolio et notes techniques de ${identite.nom}, ${identite.role.toLowerCase()} : Linux, virtualisation, réseaux et automatisation.`;
