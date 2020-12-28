import React, { useState, useEffect } from "react";
import { getCommentsWithContentId, addComment } from "../../../lib/index";
import CommentEditor from "./commentEditor";
import Comment from "./comment";
export default function comment(props) {
  const [refreshComments, setRefreshComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState({});
  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getCommentsWithContentId(
          props.contentId,
          props.contentType
        );
        console.log("Comments");
        console.log(res.data);
        const structuredComment = groupByKey(res.data, "parent_id");
        setComments(structuredComment);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [props.contentId, props.contentType, refreshComments]);

  async function addNewCommentToState(comment) {
    setRefreshComments(!refreshComments);
  }

  // if (Object.keys(comments).length === 0 && comments.constructor === Object) {
  if (loading) {
    return (
      <div className="has-text-centered">
        <button className="button is-white is-loading"></button>
      </div>
    );
  } else if (
    Object.keys(comments).length === 0 &&
    comments.constructor === Object
  ) {
    return (
      <CommentEditor
        addNewCommentToState={addNewCommentToState}
        contentId={props.contentId}
        contentType={props.contentType}
        depth={0}
        parentId={null}
      />
    );
  } else {
    return (
      <div className="comments">
        <ul>
          {/* Level 1 Comment */}
          {comments.null &&
            comments.null.map((element) => {
              var level1Id = element._id;
              return (
                <>
                  <li>
                    <Comment
                      commentObj={element}
                      addNewCommentToState={addNewCommentToState}
                    />
                  </li>
                  <ul>
                    {/* Level 2 Comment */}
                    {comments[level1Id] &&
                      comments[level1Id].map((element) => {
                        var level2Id = element._id;
                        return (
                          <>
                            <li>
                              <Comment
                                commentObj={element}
                                addNewCommentToState={addNewCommentToState}
                              />
                            </li>
                            <ul>
                              {/* Level 3 Comment Last */}
                              {comments[level2Id] &&
                                comments[level2Id].map((element) => {
                                  return (
                                    <li>
                                      <Comment
                                        commentObj={element}
                                        addNewCommentToState={
                                          addNewCommentToState
                                        }
                                      />
                                    </li>
                                  );
                                })}
                            </ul>
                          </>
                        );
                      })}
                  </ul>
                </>
              );
            })}
          <CommentEditor
            addNewCommentToState={addNewCommentToState}
            contentId={props.contentId}
            contentType={props.contentType}
            depth={0}
            parentId={null}
          />
        </ul>
        <style jsx>{`
          .comments ul:not(:first-child) {
            margin-left: 20px;
            padding-left: 20px;
            border-left: 2px dotted #d2d2d2;
          }
        `}</style>
      </div>
    );
  }
}
