import React, { useState, useContext } from "react";
import { addComment, updateComment } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";

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
    <article className="media">
      <figure className="media-left">
        <p className="image is-48x48">
          <img
            className="is-rounded"
            src={user.profileImage}
            alt={user.username}
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              value={comment.comment_raw}
              onChange={(e) => {
                setComment({
                  ...comment,
                  comment_raw: e.target.value,
                });
              }}
              className="textarea"
              placeholder="Add a comment..."
            ></textarea>
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              {comment._id ? (
                <a
                  className={`button is-primary ${loading ? "is-loading" : ""}`}
                  onClick={handleCommentUpdate}
                >
                  Update
                </a>
              ) : (
                <a
                  className={`button is-primary ${loading ? "is-loading" : ""}`}
                  onClick={handleCommentSubmit}
                >
                  Submit
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </article>
  ) : (
    <p className="title is-4 has-text-centered my-4">
      Please{" "}
      <a href="/enter" rel="noopener noreferrer">
        Log in
      </a>{" "}
      to comment
    </p>
  );
}
