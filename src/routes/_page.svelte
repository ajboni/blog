<script>
  // import Sidebar from "./_sidebar.svelte";
  import "../main.css";
  import "../markdown.css";
  import { navigating } from "$app/stores";
  import Sidebar from "./_sidebar.svelte";
  import Spinner from "./_spinner.svelte";
  export let data;
</script>

<div class="min-h-screen md:flex bg-gray-850">
  {#if $navigating}
    <Spinner caption="Loading posts..." />
  {:else}
    <div class="md:h-screen lg:top-0 lg:sticky flex-none w-full md:w-64 text-white ">
      <!-- sidebar -->
      <Sidebar {data} />
    </div>

    <!-- non-sidebar -->
    <main class="flex-1 bg-gray-900 sm:p-0 md:p-8 lg:p-8">
      <!-- <slot {data} /> -->
      <!-- <div class="slug"><slot /></div> -->
      <!-- <div class="tag"><slot /></div> -->
      <slot />
    </main>
  {/if}
</div>
