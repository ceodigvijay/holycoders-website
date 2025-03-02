import React, { useState, useEffect } from "react";

export default function mcq({ content, moveToModule }) {
  const [options, setOptions] = useState(shuffle([...content.options]));
  const [answers, setAnswers] = useState(new Set());
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

  var correctAnswersCount = 0;
  var correctAnswers = new Set();
  // If one option correct use radio else select
  content.options.map((option) => {
    if (correctAnswersCount > 1) {
      return;
    } else if (option.position > 0) {
      correctAnswersCount += 1;
    }
  });

  function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
  }

  const evaluateAnswers = () => {
    if (eqSet(answers, correctAnswers)) {
      setEvaluation("correct");
    } else {
      setEvaluation("incorrect");
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        {options.map((option, index) => {
          if (option.position) {
            correctAnswers.add(index);
          }
          return (
            <label
              for={option.key}
              className="col-span-12 md:col-span-6 text-xl bg-gray-100 dark:bg-gray-900 p-4 rounded-md my-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              key={option.key}
            >
              {correctAnswersCount > 1 ? (
                <input
                  id={option.key}
                  type="checkbox"
                  className="mx-4"
                  onClick={(v) => {
                    var newAnswers = new Set(answers);
                    if (newAnswers.has(index)) {
                      newAnswers.delete(index);
                    } else {
                      newAnswers.add(index);
                    }
                    setAnswers(newAnswers);
                  }}
                />
              ) : (
                <input
                  id={option.key}
                  type="radio"
                  name="ans_opts"
                  className="mx-4"
                  onClick={(v) => {
                    var newAnswers = new Set();
                    newAnswers.add(index);
                    setAnswers(newAnswers);
                  }}
                />
              )}

              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
      <div className="text-center">
        <button
          onClick={evaluateAnswers}
          className="py-2 px-10 bg-secondary-500 hover:bg-secondary-400 focus:outline-none text-white font-semibold mt-4 mb-10 text-2xl rounded-full"
        >
          Evaluate
        </button>
        <br />

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
            } text-red-500 text-xl font-semibold`}
          >
            Try Again
          </div>
          <br />

          {evaluation === "correct" ? (
            <button
              onClick={() => moveToModule("next")}
              className="bg-primary-500 hover:bg-primary-400 font-bold focus:outline-none text-white px-20 py-3 uppercase rounded-full text-md"
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
