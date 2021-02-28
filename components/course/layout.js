import React from "react";
import CourseSidebar from "./sidebar";
export default function newCourse({
  isCourseInfoPage = false,
  courseMeta,
  course,
  children,
  currentContentIndex,
  totalContent,
  moveToModule,
}) {
  console.log(courseMeta);
  return (
    <section className="bg-gray-50 dark:bg-gray-700 font-nunito min-h-screen">
      <div className="w-full flex-wrap mx-auto grid grid-cols-9">
        <aside className="w-full col-span-2  text-xl leading-normal max-h-screen overflow-auto sticky top-0 left-0">
          <CourseSidebar courseMeta={courseMeta} course={course} />
        </aside>

        <div className="w-full flex min-h-screen col-span-7 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 lg:mt-0 text-gray-900 dark:text-gray-200 leading-normal">
          {isCourseInfoPage || currentContentIndex >= totalContent ? (
            ""
          ) : (
            <>
              {/* Chapter Toolbar */}
              <div className="flex items-center align-middle px-3 py-3 bg-gray-50 sticky top-0">
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

                <div>
                  {/* Settings icon */}
                  <button>
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}

          <section className="px-6">{children}</section>
        </div>
      </div>
    </section>
  );
}
