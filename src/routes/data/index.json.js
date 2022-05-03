import { getPosts, getTags } from "../../_posts.js";
import { getPostDate } from "../../store.js";
//
export async function get({ params }) {
  let processedPosts = getPosts();

  // console.log(req.query.tag)
  // if (req.query.tag) {
  // 	console.log("Filter by tag: " + req.query.tag)
  // 	processedPosts = filterByTag(posts, req.query.tag)
  // }

  const sortedPosts = processedPosts.sort((a, b) => new Date(getPostDate(b)) - new Date(getPostDate(a)));

  const contents = sortedPosts.map((post) => {
    return {
      ...post,
    };
  });

  let result = {
    contents: contents,
    tags: getTags(),
  };

  return {
    "Content-Type": "application/json",
    status: 200,
    statusText: "OK",
    body: result,
  };
}
