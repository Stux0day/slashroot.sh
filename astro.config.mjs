// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
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
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
