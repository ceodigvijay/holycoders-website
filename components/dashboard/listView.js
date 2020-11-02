import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../collection/pagination";
import { useRouter } from "next/router";

export default function listView({ data, isTagPage, type = "post" }) {
  const router = useRouter();
  const listToIterate = isTagPage ? data.tags : data.posts;
  const meta = data.meta;
  console.log("Lists to iterate");
  console.log(listToIterate);
  const { totalCount, pageCount, currentPage, limit } = meta;
  return (
    <div>
      <div className="top-toolbar">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
        {isTagPage ? (
          ""
        ) : (
          <div className="select">
            <select
              className="tabs is-centered is-boxed"
              onChange={(e) =>
                handleQueryChange(e.target.value.toLocaleLowerCase())
              }
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Trash</option>
            </select>
          </div>
        )}
      </div>
      {listToIterate.length === 0 ? (
        <div className="has-text-centered title is-5">
          Nothing Here (Pagination below is a bug:())
        </div>
      ) : (
        ""
      )}
      {listToIterate.map((element) => {
        return (
          <>
            <span className="panel-block is-size-4 my-2">
              {isTagPage ? (
                <Link
                  href={`/dashboard/tags/[id]`}
                  as={`/dashboard/tags/${element._id}`}
                >
                  <a>{element.name}</a>
                </Link>
              ) : (
                <Link
                  href={`/dashboard/editor/[type]/[id]`}
                  as={`/dashboard/editor/${type}/${element._id}`}
                >
                  <a className="my-2">{element.title}</a>
                </Link>
              )}
              {element.status === "draft" || element.status === "review" ? (
                <span className="tag is-warning is-medium is-light mx-2">
                  {element.status}
                </span>
              ) : (
                ""
              )}
            </span>
          </>
        );
      })}

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
      <style jsx global>{`
        a {
          color: inherit;
        }
        .top-toolbar {
          margin-top: 30px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
        }
        .panel-heading {
          background-color: #f2f2f2;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
