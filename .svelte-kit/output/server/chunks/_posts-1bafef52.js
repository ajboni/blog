import fs from "fs";
import { marked } from "marked";
import hljs from "highlight.js";
import matter from "gray-matter";
marked.setOptions({
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  }
});
let tags = [];
function getPosts() {
  const posts = [];
  let postsFile = fs.readdirSync("./static/posts/");
  postsFile.forEach((postFile) => {
    const fileContents = fs.readFileSync("./static/posts/" + postFile, "utf8");
    const matterPost = matter(fileContents, { excerpt: true, excerpt_separator: "<!-- more -->" });
    matterPost.content = marked(matterPost.content);
    matterPost.excerpt = marked(matterPost.excerpt);
    posts.push(matterPost);
  });
  return posts;
}
function getTags() {
  const posts = getPosts();
  tags = flatten(posts.map((a) => {
    const arrays = a.data.tags;
    return arrays;
  }));
  tags = tags.filter((v, i, a) => a.indexOf(v) === i);
  return tags;
}
function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
export { getTags as a, getPosts as g };
