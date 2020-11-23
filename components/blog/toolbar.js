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
  console.log(toolbarData, postId);
  useEffect(() => {
    const syncDynamicData = () => {
      setTimeout(async () => {
        console.log("Post Toolbar data Sync Started");
        const reactions = await getPostReactions(postId);
        setToolbarData(reactions.data);
        console.log(reactions);
      }, 5000);
      console.log("Sync likes, bookmarks with slug and userId");
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
          <FontAwesomeIcon className="icon is-medium" icon={faComment} />
          <FontAwesomeIcon
            color="#00acee"
            className="icon is-medium"
            icon={faTwitter}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
