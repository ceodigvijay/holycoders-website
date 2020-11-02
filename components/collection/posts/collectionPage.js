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
    } else if (router.asPath.split("/").reverse()[1] === "blog" || router.asPath.split("/").reverse()[1]==="posts") {
      console.log(router.pathname);
      router.push(router.pathname+"/page/[pagenum]/", router.asPath + "page/" + pageNumber + "/");
    } else {
      var newRoute = router.asPath.split("/");
      console.log(router.asPath.split("/").slice(0, -2).join("/"));
      router.push(
        router.pathname,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + pageNumber + "/"
      );
    }
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;
  return (
    <>
      <PostCollection data={data} />
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
