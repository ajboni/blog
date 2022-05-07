<script context="module">
  export async function load({ url, fetch, params }) {
    const { hostname, pathname } = url;
    const res = await fetch("/data.json");
    const json = await res.json();
    return {
      props: {
        data: json,
      },
    };
  }
</script>

<script>
  import { navigating } from "$app/stores";
  import PostList from "./_postList.svelte";
  import Spinner from "./_spinner.svelte";
  export let data;
</script>

{#if $navigating}
  <Spinner caption="Loading posts..." />
{:else}
  <PostList {data} />
{/if}
