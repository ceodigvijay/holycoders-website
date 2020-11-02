import React, { useState } from "react";
import CommentEditor from "./commentEditor";
import { reactOnComment } from "../../../lib/index";
export default function comment({ commentObj, addNewCommentToState }) {
  const [showEditor, setShowEditor] = useState(false);
  const [liked, setLiked] = useState(commentObj.is_liked);
  const handleLikeClick = async (isLikedPositively) => {
    try {
      const results = await reactOnComment(
        "like",
        commentObj._id,
        isLikedPositively
      );
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{commentObj.author.name}</strong>
              <br />
              {commentObj.comment_raw}
              <br />
              <small>
                <a
                  onClick={() => {
                    setLiked(!liked);
                    handleLikeClick(!liked);
                  }}
                >
                  {liked ? "Liked" : "Like"}
                </a>
                {commentObj.depth <= 1 && commentObj.depth >= 0 ? (
                  <>
                    {" "}
                    ·<a onClick={() => setShowEditor(!showEditor)}>Reply</a> · 3
                    hrs
                  </>
                ) : (
                  ""
                )}
              </small>
            </p>
          </div>
        </div>
      </article>
      {showEditor && commentObj.depth <= 1 && commentObj.depth >= 0 ? (
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
    </>
  );
}
