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
      console.log(res.data);
    };
    getBookmarksData();
  }, []);
  return (
    <DashboardLayout>
      <div className="px-4">
        <h1 className="has-text-centered title is-2 my-4 py-4">Bookmarks</h1>
        <div className="panel my-4 px-4 py-4">
          {bookmarksData.bookmarks.map((bookmark) => {
            return (
              <div className="px-1 my-6 title is-4" key={bookmark.post._id}>
                <Link
                  href={
                    bookmark.post.type === "page"
                      ? `/${bookmark.post.slug}`
                      : `/${bookmark.post.category}/${bookmark.post.slug}`
                  }
                >
                  <a>{bookmark.post.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
