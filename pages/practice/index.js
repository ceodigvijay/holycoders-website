import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/global/index";
import { TagInput } from "../../components/index";
import { getAllQuestions } from "../../lib/index";
import Link from "next/link";
import Pagination from "../../components/collection/pagination";
import Image from "next/image";
export default function PracticePage() {
  const [questionData, setQuestionData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    solved: false,
    unsolved: false,
    easy: false,
    medium: false,
    hard: false,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        var filterString = "";
        for (const item in filter) {
          if (filter[item]) {
            filterString += `&${item}=true`;
          }
        }
        const response = await getAllQuestions({
          page: currentPage,
          limit: 10,
          authorOnly: false,
          status: "published",
          filterString,
        });
        setQuestionData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [currentPage, filter]);

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };
  // if(!questionData){
  //   return "Loading"
  // }
  return (
    <Layout>
      <div className="text-center min-h-screen">
        <img
          src="/coming-soon.png"
          width={800}
          height={490}
          className="block mx-auto"
        />
      </div>
    </Layout>
  );
  return (
    <Layout>
      <section className="bg-gray-100 min-h-screen p-4 md:p-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 py-2">
            <div className="">
              <p className="text-2xl text-gray-800 font-semibold my-4">
                Status
              </p>
              <div className="flex items-center my-1 text-gray-700">
                <input
                  checked={filter.solved}
                  onChange={(e) =>
                    setFilter({ ...filter, solved: e.target.checked })
                  }
                  type="checkbox"
                  id="status-solved"
                  className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded-sm mr-4"
                />
                <label htmlFor="status-solved">Solved</label>
              </div>
              <div className="flex items-center my-1 text-gray-700">
                <input
                  checked={filter.unsolved}
                  onChange={(e) =>
                    setFilter({ ...filter, unsolved: e.target.checked })
                  }
                  type="checkbox"
                  id="status-unsolved"
                  className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded-sm mr-4"
                />
                <label htmlFor="status-unsolved">Unsolved</label>
              </div>
            </div>
            <div className="mt-10">
              <p className="text-2xl text-gray-800 font-semibold my-4">
                Difficulty
              </p>
              <div className="flex items-center my-1 text-gray-700">
                <input
                  checked={filter.easy}
                  onChange={(e) =>
                    setFilter({ ...filter, easy: e.target.checked })
                  }
                  type="checkbox"
                  id="difficulty-easy"
                  className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded-sm mr-4"
                />
                <label htmlFor="difficulty-easy">Easy</label>
              </div>
              <div className="flex items-center my-1 text-gray-700">
                <input
                  checked={filter.medium}
                  onChange={(e) =>
                    setFilter({ ...filter, medium: e.target.checked })
                  }
                  type="checkbox"
                  id="difficulty-medium"
                  className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded-sm mr-4"
                />
                <label htmlFor="difficulty-medium">Medium</label>
              </div>
              <div className="flex items-center my-1 text-gray-700">
                <input
                  checked={filter.hard}
                  onChange={(e) =>
                    setFilter({ ...filter, hard: e.target.checked })
                  }
                  type="checkbox"
                  id="difficulty-hard"
                  className="form-checkbox h-4 w-4 border-2 border-gray-400 rounded-sm mr-4"
                />
                <label htmlFor="difficulty-hard">Hard</label>
              </div>
            </div>
          </div>
          {/* Right Panel */}
          <div className="col-span-12 md:col-span-9">
            {/* Search Bar */}
            <div className="bg-white px-4 py-2 flex items-center rounded-md">
              <div className="flex-1 flex items-center">
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search Keyword"
                  className="border-none flex-1 mx-2 text-xl focus:outline-none focus:ring-0 "
                />
              </div>
              <button className="px-10 py-4 text-lg font-semibold rounded-md bg-primary-600 text-white">
                Search
              </button>
            </div>
            <p className="mt-10 text-lg text-gray-500">
              <span className="text-gray-600">
                {questionData?.meta.totalCount}
              </span>{" "}
              Questions Found to Practice
            </p>
            {/* Individual Question Items */}
            <div className="">
              {questionData?.questions.map((question, index) => {
                var isSolved = questionData?.solved.includes(question._id);
                return (
                  <Link href={"/practice/" + question.slug}>
                    <a
                      className={`${
                        isSolved ? "bg-gray-50" : "bg-white"
                      } my-6 px-4 py-10 rounded-md flex justify-between cursor-pointer border-2 hover:border-primary-500 hover:shadow-lg transition ease-in duration-200 relative`}
                    >
                      <div>
                        <h2 className="font-bold text-2xl text-gray-700 flex items-center">
                          <span>{question.title}</span>
                          {isSolved ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 mx-2 text-primary-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            ""
                          )}
                        </h2>
                        <p className="text-gray-500 my-2">
                          Easy &bull; Max Score : 80
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="mx-4"
                          onClick={() => alert("Bookmark")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-500 absolute -top-3 -right-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg> */}
                    </a>
                  </Link>
                );
              })}
            </div>
            {questionData ? (
              <Pagination
                currentPage={currentPage}
                pageCount={questionData?.meta.pageCount}
                changePage={changePage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
