import React, { useState, useEffect } from "react";
import CourseLayout from "./layout";
import Contents from "./content/index";
import { getLessonWithId } from "../../lib/index";
import { useRouter } from "next/router";
import Final from "./final";
export default function lesson({ courseMeta, setCourseMeta, course }) {
  const router = useRouter();
  const { lesson: lessonId } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLessonWithId(lessonId);
        console.log(res);
        setLesson(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [lessonId]);

  const [lesson, setLesson] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const moveToModule = (direction) => {
    if (direction === "next" && lesson.contents.length > currentContentIndex) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
    if (direction === "previous" && currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };
  if (!lesson) {
    return "Loading";
  } else {
    return (
      <CourseLayout
        courseMeta={courseMeta}
        isCourseInfoPage={lessonId ? false : true}
        course={course}
        currentContentIndex={currentContentIndex}
        totalContent={lesson.contents.length}
        moveToModule={moveToModule}
      >
        {lesson.contents.length &&
        currentContentIndex >= lesson.contents.length ? (
          <Final
            courseMeta={courseMeta}
            setCourseMeta={setCourseMeta}
            courseId={course._id}
            moveToModule={moveToModule}
          />
        ) : (
          ""
        )}
        {lesson.contents.length ? (
          lesson.contents.map((content, index) => {
            if (index === currentContentIndex) {
              return (
                <Contents
                  content={content}
                  setContent={(field, value) => {
                    const newLesson = { ...lesson };
                    //Update appropriate content field TODO: validate field as they must be typo-proof
                    newLesson.contents[index][field] = value;
                    setLesson(newLesson);
                  }}
                />
              );
            }
            return "";
          })
        ) : (
          <div className="mt-10 text-center">
            <div className="text-4xl font-semibold">
              Author Forgot to add content.
            </div>
          </div>
        )}
      </CourseLayout>
    );
  }
}
