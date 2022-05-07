import { c as create_ssr_component, e as escape, g as getContext } from "./index-eb6f75e0.js";
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { caption = "" } = $$props;
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  return `<div class="${"h-screem w-screen mx-auto text-center bg-gray-900 text-gray-100"}"><div class="${"text-6xl"}"><i class="${"fas fa-spinner fa-spin"}"></i></div>
  <div class="${""}">${escape(caption)}</div></div>`;
});
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const navigating = {
  subscribe(fn) {
    const store = getStores().navigating;
    return store.subscribe(fn);
  }
};
export { Spinner as S, navigating as n, page as p };
