import React, { useState, useEffect, useContext } from "react";
import CourseLayout from "./layout";
import { getLessonWithId, updateLesson } from "../../../lib/index";
import { useRouter } from "next/router";
import GlobalContext from "../../../contexts/globalContext";
import StarryEditor from "../../StarryEditor";

export default function lesson({ course, setCourse }) {
  const { addNotification } = useContext(GlobalContext);
  const router = useRouter();
  const { lesson: lessonId } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLessonWithId(lessonId);
        setLesson(res.data);
        setCurrentContentIndex(0);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [lessonId]);

  const [lesson, setLesson] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const saveLessonToCloud = async () => {
    try {
      const res = await updateLesson(lesson);
      addNotification({
        type: "success",
        message: "Successfully saved the lesson",
      });
    } catch (error) {
      var message = error?.response?.data?.message;
      addNotification({
        type: "error",
        message: message ? message : "Some error occured in saving the lesson",
      });
    }
  };

  if (!lesson) {
    return "Loading";
  } else {
    return (
      <CourseLayout
        contentState={lesson.content}
        setContentState={(newContentState) =>
          setLesson({ ...lesson, content: newContentState })
        }
        course={course}
        setCourse={setCourse}
        lesson={lesson}
        setLesson={setLesson}
        updateLesson={saveLessonToCloud}
        currentContentIndex={currentContentIndex}
        totalContent={lesson.content.blocks.length}
        moveToModule={(direction) => {
          if (
            direction === "next" &&
            lesson.content.blocks.length - 1 > currentContentIndex
          ) {
            setCurrentContentIndex(currentContentIndex + 1);
          }
          if (direction === "previous" && currentContentIndex > 0) {
            setCurrentContentIndex(currentContentIndex - 1);
          }
        }}
      >
        {lesson.content.blocks.length ? (
          <StarryEditor
            contentState={lesson.content}
            setContentState={(newContentState) =>
              setLesson({ ...lesson, content: newContentState })
            }
            type="COURSE"
            activeContentIndex={currentContentIndex}
          />
        ) : (
          <div className="mt-10 text-center">
            <div className="text-4xl font-semibold">No Content Found</div>
            <div className="text-gray-600">
              Click on the top add button to add content.
            </div>
          </div>
        )}
      </CourseLayout>
    );
  }
}
