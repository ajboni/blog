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
import { g as getPosts, a as getTags } from "../../../chunks/_posts-1bafef52.js";
import { g as getPostDate } from "../../../chunks/store-b58f4d9c.js";
import "fs";
import "marked";
import "highlight.js";
import "gray-matter";
import "../../../chunks/index-eb6f75e0.js";
async function get({ params }) {
  let processedPosts = getPosts();
  const sortedPosts = processedPosts.sort((a, b) => new Date(getPostDate(b)) - new Date(getPostDate(a)));
  const contents = sortedPosts.map((post) => {
    return __spreadValues({}, post);
  });
  let result = {
    contents,
    tags: getTags()
  };
  return {
    "Content-Type": "application/json",
    status: 200,
    statusText: "OK",
    body: result
  };
}
export { get };
