import React, { useState } from "react";
import { getCommentsWithContentId, addComment } from "../../../lib/index";

export default function commentEditor({
  contentId,
  contentType,
  depth = 0,
  parentId = null,
  addNewCommentToState
}) {
  const [comment, setComment] = useState({
    content_id: contentId,
    content_type: contentType,
    comment_raw: "",
    comment_html: "",
    depth: depth,
    parent_id: parentId,
  });

  async function handleCommentSubmit(){
    const res = await addComment(comment)
    if(res.data.ok){
      //Add comment on frontend
      addNewCommentToState({...comment, _id: res.data.id})
      setComment({...comment, comment_raw: "", comment_html: ""})
    }
    console.log(res);
  }

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
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
                  comment_html: e.target.value,
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
              <a className="button is-info" onClick={handleCommentSubmit}>Submit</a>
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
}
