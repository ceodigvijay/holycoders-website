import Link from "next/link";
import React from "react";
import Layout from "../../components/layouts/layout";
import Image from "next/image";
import PageSEO from "../../components/seo/page";
import { getAllCourses } from "../../lib/index";

export default function index({ data }) {
  const { courses, meta } = data;
  console.log(data);
  return (
    <Layout>
      <PageSEO
        slug="learn"
        title="Learn By Courses - HolyCoders"
        description="Specially designed courses to learn new things easily. The courses contains chapters divided for learning complex things easily for both beginners and advanced programmers."
      />
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-6 mx-auto">
          <h2 className="text-4xl font-bold mx-4 my-12 text-gray-600">
            Explore Courses
          </h2>
          <div className="grid grid-cols-12 text-center">
            {courses.map((course) => {
              return (
                <>
                  <div className="col-span-12 md:col-span-2 lg:col-span-4 mb-10 px-4">
                    <div className="rounded-md overflow-hidden">
                      <Image
                        className="object-cover object-center h-full w-full"
                        src="/course.png"
                        width="640px"
                        height="360px"
                        alt="Website hacking and prevention"
                      />
                    </div>
                    <Link href={`/learn/${course.slug}`}>
                      <a className="title-font text-2xl font-bold text-gray-800 mt-6 mb-3 dark:text-gray-100">
                        Python - Beginner to Advanced, Learn with Examples
                        Course
                      </a>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let data;
  try {
    const res = await getAllCourses(1, 100);
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
