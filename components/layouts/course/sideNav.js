import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function sideNav({ chapters }) {
  const [courseData, setCourseData] = useState(null);
  const router = useRouter();
  const currentPath = router.asPath;
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const courseName = currentPath.split("/").slice(2)[0];
        var courseObject = {};
        if (localStorage.getItem("hc_courses")) {
          courseObject = JSON.parse(localStorage.getItem("hc_courses"));
        }
        if (courseObject[courseName]) {
          setCourseData(courseObject[courseName]);
          console.log(courseObject[courseName]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPath]);
  return (
    <aside className="menu px-4">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        {chapters.map((chapter) => {
          return (
            <li>
              {/* Link contains the absolute path */}
              <Link href={chapter.link}>
                <a
                  className={router.asPath === chapter.link ? "is-active" : ""}
                >
                  <span
                    className={`progress-icon mr-3  ${
                      courseData && courseData[chapter.slug]
                        ? "progress-done"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  <span>{chapter.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        a.is-active {
          color: #fff  !important;
          border-radius: 5px;
        }
        .progress-icon {
          color: #d2d2d2;
          font-size: 22px;
          position: relative;
        }
        .progress-done {
          color: #36a666;
        }
        li:not(:last-child) .progress-icon:after{
          content: "";
          position: absolute;
          top: 22px;
          left: 10px;
          width: 2px;
          height: 100%;
          background: #d2d2d2;
          z-index: 0;
        }
        li:not(:last-child) .progress-done:after {
          background: #36a666;
        }
      `}</style>
    </aside>
  );
}
