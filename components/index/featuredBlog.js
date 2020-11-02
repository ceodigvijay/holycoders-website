import React from "react";
import { getAllPosts } from "../../lib/index";
import PostCollectionPage from "../collection/posts/collectionPage";

const Blog = ({ data }) => {
  /*
  Format of data is
  data{
    posts: [arrayOfPosts],
    meta: [],
    bookmarks: [userbookmarksObject || empty when not logged in ],
  }
  */
  return (
      <PostCollectionPage data={data} />
  );
};


export default Blog;
