export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/[slug].svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/postInfo.svelte"),
	() => import("../../src/routes/tag/[tag].svelte")
];

export const dictionary = {
	"": [[0, 3], [1]],
	"postInfo": [[0, 4], [1]],
	"tag/[tag]": [[0, 5], [1]],
	"[slug]": [[0, 2], [1]]
};