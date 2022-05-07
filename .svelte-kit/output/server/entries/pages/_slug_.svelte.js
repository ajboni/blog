import { c as create_ssr_component, e as escape } from "../../chunks/index-eb6f75e0.js";
async function load({ params, fetch, session, stuff, error }) {
  const res = await fetch(`${params.slug}.json`);
  const data = await res.json();
  if (res.status === 200) {
    return { props: { post: data, error } };
  } else {
    throw "Post not found!";
  }
}
const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `${$$result.head += `${$$result.title = `<title>${escape(post.data.title)}</title>`, ""}`, ""}

<div class="${"bg-gray-850 text-gray-300 flex flex-col border-2 border-gray-700 rounded-md shadow-lg px-8 py-8 sm:py-16 sm:px-16 text-lg leading-relaxed w-full break-words"}"><h1 class="${"text-4xl font-medium"}">${escape(post.data.title)}</h1>
  
  <div class="${"text-gray-300 markdown-body"}"><!-- HTML_TAG_START -->${post.content}<!-- HTML_TAG_END --></div>
  <hr class="${"mt-16 mb-8 border-gray-700"}">
  <div class="${"giscus comments"}"></div>

  <script src="${"https://giscus.app/client.js"}" data-repo="${"ajboni/blog"}" data-repo-id="${"MDEwOlJlcG9zaXRvcnkyNDMwNTY5NTU="}" data-category="${"Announcements"}" data-category-id="${"DIC_kwDODnzBO84CO4vC"}" data-mapping="${"title"}" data-reactions-enabled="${"1"}" data-emit-metadata="${"0"}" data-input-position="${"top"}" data-theme="${"dark"}" data-lang="${"en"}" data-loading="${"lazy"}" crossorigin="${"anonymous"}" async><\/script>
</div>`;
});
export { U5Bslugu5D as default, load };
