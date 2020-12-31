import React, { useState, useContext } from "react";
import { addComment, updateComment } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import Link from "next/link";

export default function commentEditor({
  contentId,
  contentType,
  depth = 0,
  parentId = null,
  addNewCommentToState,
  commentId = null,
  commentRaw = "",
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    _id: commentId,
    content_id: contentId,
    content_type: contentType,
    comment_raw: commentRaw,
    depth: depth,
    parent_id: parentId,
  });
  const { user } = useContext(GlobalContext);

  async function handleCommentSubmit() {
    if (comment.comment_raw) {
      setLoading(true);
      try {
        const res = await addComment(comment);
        if (res.data.ok) {
          addNewCommentToState({ ...comment, _id: res.data.id });
          setComment({ ...comment, comment_raw: "" });
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      alert("Empty Comments are not accepted.");
    }
  }
  async function handleCommentUpdate() {
    setLoading(true);
    try {
      const res = await updateComment(comment);
      console.log(res);
      if (res.data.ok) {
        //Add comment on frontend
        addNewCommentToState({ ...comment, _id: res.data.id });
        // setComment({ ...comment, comment_raw: "" });
      }
    } catch (error) {
      // TODO: Update failed notification
      console.log(error);
    }
    setLoading(false);
  }

  return user ? (
    <article className="inline-flex my-5 w-full">
      <img
        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center mx-3"
        src={user.profileImage}
        alt={user.username}
      />

      <div className="media-content flex-grow	">
        <p className="control">
          <textarea
            value={comment.comment_raw}
            onChange={(e) => {
              setComment({
                ...comment,
                comment_raw: e.target.value,
              });
            }}
            className="border border-gray-300 dark:border-gray-900 dark:text-gray-200 p-2 dark:bg-gray-700 focus:ring-green-500 focus:border-2 focus:border-gray-400 h-32 mt-1 block w-full rounded-md"
            placeholder="Add a comment..."
          ></textarea>
        </p>
        <div className="my-6">
          {comment._id ? (
            <a
              className={`px-6 py-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white cursor-pointer ${
                loading ? "is-loading" : ""
              }`}
              onClick={handleCommentUpdate}
            >
              Update
            </a>
          ) : (
            <a
              className={`px-6 py-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white cursor-pointer ${
                loading ? "is-loading" : ""
              }`}
              onClick={handleCommentSubmit}
            >
              Submit
            </a>
          )}
        </div>
      </div>
    </article>
  ) : (
    <p className="title text-center text-lg my-4">
      Please{" "}
      <Link href="/enter">
        <a className="text-primary-600 font-semibold">Log in</a>
      </Link>{" "}
      to comment
    </p>
  );
}
