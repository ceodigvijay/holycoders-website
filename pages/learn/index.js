import Link from "next/link";
import React from "react";
import Layout from "../../components/layouts/layout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PageSEO from "../../components/seo/page";

export default function index() {
  return (
    <Layout>
      <PageSEO
        slug="learn"
        title="Learn By Courses - HolyCoders"
        description="Specially designed courses to learn new things easily. The courses contains chapters divided for learning complex things easily for both beginners and advanced programmers."
      />
      <div className="course-card columns is-vcentered">
        <div className="column  is-three-fifths px-5 py-6">
          <h1 className="title is-1 has-text-grey-dark">
            Website Hacking and Preventions - Security Best Practices.
          </h1>
          <Link href="/learn/website-hacking-and-security/">
            <a className="button is-primary is-large mx-2">
              <span className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              <span>Enroll for Free</span>
            </a>
          </Link>
          <button className="button is-large mx-2">Details</button>
        </div>
        <div className="column px-4 py-2">
          <Image
            src="/content/images/course/websecurity/featured.svg"
            width="400px"
            height="600px"
            alt="Website hacking and prevention"
          />
        </div>
      </div>
      <style jsx>{`
        .course-card {
          background-color: #f6f6f6;
          height: 80vh;
        }
      `}</style>
    </Layout>
  );
}
