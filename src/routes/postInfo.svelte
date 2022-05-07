<script>
  export let post;
  import { getPostDate, getDefaultAuthor } from "../utils.js";
  const date = new Date(getPostDate(post));
  const tags = post.data.tags ? post.data.tags : null;
  const author = post.data.author ? post.data.author : getDefaultAuthor();
  let shortDate = isValidDate(date) ? date.toLocaleDateString() : "";
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
</script>

<div class="text-gray-400">
  {#each tags as tag}
    <span class="bg-purple-800 text-white p-1 mr-1 text-sm rounded-sm">
      {tag}
    </span>
  {/each}

  {#if author && author.name}
    <span class="text-sm ">{author.name}</span>
  {/if}

  {#if author && author.links}
    {#each author.links as link}
      <a href={link.url} target="__blank" class="">
        <i class={link.icon} />
      </a>
    {/each}
  {/if}
  ・
  <span class="text-sm">{shortDate}</span>
  <hr class="mb-4 mt-4 border-gray-700" />
</div>
