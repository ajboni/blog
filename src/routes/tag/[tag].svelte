<script context="module">
  export async function load({ url, fetch, params }) {
    const { hostname, pathname } = url;
    const res = await fetch("/data.json");
    const json = await res.json();
    const tag = params.tag;
    const filtered = json.posts.filter((post) => post.data.tags.includes(tag));
    return {
      props: {
        data: {
          posts: filtered,
        },
      },
    };
  }
</script>

<script>
  import PostList from "../_postList.svelte";
  import Spinner from "../_spinner.svelte";
  import { navigating } from "$app/stores";
  export let data;
</script>

{#if $navigating}
  <Spinner caption="Loading posts..." />
{:else}
  <PostList {data} />
{/if}
