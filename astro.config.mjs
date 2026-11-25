// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	// L'ancienne page /about ne contenait que du texte de démonstration :
	// elle renvoie vers l'accueil, qui présente le profil.
	redirects: {
		'/about': '/',
	},
	fonts: [
		{
			// Police pixel de la bannière d'accueil uniquement.
			provider: fontProviders.google(),
			name: 'VT323',
			cssVariable: '--font-vt323',
			fallbacks: ['ui-monospace', 'monospace'],
		},
		{
			// Toute la barre supérieure : identité, dossiers et liens de section.
			// Lettres volontairement décalées, façon signal corrompu. Ne convient
			// qu'à des étiquettes courtes, jamais à du texte suivi, et devient
			// illisible en dessous d'environ 1rem — d'où les planchers de clamp
			// dans Topbar.astro.
			provider: fontProviders.google(),
			name: 'Rubik Glitch',
			cssVariable: '--font-rubik-glitch',
			fallbacks: ['ui-monospace', 'monospace'],
		},
		// Famille IBM Plex : texte courant, titres et chasse fixe de tout le site.
		// Servie par le site lui-même (téléchargée au build) et déclarée dans
		// BaseHead.astro et index.astro, donc identique sur toutes les pages —
		// elle n'était auparavant chargée que sur l'accueil.
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-plex-sans',
			weights: [400, 500, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans Condensed',
			cssVariable: '--font-plex-condensed',
			weights: [600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-plex-mono',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
