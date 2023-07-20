import { c as create_ssr_component, e as escape, n as null_to_empty, a as each, b as subscribe, v as validate_component } from "../../chunks/index-5b2e3875.js";
import { n as navigating, S as Spinner } from "../../chunks/_spinner-748a3159.js";
var main = "";
var markdown = "";
var _sidebar_svelte_svelte_type_style_lang = "";
const css = {
  code: '.gradient.svelte-s9k6wd{font-family:"Monoton";font-size:5rem;margin:3rem;border-radius:100px;padding:1rem;width:8rem;height:8rem;display:flex;align-items:center;justify-content:center;background:#9d50bb;background:-webkit-linear-gradient(to right, #805ad5, #9d50bb);background:linear-gradient(\n      to right,\n      #6e48aa,\n      #9d50bb\n    )}',
  map: null
};
const sidebarBtnClass = "w-1/4 sm:w-full text-center p-2 hover:bg-purple-500 ";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${$$result.head += ``, ""}

<div class="${"flex flex-row sm:flex-col items-center flex-grow h-full justify-start sm:justify-center text-2xl"}"><div class="${"gradient svelte-s9k6wd"}">[a]</div>

  <a class="${escape(null_to_empty(sidebarBtnClass + " bg-purple-800")) + " svelte-s9k6wd"}" href="${"/"}">Home </a>

  <div class="${escape(null_to_empty("hidden sm:flex w-full my-2 sm:w-5/6 justify-center flex-wrap  ")) + " svelte-s9k6wd"}">
    ${((_a = data.tags) == null ? void 0 : _a.length) > 2 ? `<a class="${"bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs rounded-sm cursor-pointer"}" href="${"/"}">all
      </a>` : ``}

    ${each(data.tags, (tag) => {
    return `<a class="${"bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs rounded-sm cursor-pointer"}" href="${"/tag/" + escape(tag)}">${escape(tag)}
      </a>`;
  })}</div>
</div>`;
});
async function load({ url, fetch, params }) {
  const res = await fetch("/data.json");
  const json = await res.json();
  return { props: { data: json } };
}
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_navigating();
  return `<div class="${"min-h-screen md:flex bg-gray-850"}">${$navigating ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading posts..." }, {}, {})}` : `<div class="${"md:h-screen lg:top-0 lg:sticky flex-none w-full md:w-64 text-white "}">
      ${validate_component(Sidebar, "Sidebar").$$render($$result, { data }, {}, {})}</div>

    
    <main class="${"flex-1 bg-gray-900 sm:p-0 md:p-8 lg:p-8"}">
      
      
      ${slots.default ? slots.default({}) : ``}</main>`}</div>`;
});
export { _layout as default, load };
