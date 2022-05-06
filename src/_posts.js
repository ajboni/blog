// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
import fs from "fs";
import { marked } from "marked";
import hljs from "highlight.js";
import matter from "gray-matter";
// hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
// hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

marked.setOptions({
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
});

export let tags = [];

export function getPosts() {
  // console.log("Get Posts!");
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

export function getTags() {
  const posts = getPosts();
  // Get tag list
  tags = flatten(
    posts.map((a) => {
      const arrays = a.data.tags;
      return arrays;
      // return Array.from(new Set([].concat(...arr)));
    })
  );
  tags = tags.filter((v, i, a) => a.indexOf(v) === i);
  return tags;
}

// Leave only unique tags

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
