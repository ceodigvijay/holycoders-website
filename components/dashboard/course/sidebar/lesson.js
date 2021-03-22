import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/router";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "#d2d2d2" : "",
  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function LessonTile({
  type,
  lessons,
  course,
  deleteLessonFromDb,
  sectionIndex,
}) {
  const router = useRouter();

  return (
    <Droppable droppableId={type} type={`droppableSubItem`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {lessons.map((lesson, lessonIndex) => (
            <Draggable key={lesson} draggableId={lesson} index={lessonIndex}>
              {(provided, snapshot) => (
                <div className="w-full">
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    className="w-full"
                  >
                    <div className="flex justify-between w-full">
                      <div
                        className={`text-gray-600 py-1 hover:text-gray-900 flex items-center w-full`}
                      >
                        <div {...provided.dragHandleProps}>
                          <svg
                            className="w-5 h-5 text-gray-300 mr-2 cursor-move"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>

                        <button
                          onClick={() => {
                            router.push(
                              `${
                                router.asPath.split("?lesson")[0]
                              }?lesson=${lesson}`,
                              undefined,
                              { shallow: true }
                            );
                          }}
                        >
                          {course.lessons && course.lessons[lesson]
                            ? course.lessons[lesson].title
                            : "Error: Delete this"}
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          deleteLessonFromDb(sectionIndex, lessonIndex, lesson)
                        }
                      >
                        {/* Delete icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-200 hover:text-red-400"
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
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
