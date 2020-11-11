import React from "react";
import Link from "next/link";
import SideNav from "./sideNav";
import { useRouter } from "next/router";
import GlobalLayout from "../layout";
import Seo from "../../seo/course/chapters";
export default function Layout({ children, meta, allChapters, courseDetails }) {
  const router = useRouter();

  console.log("-----------------Course Meta Details--------------------");
  let chapters = [];
  allChapters.forEach((post) => {
    if (post.module.meta.sequence) {
      const link =
        "/course/" +
        courseDetails.courseName +
        "/" +
        post.link.substr(1).replace(".mdx", "") +
        "/";

      chapters[post.module.meta.sequence] = {
        link: link,
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
          url={process.env.NEXT_PUBLIC_FRONTEND_URL + router.asPath}
        />
      ) : (
        ""
      )}

      <main className="mx-5 my-4">
        <div className="columns">
          <div className="column is-one-quarter panel">
            {/* <div className="py-6 has-text-centered">Score: 500</div> */}
            <SideNav chapters={chapters} />
          </div>
          <div className="column mx-4 panel">
            {/* BreadCrub */}
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/course/">
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
                    <a className="pagination-previous">
                      {chapters[currentChapterIndex - 1].title}
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
                    <a className="pagination-next">
                      {chapters[currentChapterIndex + 1].title}
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
