import React, { useState, useContext } from "react";
import { addLesson, updateCourse, deleteLesson } from "../../../../lib/index";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SidebarTopNav from "./topNav";
import LessonsCollection from "./lesson";
import GlobalContext from "../../../../contexts/globalContext";

export default function sidebar({ course, setCourse }) {
  const { addNotification } = useContext(GlobalContext);
  const [newLesson, setNewLesson] = useState({
    title: "",
    section: -1,
  });
  const [progressData, setProgressData] = useState({
    course: false,
  });
  // const [sections, setSections] = useState([...course.sections]);
  const [sectionEditIndex, setSectionEditIndex] = useState(-1);
  const router = useRouter();

  // Utility functions for React Darg-nd-drop DND
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "#d2d2d2" : "none",
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    //If Section is reordered
    if (result.type === "DEFAULT") {
      const newSections = reorder(
        course.sections,
        result.source.index,
        result.destination.index
      );

      //Reorder the sequence of each section in the new sections array
      newSections.map((item, index) => {
        return (item.sequence = index);
      });
      //Update the sections in the course
      setCourse({ ...course, sections: newSections });
    } else if (result.type === "droppableSubItem") {
      //If subitem is reordered
      const sectionLessonMap = course.sections.reduce((acc, section) => {
        acc[section.name + section.sequence] = section.lessons;
        return acc;
      }, {});

      //Get source and destination parent id of lesson reordered
      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      //Get source and destination subItems to add reordered lesson to destination
      // and remove from source
      const sourceLessons = sectionLessonMap[sourceParentId];
      const destLessons = sectionLessonMap[destParentId];

      let newSections = [...course.sections];

      /** In this case lessons are reOrdered inside same Section */
      if (sourceParentId === destParentId) {
        const reorderedLessons = reorder(sourceLessons, sourceIndex, destIndex);
        newSections = newSections.map((section) => {
          if (section.name + section.sequence === sourceParentId) {
            section.lessons = reorderedLessons;
          }
          return section;
        });
        setCourse({ ...course, sections: newSections });
      } else {
        //If lessons are moved to different section
        let newSourceLessons = [...sourceLessons];
        const [draggedItem] = newSourceLessons.splice(sourceIndex, 1);

        let newDestLessons = [...destLessons];
        newDestLessons.splice(destIndex, 0, draggedItem);
        newSections = newSections.map((section) => {
          if (section.name + section.sequence === sourceParentId) {
            section.lessons = newSourceLessons;
          } else if (section.name + section.sequence === destParentId) {
            section.lessons = newDestLessons;
          }
          return section;
        });
        setCourse({ ...course, sections: newSections });
      }
    }
  };

  // Utility functions for React Darg-nd-drop DND

  const addLessonToDb = async (section) => {
    try {
      const res = await addLesson(newLesson.title, router.query.id, section);
      //add lesson to content and lessons object
      const updatedCourse = { ...course };
      updatedCourse.sections[section].lessons.push(res.data.id);
      updatedCourse.lessons[res.data.id] = {
        _id: res.data.id,
        title: res.data.title,
      };
      setCourse(updatedCourse);
      setNewLesson({ title: "", section: -1 });
    } catch (error) {
      console.log(error);
    }
  };
  const saveCourseToDb = async () => {
    setProgressData({ ...progressData, course: true });
    try {
      const res = await updateCourse(course);
      addNotification({
        type: "success",
        message: "Successfully Saved the Course",
      });
    } catch (error) {
      console.log(error);
      addNotification({
        type: "error",
        message: "Some error occured saving the course.",
      });
    }
    setProgressData({ ...progressData, course: false });
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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLessonFromDb = async (sectionIndex, lessonIndex, lessonId) => {
    try {
      const confirmation = prompt("Danger: Enter CONFIRM to continue");
      if (confirmation === "CONFIRM") {
        const res = await deleteLesson(lessonId);
        if (res.data.ok) {
          const newCourse = { ...course };
          newCourse.sections[sectionIndex].lessons.splice(lessonIndex, 1);
          setCourse(newCourse);
        }
      } else {
        console.log("Cancelled");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SidebarTopNav />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col justify-center items-start w-full"
            >
              {course.sections.map((section, index) => (
                <Draggable
                  key={section.sequence}
                  draggableId={section.name + section.sequence}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="flex flex-auto items-center bg-gray-100 my-2 py-4 px-4 w-full rounded-md cursor-pointer"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="w-full">
                        <div className="text-center my-6 text-gray-400 w-full">
                          {sectionEditIndex === index ? (
                            <>
                              <input
                                type="text"
                                className="border-2 border-gray-200 rounded-md w-full my-2 text-gray-600"
                                value={section.name}
                                onChange={(e) => {
                                  var updatedCourse = { ...course };
                                  updatedCourse.sections[index].name =
                                    e.target.value;
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
                            <div className="flex items-center justify-between w-full">
                              <div {...provided.dragHandleProps}>
                                <svg
                                  className="w-5 h-5"
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
                        <LessonsCollection
                          lessons={section.lessons}
                          type={section.name + section.sequence}
                          course={course}
                          deleteLessonFromDb={deleteLessonFromDb}
                          sectionIndex={index}
                        />
                        {newLesson.section === index ? (
                          <div className="flex">
                            <input
                              className="w-48 border-1 rounded-md border-gray-200 placeholder-gray-400 mr-1"
                              placeholder="Title"
                              type="text"
                              value={newLesson.title}
                              onChange={(e) =>
                                setNewLesson({
                                  ...newLesson,
                                  title: e.target.value,
                                })
                              }
                            />
                            <button onClick={() => addLessonToDb(index)}>
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
                              onClick={() =>
                                setNewLesson({ title: "", section: -1 })
                              }
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
                            onClick={() =>
                              setNewLesson({ title: "", section: index })
                            }
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
      <button
        onClick={saveCourseToDb}
        className="py-2 bottom-0 sticky mt-10 w-full bg-gray-200 hover:bg-gray-300"
      >
        {progressData.course ? "Saving..." : "Save Course"}
      </button>
    </>
  );
}
