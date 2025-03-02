import React, { useState, useEffect } from "react";
import Layout from "../../../components/layouts/global/index";
import { getPostsByTagId } from "../../../lib/index";
import PageSEO from "../../../components/seo/page";
import PostCollectionPage from "../../../components/collection/posts/postCollection";
import Image from "next/image";

export default function index({ data, tagname }) {
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
      const res = await await getPostsByTagId(tagname, nextPage, 12);
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
        slug={`tag/${tagname}`}
        title={`${tagname} Tag - HolyCoders`}
        description={`Collection page for articles tagged with ${tagname} tag at HolyCoders blog.`}
      />
      <PostCollectionPage
        bookmarks={bookmarks}
        posts={allPosts}
        loadMorePosts={loadMorePosts}
        isloading={isLoading}
      />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const queryTag = context.params.tagname;

  let data = null;
  let error = null;
  try {
    // const res = await getUserByUsername(queryUser);
    const res = await getPostsByTagId(queryTag, 1, 12);
    data = res.data;
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      error = e.response.data.message;
    } else {
      error = "Some error Occured";
    }
  }
  return {
    props: {
      data: data,
      error: error,
      tagname: queryTag,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
