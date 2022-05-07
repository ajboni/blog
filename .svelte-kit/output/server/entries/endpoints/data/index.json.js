var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import fs from "fs";
import { g as getPostDate } from "../../../chunks/utils-07a183c9.js";
import { marked } from "marked";
import hljs from "highlight.js";
import matter from "gray-matter";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("sql", sql);
marked.setOptions({
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(code, { language: validLanguage }).value;
  }
});
async function get({ params }) {
  const data = getData();
  let processedPosts = data.posts;
  const sortedPosts = processedPosts.sort((a, b) => new Date(getPostDate(b)) - new Date(getPostDate(a)));
  const contents = sortedPosts.map((post) => {
    return __spreadValues({}, post);
  });
  let result = {
    posts: contents,
    tags: data.tags
  };
  return {
    "Content-Type": "application/json",
    status: 200,
    statusText: "OK",
    body: result
  };
}
function getData() {
  const posts = getPosts();
  const tags = getTags(posts);
  const result = {
    posts,
    tags
  };
  return result;
}
function getPosts() {
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
  let tags = flatten(posts.map((a) => {
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
export { get, getData };
