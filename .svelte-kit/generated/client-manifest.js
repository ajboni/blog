export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/[slug].svelte"),
	() => import("../../src/routes/about.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/postInfo.svelte")
];

export const dictionary = {
	"": [[0, 4], [1]],
	"about": [[0, 3], [1]],
	"postInfo": [[0, 5], [1]],
	"[slug]": [[0, 2], [1]]
};