import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function atf({ content, moveToModule }) {
  const [options, setOptions] = useState(shuffle([...content.options]));
  const [evaluation, setEvaluation] = useState("");

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
    background: isDragging ? "#d2d2d2" : "#f2f2f2",
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newOptions = reorder(
      options,
      result.source.index,
      result.destination.index
    );

    setOptions(newOptions);
  };

  const evaluate = () => {
    var counter = 1;
    var result;
    options.forEach((option) => {
      if (!(option.position === counter)) {
        result = false;
      }
      counter += 1;
    });
    setEvaluation(result === false ? "incorrect" : "correct");
  };

  return (
    <>
      <div className="my-6 text-center">
        <h2 className="text-gray-700 text-xl">{content.question}</h2>
      </div>

      <div className="flex items-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col justify-center items-start min-w-min"
              >
                {options.map((item, index) => (
                  <Draggable
                    key={item.position}
                    draggableId={item.title}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="flex flex-auto items-center bg-gray-100 my-2 py-4 px-4 w-full rounded-md cursor-pointer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          className="flex items-center rounded-md"
                          key={index}
                        >
                          <svg
                            className="w-6 h-6 mx-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                          </svg>
                          <span>{item.title}</span>
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
      </div>

      <div className="text-center">
        <button
          onClick={evaluate}
          className="py-2 px-10 border-b-4 font-semibold text-2xl my-4 border-blue-800 bg-blue-600 text-white rounded-full"
        >
          Evaluate
        </button>

        {/* Evaluation Message and Next Navigation */}
        <div className={`${evaluation === "" ? "invisible" : ""} text-center`}>
          <div
            className={`${
              evaluation === "correct" ? "" : "hidden"
            } text-primary-600 text-xl font-semibold`}
          >
            Awesome! This is Correct.
          </div>

          <div
            className={`${
              evaluation === "incorrect" ? "" : "hidden"
            } text-red-400 text-xl`}
          >
            Try Again
          </div>
          <br />

          {evaluation === "correct" ? (
            <button
              onClick={() => moveToModule("next")}
              className="bg-primary-500 font-bold text-white px-20 py-3 uppercase rounded-full text-md"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => moveToModule("next")}
              className=" border-2 border-primary-500 font-bold text-primary-500 px-20 py-3 uppercase rounded-full text-md"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </>
  );
}
