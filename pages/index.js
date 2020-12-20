import React from "react";
import Layout from "../components/layouts/layout";
import FeaturedNav from "../components/index/featuredNav";
import { getAllPosts } from "../lib/index";
import PostCollectionPage from "../components/collection/posts/postCollection";
import Link from "next/link";
import PageSEO from "../components/seo/page";
function Home({ data }) {
  return (
    <Layout home>
      <PageSEO
        title="HolyCoders - Programming Tutorials, News and Case Studies"
        description="Holycoders is a programming blog dedicated to simplify learning for coders. You can learn and share your knowledge with the community."
      />
      <section className="featured-column">
        <h2 className="text-center font-semibold text-4xl text-gray-600">Explore Topics</h2>
        <FeaturedNav />
      </section>
      <section>
        <h2 className="text-center font-semibold text-2xl">Latest from blog</h2>
        <PostCollectionPage
          bookmarks={data.bookmarks}
          posts={data.posts}
          showPagination={false}
        />
        <div className="has-text-centered">
          <Link href="/blog">
            <a className="button is-primary">View More .</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let data;
  try {
    const res = await getAllPosts({}, 1, 4);
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

export default Home;
