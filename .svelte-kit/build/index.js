
import root from '__GENERATED__/root.svelte';
import { respond } from '/home/baj/datos/dev/blog/.svelte-kit/runtime/server/index.js';
import { set_paths, assets, base } from '/home/baj/datos/dev/blog/.svelte-kit/runtime/paths.js';
import { set_prerendering } from '/home/baj/datos/dev/blog/.svelte-kit/runtime/env.js';

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\" />\n    <meta name=\"theme-color\" content=\"#333333\" />\n    <meta name=\"version\" content=\"1.1\" />\n    <link rel=\"manifest\" href=\"manifest.json\" />\n    <link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" />\n    <link rel=\"stylesheet\" href=\"/global.css\" />\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css\"\n      integrity=\"sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=\"\n      crossorigin=\"anonymous\"\n    />\n\n    <link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/github-dark.min.css\" />\n    <script src=\"//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/languages/shell.min.js\"></script>\n\n    <link href=\"https://fonts.googleapis.com/css?family=Monoton&display=swap\" rel=\"stylesheet\" />\n\n    <!-- This contains the contents of the <svelte:head> component, if\n\t     the current page has one -->\n    " + head + "\n  </head>\n\n  <body>\n    <!-- The application will be rendered inside this element,\n\t     because `src/client.js` references it -->\n    <div id=\"svelte-body\">" + body + "</div>\n  </body>\n\n  <a href=\"https://github.com/ajboni/blog\" class=\"github-corner\" aria-label=\"View source on GitHub\"\n    ><svg\n      width=\"80\"\n      height=\"80\"\n      viewBox=\"0 0 250 250\"\n      style=\"fill: #805ad5; color: #fff; position: absolute; top: 0; border: 0; right: 0\"\n      aria-hidden=\"true\"\n    >\n      <path d=\"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z\"></path>\n      <path\n        d=\"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2\"\n        fill=\"currentColor\"\n        style=\"transform-origin: 130px 106px\"\n        class=\"octo-arm\"\n      ></path>\n      <path\n        d=\"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z\"\n        fill=\"currentColor\"\n        class=\"octo-body\"\n      ></path></svg\n  ></a>\n  <style>\n    .github-corner:hover .octo-arm {\n      animation: octocat-wave 560ms ease-in-out;\n    }\n\n    @keyframes octocat-wave {\n      0%,\n      100% {\n        transform: rotate(0);\n      }\n\n      20%,\n      60% {\n        transform: rotate(-25deg);\n      }\n\n      40%,\n      80% {\n        transform: rotate(10deg);\n      }\n    }\n\n    @media (max-width: 500px) {\n      .github-corner:hover .octo-arm {\n        animation: none;\n      }\n\n      .github-corner .octo-arm {\n        animation: octocat-wave 560ms ease-in-out;\n      }\n    }\n  </style>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			amp: false,
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			floc: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks: null,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/_app/',
			prerender: true,
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		if (!this.options.hooks) {
			const module = await import("./hooks.js");
			this.options.hooks = {
				getSession: module.getSession || (() => ({})),
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				externalFetch: module.externalFetch || fetch
			};
		}

		return respond(request, this.options, options);
	}
}
