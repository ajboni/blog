import { c as create_ssr_component, f as each, e as escape, h as add_attribute } from "../../chunks/index-eb6f75e0.js";
import { g as getPostDate, c as getDefaultAuthor } from "../../chunks/store-b58f4d9c.js";
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
const PostInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if (post) {
    const date = new Date(getPostDate(post));
    post.data.tags ? post.data.tags : null;
    post.data.author ? post.data.author : getDefaultAuthor();
    isValidDate(date) ? date.toLocaleDateString() : "";
  }
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<div class="${"text-gray-400"}">${each(tags, (tag) => {
    return `<span class="${"bg-purple-800 text-white p-1 mr-1 text-sm rounded-sm"}">${escape(tag)}
    </span>`;
  })}

  ${author && author.name ? `<span class="${"text-sm "}">${escape(author.name)}</span>` : ``}

  ${author && author.links ? `${each(author.links, (link) => {
    return `<a${add_attribute("href", link.url, 0)} target="${"__blank"}" class="${""}"><i${add_attribute("class", link.icon, 0)}></i>
      </a>`;
  })}` : ``}
  \u30FB
  <span class="${"text-sm"}">${escape(shortDate)}</span>
  <hr class="${"mb-4 mt-4 border-gray-700"}"></div>`;
});
export { PostInfo as default };
