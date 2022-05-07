import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../chunks/index-5b2e3875.js";
import { P as PostInfo } from "../../chunks/_postInfo-d220d324.js";
import { n as navigating, S as Spinner } from "../../chunks/_spinner-748a3159.js";
import "../../chunks/utils-07a183c9.js";
async function load({ url, fetch, params }) {
  const res = await fetch("/data.json");
  const json = await res.json();
  const post = json.posts.find((post2) => post2.data.slug === params.slug);
  return { props: { post } };
}
const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  $$unsubscribe_navigating();
  return `${$$result.head += `${$$result.title = `<title>${escape(post.data.title)}</title>`, ""}`, ""}

${$navigating ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading posts..." }, {}, {})}` : `<div class="${"bg-gray-850 text-gray-300 flex flex-col border-2 border-gray-700 rounded-md shadow-lg px-8 py-8 sm:py-16 sm:px-16 text-lg leading-relaxed w-full break-words"}"><h1 class="${"text-4xl font-medium"}">${escape(post.data.title)}</h1>
    ${validate_component(PostInfo, "PostInfo").$$render($$result, { post }, {}, {})}
    <div class="${"text-gray-300 markdown-body"}"><!-- HTML_TAG_START -->${post.content}<!-- HTML_TAG_END --></div>
    <hr class="${"mt-16 mb-8 border-gray-700"}">
    <div class="${"giscus comments"}">${``}</div></div>`}`;
});
export { U5Bslugu5D as default, load };
