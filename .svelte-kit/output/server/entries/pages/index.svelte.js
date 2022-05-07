import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../chunks/index-5b2e3875.js";
import { n as navigating, S as Spinner } from "../../chunks/_spinner-748a3159.js";
import { P as PostList } from "../../chunks/_postList-f2724f9c.js";
import "../../chunks/_postInfo-d220d324.js";
import "../../chunks/utils-07a183c9.js";
async function load({ url, fetch, params }) {
  const res = await fetch("/data.json");
  const json = await res.json();
  return { props: { data: json } };
}
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_navigating();
  return `${$navigating ? `${validate_component(Spinner, "Spinner").$$render($$result, { caption: "Loading posts..." }, {}, {})}` : `${validate_component(PostList, "PostList").$$render($$result, { data }, {}, {})}`}`;
});
export { Routes as default, load };
