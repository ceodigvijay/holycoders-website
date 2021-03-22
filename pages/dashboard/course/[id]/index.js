import React, { useState, useEffect } from "react";
import CourseLayout from "../../../../components/dashboard/course/layout";
import {
  getCourseWithId,
  addCourse,
  updateCourse,
} from "../../../../lib/index";
import { useRouter } from "next/router";
import Lesson from "../../../../components/dashboard/course/lesson";
import CourseSettings from "../../../../components/dashboard/course/setting";
export default function newCourse() {
  const router = useRouter();
  const { lesson, id } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        if (id && id !== "new") {
          const res = await getCourseWithId(id);
          setCourse(res.data.course);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  const [course, setCourse] = useState(null);

  const [title, setTitle] = useState("");

  const addNewCourse = async () => {
    try {
      const res = await addCourse(title);
      router.replace(
        `/dashboard/course/[id]`,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + res.data.id,
        undefined,
        { shallow: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!id || (id !== "new" && !course)) {
    return "Loading";
  } else if (id === "new") {
    return (
      <div className="h-screen">
        <div className="pt-14 px-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(event) => {
              console.log(event.key);
              if (event.key === "Enter") {
                addNewCourse();
              }
            }}
            autoFocus
            type="text"
            className="w-full text-5xl border-2 border-gray-200 rounded-md placeholder-gray-300 font-bold text-gray-700"
            placeholder="Short and Descriptive title (e.g Python Basics)"
          />
          <button onClick={addNewCourse}>Add Course</button>
        </div>
      </div>
    );
  } else if (lesson) {
    return <Lesson course={course} setCourse={setCourse} />;
  } else {
    return (
      <CourseLayout
        isCourseInfoPage={true}
        course={course}
        setCourse={setCourse}
      >
        {/* <button onClick={() => console.log(course)}>Log Course</button> */}
        <CourseSettings course={course} setCourse={setCourse} />
      </CourseLayout>
    );
  }
}
