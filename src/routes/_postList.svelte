<script>
  import PostInfo from "./postInfo.svelte";
  export let data;
</script>

<div class="text-4xl py-4 sm:pt-4 sm:pb-8 text-center font-medium text-gray-100">Recent posts</div>

<ul>
  {#each data.posts as post}
    <li>
      <div
        class="bg-gray-850 flex flex-col mb-10 border-2 border-gray-700 rounded-md py-8 shadow-lg
  px-16 text-lg leading-relaxed "
      >
        <a class="text-3xl text-gray-300" rel="prefetch" href={`/${post.data.slug}`}>{post.data.title}</a>
        <PostInfo {post} />
        <div class="my-4 text-gray-400">
          {@html post.excerpt}
          <br />
          <div class="text-right text-purple-500 hover:text-purple-700">
            <a href={`/${post.data.slug}`}>Read more...</a>
            <i class="fa fa-chevron-circle-right" />
          </div>
        </div>
      </div>
    </li>
  {/each}
</ul>
