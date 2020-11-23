import React, { useState } from "react";
import Layout from "../../components/layouts/layout";
import { getAllPosts } from "../../lib/index";
import PostCollectionPage from "../../components/collection/posts/collectionPage";
import PageSEO from "../../components/seo/page";
import Image from "next/image";
const Blog = ({ data }) => {
  const [page, setPage] = useState(2);
  const [allPosts, setAllPosts] = useState(data.posts ? data.posts : null);
  /*
  Format of data is
  data{
    posts: [arrayOfPosts],
    meta: [],
    bookmarks: [userbookmarksObject || empty when not logged in ],
  }
  */
  const loadMorePosts = async () => {
    const res = await getAllPosts({}, page, 6);
    const { posts, meta } = res.data;
    setPage(meta.currentPage + 1);
    setAllPosts([...allPosts, ...posts]);
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
          />{" "}
        </div>
      </div>
      {allPosts &&
        allPosts.map((post) => {
          return <li>{post.title}</li>;
        })}
      <button onClick={loadMorePosts} className="button is-info">
        Load More
      </button>
      {/* <PostCollectionPage data={data} /> */}
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
    revalidate: 600,
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
