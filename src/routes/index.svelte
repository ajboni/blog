<script>
  // import { tagFilter } from "../store.js";
  import PostList from "./_postList.svelte";
  import Spinner from "./_spinner.svelte";
  import { getStores, navigating, page, session, updated } from "$app/stores";
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#if $navigating}
  <Spinner caption="Loading posts..." />
{:else}
  <PostList />
{/if}
