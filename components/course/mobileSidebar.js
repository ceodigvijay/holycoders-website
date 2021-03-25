import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { deleteEnrolment } from "../../lib/index";
import GlobalContext from "../../contexts/globalContext";
export default function sidebar({ courseMeta, course, closeMobileSidebar }) {
  const router = useRouter();
  const { addNotification } = useContext(GlobalContext);
  const handleDeleteEnrolment = async () => {
    try {
      const confirmReset = confirm(
        "This can't be undone. Are you sure to Reset Your Progress"
      );
      if (confirmReset) {
        const response = await deleteEnrolment(course._id);
        addNotification({
          type: "success",
          message: "Successfuly reset the course progress. Refresh the page.",
        });
      }
    } catch (error) {
      addNotification({
        type: "error",
        message: "Some error in reset. Please try again later.",
      });
    }
  };
  console.log(courseMeta);
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

        <button className="flex items-center" onClick={closeMobileSidebar}>
          <span className="mx-2 text-base">Close</span>
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
                if (
                  courseMeta &&
                  courseMeta.enrolment &&
                  courseMeta.enrolment.lessons
                ) {
                  courseMeta.enrolment.lessons.map((lesson) => {
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
                        `${router.asPath.split("lesson")[0]}lesson/${
                          course.lessons[c].slug
                        }`,
                        undefined,
                        { shallow: true }
                      );
                      closeMobileSidebar();
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
                    {/* Lock Icon for locked contents */}
                    {/* <svg
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
                    </svg> */}
                  </button>
                );
              })}
            </div>
          );
        })}

        <div className="text-center text-gray-600">
          More Lessons in Progress
        </div>

        <div
          style={{ filter: "grayscale(1)", opacity: "0.4" }}
          className="text-center my-12"
        >
          <span className="font-bold text-xl text-gray-600">
            Certificate (Coming Soon)
          </span>
          <Image
            src="/content/images/course/certificate.jpg"
            width="300"
            height="200"
          />
        </div>
        <button
          onClick={handleDeleteEnrolment}
          className="text-center flex w-full items-center justify-center mt-12 text-red-600 py-2"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Reset Progress</span>
        </button>
      </div>
    </>
  );
}
