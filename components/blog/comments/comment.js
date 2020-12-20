import React, { useState, useContext } from "react";
import CommentEditor from "./commentEditor";
import { reactOnComment, deleteComment } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function comment({ commentObj, addNewCommentToState }) {
  const [commentEditorMode, setCommentEditorMode] = useState("none");
  const [liked, setLiked] = useState(commentObj.is_liked);
  const { addNotification, user } = useContext(GlobalContext);
  const handleLikeClick = async (isLikedPositively) => {
    try {
      const results = await reactOnComment(
        "like",
        commentObj._id,
        isLikedPositively
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleReportClick = async () => {
    try {
      const results = await reactOnComment("report", commentObj._id, 1);
      results.data.ok
        ? addNotification({
            message: "Comment Reported, we will review it soon.",
            type: "info",
          })
        : "";
    } catch (error) {
      console.log(error);
    }
  };
  async function handleCommentDelete() {
    try {
      const res = await deleteComment(commentObj);
      console.log(res);
      if (res.data.ok) {
        addNewCommentToState({ ...comment, _id: res.data.id });
      }
    } catch (error) {
      if (error.response.status) {
        addNotification({
          message: "You are not authorized to perform this operation.",
          type: "error",
        });
      }
    }
  }
  return (
    <>
      <article className="inline-flex my-5">
        <img
          alt="user"
          src={commentObj.author.profile_image}
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center mx-3"
        />
        <div className="media-content">
          <div className="content">
            <div>
              <strong>{commentObj.author.name}</strong>
              {/* Dropdown */}
              {/* This example requires Tailwind CSS v2.0+ */}
              <div className="inline-block group">
                <div>
                  <button
                    type="button"
                    className="justify-center text-center rounded-md shadow-sm mx-2 px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {/* Heroicon name: chevron-down */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/*
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
From: "transform opacity-0 scale-95"
To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
From: "transform opacity-100 scale-100"
To: "transform opacity-0 scale-95"
  */}
                <div className="hidden group-hover:block origin-top-right absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {user &&
                    (user.userId === commentObj.author._id ||
                      user.role === "admin" ||
                      user.role === "editor") ? (
                      <>
                        <a
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() =>
                            setCommentEditorMode(
                              commentEditorMode === "edit" ? "none" : "edit"
                            )
                          }
                        >
                          Edit
                        </a>
                        <a
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handleCommentDelete()}
                        >
                          Delete
                        </a>
                        <a
                          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={handleReportClick}
                        >
                          Report
                        </a>
                      </>
                    ) : (
                      <Link href="/enter">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          rel="noopener noreferrer"
                        >
                          Log In
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {/* Dropdown ends */}

              <br />
              {commentObj.comment_raw}
              <br />
              <small>
                {user ? (
                  <>
                    <a
                      className="mx-1"
                      onClick={() => {
                        setLiked(!liked);
                        handleLikeClick(!liked);
                      }}
                    >
                      {liked ? "Liked" : "Like"}
                    </a>

                    {commentObj.depth <= 1 && commentObj.depth >= 0 ? (
                      <>
                        <a
                          className="mx-1"
                          onClick={() =>
                            setCommentEditorMode(
                              commentEditorMode === "new" ? "none" : "new"
                            )
                          }
                        >
                          Reply
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </small>
            </div>
          </div>
        </div>
      </article>
      {commentEditorMode === "new" &&
      commentObj.depth <= 1 &&
      commentObj.depth >= 0 ? (
        <ul>
          <li>
            {/* Now parent id for new nested comment is this comment component */}
            <CommentEditor
              contentId={commentObj.content_id}
              addNewCommentToState={addNewCommentToState}
              contentType={commentObj.content_type}
              depth={commentObj.depth + 1}
              parentId={commentObj._id}
            />
          </li>
        </ul>
      ) : (
        ""
      )}
      {commentEditorMode === "edit" && commentObj.depth >= 0 ? (
        <ul>
          <li>
            {/* Now parent id for new nested comment is this comment component */}
            <CommentEditor
              commentId={commentObj._id}
              commentRaw={commentObj.comment_raw}
              contentId={commentObj.content_id}
              addNewCommentToState={addNewCommentToState}
              parentId={commentObj.parent_id}
              contentType={commentObj.content_type}
              depth={commentObj.depth}
            />
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
