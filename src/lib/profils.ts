// Libellés des profils déclarés dans `contact` (src/data/site.ts). Une clé
// sans libellé ici s'affiche telle quelle.
export const NOMS_PROFILS: Record<string, string> = {
	github: 'GitHub',
	linkedin: 'LinkedIn',
};

export const nomProfil = (cle: string) => NOMS_PROFILS[cle] ?? cle;
