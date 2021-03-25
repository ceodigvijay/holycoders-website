import React, { useState } from "react";
import CourseSidebar from "./sidebar";
import CourseMobileSidebar from "./mobileSidebar";
import Link from "next/link";

export default function newCourse({
  isCourseInfoPage = false,
  courseMeta,
  course,
  children,
  currentContentIndex,
  totalContent,
  moveToModule,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <section className="bg-gray-50 dark:bg-gray-700 font-nunito min-h-screen">
      <div className="w-full flex-wrap mx-auto grid grid-cols-9">
        <aside className="w-full hidden md:block col-span-2 text-xl leading-normal max-h-screen overflow-auto sticky top-0 left-0">
          <CourseSidebar courseMeta={courseMeta} course={course} />
        </aside>
        {mobileSidebarOpen ? (
          <aside className="w-full md:hidden col-span-9 text-xl leading-normal max-h-screen overflow-auto sticky top-0 left-0">
            <CourseMobileSidebar
              courseMeta={courseMeta}
              course={course}
              closeMobileSidebar={() => setMobileSidebarOpen(false)}
            />
          </aside>
        ) : (
          ""
        )}

        <div className="w-full flex min-h-screen col-span-9 md:col-span-7 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 lg:mt-0 text-gray-900 dark:text-gray-200 leading-normal">
          {isCourseInfoPage || currentContentIndex >= totalContent ? (
            <nav className="md:hidden flex items-center justify-between p-4">
              <Link href="/learn">
                <a className="flex items-center">
                  {/* Chevron left */}
                  <svg
                    className="w-6 h-6 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
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
                  <span>Back</span>
                </a>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="sticky top-0 flex items-center"
              >
                <span>Contents</span>
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </nav>
          ) : (
            <>
              {/* Chapter Toolbar */}
              <div className="flex items-center align-middle px-3 py-3 bg-gray-50 sticky top-0">
                <button
                  className="md:hidden"
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div>
                  {totalContent ? currentContentIndex + 1 : 0}/{totalContent}
                </div>

                <div className="flex items-center justify-between flex-1 px-10">
                  {/* Chevron Left */}

                  <div
                    className="cursor-pointer"
                    onClick={() => moveToModule("previous")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
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
                  </div>
                  {/* Progress Bar */}
                  <div className="flex-1 px-2">
                    <div className="w-full bg-gray-200 rounded-full">
                      <div
                        className="text-xs bg-primary-400 leading-none text-center h-1 text-white rounded-full"
                        style={{
                          width: `${
                            (currentContentIndex / (totalContent - 1)) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* Chevron Right */}
                  <div
                    className="cursor-pointer"
                    onClick={() => moveToModule("next")}
                  >
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
                <Link href="/learn/">
                  <a>
                    {/* Close icon */}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </>
          )}

          <section className="px-6">{children}</section>
        </div>
      </div>
    </section>
  );
}
