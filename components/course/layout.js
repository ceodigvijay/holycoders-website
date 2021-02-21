import React, { useState } from "react";
import CourseSidebar from "./sidebar";
import LessonSetting from "./lessonSetting";
export default function newCourse({
  isCourseInfoPage = false,
  course,
  setCourse,
  updateLesson,
  lesson,
  setLesson,
  children,
  currentContentIndex,
  totalContent,
  onAddContent,
  moveToModule,
}) {
  console.log(course);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section className="bg-gray-50 dark:bg-gray-700 font-nunito min-h-screen">
      <div className="w-full flex-wrap mx-auto grid grid-cols-9">
        <aside className="w-full col-span-2  text-xl leading-normal max-h-screen overflow-auto sticky top-0 left-0">
          <CourseSidebar course={course} setCourse={setCourse} />
        </aside>

        <div className="w-full flex min-h-screen col-span-7 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 lg:mt-0 text-gray-900 dark:text-gray-200 leading-normal">
          {isCourseInfoPage ? (
            ""
          ) : (
            <>
              <LessonSetting
                updateLesson={updateLesson}
                lesson={lesson}
                setLesson={setLesson}
                sidebarOpen={sidebarOpen}
                setSidebarClose={() => setSidebarOpen(!sidebarOpen)}
              />

              {/* Chapter Toolbar */}
              <div className="flex items-center align-middle px-3 py-3 bg-gray-50 sticky top-0">
                {/* Course Notes Paste icon */}

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

                  {/* Dropdown */}
                  <div className="relative group ml-5">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className=""
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        {/*Add New */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 bg-primary-600 text-white rounded-full"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`hidden group-hover:block origin-top-right absolute -right-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <span
                          onClick={() => onAddContent("markdown")}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Markdown
                        </span>
                        <span
                          onClick={() => onAddContent("code-ftb")}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Code FTB
                        </span>
                        <span
                          onClick={() => onAddContent("ftb")}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Fill in the blanks
                        </span>
                        <span
                          onClick={() => onAddContent("mcq")}
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Multiple Choice Question
                        </span>
                        <span
                          onClick={() => onAddContent("atf")}
                          className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Arrange the Following
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* DropDown Ends */}

                {/* Save to cloud icon */}
                <div
                  className="mr-8 cursor-pointer"
                  onClick={() => {
                    updateLesson();
                  }}
                >
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <div>
                  {/* Settings icon */}
                  <button onClick={() => setSidebarOpen(true)}>
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
