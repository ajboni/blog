import { c as create_ssr_component, e as escape } from "../../chunks/index-5b2e3875.js";
function load({ error, status }) {
  return { props: { error, status } };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error } = $$props;
  const dev = process.env.NODE_ENV === "development";
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `${$$result.head += `${$$result.title = `<title>${escape(status)}</title>`, ""}`, ""}

<div class="${"text-gray-100"}"><h1 class="${"text-3xl"}">ERROR: ${escape(status)}</h1>

  <p>${escape(error.message)}</p>

  ${dev && error.stack ? `<pre>${escape(error.stack)}</pre>` : ``}</div>`;
});
export { _error as default, load };
