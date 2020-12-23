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
      const res = await getAllPosts({}, nextPage, 6, "news");
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
        slug="news"
        title="Coders News - Get Latest Programming News on HolyCoders"
        description="Holycoders news is the source to get latest news related to programming."
      />
      <div className="blog-header columns my-6 mx-4 panel is-flex-tablet has-text-centered-mobile">
        <div className="column is-three-quarters ">
          <h1 className="has-text-weight-medium	is-size-4 has-text-black  ">
            Latest News
          </h1>
          <p className="my-4">
            Welcome to the News page. Here, you can navigate through all our
            news sorted in chronological order. We try to deliver the news as
            soon as possible, you can also contribute through the dashboard.
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
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
    const res = await getAllPosts({}, 1, 6, "news");
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
