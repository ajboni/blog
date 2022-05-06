import { getPosts } from "../_posts.js";

const lookup = new Map();
const posts = getPosts();
posts.forEach((post) => {
  lookup.set(post.data.slug, JSON.stringify(post));
});

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  // console.log(slug);

  const result = {
    status: 404,
    statusText: "Post not found",
    "Content-Type": "application/json",
  };

  if (lookup.has(slug)) {
    result.status = 200;
    result.statusText = "OK";
    result.body = lookup.get(slug);
  }

  return result;
  // res.end(lookup.get(slug));
  // } else {
  // res.writeHead(404, {
  // "Content-Type": "application/json",
  // });

  // res.end(
  // JSON.stringify({
  // message: `Not found`,
  // })
  // );
}
