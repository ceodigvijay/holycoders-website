import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import GlobalContext from "../../../contexts/globalContext";
import Image from "next/image";
export default function postCollection({ bookmarks, posts }) {
  const { addNotification, user } = useContext(GlobalContext);
  return (
    <section className="text-gray-700 body-font overflow-hidden grid grid-cols-2 gap-4">
      {posts.map((post) => (
        <div className="container px-5 py-12 mx-auto shadow-lg">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 flex flex-col items-start">
              <span className="inline-block py-1 px-3 rounded bg-green-100 text-green-500 text-sm font-medium tracking-widest">
                {post.tags.length !== 0 ? "#" + post.tags[0].name : "No tag"}
              </span>
              <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-700 mt-4 mb-4">
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

              <a className="inline-flex items-center">
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
                  <span className="title-font font-medium text-gray-600">
                    <Link
                      href={`/u/${post.author ? post.author[0].username : ""}`}
                    >
                      <a>
                        {post.author && post.author[0].name
                          ? post.author[0].name
                          : post.author[0].username}
                      </a>
                    </Link>
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.updated_at).toDateString().slice(4)}
                    &nbsp;&bull; &nbsp;
                    {post.reading_time ? post.reading_time / (60 * 1000) : "5"}
                    min
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
