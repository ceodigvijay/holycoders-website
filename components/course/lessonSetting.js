import React from "react";

export default function lessonSetting({
  updateLesson,
  lesson,
  setLesson,
  sidebarOpen,
  setSidebarClose,
}) {
  return (
    <div>
      <div
        className={`fixed inset-0 overflow-scroll z-50  ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
            aria-hidden="true"
          ></div>
          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
            aria-labelledby="slide-over-heading"
          >
            <div className="relative w-screen max-w-md">
              <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                <button
                  onClick={setSidebarClose}
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <h2
                    id="slide-over-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Lesson Settings
                  </h2>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  {/* Setting */}
                  <input
                    value={lesson.title}
                    onChange={(e) =>
                      setLesson({ ...lesson, title: e.target.value })
                    }
                    className="block w-full border-2 border-gray-200 rounded-md my-5"
                    type="text"
                    placeholder="Title"
                  />
                  <input
                    value={lesson.slug}
                    onChange={(e) =>
                      setLesson({ ...lesson, slug: e.target.value })
                    }
                    className="block w-full border-2 border-gray-200 rounded-md my-5"
                    type="text"
                    placeholder="Slug"
                  />
                  <textarea
                    value={lesson.objective}
                    onChange={(e) =>
                      setLesson({ ...lesson, objective: e.target.value })
                    }
                    className="block w-full border-2 border-gray-200 rounded-md my-5"
                    placeholder="Objective"
                  />
                  <div className="fmy-5">
                    <label className="my-1 text-gray-500">Credit</label>
                    <input
                      value={lesson.credit}
                      onChange={(e) =>
                        setLesson({ ...lesson, credit: e.target.value })
                      }
                      className="w-full block border-2 border-gray-200 rounded-md"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="my-5">
                    <label className="my-1 text-gray-500">
                      Passing Percentage
                    </label>
                    <input
                      value={lesson.pass_percentage}
                      onChange={(e) =>
                        setLesson({
                          ...lesson,
                          pass_percentage: e.target.value,
                        })
                      }
                      className="w-full block border-2 border-gray-200 rounded-md"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="my-5">
                    <label className="my-1 text-gray-500">
                      Read time in Minutes
                    </label>
                    <input
                      value={lesson.reading_time}
                      onChange={(e) =>
                        setLesson({ ...lesson, reading_time: e.target.value })
                      }
                      className="w-full block border-2 border-gray-200 rounded-md"
                      type="number"
                      min="0"
                      max="10000"
                    />
                  </div>
                  <input
                    value={lesson.meta_title}
                    onChange={(e) =>
                      setLesson({ ...lesson, meta_title: e.target.value })
                    }
                    className="block w-full border-2 border-gray-200 rounded-md my-5"
                    type="text"
                    placeholder="Meta Title"
                  />
                  <textarea
                    value={lesson.meta_description}
                    onChange={(e) =>
                      setLesson({ ...lesson, meta_description: e.target.value })
                    }
                    className="block w-full border-2 border-gray-200 rounded-md my-5"
                    placeholder="Meta Description"
                  />
                  <select
                    value={lesson.status}
                    onChange={(e) =>
                      setLesson({ ...lesson, status: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-md my-5"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="trash">Trash</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                  <button
                    onClick={updateLesson}
                    className="w-full text-2xl font-semibold bg-primary-400 hover:bg-primary-500 text-white my-5 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
