import React, { useEffect, useState } from "react";
import LibraryLayout from "../../../components/layouts/user/library";
import { getBookmarks } from "../../../lib/index";
import Link from "next/link";

export default function UserBookmarksPage() {
  const [bookmarksData, setBookmarksData] = useState({
    bookmarks: [],
    meta: {},
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getBookmarksData = async () => {
      const res = await getBookmarks(page, 20);
      setBookmarksData(res.data);
    };
    getBookmarksData();
  }, [page]);
  return (
    <LibraryLayout>
      {bookmarksData.bookmarks.map((bookmark, index) => {
        var link =
          bookmark.post.type === "page"
            ? `/${bookmark.post.slug}`
            : `/${bookmark.post.category}/${bookmark.post.slug}`;
        return (
          <div key={bookmark.post._id}>
            <div className="flex rounded-lg h-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 px-8 py-4 my-4 flex-col">
              <Link href={link}>
                <a className="text-gray-900 dark:text-gray-100 text-xl flex items-center justify-between title-font font-medium">
                  <span>{bookmark.post.title}</span>
                  <svg
                    className="w-6 h-6 mx-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
      <div className="text-center">
        {bookmarksData.meta && page >= bookmarksData.meta.pageCount ? (
          ""
        ) : (
          <button
            onClick={() => setPage(page + 1)}
            className="rounded-full border-2 border-primary-600 px-10 py-2"
          >
            Get More
          </button>
        )}
      </div>
    </LibraryLayout>
  );
}
