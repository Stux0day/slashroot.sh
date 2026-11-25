// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],

	// L'ancienne page /about ne contenait que du texte de démonstration : elle
	// renvoie vers l'accueil, qui présente désormais le profil.
	redirects: {
		'/about': '/',
	},

	markdown: {
		shikiConfig: {
			// Un thème de coloration par mode. Avec `defaultColor: false`, Shiki
			// n'impose aucune couleur : il pose --shiki-light et --shiki-dark sur
			// chaque jeton, et src/styles/prose.css choisit selon le mode actif.
			themes: {
				light: 'github-light-default',
				dark: 'github-dark-default',
			},
			defaultColor: false,
		},
	},

	fonts: [
		{
			// Texte courant et titres. Police variable : graisse de 400 à 900,
			// chasse de 100 % à 125 % — les grands titres utilisent la version
			// élargie (voir --etire dans src/styles/tokens.css).
			provider: fontProviders.google(),
			name: 'Archivo',
			cssVariable: '--font-archivo',
			weights: ['400 900'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				experimental: {
					variableAxis: { wdth: [['100', '125']] },
				},
			},
		},
		{
			// Code, étiquettes et métadonnées.
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains-mono',
			weights: ['400 700'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
