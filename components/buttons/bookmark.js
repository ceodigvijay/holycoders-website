import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../contexts/globalContext";
import { reactOnPost } from "../../lib/index";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
export default function bookmark({
  postID,
  bookmarkCount = 0,
  userHasbookmarked = false,
}) {
  const { addNotification } = useContext(GlobalContext);
  const [bookmarkCounter, setBookmarkCounter] = useState(bookmarkCount);
  const [bookmarked, setBookmarked] = useState(userHasbookmarked);

  const handleClick = async (isBookmarked) => {
    if (postID) {
      try {
        const results = await reactOnPost("save", postID, isBookmarked);
        if (results.data.ok) {
          isBookmarked
            ? setBookmarkCounter(bookmarkCounter + 1)
            : setBookmarkCounter(bookmarkCounter - 1);
        }
      } catch (error) {
        console.log(error);
        addNotification({
          message: "Some error occured in bookmarking. Please contect us.",
          type: "error",
        });
      }
    }
  };
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="bookmark-button"
          onChange={(e) => {
            setBookmarked(!bookmarked);
            handleClick(!bookmarked);
          }}
        />
        <label for="bookmark-button">
          <span
            className={`cbutton cbutton--effect-tamara  ${
              bookmarked ? "cbutton--click" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={bookmarked ? fasBookmark : faBookmark}
              className="icon is-medium"
            />
          </span>
          <span style={{ margin: "0px 5px" }}>{bookmarkCounter}</span>
        </label>
      </div>
      <style jsx>{`
        #bookmark-button {
          display: none;
        }
      `}</style>
    </>
  );
}
