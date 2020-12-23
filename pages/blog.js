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
      <div className="blog-header columns my-6 mx-4 panel is-flex-tablet has-text-centered-mobile">
        <div className="column is-three-quarters ">
          <h1 className="has-text-weight-medium	is-size-4 has-text-black  ">
            Latest Articles
          </h1>
          <p className="my-4">
            Welcome to the Blog page. Here, you can navigate through all our
            articles sorted in chronological order. The collection contains
            articles of all the categories.
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
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
        .blog__featured-img{
          border-radius: 50%;
        }
        `}</style>
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  let data;
  try {
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
