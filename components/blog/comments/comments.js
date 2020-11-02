import React, { useState, useEffect } from "react";
import { getCommentsWithContentId, addComment } from "../../../lib/index";
import CommentEditor from "./commentEditor";
import Comment from "./comment";
export default function comment(props) {
  const [refreshComments, setRefreshComments] = useState(false)
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
        const res = await getCommentsWithContentId(
          props.contentId,
          props.contentType
        );
        console.log(res.data);
        const structuredComment = groupByKey(res.data, "parent_id");
        setComments(structuredComment);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [props.contentId, props.contentType, refreshComments]);

  // TODO: Notify on comment insert
  async function addNewCommentToState(comment) {
    // if (comment.depth === 0) {
    //   var newNullComments = comments.null;
    //   newNullComments.push(comment);
    //   console.log(newNullComments);
    //   setComments({ ...comments, null: newNullComments });
    // } else {
    //   //Insert in paerent object
    //   var newComment = comments;
    //   newComment[comment.parent_id].push(comment);
    //   console.log(newComment);
    //   setComments({ ...newComment });
    // }
    setRefreshComments(!refreshComments)
  }
  
  function getState() {
    console.log(comments);
  }

  if (Object.keys(comments).length === 0 && comments.constructor === Object) {
    return "Loading";
  } else {
    return (
      <div className="content">
        <ul>
          {/* Level 1 Comment */}
          {comments.null.map((element) => {
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
          <button onClick={() => console.log(comments)}>Log</button>
        </ul>
      </div>
    );
  }
}
