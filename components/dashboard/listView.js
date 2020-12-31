import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../collection/pagination";
import { useRouter } from "next/router";

export default function listView({
  data,
  isTagPage,
  type = "post",
  searchvalue = { searchText: "", statusOfItem: "" },
  setSearchValue,
}) {
  const router = useRouter();
  const listToIterate = isTagPage ? data.tags : data.posts;
  const meta = data.meta;
  const { totalCount, pageCount, currentPage, limit } = meta;
  return (
    <div>
      {listToIterate.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-200 text-xl font-semibold">
          Nothing Here. Please Add Something :)
        </div>
      ) : (
        ""
      )}

      <section className="text-gray-600 dark:text-gray-400 body-font">
        <div className="container px-5 pb-8 mx-auto">
          {/* <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              Posts
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              <span>Posts Arranged in Chronological Order</span>
            </h1>
          </div> */}

          <div className="my-8 flex flex-wrap items-center justify-between">
            <div>
              <input
                className="border border-gray-200 dark:border-gray-600 dark:text-gray-200 inline rounded-lg md:pr-40 text-lg dark:bg-gray-700"
                type="text"
                placeholder="Search"
                value={searchvalue.searchText}
                onChange={(e) =>
                  setSearchValue({ ...searchvalue, searchText: e.target.value })
                }
              />

              {isTagPage ? (
                ""
              ) : (
                <div className="inline md:-mx-36">
                  <select
                    className="md:border-l-2 border-t-0 border-b-0 border-r-0 border-gray-400 dark:bg-gray-700"
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        statusOfItem: e.target.value.toLowerCase(),
                      })
                    }
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
              <Link
                href={`/dashboard/${
                  isTagPage
                    ? "tags"
                    : type === "page"
                    ? "editor/page"
                    : "editor/post"
                }/new/`}
              >
                <a className="px-6 py-3 flex items-center mx-auto bg-primary-600 text-gray-100  rounded-lg">
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
                  <span>New Post</span>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {listToIterate.map((element) => {
              var link = "/dashboard/";
              {
                isTagPage
                  ? (link = `/dashboard/tags/${element._id}`)
                  : (link = `/dashboard/editor/${type}/${element._id}`);
              }
              var authorUsername =
                element.author &&
                element.author[0] &&
                element.author[0].username
                  ? element.author[0].username
                  : "No author";
              return (
                <div className="p-4 w-full" key={element._id}>
                  <div className="flex rounded-lg h-full bg-gray-50 dark:bg-gray-700 p-8 flex-col">
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
                            Edit Post
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </Link>
                      </div>
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
    </div>
  );
}
