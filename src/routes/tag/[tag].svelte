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
  export let data;
</script>

<PostList {data} />
