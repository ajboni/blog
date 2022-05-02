<script context="module">
  import { posts, tags, pageInfo, tagFilter } from "../store.js";

  function filterByTag(arr, tag) {
    if (!tag || tag === "") {
      return arr;
    }
    arr = arr.filter(a => a.data.tags.includes(tag));
    return arr;
  }

  export async function preload({ url, fetch, params }) {
    const { hostname, pathname, searchParams } = url
    const res = await fetch("index.json");
    const json = await res.json();
    const processedPosts = filterByTag(json.contents, params.tag);
    posts.set(processedPosts);
    tags.set(json.tags);
    tagFilter.set(searchParams.tag);
    pageInfo.set({ hostname, pathname, params, query });
    return res;
  }
</script>

<script>
  // import { tagFilter } from "../store.js";
  import PostList from "./_postList.svelte";
  import Spinner from "./_spinner.svelte";
  import { getStores, navigating, page, session, updated } from '$app/stores';
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#if $navigating}
  <Spinner caption="Loading posts..." />
{:else}
  <PostList />
{/if}
