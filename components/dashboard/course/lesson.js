import React, { useState, useEffect, useContext } from "react";
import CourseLayout from "./layout";
import Contents from "./content/index";
import { getLessonWithId, updateLesson } from "../../../lib/index";
import { useRouter } from "next/router";
import GlobalContext from "../../../contexts/globalContext";

export default function lesson({ course, setCourse }) {
  const { addNotification } = useContext(GlobalContext);
  const router = useRouter();
  const { lesson: lessonId } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getLessonWithId(lessonId);
        setLesson(res.data);
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

  const onAddNewContent = (type) => {
    var newLesson = { ...lesson };
    if (type === "markdown") {
      newLesson.contents.push({
        type: "markdown",
        content_raw: "",
        content_html: "",
      });
      setLesson(newLesson);
    } else if (["ftb", "code-ftb", "mcq", "atf"].includes(type)) {
      newLesson.contents.push({
        type: type,
        title: "",
        language: "", // if lang html/js/css the final output can contain html/css/js
        final_output: "", // output for code-ftb, final message for mcq and final note for markdown
        enable_keyboard: false, //for ftb with no options, (add one option with position 1 for evaluation)
        content_raw: "",
        content_html: "",
        question: "",
        options: [],
      });
      // Option object type{
      //   title: 'Some answer'
      //   position: 1, //>1 is correct followed by correct  next option choosed (now 2) and 0 means false,
      //   explanation_raw: string
      //   explanation_html: string
      //     }
      setLesson(newLesson);
    } else {
      alert("Not Defined");
    }
  };

  if (!lesson) {
    return "Loading";
  } else {
    return (
      <CourseLayout
        course={course}
        setCourse={setCourse}
        lesson={lesson}
        setLesson={setLesson}
        updateLesson={saveLessonToCloud}
        currentContentIndex={currentContentIndex}
        totalContent={lesson.contents.length}
        onAddContent={onAddNewContent}
        moveToModule={(direction) => {
          if (
            direction === "next" &&
            lesson.contents.length - 1 > currentContentIndex
          ) {
            setCurrentContentIndex(currentContentIndex + 1);
          }
          if (direction === "previous" && currentContentIndex > 0) {
            setCurrentContentIndex(currentContentIndex - 1);
          }
        }}
      >
        {lesson.contents.length ? (
          lesson.contents.map((content, index) => {
            if (index === currentContentIndex) {
              return (
                <>
                  <Contents
                    key={index}
                    content={content}
                    setContent={(field, value) => {
                      const newLesson = { ...lesson };
                      //Update appropriate content field TODO: validate field as they must be typo-proof
                      newLesson.contents[index][field] = value;
                      setLesson(newLesson);
                    }}
                  />
                  <div className="text-center">
                    <button
                      onClick={() => {
                        const newLesson = { ...lesson };
                        newLesson.contents.splice(index, 1);
                        setLesson(newLesson);
                      }}
                      className="px-10 py-2 rounded-full bg-red-500 font-semibold text-lg text-white mt-52 mb-6"
                    >
                      Delete Content
                    </button>
                  </div>
                </>
              );
            }
            return "";
          })
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
