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
      const res = await getAllPosts({}, nextPage, 6, "snippets");
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
        slug="snippets"
        title="Code Snippets - Easy to use code snippets on HolyCoders"
        description="Code samples, themes and many other ready to use code. Save your time from rebuilding the wheel and innovate new things."
      />
      <div className="blog-header columns my-6 mx-4 panel is-flex-tablet has-text-centered-mobile">
        <div className="column is-three-quarters ">
          <h1 className="has-text-weight-medium	is-size-4 has-text-black  ">
            Code Snippets
          </h1>
          <p className="my-4">
            Welcome to the Code snippets page. Here you can find code samples,
            themes and many other ready to use code. Save your time from
            rebuilding the wheel and innovate new things.
          </p>
        </div>
        <div className="column">
          <figure className="image is-128x128 px-5 py-5 blog__featured-img has-background-success-light has-text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </figure>
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
      <style jsx>{`
        .blog__featured-img {
          border-radius: 50%;
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  let data;
  try {
    const res = await getAllPosts({}, 1, 6, "snippets");
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
