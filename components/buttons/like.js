import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../contexts/globalContext";
import { reactOnPost } from "../../lib/index";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
export default function like({ postID, likesCount = 0, userHasLiked = false }) {
  const { addNotification, user, globalState, setGlobalState } = useContext(
    GlobalContext
  );
  const [likesCounter, setLikesCounter] = useState(likesCount);
  const [liked, setLiked] = useState(userHasLiked);
  const handleClick = async (isLiked) => {
    if (!user) {
      setGlobalState({ ...globalState, showLoginPopup: true });
      return;
    }
    if (postID) {
      try {
        const results = await reactOnPost("like", postID, isLiked);
        if (results.data.ok) {
          setLiked(!liked);
          isLiked
            ? setLikesCounter(likesCounter + 1)
            : setLikesCounter(likesCounter - 1);
        }
      } catch (error) {
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
          className="checkbox"
          id="like-button"
          onChange={(e) => {
            handleClick(!liked);
          }}
        />
        <label htmlFor="like-button">
          <span
            className={`cbutton cbutton-red  cbutton--effect-tamara  ${
              liked ? "cbutton--click" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={liked ? fasHeart : faHeart}
              color="#e74c3c"
              size="2x"
            />
          </span>
          <span className="mx-2">{likesCounter}</span>
        </label>
      </div>
      <style jsx>{`
        #like-button {
          display: none;
        }
      `}</style>
    </>
  );
}
