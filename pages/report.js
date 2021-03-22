import React from "react";
import Layout from "../components/layouts/global/index";
import PageSEO from "../components/seo/page";

export default function report() {
  return (
    <Layout>
      <PageSEO
        slug="report"
        title="Report Bugs - HolyCoders"
        description="You can use this page to report any bugs which can help us to improve HolyCoders."
      />
      <div className="text-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScSLKAaU8vNfSgSd_epbmnYooJ4twPFaIPHcVTANGv7eElS6Q/viewform?embedded=true"
          width="640"
          height="1000"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="mx-auto"
        >
          Loading…
        </iframe>
      </div>
    </Layout>
  );
}
