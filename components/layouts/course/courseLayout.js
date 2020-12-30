import React, { useEffect } from "react";
import Link from "next/link";
import SideNav from "./sideNav";
import { useRouter } from "next/router";
import GlobalLayout from "../layout";
import Seo from "../../seo/course/chapters";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Layout({ children, meta, allChapters, courseDetails }) {
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const courseName = currentPath.split("/").slice(2)[0];
        const moduleName = currentPath.split("/").slice(2)[1];
        var courseObject = {};
        if (localStorage.getItem("hc_courses")) {
          courseObject = JSON.parse(localStorage.getItem("hc_courses"));
        }
        if (!courseObject[courseName]) {
          courseObject[courseName] = {};
        }
        courseObject[courseName][moduleName] = { completed: true };
        localStorage.setItem("hc_courses", JSON.stringify(courseObject));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPath]);
  let chapters = [];
  allChapters.forEach((post) => {
    if (post.module.meta.sequence) {
      const link =
        "/learn/" +
        courseDetails.courseName +
        "/" +
        post.link.substr(1).replace(".mdx", "") +
        "/";

      chapters[post.module.meta.sequence] = {
        link: link,
        slug: post.link.substr(1).replace(".mdx", ""),
        title: post.module.meta.title,
      };
    }
  });

  chapters = chapters.filter(Boolean);
  const currentChapterIndex = chapters.findIndex(
    (x) => x.link === router.asPath
  );
  return (
    <GlobalLayout>
      {meta && meta.title ? (
        <Seo
          title={meta.title}
          metaTitle={meta.metaTitle}
          metaDescription={meta.description}
          publishedAt={courseDetails.dateCreated}
          updatedAt={meta.date}
          author={courseDetails.author}
          url={"https://holycoders.com" + router.asPath}
        />
      ) : (
        ""
      )}

      <section className="px-4 py-6 bg-gray-100 dark:bg-gray-700">
        <div className="container w-full flex flex-wrap mx-auto">
          <aside className="w-full lg:w-1/4 lg:px-6 text-xl leading-normal">
            <SideNav chapters={chapters} />
          </aside>

          <div className="w-full flex flex-col lg:w-3/4 p-8 mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg lg:mt-0 text-gray-900 dark:text-gray-200 leading-normal">
            <div>
              {/* BreadCrub */}
              <nav aria-label="breadcrumbs">
                <ul className="flex">
                  <li className="mx-2">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link href="/learn/">
                      <a>Course</a>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <a href="#">{courseDetails.courseName}</a>
                  </li>
                </ul>
              </nav>
              {/* BreakCrumb Ends */}
              <h1 className="md:px-2 title-font text-gray-800 dark:text-gray-100 text-2xl md:text-3xl lg:text-4xl font-bold mb-6 mt-2">
                {meta && meta.title ? meta.title : courseDetails.courseTitle}
              </h1>
            </div>
            <div className="lg:col-span-3 prose dark:prose-dark md:prose-lg lg:prose-xl max-w-none flex-grow">
              {children}
            </div>
            <nav
              className="bottom-0 flex my-2"
              role="navigation"
              aria-label="pagination"
            >
              {/* If previous chapter then show navigation */}
              <div className="m-auto text-gray-400">
                {chapters[currentChapterIndex - 1] ? (
                  <Link href={chapters[currentChapterIndex - 1].link}>
                    <a className="flex items-center rounded-lg text-center	text-xl sm:text-lg px-4 py-2 hover:bg-primary-100  dark:hover:bg-primary-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>{chapters[currentChapterIndex - 1].title}</span>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>

              {/* If next chapter then show navigation */}
              <div className="m-auto text-gray-800 dark:text-gray-100">
                {chapters[currentChapterIndex + 1] ? (
                  <Link href={chapters[currentChapterIndex + 1].link}>
                    <a className="flex items-center rounded-lg text-center	text-xl sm:text-lg px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-600">
                      <span>{chapters[currentChapterIndex + 1].title}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </nav>
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
