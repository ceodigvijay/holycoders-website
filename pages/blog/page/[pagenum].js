import React from "react";
import Layout from "../../../components/layouts/layout";
import { getAllPosts } from "../../../lib/index";
import PostCollectionPage from "../../../components/collection/posts/collectionPage";

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
      <PostCollectionPage data={data} />
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  let data;
  try {
    const res = await getAllPosts({}, ctx.params.pagenum, 6);
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

export const getStaticPaths = async () => {
  const res = await getAllPosts({}, 1, 6);
  var paths = [];
  for (var i = 1; i <= res.data.meta.pageCount; i++) {
    paths.push({ params: { pagenum: `${i}` } });
  }
  return {
    fallback: false,
    paths: paths,
  };
};

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
