// Fonctions partagées par les pages qui listent ou affichent des articles :
// dossiers, regroupements, dates et statistiques de lecture.

import { type CollectionEntry, getCollection } from 'astro:content';
import { dossiers as dossiersDeclares } from '../data/site';
import { parOrdreDAffichage } from './tri';

export type Article = CollectionEntry<'blog'>;

/** Un sous-dossier d'un dossier (null = articles posés à sa racine). */
export interface Groupe {
	nom: string | null;
	articles: Article[];
}

export interface Dossier {
	id: string;
	libelle: string;
	articles: Article[];
	groupes: Groupe[];
}

/** 7 -> « 07 ». Sert aux numéros de section et aux dates. */
export const numero = (n: number) => String(n).padStart(2, '0');

/** Premier segment de l'identifiant : le dossier, tel qu'il figure dans l'URL. */
export const dossierDe = (article: Article) => article.id.split('/')[0];

/** Libellé déclaré dans src/data/site.ts, ou à défaut l'identifiant. */
export const libelleDossier = (id: string) =>
	dossiersDeclares.find((d) => d.id === id)?.libelle ?? id;

/** Dossiers du fichier source avec leur casse d'origine : ['os', 'Debian'].
 *  Astro met les identifiants en minuscules (« os/debian/preseed ») ; le chemin
 *  du fichier, lui, garde « Debian », « ArchLinux » ou « WebServer ». */
export const cheminSource = (article: Article): string[] => {
	const source = article.filePath?.replace(/\\/g, '/').replace(/^.*?content\/blog\//, '');
	return (source ?? article.id).split('/').slice(0, -1);
};

/** Range les articles d'un dossier par sous-dossier : ceux posés à la racine
 *  d'abord, puis les sous-dossiers par ordre alphabétique. Un chemin profond
 *  (Virtualisation/Proxmox) forme un seul groupe, « Virtualisation / Proxmox ». */
export const grouper = (articles: Article[]): Groupe[] => {
	const groupes = new Map<string, Article[]>();
	for (const article of articles) {
		const cle = cheminSource(article).slice(1).join(' / ');
		groupes.set(cle, [...(groupes.get(cle) ?? []), article]);
	}
	return [...groupes.entries()]
		.sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b, 'fr')))
		.map(([nom, liste]) => ({ nom: nom || null, articles: liste.sort(parOrdreDAffichage) }));
};

/** Dossiers non vides, dans l'ordre de src/data/site.ts ; ceux qui n'y sont
 *  pas déclarés suivent, par ordre alphabétique. */
export async function chargerDossiers(): Promise<Dossier[]> {
	const articles = await getCollection('blog');
	const presents = new Set(articles.map(dossierDe));
	const declares = dossiersDeclares.map((d) => d.id).filter((id) => presents.has(id));
	const autres = [...presents]
		.filter((id) => !declares.includes(id))
		.sort((a, b) => a.localeCompare(b, 'fr'));

	return [...declares, ...autres].map((id) => {
		const liste = articles.filter((a) => dossierDe(a) === id).sort(parOrdreDAffichage);
		return { id, libelle: libelleDossier(id), articles: liste, groupes: grouper(liste) };
	});
}

/** Les plus récents d'abord, tous dossiers confondus. */
export const parDateDecroissante = (a: Article, b: Article) =>
	b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** AAAA-MM-JJ en heure locale, pour l'attribut datetime. toISOString()
 *  passerait en UTC et reculerait d'un jour les dates posées à minuit. */
export const dateISO = (d: Date) =>
	`${d.getFullYear()}-${numero(d.getMonth() + 1)}-${numero(d.getDate())}`;

/** 29.07.2026 : listes et métadonnées. */
export const dateCourte = (d: Date) =>
	`${numero(d.getDate())}.${numero(d.getMonth() + 1)}.${d.getFullYear()}`;

/** 29 juillet 2026 : en-tête d'article. */
export const dateLongue = (d: Date) =>
	d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export interface Statistiques {
	/** Mots du corps, blocs de code exclus : ils gonflent le compte sans rien
	 *  dire du temps de lecture réel. */
	mots: number;
	/** Minutes de lecture estimées, à 200 mots par minute. */
	lecture: number;
}

export const statistiques = (article: Article): Statistiques => {
	const mots = (article.body ?? '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/[#>*_`|[\]()-]/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;
	return { mots, lecture: Math.max(1, Math.round(mots / 200)) };
};
