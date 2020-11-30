import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layouts/layout";
import { getUserPublishedPosts } from "../../../../lib/index";
import PostCollectionPage from "../../../../components/collection/posts/postCollection";

export default function index({ data, error, username }) {
  const [nextPage, setNextPage] = useState(2);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(
    data && data.bookmarks ? data.bookmarks : []
  );
  const [allPosts, setAllPosts] = useState(
    data && data.posts ? data.posts : []
  );
  useEffect(() => {
    window.scrollTo(0, position);
  });
  const loadMorePosts = async () => {
    setIsLoading(true);
    if (typeof window !== undefined) {
      setPosition(window.pageYOffset);
    }
    try {
      const res = await getUserPublishedPosts(username, nextPage, 12);
      console.log(res);
      const { posts, meta } = res.data;
      setNextPage(meta.currentPage + 1);
      console.log(posts);
      setAllPosts([...allPosts, ...posts]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Layout>
      <PostCollectionPage posts={allPosts} bookmarks={bookmarks} />
      <div className="has-text-centered my-6">
        <button
          onClick={loadMorePosts}
          className={`button is-primary is-outlined ${
            isLoading ? "is-loading" : ""
          }`}
        >
          Load More
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const queryUser = context.params.user;

  let data = null;
  let error = null;
  try {
    // const res = await getUserByUsername(queryUser);
    const res = await getUserPublishedPosts(queryUser, 1, 12);
    data = res.data;
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      error = e.response.data.message;
    } else {
      error = "Some error Occured";
    }
  }
  return { props: { data: data, error: error, username: queryUser } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
