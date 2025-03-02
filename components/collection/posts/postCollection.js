import React, { useContext } from "react";
import Link from "next/link";
import GlobalContext from "../../../contexts/globalContext";
import Image from "next/image";
export default function postCollection({
  posts,
  loadMorePosts = () => {
    console.log("Loading");
  },
  isloading = false,
}) {
  return (
    <section>
      {posts && posts[0] ? (
        <>
          <div className="text-gray-600 dark:text-gray-400 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-12">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="p-12 md:w-1/2 flex flex-col items-start hover:shadow-lg border rounded-md border-gray-200 dark:border-gray-700"
                  >
                    <span className="inline-block py-1 px-2 rounded bg-primary-50 text-primary-500 dark:bg-primary-800 text-xs font-medium tracking-widest">
                      {post.tags.length !== 0
                        ? "#" + post.tags[0].name
                        : "No tag"}
                    </span>
                    <h2 className="sm:text-3xl text-2xl title-font font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-4">
                      <Link
                        href={
                          post.type === "page"
                            ? `/${post.slug}`
                            : `/${post.category}/${post.slug}`
                        }
                      >
                        <a>{post.title}</a>
                      </Link>
                    </h2>
                    <p className="leading-relaxed mb-8">
                      <Link
                        href={
                          post.type === "page"
                            ? `/${post.slug}`
                            : `/${post.category}/${post.slug}`
                        }
                      >
                        <a>
                          {post.introduction
                            ? post.introduction.substring(0, 120) + "..."
                            : "No info"}
                        </a>
                      </Link>
                    </p>
                    <div className="flex items-center flex-wrap pb-4 mb-4  border-gray-100 mt-auto w-full">
                      <div className="text-primary-500 inline-flex items-center">
                        {post.author && post.author[0].profile_image ? (
                          <Image
                            alt="author"
                            src={post.author[0].profile_image}
                            className="is-rounded"
                            width="48px"
                            height="48px"
                            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                          />
                        ) : (
                          <img
                            alt="blog"
                            src="https://dummyimage.com/104x104"
                            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                          />
                        )}
                        <span className="flex-grow flex flex-col pl-4">
                          <span className="title-font font-medium text-gray-900 dark:text-gray-200">
                            <Link
                              href={`/u/${
                                post.author ? post.author[0].username : ""
                              }`}
                            >
                              <a>
                                {post.author && post.author[0].name
                                  ? post.author[0].name
                                  : post.author[0].username}
                              </a>
                            </Link>
                          </span>
                          <span className="text-gray-400 text-sm  mt-0.5">
                            {post.reading_time
                              ? post.reading_time / (60 * 1000)
                              : "5"}{" "}
                            mins read
                          </span>
                        </span>
                      </div>

                      <span className="text-gray-400 mr-1 inline-flex items-center ml-auto leading-none text-sm py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                        {new Date(post.updated_at).toDateString().slice(4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Load More Posts */}
          <div className="text-center mt-4 pb-28">
            <button
              onClick={() => (isloading ? "" : loadMorePosts())}
              className={`m-auto flex bg-primary-600 px-10 py-3 text-lg items-center text-white font-semibold rounded-full transition-all duration-200 hover:bg-primary-500`}
            >
              {isloading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                ""
              )}
              <span>Load More</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <Image
            src="/content/images/dummy/empty.svg"
            width="400px"
            height="400px"
          />
          <div className="text-2xl font-medium text-gray-600 dark:text-gray-200">
            No Posts Found
          </div>
        </div>
      )}
    </section>
  );
}
