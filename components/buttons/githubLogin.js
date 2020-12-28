import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default function githubLoginButton(props) {
  return (
    <>
      <button className="flex items-center my-4 text-lg w-full px-4 py-4 bg-black hover:bg-gray-800 dark:hover:bg-gray-900 font-medium rounded-lg text-white" {...props}>
        <span className="mx-2">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </span>
        <span className="mx-2">Sign In with GitHub</span>
      </button>
    </>
  );
}
