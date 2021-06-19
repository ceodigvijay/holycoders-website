import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import SplitPane from "react-split-pane";
import Select from "react-select";
import Navbar from "../layouts/global/navbar";
import QuestionDescription from "./description";
import Editorial from "./editorial";
import TestCases from "./testcases";
import { runCode, submitCode } from "../../lib/index";
const tabData = [
  { name: "Description" },
  { name: "Editorial" },
  { name: "Submissions" },
];
const options = [
  { value: "c", label: "C Lang" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "py", label: "Python" },
];

export default function QuestionPage({ question, submissions }) {
  const [currentTab, setCurrentTab] = useState("Description");
  const [testCaseData, setTestCaseData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [code, setCode] = useState(
    "a = input()\nnums = map(int, input().split(' '))\nprint(sum(nums))"
  );
  const [testConsole, setTestConsole] = useState({
    show: false,
    loading: false,
    onlyPublic: false,
  });
  const [currentLanguage, setCurrentLanguage] = useState({
    value: "py",
    label: "Python",
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const onSubmitCodeClick = async () => {
    setTestCaseData(null);
    setTestConsole({
      ...testConsole,
      loading: true,
      show: true,
      onlyPublic: false,
    });
    try {
      //onSubmitCodeClick the code
      const response = await submitCode(
        question._id,
        currentLanguage.value,
        code
      );
      console.log(response);
      setTestConsole({ ...testConsole, show: true });
      var testCasesObj = {};
      Array.isArray(response.data.test_cases) &&
        response.data.test_cases.forEach((obj) => {
          testCasesObj[obj["_id"]] = obj;
        });

      console.log(testCasesObj);
      setTestCaseData({ ...response.data, test_cases: testCasesObj });
    } catch (error) {
      console.log(error);
    }
    setTestConsole({ ...testConsole, loading: false, show: true });
  };
  const onRunCodeClick = async () => {
    setTestCaseData(null);
    setTestConsole({
      ...testConsole,
      loading: true,
      show: true,
      onlyPublic: true,
    });
    try {
      const response = await runCode(question._id, currentLanguage.value, code);
      console.log(response);
      setTestConsole({ ...testConsole, show: true, onlyPublic: true });
      var testCasesObj = {};
      Array.isArray(response.data.test_cases) &&
        response.data.test_cases.forEach((obj) => {
          testCasesObj[obj["_id"]] = obj;
        });

      console.log(testCasesObj);
      setTestCaseData({ ...response.data, test_cases: testCasesObj });
    } catch (error) {
      console.log(error);
    }
    setTestConsole({
      ...testConsole,
      loading: false,
      show: true,
      onlyPublic: true,
    });
  };

  const onResetCodeClick = () => {
    const confirmReset = confirm("Do you really want to reset the code?");
    if (confirmReset) {
      setCode("");
    } else {
      console.log("Cancelled");
    }
  };

  const getTabData = () => {
    switch (currentTab) {
      case "Description":
        return <QuestionDescription question={question} />;
      case "Editorial":
        return <Editorial editorial={question.editorial.content_raw} />;
      case "Submissions":
        return (
          <article className="prose dark:prose-dark prose px-4 prose-lg my-10">
            <table className="table-fixed">
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Language</th>
                  <th>Result</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  return (
                    <tr>
                      <td>{submission.score}</td>
                      <td>{submission.language}</td>
                      <td>
                        {submission.accepted
                          ? "Accepted"
                          : submission.score > 0
                          ? "Partially Accepted"
                          : "Failed"}
                      </td>
                      <td className="text-primary-500 cursor-pointer">
                        View Solution
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </article>
        );

      default:
        break;
    }
  };
  return (
    // <Layout>

    <div className="md:h-screen">
      <Navbar />
      <SplitPane
        split={windowWidth && windowWidth <= 992 ? "horizontal" : "vertical"}
        minSize={50}
        defaultSize={100}
      >
        {/* Description Section */}
        <section className="overflow-scroll h-full pb-20">
          {/* Tabbar */}
          <div className="bg-gray-50 flex flex-row w-full">
            {tabData.map((tab) => {
              return (
                <div
                  onClick={() => setCurrentTab(tab.name)}
                  className={`bg-gray-100 cursor-pointer flex-grow text-center py-2 ${
                    currentTab === tab.name ? "bg-gray-200" : ""
                  }`}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
          {getTabData()}
        </section>

        <section className="h-full overflow-scroll">
          <Editor
            className="rounded-md"
            height={testConsole.show ? "30vh" : "80vh"}
            defaultLanguage="python"
            defaultValue={code}
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />
          <div className="flex w-full px-4 items-center gap-4 justify-between">
            <div className="w-40">
              <Select
                value={currentLanguage}
                onChange={(selectedOption) =>
                  setCurrentLanguage(selectedOption)
                }
                options={options}
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={testConsole.loading ? "" : onRunCodeClick}
                className={`${
                  testConsole.loading
                    ? "cursor-not-allowed border-gray-600 text-gray-600"
                    : "border-primary-600 "
                } border-2 rounded-full px-6 py-2 my-2 mx-2`}
              >
                Run Code
              </button>
              <button
                onClick={testConsole.loading ? "" : onSubmitCodeClick}
                className={`${
                  testConsole.loading
                    ? "cursor-not-allowed bg-gray-600 border-gray-600"
                    : "bg-primary-600 border-primary-600"
                } text-white border-2 rounded-full px-6 py-2 my-2 mx-2`}
              >
                <span>Submit Code</span>
              </button>
            </div>
            <div>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 animate-spin mr-2 ${
                    testConsole.loading ? "block" : "invisible"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button onClick={onResetCodeClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 font-semibold mr-2"
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
              </button>

              <button
                onClick={() => {
                  setTestConsole({ ...testConsole, show: !testConsole.show });
                }}
              >
                {testConsole.show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 font-semibold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 font-semibold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* TestCases Section */}
          {testConsole.show ? (
            <TestCases
              testCases={question.test_cases}
              passedTestCase={testCaseData?.test_cases}
              isLoading={testConsole.loading}
              publicOnly={testConsole.onlyPublic}
            />
          ) : (
            ""
          )}
        </section>
      </SplitPane>
    </div>
    // </Layout>
  );
}
