import fs from "fs";
import { getPostDate } from "../../utils.js";
import { marked } from "marked";
import hljs from "highlight.js";
import matter from "gray-matter";

import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";

hljs.registerLanguage("shell", shell);
hljs.registerLanguage("sql", sql);

// hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

marked.setOptions({
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(code, { language: validLanguage }).value;
  },
});

/* Main GET Response*/
export async function get({ params }) {
  const data = getData();
  let processedPosts = data.posts;
  const sortedPosts = processedPosts.sort((a, b) => new Date(getPostDate(b)) - new Date(getPostDate(a)));

  const contents = sortedPosts.map((post) => {
    return {
      ...post,
    };
  });

  let result = {
    posts: contents,
    tags: data.tags,
  };

  return {
    "Content-Type": "application/json",
    status: 200,
    statusText: "OK",
    body: result,
  };
}

/* Gett all the data (posts and tags) */
export function getData() {
  const posts = getPosts();
  const tags = getTags(posts);
  const result = {
    posts: posts,
    tags: tags,
  };
  return result;
}

function getPosts() {
  // console.log("Get Posts!");
  const posts = [];
  let postsFile = fs.readdirSync("./static/posts/");
  postsFile.forEach((postFile) => {
    const fileContents = fs.readFileSync("./static/posts/" + postFile, "utf8");
    const matterPost = matter(fileContents, { excerpt: true, excerpt_separator: "<!-- more -->" });
    matterPost.content = marked(matterPost.content);
    matterPost.excerpt = marked(matterPost.excerpt);
    matterPost.data.fileName = postFile;
    posts.push(matterPost);
  });
  return posts;
}

function getTags(posts) {
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
