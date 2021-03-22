import React, { useState, useEffect } from "react";
import CourseLayout from "./layout";
import Contents from "./content/index";
import { getLessonWithSlug } from "../../lib/index";
import { useRouter } from "next/router";
import Final from "./final";
export default function lesson({ courseMeta, setCourseMeta, course }) {
  const router = useRouter();
  const { lesson: lessonSlug } = router.query;
  const [lesson, setLesson] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLessonWithSlug(lessonSlug);
        setLesson(res.data);
        setCurrentContentIndex(0);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [lessonSlug]);

  const moveToNextLesson = () => {
    //Creating list of all lessons
    var allLessons = [];
    course.sections.forEach((section) => {
      allLessons = [...allLessons, ...section.lessons];
    });

    const currentLessonIndex = allLessons.indexOf(lesson._id);
    if (
      currentLessonIndex != -1 &&
      currentLessonIndex + 1 < allLessons.length
    ) {
      const nextLessonData = course.lessons[allLessons[currentLessonIndex + 1]];
      const newSlug = nextLessonData ? nextLessonData.slug : "";
      if (newSlug) {
        router.push(
          `${router.asPath.split("lesson")[0]}lesson/${newSlug}`,
          undefined,
          { shallow: true }
        );
      }
    } else {
      alert("You already finished the course");
    }
  };

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
        isCourseInfoPage={lessonSlug ? false : true}
        course={course}
        currentContentIndex={currentContentIndex}
        totalContent={lesson.contents.length}
        moveToModule={moveToModule}
      >
        {lesson.contents.length &&
        currentContentIndex >= lesson.contents.length ? (
          <Final
            moveToNextLesson={moveToNextLesson}
            lessonId={lesson._id}
            courseMeta={courseMeta}
            setCourseMeta={setCourseMeta}
            courseId={course._id}
            moveToModule={moveToModule}
            isCourseFinished={
              Object.keys(course.lessons).length - 1 <=
              courseMeta?.enrolment?.lessons?.length
            }
          />
        ) : (
          ""
        )}
        {lesson.contents.length ? (
          lesson.contents.map((content, index) => {
            // if (index === currentContentIndex) {
            return (
              <div
                className={`${index === currentContentIndex ? "" : "hidden"}`}
              >
                <Contents
                  moveToModule={moveToModule}
                  content={content}
                  setContent={(field, value) => {
                    const newLesson = { ...lesson };
                    //Update appropriate content field TODO: validate field as they must be typo-proof
                    newLesson.contents[index][field] = value;
                    setLesson(newLesson);
                  }}
                />
              </div>
            );
            // }
            // return "";
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
