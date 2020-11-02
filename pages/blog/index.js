import React from "react";
import Layout from "../../components/layouts/layout";
import { getAllPosts } from "../../lib/index";
import PostCollectionPage from "../../components/collection/posts/collectionPage";
import Head from "next/head";

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
    <Layout>
      <Head>
        <title>Blog - HolyCoders</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/`}
        />
      </Head>
      <h1 className="has-text-centered title is-4">Blog</h1>
      <PostCollectionPage data={data} />
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
  };
}

// export async function getServerSideProps(ctx) {
//   let data;
//   console.log(ctx.req.headers);
//   try {
//     const res = await getAllPosts(ctx.req.headers, ctx.query.page, 6);
//     data = await res.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Blog;
