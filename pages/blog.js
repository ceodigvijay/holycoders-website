import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/layout";
import { getAllPosts } from "../lib/index";
import PostCollectionPage from "../components/collection/posts/postCollection";
import PageSEO from "../components/seo/page";
import Image from "next/image";

const Blog = ({ data }) => {
  const [nextPage, setNextPage] = useState(2);
  const [position, setPosition] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(
    data && data.bookmarks ? data.bookmarks : []
  );
  const [allPosts, setAllPosts] = useState(
    data && data.posts ? data.posts : []
  );

  /*
  Format of data is
  data{
    posts: [arrayOfPosts],
    meta: [],
    bookmarks: [userbookmarksObject || empty when not logged in ],
  }
  */
  useEffect(() => {
    window.scrollTo(0, position);
  });
  const loadMorePosts = async () => {
    setIsLoading(true);
    if (typeof window !== undefined) {
      setPosition(window.pageYOffset);
    }
    try {
      const res = await getAllPosts({}, nextPage, 6);
      const { posts, meta } = res.data;
      setNextPage(meta.currentPage + 1);
      setAllPosts([...allPosts, ...posts]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <Layout>
      <PageSEO
        slug="blog"
        title="Blog - Get Latest and Easy to Digest Programming Articles"
        description="Holycoders blog is collection of all the articles of all categories over the website."
      />
      <div className="blog-header columns my-6 mx-4 panel">
        <div className="column is-three-quarters">
          <h1 className="title is-2">Latest Articles</h1>
          <p className="subtitle is-5 my-4">
            Welcome to the Blog page. Here, you can navigate through all our
            articles sorted in chronological order. The collection contains
            articles of all the categories.
          </p>
        </div>
        <div className="column">
          <Image
            src="/content/images/dummy/blog.svg"
            width="400px"
            height="200px"
          />
        </div>
      </div>
      {allPosts && (
        <PostCollectionPage bookmarks={bookmarks} posts={allPosts} />
      )}
      <div className="has-text-centered my-6">
        <button
          onClick={loadMorePosts}
          className={`button is-primary is-outlined ${
            isloading ? "is-loading" : ""
          }`}
        >
          Load More
        </button>
      </div>
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  let data;
  try {
    // console.log(data);
    const res = await getAllPosts({}, 1, 6);
    data = await res.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
export default Blog;
