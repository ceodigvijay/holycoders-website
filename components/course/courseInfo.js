import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { addEnrolment } from "../../lib/index";
import GlobalContext from "../../contexts/globalContext";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Link from "next/link";

export default function CourseInfoPage({ courseData, setCourseData }) {
  const {
    course,
    meta: { enrolment },
  } = courseData;
  const [progress, setProgress] = useState({
    enrolment: false,
  });
  const { user, addNotification } = useContext(GlobalContext);

  const handleEnrolmentClick = async () => {
    setProgress({ ...progress, enrolment: true });
    try {
      const response = await addEnrolment(course._id);
      const newCourseData = {
        ...courseData,
        meta: { ...courseData.meta, enrolment: response.data.enrolment },
      };
      setCourseData(newCourseData);
    } catch (error) {
      addNotification({
        type: "error",
        message: "Some error occured. Please try again later.",
      });
    }
    setProgress({ ...progress, enrolment: false });
  };

  const renderers = {
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <pre>
          <code className={`language-${language}`}>{value}</code>
        </pre>
      );
    },
    image: ({ src, alt }) => {
      return (
        <div className="text-center shadow-lg">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      );
    },
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Course Title */}
        <h1 className="text-center font-bold text-5xl mt-10 mb-4 text-gray-700">
          {course.title}
        </h1>
        {/* Course Introduction */}
        <div className="text-center font-medium mb-10 text-lg text-gray-600">
          {course.introduction}
        </div>
        <div className=" text-center">
          <Image
            src="/course.png"
            width="620"
            height="360"
            className="rounded-md"
          />
          <div className="text-center w-full flex items-center justify-center my-10">
            {enrolment ? (
              <button
                className={`text-center mx-auto flex items-center justify-center bg-primary-600 rounded-full py-3 px-10 text-white font-semibold`}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Enrolled in the course</span>
              </button>
            ) : (
              <button
                onClick={
                  user
                    ? handleEnrolmentClick
                    : () => {
                        addNotification({
                          type: "primary",
                          message: "Login to enrol in courses",
                        });
                      }
                }
                className={`text-center flex items-center justify-center mx-2 bg-secondary rounded-full py-3 px-10 text-white font-semibold`}
              >
                {progress.enrolment ? (
                  "Please Wait ..."
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Enroll for Free</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="">
          {/* Course Features */}
          <section className="text-gray-600 body-font my-20">
            <h2 className="text-2xl font-semibold my-4">What will you learn</h2>
            <div className="mx-auto">
              <div className="flex flex-wrap items-center">
                {course.objective.map((objective) => {
                  return (
                    <div className="p-2">
                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          className="text-gray-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                        <span className="title-font font-medium">
                          {objective}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Course Timing and total sections */}
          {/* Course Contents */}
          {/* <div className="my-10">
            <h2 className="text-2xl font-semibold my-4">Course Contents</h2>
            <div className="rounded-md p-4 mx-10">
              {[1, 2, 3, 4, 5].map((section, index) => {
                return (
                  <>
                    <motion.header
                      initial={false}
                      className="w-full p-5 rounded-sm flex justify-between items-center bg-gray-100"
                      onClick={() =>
                        openIndex === index
                          ? setOpenIndex(-1)
                          : setOpenIndex(index)
                      }
                    >
                      <span>Section {index}</span>
                      <motion.section
                        key="content"
                        initial="collapsed"
                        animate={index === openIndex ? "open" : "collapsed"}
                        exit="collapsed"
                        variants={{
                          open: { transform: "rotate(180deg)" },
                          collapsed: { transform: "rotate(0deg)" },
                        }}
                        transition={{
                          duration: 0.2,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.section>
                    </motion.header>
                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.section
                          className="overflow-hidden"
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{
                            duration: 0.8,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                        >
                          <div className="px-10">
                            {[1, 2, 3, 4, 5].map((c, index) => {
                              return (
                                <div className="flex items-center justify-between my-4">
                                  <div className="flex items-center font-semibold text-lg">
                                    <span className="text-gray-400">
                                      0{index + 1}
                                    </span>
                                    <span className="mx-4 text-gray-600">
                                      Lesson Title
                                    </span>
                                  </div>
                                  <button>
                                    <svg
                                      className="w-10 h-10 text-secondary"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </motion.section>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
            </div>
          </div> */}

          {/* Course Description with read more */}
          <section className="my-10 prose dark:prose-dark prose-lg max-w-none mx-4">
            <h2 className="text-2xl font-semibold my-4">Description</h2>
            <ReactMarkdown
              plugins={[gfm]}
              renderers={renderers}
              children={course.description_raw}
            />
          </section>
          {/* Prerequisites */}
          <div className="my-10">
            <h2 className="text-2xl font-semibold my-4">Prerequisites</h2>
            <ul className="list-disc list-inside px-10">
              {course.prerequisite.map((prerequisite) => {
                return <li>{prerequisite}</li>;
              })}
            </ul>
          </div>
          {/* License */}
          <section>
            <h2 className="flex items-center text-2xl font-semibold my-4">
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
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <span className="mx-2">License</span>
            </h2>
            <p>{course.license}</p>
          </section>
          {/* Course Tags */}
          <div className="flex flex-wrap items-center justify-center">
            {[1, 2, 3, 4].map((t) => {
              return (
                <div className="m-2 bg-gray-100 px-5 py-1 rounded-full">
                  Tag {t}
                </div>
              );
            })}
          </div>
          {/* Author with Type person/organisation and coauthors */}
          {/* Reviews */}
          {/* Testimonials */}
        </div>
      </div>
    </div>
  );
}
