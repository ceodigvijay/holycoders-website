import React, { useState } from "react";

export default function TestCases({
  testCases,
  isLoading,
  publicOnly,
  passedTestCase,
}) {
  const [activeTestCase, setActiveTestCase] = useState(0);
  var passedCasesArr = [];
  if (passedTestCase) {
    passedCasesArr = Object.keys(passedTestCase);
  }
  if (publicOnly) {
    testCases = testCases.filter((testCase) => testCase.is_public === true);
  }
  console.log(publicOnly);

  if(isLoading || !passedTestCase){
    return (
      <div className="flex flex-row flex-wrap items-center justify-center">
        {testCases.map((testCase, index) => {
          return <div className="px-6 cursor-pointer py-2 rounded-sm flex items-center justify-center border-2 border-gray-200 m-2">
            <span className="mr-2 font- text-gray-700">
              Test Case {index + 1}
            </span>
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            ) : testCase.is_public ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>;
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div
        className="table-cell h-full overflow-y-scroll"
        style={{ maxHeight: "50vh" }}
      >
        {testCases.map((testCase, index) => {
          var isTestCasePassed =
            passedCasesArr.includes(testCase._id) &&
            passedTestCase[testCase._id].passed;
          return (
            <div
              onClick={() => setActiveTestCase(index)}
              className={`${activeTestCase === index ? "bg-gray-200" : ""} ${
                isTestCasePassed ? "text-primary-600" : "text-red-600"
              }  px-6 cursor-pointer py-2 rounded-sm flex items-center justify-center m-2`}
            >
              <span className="mr-2 font-semibold">Test Case {index + 1}</span>
              {testCase.is_public ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex-1 px-2 text-gray-800">
        {/* Input */}
        <div>
          <p className="text-lg font-semibold">Input</p>
          <code>{testCases[activeTestCase].input}</code>
        </div>
        {/* Expected Output */}
        <div>
          <p className="text-lg font-semibold">Expected Output</p>
          <code>{testCases[activeTestCase].output}</code>
        </div>
        {/* Your Output */}
        {passedTestCase ? (
          <div>
            <p className="text-lg font-semibold">Your Output</p>
            <code>{passedTestCase[testCases[activeTestCase]._id].stdout}</code>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
