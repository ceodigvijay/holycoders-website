import React from "react";
import PostCollection from "./postCollection";
import Pagination from "../pagination";
import { useRouter } from "next/router";

export default function collectionPage({ data, showPagination }) {
  const router = useRouter();
  const { currentPage, pageCount, totalCount } = data.meta;
  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pageCount) {
      alert("No Page Like that");
    } else if (router.asPath.split("/").reverse()[2] === "page") {
      var newRoute = router.asPath.split("/");
      router.push(
        router.pathname,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + pageNumber + "/"
      );
    } else {
      router.push(
        router.pathname + "/page/[pagenum]/",
        router.asPath + "page/" + pageNumber + "/"
      );
    }
  };
  return (
    <>
      <PostCollection bookmarks={data.bookmarks} posts={data.allPosts} />
      {showPagination === false ? (
        ""
      ) : (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          changePage={changePage}
        />
      )}
    </>
  );
}
