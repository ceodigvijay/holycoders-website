import React, { useState } from "react";
import { addLesson, updateCourse, deleteLesson } from "../../lib/index";
import Link from "next/link";
import { useRouter } from "next/router";

export default function sidebar({ courseMeta, course }) {
  const router = useRouter();

  return (
    <>
      <div className="flex align-middle items-center justify-between sticky top-0 mx-auto bg-gray-50 text-gray-600 px-2 py-3">
        {/* Go Back Button */}
        <Link href="/learn">
          <a className="flex items-center">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="mx-2 text-base">Back</span>
          </a>
        </Link>

        <button
          className="flex items-center"
          onClick={() => {
            router.push(`${router.asPath.split("?lesson")[0]}`, undefined, {
              shallow: true,
            });
          }}
        >
          <span className="mx-2 text-base">Course Info</span>
          {/* Info icon */}
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div className="px-4">
        {course.sections.map((section, index) => {
          return (
            <div>
              <div className="text-center my-4 text-gray-400">
                <div className="flex items-center justify-center">
                  <span>{section.name}</span>
                </div>
              </div>
              {section.lessons.map((c, lessonIndex) => {
                //Check if lesson is completed
                var isLessonCompleted = false;
                if (courseMeta && courseMeta.lessons) {
                  courseMeta.lessons.map((lesson) => {
                    if (
                      lesson.lesson_id === c &&
                      lesson.status === "completed"
                    ) {
                      isLessonCompleted = true;
                      return;
                    }
                  });
                }
                return (
                  <button
                    className={`text-gray-600 py-1 hover:text-gray-900 flex justify-between items-center w-full`}
                    onClick={() => {
                      router.push(
                        `${router.asPath.split("?lesson")[0]}?lesson=${c}`,
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    <div className="flex items-center">
                      {/* Completed Icon Tick */}
                      {isLessonCompleted ? (
                        <svg
                          className="w-5 h-5 text-green-400 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
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
                          className="w-5 h-5 text-gray-200 mr-2"
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

                      <span>
                        {course.lessons && course.lessons[c]
                          ? course.lessons[c].title
                          : "Lesson Lost in Database :("}
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
