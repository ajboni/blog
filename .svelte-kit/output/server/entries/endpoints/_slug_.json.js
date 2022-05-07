import { g as getPosts } from "../../chunks/_posts-1bafef52.js";
import "fs";
import "marked";
import "highlight.js";
import "gray-matter";
const lookup = /* @__PURE__ */ new Map();
const posts = getPosts();
posts.forEach((post) => {
  lookup.set(post.data.slug, JSON.stringify(post));
});
function get(req, res, next) {
  const { slug } = req.params;
  const result = {
    status: 404,
    statusText: "Post not found",
    "Content-Type": "application/json"
  };
  if (lookup.has(slug)) {
    result.status = 200;
    result.statusText = "OK";
    result.body = lookup.get(slug);
  }
  return result;
}
export { get };
