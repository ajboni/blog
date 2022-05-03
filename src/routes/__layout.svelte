<script context="module">
  import { posts, tags, pageInfo, tagFilter } from "../store.js";
  import Spinner from "./_spinner.svelte";

  function filterByTag(arr, tag) {
    if (!tag || tag === "") {
      return arr;
    }
    arr = arr.filter((a) => a.data.tags.includes(tag));
    return arr;
  }

  export async function load({ url, fetch, params }) {
    const { hostname, pathname, searchParams } = url;
    const res = await fetch("/data.json");
    const json = await res.json();
    const tag = searchParams.get("tag");
    const processedPosts = filterByTag(json.contents, tag);
    posts.set(processedPosts);
    tags.set(json.tags);
    tagFilter.set(tag);
    pageInfo.set({ hostname, pathname, params, searchParams });
    return res;
  }
</script>

<script>
  import Sidebar from "./_sidebar.svelte";
  import "../main.css";
  import "../markdown.css";
  import { navigating } from "$app/stores";
</script>

<div class="min-h-screen md:flex bg-gray-850">
  {#if $navigating}
    <Spinner caption="Loading posts..." />
  {:else}
    <!-- intermediary wrapper -->
    <div class="md:h-screen lg:top-0 lg:sticky flex-none w-full md:w-64 text-white ">
      <!-- sidebar -->
      <Sidebar />
    </div>

    <!-- non-sidebar -->
    <main class="flex-1 bg-gray-900 sm:p-0 md:p-8 lg:p-8">
      <slot />
    </main>
  {/if}
</div>
