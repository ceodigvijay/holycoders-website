import React from "react";
import Layout from "../components/layouts/global/index";
import PageSEO from "../components/seo/page";

function credits() {
  return (
    <Layout>
      <PageSEO
        slug="credits"
        title="Credits - HolyCoders"
        description="Here are some of the most amazing services and features which powers holycoders."
      />
      <h1 className="md:px-2 title-font text-center text-gray-800 dark:text-gray-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 py-4">
        Credits
      </h1>
      <div className="prose dark:prose-dark md:prose-lg lg:prose-xl mx-auto my-6 px-2">
        <p>
          We use{" "}
          <a href="https://freepik.com/" rel="noreffere noopener">
            Freepik
          </a>{" "}
          <a href="https://undraw.co/" rel="noreffere noopener">
            Undraw
          </a>{" "}
          assets on our website.
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

export default credits;
