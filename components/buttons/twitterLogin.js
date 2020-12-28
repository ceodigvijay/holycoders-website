import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTwitter } from "@fortawesome/free-brands-svg-icons";
export default function githubLoginButton(props) {
  return (
    <>
      <button className="flex cursor-not-allowed items-center my-4 text-lg w-full px-4 py-4 bg-blue-400 hover:bg-blue-400 font-medium rounded-lg text-white" {...props}>
        <span className="mx-2">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </span>
        <span className="mx-2">Sign In with Twitter (Soon)</span>
      </button>
    </>
  );
}
