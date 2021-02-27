import React, { useState } from "react";
import Link from "next/link";
import Pagination from "../../collection/pagination";
import { useRouter } from "next/router";
import Image from "next/image";
export default function listView({
  type,
  data,
  pageCount,
  pathname,
  handleSearch,
}) {
  const [searchvalue, setSearchValue] = useState({
    searchText: "",
    statusOfItem: "",
  });
  const router = useRouter();
  const currentPage = router.query.page ? router.query.page : 1;
  if (data && !data.length) {
    return (
      <section className="flex flex-col h-full items-center justify-center">
        <Image src="/empty.svg" width="451" height="332" />
        <h2 className="text-2xl font-semibold my-4 text-gray-600">
          Nothing Found Here
        </h2>
        <Link href={`/dashboard/${pathname}/new/`}>
          <a className="px-6 py-3 my-10 flex items-center font-bold text-lg mx-auto bg-primary-600 text-gray-100 rounded-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 inline mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span>Add New {type}</span>
          </a>
        </Link>
      </section>
    );
  }
  return (
    <>
      <section className="text-gray-600 dark:text-gray-400 body-font">
        <div className="container px-5 pb-8 mx-auto">
          <div className="my-8 flex flex-wrap items-center justify-between">
            <div>
              <input
                className="border border-gray-200 dark:border-gray-600 dark:text-gray-200 inline rounded-lg md:pr-40 text-lg dark:bg-gray-700"
                type="text"
                placeholder="Search"
                value={searchvalue.searchText}
                onChange={(e) => {
                  setSearchValue({
                    ...searchvalue,
                    searchText: e.target.value,
                  });
                  handleSearch(e.target.value, searchvalue.statusOfItem);
                }}
              />

              {type === "tag" ? (
                ""
              ) : (
                <div className="inline md:-mx-36">
                  <select
                    className="md:border-l-2 border-t-0 border-b-0 border-r-0 border-gray-400 dark:bg-gray-700"
                    onChange={(e) => {
                      setSearchValue({
                        ...searchvalue,
                        statusOfItem: e.target.value.toLowerCase(),
                      });
                      handleSearch(searchvalue.searchText, e.target.value);
                    }}
                  >
                    <option>All</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option value="future">Scheduled</option>
                    <option>Trash</option>
                    <option>Review</option>
                    <option>Rejected</option>
                    <option>Improve</option>
                  </select>
                </div>
              )}
            </div>

            <div className="my-4 md:my-0">
              <Link href={`/dashboard/${pathname}/new/`}>
                <a className="px-6 py-3 flex items-center font-bold text-lg mx-auto bg-primary-600 text-gray-100 rounded-full">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 inline mx-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>New {type}</span>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {data.map((element) => {
              var link = `/dashboard/${type}/${element._id}`;
              var authorUsername =
                element.author &&
                element.author[0] &&
                element.author[0].username
                  ? element.author[0].username
                  : "No author";
              return (
                <div
                  className="w-full my-4 flex rounded-lg h-full bg-gray-50 dark:bg-gray-700 p-8 flex-col"
                  key={element._id}
                >
                  <div className="flex items-center mb-2">
                    <Link href={link}>
                      <a className="text-gray-900 cursor-pointer dark:text-gray-100 text-xl title-font font-medium">
                        {element.title ? element.title : element.name}
                        {!element.status || element.status === "published" ? (
                          ""
                        ) : (
                          <span
                            className={`text-sm bg-yellow-200 dark:text-gray-500 py-1 px-4 mx-4 rounded-lg`}
                          >
                            {element.status}
                          </span>
                        )}
                      </a>
                    </Link>
                  </div>
                  <div className="flex-grow text-center">
                    <div className="flex items-center">
                      <p className="">
                        By{" "}
                        <Link href={`/u/${authorUsername}/`}>
                          <a className="font-medium">{authorUsername}</a>
                        </Link>
                      </p>
                      <Link href={link}>
                        <a className="text-primary-500 dark:text-primary-200 ml-auto cursor-pointer inline-flex items-center mx-2">
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span>Edit Item</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          changePage={(pageNumber) =>
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: pageNumber,
              },
            })
          }
        />
      </div>
    </>
  );
}
