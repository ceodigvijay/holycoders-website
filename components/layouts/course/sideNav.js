import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function sideNav({ chapters }) {
  const [courseData, setCourseData] = useState(null);
  const [open, setOpen] = useState(false);
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPath]);
  return (
    <>
      <div>
        <div className="block lg:hidden sticky inset-0">
          <button
            onClick={() => setOpen(!open)}
            id="menu-toggle"
            className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none"
          >
            <svg
              className="fill-current h-3 float-right"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`w-full sticky inset-0 ${
          open ? "px-4" : "hidden"
        }  h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20`}
      >
        <ul className="list-reset">
          {chapters.map((chapter) => {
            return (
              <li className="text-base my-3 text-gray-500 dark:text-gray-400">
                {/* Link contains the absolute path */}
                <Link href={chapter.link}>
                  <a
                    className={
                      router.asPath === chapter.link
                        ? "flex is-active text-black dark:text-white"
                        : "flex"
                    }
                  >
                    <span
                      className={`progress-icon mr-3  ${
                        courseData && courseData[chapter.slug]
                          ? "progress-done"
                          : ""
                      }`}
                    >
                      {courseData && courseData[chapter.slug] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </span>
                    <span>{chapter.title}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        a.is-active {
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
        li:not(:last-child) .progress-icon:after {
          content: "";
          position: absolute;
          top: 22px;
          left: 11px;
          width: 2px;
          height: 18px;
          background: #d2d2d2;
          z-index: 0;
        }
        li:not(:last-child) .progress-done:after {
          background: #36a666;
        }
      `}</style>
    </>
  );
}
