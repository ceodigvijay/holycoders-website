import React, { useState, useEffect } from "react";
import CourseLayout from "./layout";
import { getLessonWithSlug } from "../../lib/index";
import { useRouter } from "next/router";
import LessonSEO from "../seo/course/lessons";
import Spinner from "../spinner";
import Final from "./final";
import Renderer from "../StarryEditor/Renderer";
export default function lesson({ courseMeta, setCourseMeta, course }) {
  const router = useRouter();
  const { lesson: lessonSlug } = router.query;
  const [lesson, setLesson] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLessonWithSlug(lessonSlug, course._id);
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
    if (
      direction === "next" &&
      lesson.content.blocks.length > currentContentIndex
    ) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
    if (direction === "previous" && currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };
  if (!lesson) {
    return (
      <div className="w-full h-full h-screen dark:bg-gray-800 relative">
        <Spinner />
      </div>
    );
  } else {
    return (
      <CourseLayout
        courseMeta={courseMeta}
        isCourseInfoPage={lessonSlug ? false : true}
        course={course}
        currentContentIndex={currentContentIndex}
        totalContent={lesson.content.blocks.length}
        moveToModule={moveToModule}
      >
        <LessonSEO
          title={lesson.title}
          metaTitle={lesson.meta_title}
          metaDescription={lesson.meta_description}
          publishedAt={lesson.published_at}
          updatedAt={lesson.updated_at}
          author={lesson.author[0]}
          slug={lesson.slug}
          courseSlug={course.slug}
        />
        {lesson.content.blocks.length &&
        currentContentIndex >= lesson.content.blocks.length ? (
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
        {lesson.content.blocks.length ? (
          <Renderer
            moveToModule={moveToModule}
            content={lesson.content}
            activeModuleIndex={currentContentIndex}
            type="COURSE"
          />
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
