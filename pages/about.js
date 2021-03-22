import Link from "next/link";
import React from "react";
import Layout from "../components/layouts/global/index";
import PageSEO from "../components/seo/page";
function disclosure() {
  return (
    <Layout>
      <PageSEO
        slug="about"
        title="About Us - HolyCoders"
        description="HolyCoders is a programming blog which helps coders to solve problems
        related to Programing. You can traverse the blog or categories/tags to
        select the best topics of your interest."
      />
      <h1 className="md:px-2 title-font text-center text-gray-800 dark:text-gray-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 py-4">
        About Us
      </h1>
      <div className="prose dark:prose-dark md:prose-lg lg:prose-xl mx-auto my-6 px-2">
        <p>
          HolyCoders is a programming blog which helps coders to solve problems
          related to Programing. You can traverse the blog or categories/tags to
          select the best topics of your interest.
        </p>

        <p>
          No matter you want to choose the best tools and resources from
          available options in programming or you want to get started in
          programming, just explore the blog and you can find interactive and
          beginners friendly articles.
        </p>
        <p>
          We are complete transparent with the information that we collect. The
          future is privacy friendly and we completely respect that thing. If
          you have any query or suggestion please reach to using our
          <Link href="/contact">
            <a> Contact </a>
          </Link>{" "}
          page. We will love to hear from you.
        </p>
      </div>
      <style jsx>{`
        .content {
          min-height: 50vh;
        }
      `}</style>
    </Layout>
  );
}

export default disclosure;
