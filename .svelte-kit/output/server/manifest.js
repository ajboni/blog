export const manifest = {
	appDir: "_app",
	assets: new Set([".nojekyll","1.jpeg","CNAME","favicon.png","global.css","great-success.png","images/2019-01-12-00_02_58-mixer.png","images/filesystem.png","images/hugo.png","images/reaper1.png","images/reaper2.png","logo-192.png","logo-512.png","manifest.json","posts/2019-07-21-reaper-orchestral-scoring-template-v2019-100-free-101-tracks.md","posts/2019-07-29-kingdom-come-deliverance.md","posts/2019-08-10-fedora-30-connect-to-iscsi-resource.md","posts/2019-08-10-fedora-30-fix-error-html5-youtube.md","posts/2019-08-24-fedora-30-create-a-bootable-windows-10-or-7-usb-stick-on-fedora.md","posts/2019-10-29-fish-shell-alias-for-pretty-git-log.md","posts/2019-11-15-fix-genexus-not-copying-resource-files-to-tomcat-folder.md","posts/2020-03-30-huion-h950p-linux-working.md","posts/2020-05-04-woocommerce-hide-shipping-fields-forlocal-pickup-in-cart-page.md","posts/2020-06-08-configuring-wake-on-lan copy.md","posts/2021-01-12-ethereum-mining-in-linux-with-open-source-amd-drivers","posts/2021-07-23-using-citrix-worspace-in-linux.md","posts/2021-12-23-setting-up-raid-in-linux.md","posts/2022-02-15-no-devices-fix-in-ms-teams-in-citrix-workspace-app.md","posts/2022-04-17-neovim-as-ide.md","posts/2022-04-24-neovim-for-hugo-development.md","posts/2023-07-19-xrand-to-crop-monitor-output.md"]),
	mimeTypes: {".jpeg":"image/jpeg",".png":"image/png",".css":"text/css",".json":"application/json",".md":"text/markdown"},
	_: {
		entry: {"file":"start-b8fc24bf.js","js":["start-b8fc24bf.js","chunks/index-fd75ec39.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "data.json",
				pattern: /^\/data\.json$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/data/index.json.js')
			},
			{
				type: 'page',
				id: "tag/[tag]",
				pattern: /^\/tag\/([^/]+?)\/?$/,
				names: ["tag"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				names: ["slug"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,4],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
