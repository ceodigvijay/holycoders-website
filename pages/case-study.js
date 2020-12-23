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
      const res = await getAllPosts({}, nextPage, 6, "case-study");
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
        slug="case-study"
        title="Case Study - Detailed and interesting reports on HolyCoders"
        description="Detailed case studies related to different technology, tools and frameworks to help you take better decision."
      />
      <div className="blog-header columns my-6 mx-4 panel is-flex-tablet has-text-centered-mobile">
        <div className="column is-three-quarters ">
          <h1 className="has-text-weight-medium	is-size-4 has-text-black  ">
            Case Study
          </h1>
          <p className="my-4">
            Welcome to the Case Study collection page. Here you can find
            detailed case studies related to different technology, tools and
            frameworks to help you take better decision.
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
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
    const res = await getAllPosts({}, 1, 6, "case-study");
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
