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
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            <div className="sm:w-1/2 mb-10 px-4">
              <div className="rounded-lg h-64 overflow-hidden">
                <Image
                  className="object-cover object-center h-full w-full"
                  src="/content/images/course/websecurity/featured.png"
                  width="1200px"
                  height="500px"
                  alt="Website hacking and prevention"
                />
              </div>
              <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
                {" "}
                Website Hacking and Preventions - Security Best Practices
              </h2>
              <p className="leading-relaxed text-base">
                Learn about website hacking and protect it as a developer. This
                course will help you to understand how websites work, how they
                are hacked and how to protect them if you were it's developer.
              </p>
              <button>
                <Link href="/learn/website-hacking-and-security/">
                  <a className="flex mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded">
                    View Course
                  </a>
                </Link>
              </button>
            </div>

            <div className="sm:w-1/2 mb-10 px-4">
              <div className="rounded-lg h-64 overflow-hidden">
                <Image
                  className="object-cover object-center h-full w-full"
                  src="/content/images/course/websecurity/featured.png"
                  width="1200px"
                  height="500px"
                  alt="Website hacking and prevention"
                />
              </div>
              <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
                Python - Beginner to Advanced, Learn with Examples Course
              </h2>
              <p className="leading-relaxed text-base">
                Learn Python in easy way. The course is beginners friendly with
                easy to understand examples and tutorials and takes you to
                advance topics in step by step learning process.
              </p>
              <button>
                <Link href="/learn/python/">
                  <a className="flex mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-green-600 rounded">
                    View Course
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
