import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import { getBookmarks } from "../../../lib/index";
import Link from "next/link";
export default function index() {
  const [bookmarksData, setBookmarksData] = useState({
    bookmarks: [],
    meta: {},
  });
  useEffect(() => {
    const getBookmarksData = async () => {
      const res = await getBookmarks(1, 20);
      setBookmarksData(res.data);
    };
    getBookmarksData();
  }, []);
  return (
    <DashboardLayout>
      <div className="px-4">
        <div className="panel my-4 px-4 py-4">
          {bookmarksData.bookmarks.map((bookmark, index) => {
            var link =
              bookmark.post.type === "page"
                ? `/${bookmark.post.slug}`
                : `/${bookmark.post.category}/${bookmark.post.slug}`;
            return (
              <div key={bookmark.post._id}>
                <div className="p-4 w-full">
                  <div className="flex rounded-lg h-full bg-gray-50 dark:bg-gray-700 p-8 flex-col">
                    <div className="flex items-center mb-2">
                      
                      <Link href={link}>
                        <a className="text-gray-900 dark:text-gray-100 text-xl title-font font-medium">
                          {bookmark.post.title}
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
    </DashboardLayout>
  );
}
