import React from "react";
import MarkdownEditor from "rich-markdown-editor";
import { updateCourse } from "../../lib/index";

export default function setting({ course, setCourse }) {
  return (
    <div>
      <div className="w-full h-48 border-2 bg-gray-100 flex items-center justify-center rounded-md">
        Featured Image
      </div>
      <input
        type="text"
        className="text-4xl font-semibold text-gray-700 text-center my-10 block rounded-md w-full border-2 border-gray-200"
        value={course.title}
        onChange={(e) => setCourse({ ...course, title: e.target.value })}
      />
      <div className="grid grid-cols-6 gap-2">
        <input
          className="col-span-6 md:col-span-4 border-2 border-gray-200 rounded-md"
          type="text"
          placeholder="Slug"
          value={course.slug}
          onChange={(e) => setCourse({ ...course, slug: e.target.value })}
        />
        <input
          className="col-span-6 md:col-span-1 border-2 border-gray-200 rounded-md"
          type="number"
          placeholder="Difficulty"
          min="0"
          max="10"
          value={course.difficulty}
          onChange={(e) => setCourse({ ...course, difficulty: e.target.value })}
        />
        <input
          className="col-span-6 md:col-span-1 border-2 border-gray-200 rounded-md"
          type="number"
          placeholder="Minutes to read"
          value={course.reading_time}
          onChange={(e) =>
            setCourse({ ...course, reading_time: e.target.value })
          }
          min="0"
          max="10000"
        />
      </div>
      <textarea
        value={course.introduction}
        onChange={(e) => setCourse({ ...course, introduction: e.target.value })}
        placeholder="Introduction"
        className="my-10 border-2 border-gray-200 rounded-md w-full"
      />
      {/* Objective */}
      <div>
        {course.objective.map((p, index) => {
          return (
            <div className="flex items-center">
              <span>{p}</span>
              <button
                className="mx-2"
                onClick={() => {
                  var objective = [...course.objective];
                  objective.splice(index, 1);
                  setCourse({ ...course, objective: objective });
                }}
              >
                {/* Remove Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md w-full"
          placeholder="Objective"
        />
      </div>
      {/* Prerequisites */}
      <div>
        {course.prerequisite.map((p, index) => {
          return (
            <div className="flex items-center">
              <span>{p}</span>
              <button
                className="mx-2"
                onClick={() => {
                  var prerequisite = [...course.prerequisite];
                  prerequisite.splice(index, 1);
                  setCourse({ ...course, prerequisite: prerequisite });
                }}
              >
                {/* Remove Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md w-full"
          placeholder="Prerequisite"
        />
      </div>
      <div className="px-6">
        <MarkdownEditor
          onChange={(value) => {
            setCourse({
              ...course,
              description_raw: value(),
            });
          }}
          readOnly={false}
          defaultValue={course.description_raw}
          className="prose dark:prose-dark lg:prose-lg max-w-none mt-10 border border-gray-100"
          // dark={true}
          placeholder="Description will go here"
        />
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            className="col-span-2 md:col-span-1 border-2 border-gray-200 rounded-md w-full"
            placeholder="Meta Title"
            value={course.meta_title}
            onChange={(e) =>
              setCourse({ ...course, meta_title: e.target.value })
            }
          />
          <input
            type="text"
            className="col-span-2 md:col-span-1 border-2 border-gray-200 my rounded-md w-full"
            placeholder="Canonical Link"
            value={course.canonical_link}
            onChange={(e) =>
              setCourse({ ...course, canonical_link: e.target.value })
            }
          />
        </div>

        <textarea
          value={course.meta_description}
          onChange={(e) =>
            setCourse({ ...course, meta_description: e.target.value })
          }
          placeholder="Meta Description"
          className="my-10 border-2 border-gray-200 rounded-md w-full"
        />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-10">
        <select
          className="col-span-4 md:col-span-1 border-2 border-gray-200 rounded-md"
          value={course.status}
          onChange={(e) => setCourse({ ...course, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="trash">Trash</option>
          <option value="deprecated">Deprecated</option>
        </select>
        <select
          className="col-span-4 md:col-span-1 border-2 border-gray-200 rounded-md"
          value={course.type}
          onChange={(e) => setCourse({ ...course, type: e.target.value })}
        >
          <option value="premium">Premium</option>
          <option value="free">Free</option>
          <option value="private">Private</option>
        </select>
        <select
          className="col-span-4 md:col-span-1 border-2 border-gray-200 rounded-md"
          value={course.category}
          onChange={(e) => setCourse({ ...course, category: e.target.value })}
        >
          <option value="general">General</option>
          <option value="project">Project</option>
          <option value="video">Video</option>
        </select>
        <select
          className="col-span-4 md:col-span-1 border-2 border-gray-200 rounded-md"
          value={course.license}
          onChange={(e) => setCourse({ ...course, license: e.target.value })}
        >
          <option value="reserved">Reserved</option>
          <option value="cc0">CC0 - No rights Reserved</option>
          <option value="mit">MIT</option>
          <option value="apache">Apache</option>
          <option value="ccby">CC BY</option>
          <option value="ccbysa">CC BY SA</option>
          <option value="ccbynd">CC BY ND</option>
          <option value="ccbync">CC BY NC</option>
          <option value="ccbyncna">CC BY NC NA</option>
        </select>
      </div>
      <div className="text-center my-10">
        <button
          onClick={async () => {
            try {
              const res = await updateCourse(course);
            } catch (error) {
              console.log(error);
            }
          }}
          className="rounded-full bg-primary-400 text-xl font-semibold hover:bg-primary-500 text-white px-20 py-2"
        >
          Save Course
        </button>
      </div>
    </div>
  );
}
