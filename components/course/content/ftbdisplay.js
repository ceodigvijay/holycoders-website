import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { shadesOfPurple } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Prism from "prismjs";

export default function index({ content }) {
  var refs = {};
  useEffect(() => {
    Prism.highlightAll();
  });
  var countOfFtb = content.question.split("->____").length - 1;
  const [evaluation, setEvaluation] = useState("");
  const [answers, setAnswers] = useState([]);

  const evaluateQuestion = () => {
    var correct = true;
    var counter = 1;
    answers.forEach((answer) => {
      if (answer.position !== counter) {
        console.log(answer.position);
        console.log(counter);
        correct = false;
        return;
      }
      counter += 1;
    });
    console.log("set evaluation");
    setEvaluation(correct ? "correct" : "incorrect");
  };

  if (
    countOfFtb === answers.length &&
    !["correct", "incorrect"].includes(evaluation)
  ) {
    evaluateQuestion();
  }

  return (
    <div className="py-10">
      <div
        className="rounded-md p-4 hc_quiz"
        style={{ backgroundColor: "#2D2B57", whiteSpace: "pre" }}
      >
        {content.question.split("\n").map((c) => {
          return (
            <>
              <span className="flex items-center">
                {c.split("->____").map((e, index) => {
                  return (
                    <>
                      {e ? (
                        <SyntaxHighlighter
                          customStyle={{ padding: "0.2em" }}
                          language="javascript"
                          style={shadesOfPurple}
                        >
                          {e}
                        </SyntaxHighlighter>
                      ) : (
                        ""
                      )}

                      {index !== c.split("->____").length - 1 ? (
                        <span
                          className="border-2 border-yellow-400 text-white px-2 rounded-md inline-flex items-center cursor-pointer"
                          style={{ minWidth: "40px", minHeight: "40px" }}
                          ref={(txt) => (refs[index] = txt)}
                          onClick={() => {
                            var titleToRemove = refs[index].innerHTML;
                            var ans = [...answers];
                            var answered = ans.filter((a) => {
                              return a.title !== titleToRemove;
                            });
                            setAnswers(answered);
                            refs[index].innerHTML = "";
                            refs[index].disabled = true;

                            setEvaluation("");
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </span>
            </>
          );
        })}
      </div>
      {/* Options Spread*/}
      <div className="flex justify-center items-center my-10">
        {content.options.map((e) => {
          var isOptionUsed = false;
          //Check if correct option is used
          answers.forEach((answer) => {
            if (answer.title === e.title) {
              isOptionUsed = true;
              return;
            }
          });
          return (
            <div
              className="border-2 border-gray-200 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 shadow-md cursor-pointer px-6 py-4 mx-4"
              onClick={() => {
                if (!isOptionUsed) {
                  for (let key in refs) {
                    if (!refs[key].innerHTML) {
                      refs[key].innerHTML = e.title;
                      setAnswers([...answers, e]);
                      break;
                    }
                  }
                }
              }}
            >
              <span className={isOptionUsed ? "invisible" : ""}>{e.title}</span>
            </div>
          );
        })}
      </div>

      {/* Evaluation Message and Next Navigation */}
      <div className={`${evaluation === "" ? "invisible" : ""} text-center`}>
        <div
          className={`${
            evaluation === "correct" ? "" : "hidden"
          } text-primary-600 text-xl`}
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
          <button className=" bg-primary-500 text-white px-20 py-3 uppercase font-medium rounded-full text-md">
            Continue
          </button>
        ) : (
          <button className=" border-2 border-primary-500 text-primary-500 px-20 py-3 uppercase font-medium rounded-full text-md">
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
