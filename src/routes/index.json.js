import { posts, tags } from './_posts.js';
import { getPostDate } from '../store.js'

export function get(req, res) {
	let processedPosts = posts;

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	// console.log(req.query.tag)
	// if (req.query.tag) {
	// 	console.log("Filter by tag: " + req.query.tag)
	// 	processedPosts = filterByTag(posts, req.query.tag)
	// }


	const sortedPosts = processedPosts.sort((a, b) => new Date(getPostDate(b)) - new Date(getPostDate(a)));

	const contents = (sortedPosts.map(post => {
		return {
			...post
		};
	}));

	let result = {
		contents: contents,
		tags: tags
	}

	res.end(JSON.stringify(result));
}

