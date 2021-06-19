import React, { useState } from "react";
import Editor from "rich-markdown-editor";
import Link from "next/link";
import Sidebar from "react-sidebar";
import SidebarComponents from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import TestCaseEditor from "./testcase";
import { updateQuestion, deleteQuestion } from "../../../lib/index";
const Accordion = ({ i, expanded, setExpanded, children, deleteHandle }) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.header
        initial={false}
        className="header rounded-md flex items-center justify-between px-4 py-2"
        animate={{ backgroundColor: isOpen ? "#333" : "#333666" }}
        onClick={() => setExpanded(isOpen ? -1 : i)}
      >
        <span>TestCase {i + 1}</span>
        <span></span>
        <span className="p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </span>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default function QuestionEditor({ question, setQuestion }) {
  const [newTestCase, setNewTestCase] = useState({
    input: "",
    output: "",
    is_public: false,
    difficulty: 5,
  });
  const [testCaseEditIndex, setTestCaseEditIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateQuestionToDb = async () => {
    try {
      const res = await updateQuestion(question);
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(question);
    }
  };
  const deleteQuestionToDB = async () => {
    try {
      const doublechk = prompt(
        "Enter CONFIRM to Permanently delete the question"
      );
      if (doublechk === "CONFIRM") {
        const response = await deleteQuestion(question._id);
        console.log(response);
      } else {
        console.log("Cancelled");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar
      styles={{
        content: {
          position: "relative",
        },
      }}
      sidebar={
        <SidebarComponents
          question={question}
          setQuestion={setQuestion}
          deleteQuestion={deleteQuestionToDB}
        />
      }
      open={sidebarOpen}
      onSetOpen={(open) => setSidebarOpen(open)}
      styles={{ sidebar: { background: "white" } }}
      pullRight={true}
    >
      <header className="flex justify-between my-2">
        <div className="flex items-center buttons has-addons">
          <Link href="/dashboard/question">
            <a className="px-4 my-4 flex items-center group border-r-2 border-gray-400">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Questions</span>
            </a>
          </Link>
          <span className=" text-gray-400 px-4 py-4 flex items-center">
            {question.status.replace(/\b[a-z]/g, (x) => x.toUpperCase()) ||
              "draft-e"}
          </span>
        </div>
        <div className="flex">
          <button
            onClick={updateQuestionToDb}
            className={`px-4 mx-2 rounded-md flex items-center bg-primary-600 hover:bg-primary-700 text-white text-xl`}
          >
            <span className="mx-2">
              <svg
                className={`w-8 h-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </span>

            <span>Update</span>
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            border="1px solid #d5d5d5"
            className="px-4 py-2 mx-4 bg-gray-50 text-gray-800 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
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
        </div>
      </header>
      <input
        value={question.title}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        placeholder="Title of Question"
        type="text"
        className="title-font text-center text-gray-800 dark:text-gray-100 text-5xl lg:text-6xl font-bold focus:ring-gray-400 focus:border-gray-400 mt-1 block w-full border-transparent resize-none rounded-md"
      />
      <section className="max-w-2xl mx-auto">
        {/* Question Content Description */}
        <div className="rounded-md border-2 border-gray-200 my-4">
          <Editor
            defaultValue={question.content_raw}
            onChange={(value) => {
              setQuestion({
                ...question,
                content_raw: value(),
              });
            }}
            className="prose dark:prose-dark lg:prose-lg max-w-none mx-auto"
            // dark={true}
            placeholder="Start Writing Your Amazing Post..."
            readOnly={false}
          />
        </div>
        {/* Test Cases */}
        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-lg leading-5">
            <span className="px-2 text-gray-500 font-bold bg-white">
              Test Cases
            </span>
          </div>
        </div>
        {question.test_cases.map((testCase, i) => {
          return (
            <Accordion
              key={i}
              i={i}
              expanded={testCaseEditIndex}
              setExpanded={setTestCaseEditIndex}
            >
              <TestCaseEditor
                testcase={testCase}
                setTestcase={(newTestcase) => {
                  var newTestCases = [...question.test_cases];
                  newTestCases[i] = newTestcase;
                  setQuestion({ ...question, test_cases: newTestCases });
                }}
              />
              <div className="mb-14">
                <button
                  className="px-4 py-2 text-red-400 hover:text-red-700 rounded-full flex items-center justify-end mx-auto"
                  onClick={() => {
                    const doubleChk = confirm(
                      "Are you sure want to delete this test case?"
                    );
                    if (doubleChk) {
                      const newTestCases = [...question.test_cases];
                      newTestCases.splice(i, 1);
                      setQuestion({ ...question, test_cases: newTestCases });
                    } else {
                      console.log("Cancelled");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </Accordion>
          );
        })}
        {/* Add New Test Case */}
        <div className="my-14">
          <TestCaseEditor testcase={newTestCase} setTestcase={setNewTestCase} />
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 border-2 flex items-center justify-center border-primary-600 rounded-full text-gray-800 hover:bg-primary-600 hover:text-white transition-all"
              onClick={() => {
                //TODO: Verify if no field in empty
                if (newTestCase.input && newTestCase.output) {
                  var newTestCases = [...question.test_cases];
                  newTestCases.push(newTestCase);
                  setQuestion({
                    ...question,
                    test_cases: newTestCases,
                  });
                  setNewTestCase({
                    input: "",
                    output: "",
                    is_public: false,
                    difficulty: 5,
                  });
                } else {
                  alert("Input or output cannot be empty");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
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
              <span>Add TestCase</span>
            </button>
          </div>
        </div>
        {/* ) : (
          ""
        )} */}
        {/* Editorial Section */}
        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-lg leading-5">
            <span className="px-2 text-gray-500 font-bold bg-white">
              Editorial
            </span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto border rounded-md border-2 border-gray-200 my-4">
          <Editor
            defaultValue={question.editorial.content_raw}
            onChange={(value) => {
              var newEditorial = { ...question.editorial };
              newEditorial.content_raw = value();
              setQuestion({
                ...question,
                editorial: newEditorial,
              });
            }}
            className="prose dark:prose-dark lg:prose-lg max-w-none mx-auto"
            // dark={true}
            placeholder="Start Writing Your Amazing Editorial..."
            readOnly={false}
          />
        </div>
        {/* is_hint */}
        <div>
          <label className="mx-2 text-gray-600">Only Hint</label>
          <input
            type="checkbox"
            checked={question.editorial.is_hint}
            onChange={(e) => {
              var newEditorial = { ...question.editorial };
              newEditorial.is_hint = e.target.checked;
              setQuestion({
                ...question,
                editorial: newEditorial,
              });
            }}
          />
        </div>
        {/* Difficulty */}
        <div className="my-14">
          <label htmlFor="question-difficulty">
            Difficulty of the Question (0-10):{" "}
          </label>
          <input
            className="border border-gray-300 rounded-md"
            id="question-difficulty"
            type="number"
            min={0}
            max={10}
            value={question.difficulty}
            onChange={(e) =>
              setQuestion({ ...question, difficulty: e.target.value })
            }
            placeholder="Difficulty"
          />
        </div>
      </section>
      <style>
        {`
        
 
   
        .header {
          background: #0055ff;
          color: white;
          cursor: pointer;
          height: 40px;
          margin-bottom: 5px;
        }
        
 

        section {
          overflow: hidden;
        }
        
        @media (max-width: 600px) {
          .content-placeholder {
            padding-left: 20px;
          }
        
          .header .word {
            height: 30px;
          }
        
          .word {
            height: 14px;
            margin-bottom: 5px;
            margin-right: 5px;
          }
        
          .paragraph {
            margin-bottom: 20px;
          }
        }
        `}
      </style>
    </Sidebar>
  );
}
