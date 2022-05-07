export function getPostDate(post) {
  if (!post) return null;
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

export function getDefaultAuthor() {
  const defaultAuthor = {
    name: "ajboni",
    links: [
      {
        url: "https://github.com/ajboni/",
        icon: "fab fa-github",
      },
      {
        url: "https://aboni.dev/",
        icon: "fab fa-mozilla",
      },
    ],
  };
  return defaultAuthor;
}
