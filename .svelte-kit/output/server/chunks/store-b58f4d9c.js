import { n as noop, a as safe_not_equal } from "./index-eb6f75e0.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
let posts = writable([]);
let tags = writable([]);
let tagFilter = writable({});
let pageInfo = writable({});
let init = writable(false);
function getPostDate(post) {
  if (!post)
    return null;
  if (post.data.date_updated) {
    return post.data.date_updated;
  } else if (post.data.date_published) {
    return post.data.date_published;
  } else if (post.data.date) {
    return post.data.date;
  } else {
    return null;
  }
}
function getDefaultAuthor() {
  const defaultAuthor = {
    name: "ajboni",
    links: [
      {
        url: "https://github.com/ajboni/",
        icon: "fab fa-github"
      },
      {
        url: "https://aboni.dev/",
        icon: "fab fa-mozilla"
      }
    ]
  };
  return defaultAuthor;
}
export { tagFilter as a, pageInfo as b, getDefaultAuthor as c, getPostDate as g, init as i, posts as p, tags as t };
