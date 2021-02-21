import React, { useState } from "react";
import { addLesson, updateCourse, deleteLesson } from "../../lib/index";
import Link from "next/link";
import { useRouter } from "next/router";

export default function sidebar({ course, setCourse }) {
  const [newLesson, setNewLesson] = useState({
    title: "",
    section: -1,
  });
  const [sectionEditIndex, setSectionEditIndex] = useState(-1);
  const router = useRouter();

  const addLessonToDb = async (section, sequence) => {
    try {
      const res = await addLesson(newLesson.title, sequence, router.query.id);
      //add lesson to content and lessons object
      const updatedCourse = { ...course };
      updatedCourse.sections[section].lessons.push(res.data.id);
      updatedCourse.lessons[res.data.id] = {
        _id: res.data.id,
        title: res.data.title,
      };
      setCourse(updatedCourse);
      setNewLesson({ title: "", section: -1 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const saveCourseToDb = async () => {
    console.log("Will save");
    try {
      const res = await updateCourse(course);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const addSection = async (sequence) => {
    try {
      const updatedCourse = { ...course };
      updatedCourse.sections.push({
        name: "Section Name",
        sequence: sequence,
        description: "",
        lessons: [],
      });
      setCourse(updatedCourse);
      setNewLesson({ title: "", section: -1 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLessonFromDb = async (sectionIndex, lessonIndex, lessonId) => {
    try {
      const res = await deleteLesson(lessonId);
      console.log(res);
      if (res.data.ok) {
        const newCourse = { ...course };
        newCourse.sections[sectionIndex].lessons.splice(lessonIndex, 1);
        setCourse(newCourse);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex align-middle items-center justify-between sticky top-0 mx-auto bg-gray-50 text-gray-600 px-2 py-3">
        {/* Go Back Button */}
        <Link href="/dashboard/course">
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="mx-2 text-base">Back</span>
          </a>
        </Link>

        {/* <button onClick={() => saveCourseToDb()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </button> */}
        <button
          className="flex items-center"
          onClick={() => {
            router.push(`${router.asPath.split("?lesson")[0]}`, undefined, {
              shallow: true,
            });
          }}
        >
          <span className="mx-2 text-base">Course Info</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>
      <div className="px-4">
        {course.sections.map((section, index) => {
          return (
            <div>
              <div className="text-center my-4 text-gray-400">
                {sectionEditIndex === index ? (
                  <>
                    <input
                      type="text"
                      className="border-2 border-gray-200 rounded-md w-full my-2 text-gray-600"
                      value={section.name}
                      onChange={(e) => {
                        var updatedCourse = { ...course };
                        updatedCourse.sections[index].name = e.target.value;
                        setCourse(updatedCourse);
                      }}
                    />
                    <textarea
                      className="border-2 border-gray-200 rounded-md w-full my-2 text-gray-600"
                      value={section.description}
                      onChange={(e) => {
                        var updatedCourse = { ...course };
                        updatedCourse.sections[index].description =
                          e.target.value;
                        setCourse(updatedCourse);
                      }}
                    />
                    <button onClick={() => setSectionEditIndex(-1)}>
                      Done
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{section.name}</span>
                    <button
                      onClick={() => setSectionEditIndex(index)}
                      className="mx-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {section.lessons.map((c, lessonIndex) => {
                return (
                  <div className="flex justify-between">
                    <button
                      className={`text-gray-600 py-1 hover:text-gray-900`}
                      onClick={() => {
                        router.push(
                          `${router.asPath.split("?lesson")[0]}?lesson=${c}`,
                          undefined,
                          { shallow: true }
                        );
                      }}
                    >
                      {course.lessons && course.lessons[c]
                        ? course.lessons[c].title
                        : "Error"}
                    </button>

                    <button
                      onClick={() => deleteLessonFromDb(index, lessonIndex, c)}
                    >
                      {/* Delete icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-400 hover:text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
              {newLesson.section === index ? (
                <div className="flex">
                  <input
                    className="w-48 border-1 rounded-md border-gray-200 placeholder-gray-400 mr-1"
                    placeholder="Title"
                    type="text"
                    value={newLesson.title}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, title: e.target.value })
                    }
                  />
                  <button
                    onClick={() => addLessonToDb(index, section.lessons.length)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary-400 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setNewLesson({ title: "", section: -1 })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-red-400 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setNewLesson({ title: "", section: index })}
                  className="flex items-center text-primary-600 rounded-full w-full py-1 hover:text-primary-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mx-2">New Lesson</span>
                </button>
              )}
            </div>
          );
        })}
        <button
          className="text-center border-2 border-gray-200 rounded-md w-full py-2 my-10 flex items-center justify-center"
          onClick={() => addSection(course.sections.length)}
        >
          <svg
            className="w-6 h-6 mx-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="mx-1">New Section</span>
        </button>
      </div>
      <button onClick={saveCourseToDb} className="py-2 bottom-0 sticky mt-10 w-full bg-gray-200 hover:bg-gray-300">
        Save Course
      </button>
    </>
  );
}
