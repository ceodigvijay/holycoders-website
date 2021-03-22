import React from "react";
import Layout from "../components/layouts/global/index";
import FeaturedNav from "../components/index/featuredNav";
import { getAllPosts } from "../lib/index";
import PostCollectionPage from "../components/collection/posts/postCollection";
import { useRouter } from "next/router";
import PageSEO from "../components/seo/page";
function Home({ data }) {
  const router = useRouter();
  const goToBlog = () => {
    router.push("/blog/");
  };
  return (
    <Layout home>
      <PageSEO
        title="HolyCoders - Programming Tutorials, News and Case Studies"
        description="Holycoders is a programming blog dedicated to simplify learning for coders. You can learn and share your knowledge with the community."
      />

      <section className="featured-column py-6">
        <h2 className="text-center font-semibold text-4xl text-gray-600">
          Explore Topics
        </h2>
        <FeaturedNav />
      </section>
      <section>
        <h2 className="text-center font-semibold text-4xl text-gray-600">
          Latest from blog
        </h2>
        <PostCollectionPage
          bookmarks={data.bookmarks}
          posts={data.posts}
          showPagination={false}
          loadMorePosts={goToBlog}
        />
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
