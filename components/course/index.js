import React, { useEffect, useContext } from "react";
import CourseLayout from "./layout";
import { getCourseWithSlug } from "../../lib/index";
import { useRouter } from "next/router";
import Lesson from "./lesson";
import CourseInfo from "./courseInfo";
import GlobalContext from "../../contexts/globalContext";
import CourseSEO from "../seo/course/index";
import Spinner from "../spinner";
export default function course() {
  const router = useRouter();
  const { courseslug: slug, lesson } = router.query;
  const { courseData, setCourseData } = useContext(GlobalContext);

  useEffect(() => {
    const getData = async () => {
      try {
        if (
          slug &&
          (!courseData || (courseData && courseData.course.slug !== slug))
        ) {
          const res = await getCourseWithSlug(slug);
          setCourseData({ ...res.data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [slug]);

  if (!courseData || (courseData && courseData.course.slug !== slug)) {
    return (
      <div className="w-full h-full h-screen dark:bg-gray-800 relative">
        <Spinner />
      </div>
    );
  }

  if (lesson) {
    return (
      <Lesson
        courseMeta={courseData.meta}
        setCourseMeta={(v) => {
          setCourseData({ ...courseData, meta: v });
        }}
        course={courseData.course}
        setCourse={(v) => {
          setCourseData({ ...courseData, course: v });
        }}
      />
    );
  } else {
    return (
      <CourseLayout
        isCourseInfoPage={true}
        courseMeta={courseData.meta}
        course={courseData.course}
      >
        <CourseSEO
          title={courseData.course.title}
          metaTitle={courseData.course.meta_title}
          metaDescription={courseData.course.meta_description}
          courseSlug={courseData.course.slug}
        />
        <CourseInfo courseData={courseData} setCourseData={setCourseData} />
      </CourseLayout>
    );
  }
}
