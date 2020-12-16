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
          publishedAt={courseDetails.date}
          updatedAt={meta.date}
          author={courseDetails.author}
          url={"https://holycoders.com" + router.asPath}
        />
      ) : (
        ""
      )}

      <main className="mx-5 my-4">
        <div className="columns">
          <div className="column is-one-quarter panel">
            {/* <div className="py-6 has-text-centered">Score: 500</div> */}
            <SideNav chapters={chapters} />
            <img
              src="/content/images/dummy/laid3.png"
              alt="holycoders exclusive"
              width="280"
              height="250"
              className="course-left mt-6"
            />
          </div>
          <div className="column mx-2 panel px-6">
            {/* BreadCrub */}
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/learn/">
                    <a>Course</a>
                  </Link>
                </li>
                <li className="is-active is-capitalized">
                  <a href="#">{courseDetails.courseName}</a>
                </li>
              </ul>
            </nav>
            {/* BreakCrumb Ends */}
            <h1 className="title is-1 has-text-centered">
              {meta && meta.title ? meta.title : courseDetails.courseTitle}
            </h1>
            <div className="content">{children}</div>
            <nav
              className="columns pagination is-centered my-6"
              role="navigation"
              aria-label="pagination"
            >
              {/* If previous chapter then show navigation */}
              <div className="column has-text-left">
                {chapters[currentChapterIndex - 1] ? (
                  <Link href={chapters[currentChapterIndex - 1].link}>
                    <a className="pagination-previous button is-primary">
                      <span className="icon is-small">
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                      <span>{chapters[currentChapterIndex - 1].title}</span>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>

              {/* If next chapter then show navigation */}
              <div className="column has-text-right	">
                {chapters[currentChapterIndex + 1] ? (
                  <Link href={chapters[currentChapterIndex + 1].link}>
                    <a className="pagination-next button is-primary ">
                      <span>{chapters[currentChapterIndex + 1].title}</span>
                      <span className="icon is-small">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </nav>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
}
