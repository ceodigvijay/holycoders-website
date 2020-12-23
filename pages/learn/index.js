import Link from "next/link";
import React from "react";
import Layout from "../../components/layouts/layout";
import Image from "next/image";
import PageSEO from "../../components/seo/page";

export default function index() {
  return (
    <Layout>
      <PageSEO
        slug="learn"
        title="Learn By Courses - HolyCoders"
        description="Specially designed courses to learn new things easily. The courses contains chapters divided for learning complex things easily for both beginners and advanced programmers."
      />
      <div className="columns my-4">
        {/* Website Hacking Course */}
        <div className="column is-half px-5 py-6">
          <div className="course-image">
            <Image
              className="course-image"
              src="/content/images/course/websecurity/featured.png"
              height="500"
              width="1200"
            />
          </div>
          <div className="card-content has-text-centered">
            <h2 className="has-text-weight-medium	is-size-4 my-4 has-text-dark	">
              Website Hacking and Preventions - Security Best Practices.
            </h2>
            <p className="my-4">
              Learn about website hacking and protect it as a developer. This
              course will help you to understand how websites work, how they are
              hacked and how to protect them if you were it's developer.
            </p>
            <Link href="/learn/website-hacking-and-security/">
              <a className="button is-primary my-4">
                <span>View Course</span>
              </a>
            </Link>
          </div>
        </div>
        {/* Python Course */}
        <div className="column is-half px-5 py-6">
          <div className="course-image">
            <Image
              className="course-image"
              src="/content/images/course/websecurity/featured.png"
              height="500"
              width="1200"
            />
          </div>
          <div className="card-content has-text-centered">
            <h2 className="has-text-weight-medium	is-size-4 my-4 has-text-dark	">
              Python - Beginner to Advanced, Learn with Examples Course
            </h2>
            <p className="my-4">
              Learn Python in easy way. The course is beginners friendly with
              easy to understand examples and tutorials and takes you to advance
              topics in step by step learning process.
            </p>
            <Link href="/learn/python/">
              <a className="button is-primary my-4">
                <span>View Course</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .course-image {
          border-radius: 0.5rem;
          overflow: hidden;
        }
      `}</style>
    </Layout>
  );
}
