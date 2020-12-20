import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Like from "../buttons/like";
import Bookmark from "../buttons/bookmark";
// import ReadingProgress from "./readingProgress";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { getPostReactions } from "../../lib/index";
export default function toolbar({ postId }) {
  const [toolbarData, setToolbarData] = useState(null);
  useEffect(() => {
    const syncDynamicData = () => {
      setTimeout(async () => {
        const reactions = await getPostReactions(postId);
        setToolbarData(reactions.data);
      }, 5000);
    };
    if (!toolbarData && postId) {
      syncDynamicData();
    }
  }, []);

  return (
    <>
      {toolbarData ? (
        <div className="utility-container">
          <Like
            postID={postId}
            likesCount={toolbarData.totalLikes}
            userHasLiked={toolbarData.hasLiked}
          />
          <Bookmark
            postID={postId}
            bookmarkCount={toolbarData.totalBookmarks}
            userHasbookmarked={toolbarData.hasBookmarked}
          />
          <a href="#comments">
            <FontAwesomeIcon className="icon is-medium" icon={faComment} />
          </a>
          <a href="#comments">
            <FontAwesomeIcon
              color="#00acee"
              className="icon is-medium"
              icon={faTwitter}
            />
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
