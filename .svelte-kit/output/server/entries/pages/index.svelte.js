import { c as create_ssr_component, h as add_attribute, e as escape, b as subscribe, f as each, v as validate_component } from "../../chunks/index-eb6f75e0.js";
import { a as tagFilter, p as posts } from "../../chunks/store-b58f4d9c.js";
import { n as navigating, S as Spinner } from "../../chunks/stores-68e54911.js";
const PostListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<div class="${"bg-gray-850 flex flex-col mb-10 border-2 border-gray-700 rounded-md py-8 shadow-lg px-16 text-lg leading-relaxed "}"><a class="${"text-3xl text-gray-300"}" rel="${"prefetch"}"${add_attribute("href", post.data.slug, 0)}>${escape(post.data.title)}</a>
  
  <div class="${"my-4 text-gray-400"}"><!-- HTML_TAG_START -->${post.excerpt}<!-- HTML_TAG_END -->
    <br>
    <div class="${"text-right text-purple-500 hover:text-purple-700"}"><a${add_attribute("href", post.data.slug, 0)}>Read more...</a>
      <i class="${"fa fa-chevron-circle-right"}"></i></div></div></div>`;
});
const PostList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tagFilter, $$unsubscribe_tagFilter;
  let $posts, $$unsubscribe_posts;
  $$unsubscribe_tagFilter = subscribe(tagFilter, (value) => $tagFilter = value);
  $$unsubscribe_posts = subscribe(posts, (value) => $posts = value);
  $$unsubscribe_tagFilter();
  $$unsubscribe_posts();
  return `<div class="${"text-4xl py-4 sm:pt-4 sm:pb-8 text-center font-medium text-gray-100"}">Recent posts ${escape($tagFilter ? "about " + $tagFilter : "")}</div>

<ul>${each($posts, (post) => {
    return `<li>${validate_component(PostListView, "PostListView").$$render($$result, { post }, {}, {})}
    </li>`;
  })}</ul>`;
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_navigating();
  return `${$$result.head += `${$$result.title = `<title>Blog</title>`, ""}`, ""}

${$navigating ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading posts..." }, {}, {})}` : `${validate_component(PostList, "PostList").$$render($$result, {}, {}, {})}`}`;
});
export { Routes as default };
