import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../../components/layouts/global/index";
import Image from "next/image";
import PageSEO from "../../components/seo/page";
import { getAllCourses } from "../../lib/index";
import UserContext from "../../contexts/globalContext";

export default function index({ data }) {
  const { courses, meta } = data;
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <PageSEO
        slug="learn"
        title="Learn By Courses - HolyCoders"
        description="Specially designed courses to learn new things easily. The courses contains chapters divided for learning complex things easily for both beginners and advanced programmers."
      />
      <section className="text-gray-700 body-font">
        <div className="container px-2 md:px-6 py-6 mx-auto">
          {user ? (
            <div className="flex flex-col items-center py-12 justify-between my-6 text-white w-full rounded-md course-hero">
              <h2 className="text-4xl font-bold mx-4 my-6">
                My Enrolled Courses
              </h2>
              <Link href="/u/library/courses/">
                <a className="px-12 py-3 rounded-full border-2 bg-white hover:bg-gray-100 text-gray-700 flex items-center">
                  <span className="font-bold">View All</span>
                  <svg
                    className="w-6 h-6 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          ) : (
            ""
          )}

          {/* My Courses End */}
          <h2 className="text-4xl font-bold mx-4 my-12 text-gray-600">
            Explore All Courses
          </h2>
          <div className="grid grid-cols-12 text-center">
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="col-span-12 md:col-span-6 lg:col-span-4 mb-10 px-4"
                >
                  <div className="rounded-md overflow-hidden relative">
                    <Link href={`/learn/${course.slug}`}>
                      <a>
                        <Image
                          className="object-cover object-center h-full w-full"
                          src={
                            course.featured_image
                              ? course.featured_image
                              : "/course.png"
                          }
                          width="640px"
                          height="360px"
                          alt="Website hacking and prevention"
                        />
                      </a>
                    </Link>
                    {course.required_subscription === "premium" ? (
                      <span className="absolute px-2 py-1 rounded-md right-0 top-0 font-semibold bg-blue-600 border-2 border-white  text-white">
                        PRO
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <Link href={`/learn/${course.slug}`}>
                    <a className="title-font text-2xl font-bold text-gray-800 mt-6 mb-3 dark:text-gray-100">
                      {course.title}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(req, ctx) {
  let data;
  console.log(req);
  try {
    const res = await getAllCourses({
      page: 1,
      limit: 100,
      status: "published",
    });
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
