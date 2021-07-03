import React, { useState } from "react";
import CourseSidebar from "./sidebar/index";
import LessonSetting from "./lessonSetting";
import OptionSelect from "../../StarryEditor/options";
import {
  CloudUploadIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
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
  moveToModule,
  contentState,
  setContentState,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressData, setProgressData] = useState({
    lesson: false,
  });
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
                <div>
                  {totalContent ? currentContentIndex + 1 : 0}/{totalContent}
                </div>
                <div className="flex items-center justify-between flex-1 px-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => moveToModule("previous")}
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
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
                  <div
                    className="cursor-pointer"
                    onClick={() => moveToModule("next")}
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-48 mx-2">
                  <OptionSelect
                    contentState={contentState}
                    setContentState={setContentState}
                    currentBlockPosition={currentContentIndex}
                  />
                </div>
                <button
                  className="mx-4 cursor-pointer"
                  onClick={() => {
                    setProgressData({ ...progressData, lesson: true });
                    updateLesson();
                    setProgressData({ ...progressData, lesson: false });
                  }}
                >
                  <CloudUploadIcon className="w-6 h-6" />
                </button>

                <button onClick={() => setSidebarOpen(true)}>
                  <CogIcon className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
          <section className="px-6">{children}</section>
        </div>
      </div>
    </section>
  );
}
