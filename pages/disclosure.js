import React from "react";
import Layout from "../components/layouts/layout";
function disclosure() {
  return (
    <Layout>
      <h1 className="title is-1 has-text-centered my-6">Disclosure</h1>
      <div className="content my-6 mx-4 px-6 subtitle is-5">
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
        <p className="has-text-centered my-6 subtitle is-4">We Respect Your Trust and Maintain Transparency.</p>
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
