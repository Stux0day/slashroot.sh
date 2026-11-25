// Génère les favicons raster à partir de public/favicon.svg :
//   public/favicon.ico            16, 32 et 48 px (navigateurs, favoris, Windows)
//   public/apple-touch-icon.png   180 px (écran d'accueil iPhone et iPad)
//   public/icon-192.png           192 px (écran d'accueil Android, site.webmanifest)
//   public/icon-512.png           512 px (idem, écrans haute densité)
//
// À relancer après toute modification de public/favicon.svg :
//   node scripts/favicons.mjs
// puis incrémenter VERSION_FAVICON dans src/consts.ts, pour que les
// navigateurs abandonnent l'icône qu'ils ont en cache.
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const dossierPublic = new URL('../public/', import.meta.url);
const svg = readFileSync(new URL('favicon.svg', dossierPublic), 'utf8').replace(/<!--[\s\S]*?-->/g, '');

// Icônes d'écran d'accueil : le système arrondit lui-même les angles, et
// Android peut recadrer l'icône en cercle. On pose donc un fond plein, sans
// arrondi, et on réduit le dessin vers le centre pour qu'il reste entier.
const fond = svg.match(/<rect[^>]*fill="([^"]+)"/)?.[1] ?? '#000000';
const pleinCadre = svg
	.replace(
		/<rect[^>]*\/>/,
		`<rect width="32" height="32" fill="${fond}" /><g transform="translate(16 16) scale(0.72) translate(-16.5 -16)">`,
	)
	.replace('</svg>', '</g></svg>');

/** Rend un SVG de 32 × 32 unités en PNG carré de `taille` pixels. */
const enPng = (source, taille) =>
	sharp(Buffer.from(source), { density: (72 * taille) / 32 })
		.resize(taille, taille)
		.png({ compressionLevel: 9 })
		.toBuffer();

/** Fichier ICO contenant une image PNG par taille, à la suite de l'en-tête et
 *  du répertoire d'images. Format lu par tous les navigateurs et par Windows. */
const enIco = async (tailles) => {
	const images = await Promise.all(tailles.map((taille) => enPng(svg, taille)));
	const entete = Buffer.alloc(6 + 16 * images.length);
	entete.writeUInt16LE(0, 0); // réservé
	entete.writeUInt16LE(1, 2); // type : icône
	entete.writeUInt16LE(images.length, 4);
	let position = entete.length;
	images.forEach((image, i) => {
		const o = 6 + 16 * i;
		const cote = tailles[i] >= 256 ? 0 : tailles[i]; // 0 signifie 256
		entete.writeUInt8(cote, o);
		entete.writeUInt8(cote, o + 1);
		entete.writeUInt8(0, o + 2); // pas de palette
		entete.writeUInt8(0, o + 3); // réservé
		entete.writeUInt16LE(1, o + 4); // plans
		entete.writeUInt16LE(32, o + 6); // bits par pixel
		entete.writeUInt32LE(image.length, o + 8);
		entete.writeUInt32LE(position, o + 12);
		position += image.length;
	});
	return Buffer.concat([entete, ...images]);
};

const fichiers = {
	'favicon.ico': await enIco([16, 32, 48]),
	'apple-touch-icon.png': await enPng(pleinCadre, 180),
	'icon-192.png': await enPng(pleinCadre, 192),
	'icon-512.png': await enPng(pleinCadre, 512),
};

for (const [nom, contenu] of Object.entries(fichiers)) {
	writeFileSync(new URL(nom, dossierPublic), contenu);
	console.log(`public/${nom} — ${contenu.length} octets`);
}
