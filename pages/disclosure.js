import React from "react";
import Layout from "../components/layouts/global/index";
import PageSEO from "../components/seo/page";

function disclosure() {
  return (
    <Layout>
      <PageSEO
        slug="disclosure"
        title="Disclosure - HolyCoders"
        description="We promote some sponsored content on this website which we think may
        be useful for our readers and help them in learning new things in a
        better way. We may receive some commission on that."
      />
      <h1 className="md:px-2 title-font text-center text-gray-800 dark:text-gray-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 py-4">
        Disclosure
      </h1>
      <div className="prose dark:prose-dark md:prose-lg lg:prose-xl mx-auto my-6 px-2">
        <p>
          We promote some sponsored content on this website which we think may
          be useful for our readers and help them in learning new things in a
          better way. We may receive some commission on that.
        </p>

        <p>
          The website also contains some affiliate links to the products that
          are manually reviewed by us and are worth to be shared. We also get
          some commission when users use their services/products.
        </p>
        <p>
          We are disclosing this information because we want you to be informed
          with all the necessary information about this site.
        </p>
        <p className="has-text-centered my-6 subtitle is-4">
          We Respect Your Trust and Maintain Transparency.
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
