import React, { useEffect, useContext } from "react";
import CourseLayout from "./layout";
import { getCourseWithSlug } from "../../lib/index";
import { useRouter } from "next/router";
import Lesson from "./lesson";
import CourseInfo from "./courseInfo";
import GlobalContext from "../../contexts/globalContext";

export default function course() {
  const router = useRouter();
  const { slug, lesson } = router.query;
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

  if (courseData && courseData.course.slug !== slug) {
    return "Loading";
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
        <CourseInfo courseData={courseData} setCourseData={setCourseData} />
      </CourseLayout>
    );
  }
}
