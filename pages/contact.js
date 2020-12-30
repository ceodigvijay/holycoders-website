import React from "react";
import Layout from "../components/layouts/layout";
import PageSEO from "../components/seo/page";

export default function contact() {
  return (
    <Layout>
      <PageSEO
        slug="contact"
        title="Contact Us - HolyCoders"
        description="You can use this contact form to contact us. We will love to hear from you."
      />
      <div className="text-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeePeTZXnq5I7SZz85dkemZnU8DOB3T6pCiyoI247RFTcE6oA/viewform?embedded=true"
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
