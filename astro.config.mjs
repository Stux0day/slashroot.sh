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
			// Police display des dossiers de la barre supérieure. Une seule
			// graisse, et un dessin large : réservée à des étiquettes courtes.
			provider: fontProviders.google(),
			name: 'Zen Tokyo Zoo',
			cssVariable: '--font-zen-tokyo-zoo',
			fallbacks: ['ui-monospace', 'monospace'],
		},
		{
			// Identité en haut à gauche : lettres décalées, façon signal
			// corrompu. Ne convient qu'à un mot, jamais à du texte suivi.
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
