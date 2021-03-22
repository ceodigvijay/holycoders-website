import React, { useEffect, useContext } from "react";
import Image from "next/image";
import { updateEnrolment } from "../../lib/index";
import { useRouter } from "next/router";
import UserContext from "../../contexts/globalContext";
import Link from "next/link";

export default function finalChapter({
  moveToNextLesson,
  lessonId,
  courseMeta,
  setCourseMeta,
  courseId,
  moveToModule,
  isCourseFinished,
}) {
  const { user } = useContext(UserContext);
  console.log("Is course Finished " + isCourseFinished);
  const router = useRouter();
  useEffect(() => {
    const updateEnrolmentToDb = async () => {
      try {
        const res = await updateEnrolment({
          courseId,
          finishDate: null,
          lessonId: lessonId,
          isCourseFinished: isCourseFinished,
        });
        //If Done then add the same to local meta
        if (res.data.ok && courseMeta) {
          const oldLessons =
            courseMeta && courseMeta.enrolment
              ? courseMeta.enrolment.lessons
              : [];
          var newLessons = [
            ...oldLessons,
            {
              lesson_id: lessonId,
              status: "completed",
              module_index: 0,
            },
          ];
          setCourseMeta({
            ...courseMeta,
            enrolment: { ...courseMeta.enrolment, lessons: newLessons },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    //TODO: Call only when the lesson is not in meta && user is logged in show warning if user is not logged in final
    if (user) {
      updateEnrolmentToDb();
    }
  }, [courseId]);

  // const getEnromnentUpdateData = () => {
  //   var isLessonCompleted = false;
  //   if (courseMeta && courseMeta.enrolment && courseMeta.enrolment.lessons) {
  //     courseMeta.enrolment.lessons.map((lesson) => {
  //       if (lesson.lesson_id === c && lesson.status === "completed") {
  //         isLessonCompleted = true;
  //       }
  //     });
  //   }
  //   return;
  // };
  return (
    <div className="flex flex-col justify-center">
      {/* Show warning Message if user not logged in */}
      {user ? (
        ""
      ) : (
        <div className="bg-red-500 flex items-center justify-center rounded-md my-4 font-bold text-lg px-10 py-4">
          <svg
            className="w-6 h-6 text-white mx-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-white mr-4 font-extrabold">
            Progress Not Saved.
          </span>
          <span className="text-yellow-100">
            <Link href="/enter">
              <a className="underline">Log in</a>
            </Link>{" "}
            to Save you progress and unlock other benefits.
          </span>
        </div>
      )}
      {/* End of warning Message */}

      <div className="text-center w-full my-10">
        <Image src="/final.jpg" width="250" height="250" />
        <div className="font-semibold text-4xl text-gray-600 my-4">
          Lesson Completed
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={moveToNextLesson}
          className="flex items-center justify-between px-20 py-4  text-xl bg-primary-400 text-white hover:bg-primary-500 rounded-full font-bold my-2"
        >
          <span>Next Lesson</span>
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
        </button>
        <button
          onClick={() => moveToModule("previous")}
          className="flex items-center justify-between px-20 py-4 hover:text-gray-600 rounded-full font-medium my-2"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}
