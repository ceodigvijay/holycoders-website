import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layouts/layout";
import FeaturedNav from "../components/index/featuredNav";
import UserContext from "../contexts/globalContext";
import { getAllPosts } from "../lib/index";
import PostCollectionPage from "../components/collection/posts/postCollection";
import Link from "next/link";
import PageSEO from "../components/seo/page";
function Home({ data }) {
  const { user, setUser, notification, setNotificationValue } = useContext(
    UserContext
  );
  console.log(notification, setNotificationValue);
  // useEffect(() => {
  //   if (
  //     !user &&
  //     typeof window !== "undefined" &&
  //     localStorage.getItem("hc_user")
  //   ) {
  //     console.log("Setting user from local storage");
  //     setUser(JSON.parse(localStorage.getItem("hc_user")));
  //   }
  // });

  return (
    <Layout home>
      <PageSEO
        title="HolyCoders - Programming Tutorials, News and Case Studies"
        description="Holycoders is a programming blog dedicated to simplify learning for coders. You can learn and share your knowledge with the community."
      />
      <section className="featured-column py-6">
        {/* <form
          action="http://127.0.0.1:3000/api/image"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="file" name="avatar" />
          <input type="submit" value="submit" />
        </form> */}
        <h2 className="has-text-centered is-3 title">Explore Topics</h2>
        <FeaturedNav />
      </section>
      <section>
        <h2 className="has-text-centered is-3 title">Latest from blog</h2>
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
      {/* <section>
        <AuthBenefit />
      </section>
      <section>
        <p>News</p>
      </section> */}
      {/* <section>
        <p>Best Programming Tools</p>
      </section> */}
      <style jsx>{``}</style>
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
