import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Poids de rangement dans les menus et les listes : négatif pour
			// faire remonter, positif pour faire descendre, absent = 0 = neutre
			// (voir src/lib/tri.ts).
			// `coerce` comme pour pubDate : `ordre: '100'` entre guillemets est
			// accepté au lieu de casser le build sur un détail de syntaxe YAML.
			ordre: z.coerce.number().optional(),
		}),
});

export const collections = { blog };
