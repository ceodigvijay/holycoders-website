import React, { useEffect } from "react";
import Image from "next/image";
import { updateEnrolment } from "../../lib/index";
import { useRouter } from "next/router";

export default function finalChapter({
  courseMeta,
  setCourseMeta,
  courseId,
  moveToModule,
}) {
  const router = useRouter();
  useEffect(() => {
    const updateEnrolmentToDb = async () => {
      try {
        const res = await updateEnrolment({
          courseId,
          finishDate: null,
          lessonId: router.query.lesson,
        });
        //If Done then add the same to local meta
        if (res.data.ok && courseMeta) {
          var newLessons = [
            ...courseMeta.lessons,
            {
              lesson_id: router.query.lesson,
              status: "completed",
              module_index: 0,
            },
          ];
          setCourseMeta({ ...courseMeta, lessons: newLessons });
        }
      } catch (error) {
        console.log(error);
      }
    };
    //TODO: Call only when the lesson is not in meta
    updateEnrolmentToDb();
  }, [courseId]);
  return (
    <div className="flex flex-col justify-center">
      <div className="text-center w-full my-10">
        <Image src="/final.jpg" width="250" height="250" />
        <div className="font-semibold text-4xl text-gray-600 my-4">
          Lesson Completed
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="flex items-center justify-between px-20 py-4  text-xl bg-primary-400 text-white hover:bg-primary-500 rounded-full font-bold my-2">
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
