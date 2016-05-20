export let route = {
  page: './Site',
  route: {
    index: {
      page: './content/overview.md',
      split: true,
    },
    tutorial: {
      page: './content/tutorial.md',
      split: true,
    },
    docs: {
      page: './content/docs.md',
      split: true,
    },
    community: {
      page: './content/community.md',
      split: true,
    },
    blog: {
      page: './content/blog',
      collection: './content/posts/*',
    },
  }
};
