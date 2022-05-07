<script>
  import { page } from "$app/stores";
  export let data;
  const sidebarBtnClass = "w-1/4 sm:w-full text-center p-2 hover:bg-purple-500 ";
</script>

<svelte:head />

<div
  class="flex flex-row sm:flex-col items-center flex-grow h-full justify-start
  sm:justify-center text-2xl"
>
  <div class="gradient">[a]</div>

  <a class={sidebarBtnClass + " " + ($page.url.pathname === undefined ? "bg-purple-800" : "")} href="/"> Home </a>

  <div class={"hidden sm:flex w-full my-2 sm:w-5/6 justify-center flex-wrap " + " "}>
    <!-- If we have at least 2 tags, add option to remove filter -->
    {#if data.tags.length > 2}
      <a
        class="bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs
        rounded-sm cursor-pointer"
        href="/"
      >
        all
      </a>
    {/if}

    {#each data.tags as tag}
      <a
        class="bg-purple-800 text-white mx-1 my-1 px-1 py-0.5 text-xs
        rounded-sm cursor-pointer"
        href="/tag/{tag}"
      >
        {tag}
      </a>
    {/each}
  </div>
</div>

<style>
  .gradient {
    font-family: "Monoton";
    font-size: 5rem;
    margin: 3rem;
    border-radius: 100px;
    padding: 1rem;
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #9d50bb; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #805ad5, #9d50bb); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #6e48aa,
      #9d50bb
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
