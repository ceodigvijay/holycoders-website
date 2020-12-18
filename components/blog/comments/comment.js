import React, { useState, useContext } from "react";
import CommentEditor from "./commentEditor";
import { reactOnComment, deleteComment } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
            type: "error",
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
      <article class="media my-5">
        <figure class="media-left">
          <p class="image is-48x48">
            <img src={commentObj.author.profile_image} className="is-rounded" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{commentObj.author.name}</strong>
              {/* Dropdown */}
              <div className="dropdown is-hoverable mx-1">
                <div className="dropdown-trigger">
                  <button
                    className="button is-small is-white"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu4"
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div className="dropdown-content">
                    {/* Show Edit and Delete when owner or admin */}
                    {user.userId === commentObj.author._id ||
                    user.role === "admin" ||
                    user.role === "editor" ? (
                      <>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setCommentEditorMode(
                              commentEditorMode === "edit" ? "none" : "edit"
                            )
                          }
                        >
                          Edit
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleCommentDelete()}
                        >
                          Delete
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                    <a className="dropdown-item" onClick={handleReportClick}>
                      Report
                    </a>
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
            </p>
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
