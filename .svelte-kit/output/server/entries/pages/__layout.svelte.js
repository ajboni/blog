import { c as create_ssr_component, b as subscribe, e as escape, d as null_to_empty, f as each, v as validate_component } from "../../chunks/index-eb6f75e0.js";
import { p as page, n as navigating, S as Spinner } from "../../chunks/stores-68e54911.js";
import { t as tags, p as posts, a as tagFilter, b as pageInfo, i as init } from "../../chunks/store-b58f4d9c.js";
var _sidebar_svelte_svelte_type_style_lang = "";
const css = {
  code: '.gradient.svelte-s9k6wd{font-family:"Monoton";font-size:5rem;margin:3rem;border-radius:100px;padding:1rem;width:8rem;height:8rem;display:flex;align-items:center;justify-content:center;background:#9d50bb;background:-webkit-linear-gradient(to right, #805ad5, #9d50bb);background:linear-gradient(\n      to right,\n      #6e48aa,\n      #9d50bb\n    )}',
  map: null
};
const sidebarBtnClass = "w-1/4 sm:w-full text-center p-2 hover:bg-purple-500 ";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $tags, $$unsubscribe_tags;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_tags = subscribe(tags, (value) => $tags = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_tags();
  return `${$$result.head += ``, ""}

<div class="${"flex flex-row sm:flex-col items-center flex-grow h-full justify-start sm:justify-center text-2xl"}"><div class="${"gradient svelte-s9k6wd"}">[a]</div>

  <a class="${escape(null_to_empty(sidebarBtnClass + " " + ($page.url.pathname === void 0 ? "bg-purple-800" : ""))) + " svelte-s9k6wd"}" href="${"."}">Home </a>

  <div class="${escape(null_to_empty("hidden sm:flex w-full my-2 sm:w-5/6 justify-center flex-wrap  ")) + " svelte-s9k6wd"}">
    ${$tags.length > 2 ? `<a class="${"bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs rounded-sm cursor-pointer"}" href="${"/"}">all
      </a>` : ``}

    ${each($tags, (tag) => {
    return `<a class="${"bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs rounded-sm cursor-pointer"}" href="${"/?tag=" + escape(tag)}">${escape(tag)}
      </a>`;
  })}</div>
</div>`;
});
var main = "";
var markdown = "";
const prerender = false;
async function load({ url, fetch, params }) {
  const { hostname, pathname } = url;
  const res = await fetch("/data.json");
  const json = await res.json();
  posts.set(json.contents);
  tags.set(json.tags);
  tagFilter.set(null);
  pageInfo.set({ hostname, pathname, params });
  init.set(true);
  return res;
}
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $init, $$unsubscribe_init;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_init = subscribe(init, (value) => $init = value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  console.log("Layout");
  $$unsubscribe_init();
  $$unsubscribe_navigating();
  return `<div class="${"min-h-screen md:flex bg-gray-850"}">${$init === false ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading..." }, {}, {})}` : `${$navigating ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading posts..." }, {}, {})}` : `
    <div class="${"md:h-screen lg:top-0 lg:sticky flex-none w-full md:w-64 text-white "}">
      ${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}</div>

    
    <main class="${"flex-1 bg-gray-900 sm:p-0 md:p-8 lg:p-8"}">${slots.default ? slots.default({}) : ``}</main>`}`}</div>`;
});
export { _layout as default, load, prerender };
