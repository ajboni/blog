<script context="module">
  export async function load({ url, fetch, params }) {
    const res = await fetch("/data.json");
    const json = await res.json();
    const post = json.posts.find((post) => post.data.slug === params.slug);
    return {
      props: {
        post: post,
      },
    };
  }
</script>

<script>
  import PostInfo from "./_postInfo.svelte";
  import { browser } from "$app/env";
  import { navigating } from "$app/stores";
  import Spinner from "./_spinner.svelte";
  export let post;
</script>

<svelte:head>
  <title>{post.data.title}</title>
</svelte:head>

{#if $navigating}
  <Spinner caption="Loading posts..." />
{:else}
  <div
    class="bg-gray-850 text-gray-300 flex flex-col border-2 border-gray-700 rounded-md shadow-lg px-8 py-8 sm:py-16
  sm:px-16 text-lg leading-relaxed w-full break-words"
  >
    <h1 class="text-4xl font-medium">{post.data.title}</h1>
    <PostInfo {post} />
    <div class="text-gray-300 markdown-body">
      {@html post.content}
    </div>
    <hr class="mt-16 mb-8 border-gray-700" />
    <div class="giscus comments">
      {#if browser}
        <script
          src="https://giscus.app/client.js"
          data-repo="ajboni/blog"
          data-repo-id="MDEwOlJlcG9zaXRvcnkyNDMwNTY5NTU="
          data-category="Announcements"
          data-category-id="DIC_kwDODnzBO84CO4vC"
          data-mapping="title"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          data-theme="dark"
          data-lang="en"
          data-loading="lazy"
          crossorigin="anonymous"
          async>
        </script>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* .post-content :global(p) {
    @apply leading-relaxed mb-4;
  }
  .post-content :global(h1) {
    @apply text-4xl mb-6 font-thin;
  }

  .post-content :global(h2) {
    @apply text-2xl mt-4 mb-6 font-thin;
  }
  .post-content :global(h3) {
    @apply text-xl my-4 font-thin;
  }
  .post-content :global(code) {
    @apply break-words whitespace-pre-line;
  } */
</style>
